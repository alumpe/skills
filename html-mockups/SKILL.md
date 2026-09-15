---
name: html-mockups
description: Creates self-contained HTML mockups for features and UI elements. Use when asked to mock up an interface, prototype a UI, or explore visual design alternatives in HTML.
---

# HTML mockups

## Format and scope

- Create self-contained `.html` files that open directly in a browser. Inline CSS, any JavaScript, and assets (for example, SVG icons). Do not require a build step, framework, CDN, or external resource.
- Use realistic sample content and enough interaction to demonstrate the intended behavior. Keep the scope to a mockup, not a production implementation.
- Use semantic HTML: `<button>` for clickable actions, `<label>` for inputs, alt text for images. Keep keyboard focus working and keep text/background contrast readable.
- Design for desktop screens only (roughly 1280×800 and up). Do not add tablet or mobile layouts unless the task explicitly asks for them.

## Design exploration

- When the task leaves room for exploration, try a few meaningfully different designs. Vary layout, composition, hierarchy, density, or styling, not just colors. For example, compare a compact table with grouped cards. Do not force alternatives when the user asks for a specific design or a small adjustment.
- Make alternatives easy to compare, with clear labels and the same representative content. Use one file with multiple variants or a separate self-contained file per variant, whichever suits the mockup.

## Design baseline

- Use the design system in [design-tokens.md](design-tokens.md) (colors, radii, shadows, gradient borders) as the default styling baseline for product mockups, unless the task asks for a specific different look.
- Look at the reference screenshot in [assets/components-overview.png](assets/components-overview.png) for visual inspiration: it shows how buttons, inputs, badges, chips, tables, cards, and other components look when styled with these tokens.
- Write modular, maintainable CSS: define all shared values (colors, radii, shadows, spacing, font sizes) as CSS variables on `:root` and reference the variables everywhere instead of repeating literal values. Structure rules around reusable classes or component-scoped blocks rather than one-off selectors, so a change to a single variable or rule propagates consistently through the whole mockup.
- Recreate the appearance and behavior of any component with plain HTML, CSS, and minimal JavaScript. Do not use component libraries or other external dependencies.

## Verification and handoff

- Load the [agent-browser skill](../agent-browser/SKILL.md) and use it to open the files and check layout and any interactions before handing them over.
- If you cannot check them, state that limitation. Include the file paths in the handoff.
