# GitHub API Reference — PR Review Comments

All examples use `gh api` with the `{owner}/{repo}` placeholder resolved automatically by `gh`.

---

## Detect current branch and find the PR

```bash
# Get current branch name
git branch --show-current

# Find PR for the current branch (returns number, url, author login, state)
gh pr list --head "$(git branch --show-current)" --state open --json number,url,author,headRefName
```

If no results: the branch may have no open PR, or the PR may be in draft state — try adding `--state all`.

---

## Get the PR author

```bash
gh pr view <number> --json author
# Returns: {"author": {"login": "some-user"}}
```

The `author.login` field is used throughout to identify which comments/reactions are yours.

---

## Fetch inline review comments (code-level, line-by-line)

These are comments left on specific lines of changed files via the "Files changed" tab.

```bash
gh api repos/{owner}/{repo}/pulls/<number>/comments --paginate
```

Key fields per comment object:
```json
{
  "id": 123456789,
  "in_reply_to_id": null,        // null = root of a thread; non-null = reply to that id
  "body": "Consider renaming this to be more descriptive.",
  "user": { "login": "reviewer-name" },
  "path": "src/components/Button.tsx",
  "line": 42,
  "original_line": 42,
  "commit_id": "abc123",
  "created_at": "2026-03-10T10:00:00Z",
  "updated_at": "2026-03-10T10:00:00Z",
  "html_url": "https://github.com/owner/repo/pull/1#discussion_r123456789",
  "pull_request_review_id": 987654321
}
```

**Threading logic:**
- Comments with `in_reply_to_id: null` are thread roots (the original reviewer comment)
- Comments with `in_reply_to_id: <id>` are replies to the root comment with that id
- Group all comments by their root: for each comment, the root is either itself (if `in_reply_to_id` is null) or the comment whose `id` equals `in_reply_to_id`

---

## Fetch top-level PR conversation comments (non-inline)

These are comments left in the main "Conversation" tab of the PR (not tied to a specific line).

```bash
gh api repos/{owner}/{repo}/issues/<number>/comments --paginate
```

Key fields per comment object:
```json
{
  "id": 111222333,
  "body": "Overall looks good, but the error handling in the main flow is missing.",
  "user": { "login": "reviewer-name" },
  "created_at": "2026-03-10T09:00:00Z",
  "html_url": "https://github.com/owner/repo/pull/1#issuecomment-111222333"
}
```

These are flat (not threaded). Each comment stands alone.

---

## Fetch reactions on an inline review comment

Used to check if the PR author has reacted (e.g. with 👍) to a comment, which counts as acknowledgement.

```bash
gh api repos/{owner}/{repo}/pulls/comments/<comment_id>/reactions
```

Returns an array:
```json
[
  {
    "id": 999,
    "user": { "login": "pr-author-login" },
    "content": "+1"   // "+1", "-1", "laugh", "confused", "heart", "hooray", "rocket", "eyes"
  }
]
```

**Check:** if any reaction object has `user.login` equal to the PR author's login, that comment has been acknowledged by the author.

---

## Fetch reactions on a conversation comment

```bash
gh api repos/{owner}/{repo}/issues/comments/<comment_id>/reactions
```

Same response shape as above.

---

## Fetch review thread resolution status (optional)

GitHub's GraphQL API exposes whether a review thread is resolved:

```bash
gh api graphql -f query='
{
  repository(owner: "OWNER", name: "REPO") {
    pullRequest(number: PR_NUMBER) {
      reviewThreads(first: 100) {
        nodes {
          id
          isResolved
          isOutdated
          comments(first: 50) {
            nodes {
              id
              databaseId
              body
              author { login }
              reactionGroups {
                content
                users(first: 10) { nodes { login } }
              }
            }
          }
        }
      }
    }
  }
}'
```

Key fields:
- `isResolved: true` — thread was marked resolved; skip it
- `isOutdated: true` — the code changed and the comment no longer applies to current diff; can skip
- `comments.nodes[].author.login` — compare to PR author login to detect replies
- `reactionGroups` — per reaction type, lists users who reacted; check if PR author login appears

---

## Get file content at a specific path (for reading referenced code)

```bash
gh api repos/{owner}/{repo}/contents/<path>?ref=<branch-or-commit> \
  --jq '.content' | base64 -d
```

Or just read the local file directly if the working tree is checked out:
```bash
# Read specific lines around the comment location
sed -n '$((LINE-5)),$((LINE+5))p' <path>
```

---

## Determine repo owner and name

```bash
gh repo view --json owner,name
# Returns: {"owner": {"login": "owner-name"}, "name": "repo-name"}
```

Or parse from remote URL:
```bash
git remote get-url origin
# e.g. git@github.com:owner/repo.git  or  https://github.com/owner/repo.git
```

`gh api` with `{owner}/{repo}` placeholders resolves these automatically when run inside a git repo.
