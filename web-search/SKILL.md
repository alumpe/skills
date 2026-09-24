---
name: web-search
description: Search the web, read pages, find public open source code examples, and look up library documentation. Use whenever a question needs live or current sources, such as news, releases, versions, docs, opinions, prices, public code usage, or the contents of a URL.
---

# Web Search

Use the installed `ketch` CLI for live research. If `which ketch` fails, tell the user and stop. Do not replace it with curl-based scraping. Ketch is for public sources, not local code, private repositories, authenticated pages, or paywalls.

## Core rules

- Search instead of guessing when facts may be newer than your training data.
- Cite a source URL for every externally verifiable claim.
- Treat `ketch <subcommand> --help` and `ketch config` as the source of truth. If they disagree with this skill, follow the binary and report the drift.
- Bound every fetch. An unknown page should use `--max-chars 4000` to `8000` plus `--trim`.
- Prefer `--json` when parsing metadata, batch results, or errors. Use `--minimal` for compact result triage.
- On invalid arguments, read that subcommand's help before retrying. Never repeat an unchanged invalid call.

## Choose the command

| Need | Command |
|---|---|
| Current pages, news, opinions, comparisons | `ketch search "query" --limit 5 --minimal` |
| Content of a known URL | `ketch scrape <url> --max-chars 6000 --trim` |
| Search and read every returned page | `ketch search "query" --scrape --max-chars 6000 --trim` |
| Real usage in public open source code | `ketch code "literal API call" --lang go --limit 3 --minimal` |
| Version-aware library documentation | Resolve, vet, then run `ketch docs "topic" --library <org/repo> --tokens 4000` |
| Many pages from one site | `ketch crawl <url> --depth 2 --allow /relevant/path/` |
| Sources saved during earlier research | `ketch tag show <name> --limit 20 --minimal` |

First match wins. Do not search for a URL you already have. Batch several known URLs in one `scrape` call rather than looping. Use `crawl` only when following links across one site is necessary.

## Search

- Omit `--backend` to use the operator's configured backend. Read `ketch config` to discover usable backends; do not inspect environment variables for keys.
- If an explicitly selected backend returns exit 4, rotate to another usable backend and retry once. If `auto` returns exit 4, it already tried its fallback chain; retry once, then report the outage.
- `--multi` queries and rank-fuses several providers. It spends each provider's quota and is mutually exclusive with `--backend`; reserve it for research where recall matters. Use the equals form for a list: `--multi=brave,exa`.
- Treat `search --scrape` like a batch scrape: set `--max-chars` and `--trim`, then inspect each result for its own fetch error.

## Code search

- For a broad search across public repositories, use the default `grepapp` backend: `ketch code "mountPath" --limit 10`.
- To search within one repository, select Sourcegraph and put a `repo:` qualifier inside the query:
  `ketch code 'mountPath repo:^github\.com/squat/generic-device-plugin$' -b sourcegraph --limit 10`
- Repository selection is part of the backend's query syntax, while CLI options select behavior such as `--backend`, `--lang`, and `--limit`.
- `--regex` works with `grepapp` and `sourcegraph`, not `github`.
- Quote for the shell, not for imagined exact-match syntax. A query containing an apostrophe can use double quotes: `ketch code "Can't connect to USB device"`.

## Documentation

1. Resolve the library: `ketch docs --resolve "library name" --limit 5`.
2. Verify that the returned name and ID match the intended library. Resolve always returns fuzzy matches, even for bad input; a high trust score does not prove the match is correct.
3. Fetch by vetted ID: `ketch docs "short topic" --library <org/repo> --tokens 4000`.

## Scrape and crawl

- A bare domain may return `/llms.txt` instead of the homepage. Check the output title; use `--no-llms-txt` when the homepage itself is required.
- A batch scrape can exit successfully while individual URLs contain errors. With `--json`, inspect every result rather than trusting the process exit alone.
- JavaScript shell pages automatically fall back to the configured browser. `--force-browser` requires browser setup.
- CLI crawl has no page-count limit. Always bound it with `--depth` and, when possible, `--allow` or `--deny`. A crawl interrupted with Ctrl-C can exit 0 with partial results.

## Tags

For research spanning several sources or sessions, pass `--tag <project-name>` to the results actually used. Tags work with search, code, docs, scrape, and crawl. Read `ketch tag show <name>` before searching again. Tag metadata survives page-cache expiry; scrape a tagged URL when its full content is needed again.

## Error control flow

| Exit | Meaning | Action |
|---|---|---|
| 1 | CLI parsing error, including unknown flags | Read stderr and `--help`; fix the call |
| 2 | Invalid input accepted by the parser | Fix the call; consult `--help` |
| 3 | Nothing found | Change the query or selector |
| 4 | Provider or network failure | Rotate an explicit backend or retry once |
| 5 | Missing configuration | Stop and ask before changing config or installing anything |
| 6 | Cancelled or timed out | Retry with a smaller scope |

## Deep research

For contested or multi-part questions, state a brief plan: 1 to 3 distinct query angles, at most 3 to 5 pages to scrape, a 4000 to 8000 character cap per page, and at most 8 research calls unless the user asks for more. Prefer primary sources, deduplicate hosts, and stop early when independent sources agree. Use `docs` for important API claims and `code` for claims about real-world usage. State source conflicts instead of averaging them, and identify failed or unverified sources in the answer.
