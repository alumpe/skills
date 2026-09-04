---
name: web-search
description: Search the web, read pages, find OSS code examples, and look up library documentation. Use whenever a question needs live or current sources — "search for X", "research Y", "what's new in Z", "find docs for library W", "scrape this URL", "how do real projects use API V" — or when your knowledge might be stale.
---

# Web Search

Backed by the `ketch` CLI (installed on this machine). If `which ketch` fails, tell the user and stop — do not substitute curl-based scraping hacks.

## Principle

Anything time-sensitive or outside your training data (news, releases, versions, docs, opinions, prices, current events) → search the web, don't guess. Cite a source URL for every claim.

## Capability menu

| Need | Command |
|---|---|
| Current web info (news, opinions, comparisons) | `ketch search "query"` |
| Content of a URL you already hold | `ketch scrape <url> --max-chars 6000 --trim` |
| Search + read top hits in one step | `ketch search "query" --scrape --max-chars 6000` |
| How real OSS projects call an API | `ketch code "api call" --lang go --limit 3` |
| Curated library docs, version-aware | `ketch docs "topic" --library <org/repo>` |
| Explore many pages of one site | `ketch crawl <url>` |

First match wins. Don't re-find a URL you already have — scrape it. Never loop `scrape` where `crawl` fits.

## Reliability rules

- Plain `ketch search` uses the operator-configured backend. Run `ketch config` to see what's active.
- On failure (rate limit, network): retry once, rotating backend with `-b <name>`. Never retry the identical call three times.
- `--multi` fans out to several providers and rank-fuses results — better recall, but spends every provider's quota. Reserve for deep research.

## Token discipline

- Unseen pages: always cap with `--max-chars 4000–8000` and add `--trim`. An uncapped page can cost ~25k tokens.
- Lists: add `--minimal` (one result per line) and `--limit 5` (default).
- Scraping a bare domain may auto-return its `/llms.txt` instead of the homepage — check the `title` field; `--no-llms-txt` opts out.
- `ketch docs` is two-step: `--resolve "name"` → vet that the match's name is the library you meant (resolve never returns empty; garbage gets confident fuzzy matches) → fetch with `--library <org/repo>`.

## Failure taxonomy

| Exit code | Meaning | Do |
|---|---|---|
| 2 | bad input | fix the call; retrying unchanged never works |
| 3 | nothing found | change the query |
| 4 | provider/network failure | rotate backend, retry once |
| 5 | missing configuration | stop, tell the user |

## Deep research

For contested or multi-part questions: fan out 2–3 query variants, scrape the top ~3 primary sources (prefer original posts over aggregators), synthesize with per-claim citations, and state conflicts rather than averaging them. Full playbook: https://raw.githubusercontent.com/1broseidon/ketch/main/skills/ketch/references/verbs/ketch-research.md
