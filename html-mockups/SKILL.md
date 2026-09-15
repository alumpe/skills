---
name: html-mockups
description: Creates self-contained HTML mockups for features and UI elements. Use when asked to mock up an interface, prototype a UI, or explore visual design alternatives in HTML.
---

# HTML mockups

## Format and scope

- Create self-contained `.html` files that open directly in a browser. Inline CSS, any JavaScript, and assets (for example, SVG icons). Do not require a build step, framework, CDN, or external resource.
- Use realistic sample content and enough interaction to demonstrate the intended behavior. Keep the scope to a mockup, not a production implementation.

## Design exploration

- When the task leaves room for exploration, try a few meaningfully different designs. Vary layout, composition, hierarchy, density, or styling, not just colors. For example, compare a compact table with grouped cards. Do not force alternatives when the user asks for a specific design or a small adjustment.
- Make alternatives easy to compare, with clear labels and the same representative content. Use one file with multiple variants or a separate self-contained file per variant, whichever suits the mockup.

## Gastromatic design system

- For gastromatic UI, consult the `gastromatic-design-system` MCP server for available component guidance and visual conventions. Treat it as a reference: its React components cannot be used directly in these HTML mockups. Recreate the relevant appearance and behavior with plain HTML, CSS, and minimal JavaScript. If the server is unavailable, say so rather than claiming design-system fidelity.

## Verification and handoff

- Load the [agent-browser skill](../agent-browser/SKILL.md) and use it to open the files and check layout and any interactions before handing them over.
- If you cannot check them, state that limitation. Include the file paths in the handoff.
