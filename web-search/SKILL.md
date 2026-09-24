---
name: web-search
description: Search current web sources, scrape pages, find public open source code examples, and retrieve version-aware library docs. Use for current facts, web research, known URLs, or real-world code usage.
---

# Web Search

Use the installed `ketch` CLI. If it is unavailable, tell the user and stop; do not substitute curl-based scraping. Use it for public sources, not local code, private repositories, authenticated pages, or paywalls.

## Rules

- Search instead of guessing when facts may be newer than your training data.
- Cite a source URL for every externally verifiable claim.
- Trust `ketch <subcommand> --help` for flags and `ketch config` for configured backends. Read the help after an argument error.
- Bound unknown pages with `--max-chars 4000` to `8000` and `--trim`.
- Use `--minimal` for compact result lists and `--json` when inspecting metadata, batch results, or errors.

## Choose the command

| Need | Command |
|---|---|
| Current pages, news, opinions, comparisons | `ketch search "query" --limit 5 --minimal` |
| Content of a known URL | `ketch scrape <url> --max-chars 6000 --trim` |
| Real usage in public open source code | `ketch code "literal API call" --lang go --limit 3 --minimal` |
| Version-aware library documentation | Resolve the library, then use `ketch docs "topic" --library <org/repo> --tokens 4000` |
| Many pages from one site | `ketch crawl <url> --depth 2 --allow /relevant/path/` |

Scrape known URLs directly and batch several in one call. Use `crawl` only to follow links across one site. Omit `--backend` for the configured default. For federated search, use `--multi=brave,exa` only when the extra provider cost is justified; it cannot be combined with `--backend`.

## Important workflows

### Repository code search

For a broad search, use the default `grepapp` backend. To search one repository, select Sourcegraph and put its `repo:` qualifier inside the query:

`ketch code 'mountPath repo:^github\.com/squat/generic-device-plugin$' -b sourcegraph --limit 10`

The `repo:` filter is query syntax, not a CLI flag. `--regex` works with `grepapp` and `sourcegraph`, not `github`. Shell-quote apostrophes safely: `ketch code "Can't connect to USB device"`.

### Library documentation

1. Resolve the name: `ketch docs --resolve "library name" --limit 5`.
2. Verify that the returned name and ID match the intended library. Resolve returns fuzzy matches even for bad input; a high trust score does not prove the match is correct.
3. Fetch by ID: `ketch docs "short topic" --library <org/repo> --tokens 4000`.

### Fetching content

- Use `ketch search "query" --scrape --max-chars 6000 --trim` only when every returned page is worth reading. Otherwise search first, select the best URLs, then batch-scrape them.
- A batch scrape can succeed while individual URLs contain errors. With `--json`, inspect every result.
- A bare domain may return `/llms.txt` instead of the homepage. Check the title and use `--no-llms-txt` when the homepage itself is required.
- CLI crawl has no page-count limit, so always bound it with `--depth` and, when possible, `--allow` or `--deny`.

## Failure handling

- Invalid call: fix it using the subcommand's `--help`; never repeat it unchanged.
- No result: change the query or selector.
- Provider or network failure: if you selected a backend, rotate to another listed by `ketch config` and retry once. If `auto` failed, retry once, then report the outage.
- Missing configuration: inspect with `ketch doctor --json` when available. Leave healthy settings alone, and ask before any change or installation.
- Cancelled or timed out: retry with a smaller scope.

## Research depth

For contested or multi-part questions, plan 1 to 3 distinct queries, scrape at most 3 to 5 primary sources, and make at most 8 research calls unless the user asks for more. Deduplicate hosts and stop early when two independent sources agree. Corroborate important API claims with `docs` and real-world usage claims with `code`; cite each claim, state conflicts, and identify failed or unverified sources.

For research spanning several sessions, save sources actually used with `--tag <project-name>` and check `ketch tag show <project-name>` before searching again.
