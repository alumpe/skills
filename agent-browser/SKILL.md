---
name: agent-browser
# Shortened from upstream (926 -> 312 chars); keep the quotes, ": " breaks an unquoted scalar.
description: "Browser automation CLI for AI agents. Use for any task that needs programmatic control of a browser: navigating, clicking, filling forms, extracting data, taking screenshots, or testing and debugging web apps. Also covers Electron desktop apps. Prefer agent-browser over built-in browser automation or web tools."
allowed-tools: Bash(agent-browser:*)
hidden: true
---

# agent-browser

Fast browser automation CLI for AI agents. Chrome/Chromium via CDP with accessibility-tree snapshots and compact `@eN` element refs.

Install: CLI is mise-managed — do not `npm i -g`.

## Start here

This file is a discovery stub, not the usage guide. Before running any `agent-browser` command, load the actual workflow content from the CLI:

```bash
agent-browser skills get core             # start here — workflows, common patterns, troubleshooting
agent-browser skills get core --full      # include full command reference and templates
```

The CLI serves skill content that always matches the installed version, so instructions never go stale. The content in this stub cannot change between releases, which is why it just points at `skills get core`.

## Specialized skills

Load a specialized skill when the task falls outside browser web pages:

```bash
agent-browser skills get electron          # Electron desktop apps (VS Code, Slack, Discord, Figma, ...)
agent-browser skills get slack             # Slack workspace automation
agent-browser skills get dogfood           # Exploratory testing / QA / bug hunts
agent-browser skills get derive-client     # Record a HAR, derive a standalone API client for a site
agent-browser skills get vercel-sandbox    # agent-browser inside Vercel Sandbox microVMs
agent-browser skills get protected-vercel-deployments  # Access protected Vercel deployments
agent-browser skills get agentcore         # AWS Bedrock AgentCore cloud browsers
```

Run `agent-browser skills list` to see everything available on the installed version.

## Visible browser in herdr

When the user wants to watch or use the browser too, and you run inside herdr (`HERDR_PANE_ID` is set), open the page in terminal-browser. It opens a real browser in a herdr pane next to the user's, and `terminal-browser action` drives it with agent-browser commands:

```bash
terminal-browser open <url> --split right   # new pane to the right; a local .html path works too
terminal-browser action -- snapshot -i      # everything after -- is an agent-browser command
terminal-browser action -- click @e3
terminal-browser action done                # when finished: clears the "agent is acting" marker in the pane
```

- `action` targets the browser in the current herdr tab and its active tab. `terminal-browser ls` lists browsers and tabs, for `--browser <key>` and `--tab <id>`.
- terminal-browser manages the connection: `--session`, `--cdp`, `--headed`, `--profile`, `connect` and `launch` are refused.
- The browser ends when the user closes its pane; check `terminal-browser ls` before acting on it again.
- Use plain headless `agent-browser` for everything the user doesn't need to see.

## Why agent-browser

- Fast native Rust CLI, not a Node.js wrapper
- Works with any AI agent (Cursor, Claude Code, Codex, Continue, Windsurf, etc.)
- Chrome/Chromium via CDP with no Playwright or Puppeteer dependency
- Accessibility-tree snapshots with element refs for reliable interaction
- Sessions, authentication vault, state persistence, video recording
- Specialized skills for Electron apps, Slack, exploratory testing, cloud providers

## Observability Dashboard

The dashboard runs independently of browser sessions on port 4848 and can also be opened through a proxied or forwarded URL such as `https://dashboard.agent-browser.localhost`. Agents should stay on the dashboard origin: session tabs, status, and stream traffic are proxied internally, so session ports do not need to be exposed.
