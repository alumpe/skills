---
name: review-responder
description: >
  Analyzes open pull request review comments on the current branch and suggests
  replies for comments that haven't been responded to yet. Fetches all reviewer
  comments (inline code review comments and conversation comments), filters out
  threads where the PR author has already replied or reacted, then for each
  unanswered comment analyzes the reviewer's intent and produces a single
  ready-to-post reply suggestion. Triggers on: "review comments", "PR comments",
  "unanswered comments", "reviewer feedback", "respond to review",
  "review-responder", "what do reviewers want", "reply to reviewer".
---

# PR Review Responder

## Overview

This skill fetches all review comments on the open PR for the current branch,
identifies which ones still need a response from you, and for each one produces
a concise analysis and a single suggested reply.

See [references/gh-api-examples.md](references/gh-api-examples.md) for the full
API command reference and JSON field shapes.

---

## Step 1 — Find the PR for the current branch

```bash
gh pr list --head "$(git branch --show-current)" --state open --json number,url,author,headRefName
```

- If no open PR is found, try `--state all` (catches merged/draft PRs).
- Extract `number` (PR number) and `author.login` (the PR author — that's you).
- If multiple PRs are found, use the most recently created one.

Also resolve the repo owner and name for use in API calls:

```bash
gh repo view --json owner,name
```

---

## Step 2 — Fetch all review comments

Run both fetches in parallel:

**Inline code review comments** (tied to specific lines in the diff):
```bash
gh api repos/{owner}/{repo}/pulls/<number>/comments --paginate
```

**Conversation-tab comments** (top-level PR discussion):
```bash
gh api repos/{owner}/{repo}/issues/<number>/comments --paginate
```

Store both lists. You will process them separately.

---

## Step 3 — Build inline review threads

Inline comments are threaded. Group them:

1. Collect all comments where `in_reply_to_id` is `null` — these are **thread roots**.
2. For each root, collect all comments where `in_reply_to_id` equals the root's `id` — these are **replies**.
3. The full thread = [root, ...replies] sorted by `created_at` ascending.

---

## Step 4 — Identify unanswered threads and comments

**For each inline review thread:**

A thread is considered **unanswered** if BOTH of these are true:
- None of the reply comments in the thread have `user.login` equal to the PR author's login.
- The PR author has not reacted to the root comment.

To check reactions on the root comment:
```bash
gh api repos/{owner}/{repo}/pulls/comments/<root_comment_id>/reactions
```
If any reaction object has `user.login` equal to the PR author's login → the thread is acknowledged → skip it.

**For each conversation comment:**

A conversation comment is considered **unanswered** if BOTH of these are true:
- The comment's `user.login` is NOT the PR author (i.e. it was written by someone else).
- No subsequent conversation comment (by `created_at` order) from the PR author exists that was posted after this comment.

To check reactions on a conversation comment:
```bash
gh api repos/{owner}/{repo}/issues/comments/<comment_id>/reactions
```
If the PR author has reacted → acknowledged → skip it.

**Also skip:**
- Any comment or thread root where `user.login` equals the PR author's login (those are your own comments).
- Bot accounts (login ends with `[bot]` or is a known CI bot).

---

## Step 5 — Read referenced code for inline comments

For each unanswered inline thread, read the relevant code context to understand what the reviewer is commenting on:

1. Use `path` and `line` from the root comment to locate the file and line.
2. Read the local file (if checked out) around that line — roughly 10 lines of context above and below.
3. If the file is not available locally, fetch it via:
   ```bash
   gh api repos/{owner}/{repo}/contents/<path>?ref=<headRefName> --jq '.content' | base64 -d
   ```

This context is essential for producing a meaningful suggested reply.

---

## Step 6 — Analyze and produce suggestions

For each unanswered comment or thread, produce the following output:

### Output format per comment

```
---
## [Inline | Conversation] Comment by @<reviewer-login>
**File:** `<path>:<line>`  ← omit for conversation comments
**Link:** <html_url>

**What the reviewer wants:**
<1-2 sentences describing the reviewer's intent — is this a change request,
a question, a nitpick, a suggestion, a blocking concern, or general feedback?>

**Suggested reply:**
<A single, ready-to-post reply. Write it in first person as if you are the PR
author responding. Be concise and direct. If the reviewer asked a question,
answer it. If they requested a change, either acknowledge and confirm you'll
make it, explain why the current approach is correct, or ask a clarifying
question. Match the tone of the PR's existing conversation.>
```

If there are no unanswered comments, output:
```
No unanswered review comments found on PR #<number>.
```

---

## Step 7 — Present a summary

After listing all suggestions, end with a brief summary:

```
---
**Summary:** Found <N> unanswered comment(s) across <M> thread(s).
```

---

## Behavioral Guidelines

- **Be honest about uncertainty.** If you cannot determine the reviewer's intent
  from the comment alone (e.g. it's very terse), say so in the "What the reviewer
  wants" section and offer a clarifying question as the suggested reply.

- **Prioritize blocking concerns.** If a comment clearly blocks merging (e.g.
  "this will cause a crash", "please fix before merging"), flag it explicitly
  at the top of that entry.

- **Don't fabricate code knowledge.** Only reference specifics from the code you
  actually read in Step 5. If you couldn't fetch the file, base your analysis
  solely on the comment text.

- **Respect the existing conversation tone.** If the PR conversation is casual
  and uses informal language, the suggested replies can match that. If it's
  formal and technical, keep the suggestions formal.

- **Never post replies automatically.** Only analyze and suggest. The user decides
  what to post.

- **One suggestion per thread, not per reply.** If a thread has multiple back-and-
  forth comments from the reviewer but no response from the author, treat the
  whole thread as one unit and produce one suggestion that addresses all points
  raised in that thread.
