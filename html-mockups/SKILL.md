---
name: html-mockups
description: Creates self-contained HTML mockups for features and UI elements. Use when asked to mock up an interface, prototype a UI, or explore visual design alternatives in HTML.
---

# HTML mockups

## Format and scope

- Create a single self-contained `.html` file per mockup: the whole design, all variants, all CSS, all JavaScript, and all assets (for example, SVG icons) live in that one file, so it can be sent to others and opened anywhere. Do not require a build step, framework, CDN, or external resource, and do not split a mockup into multiple pages or an index page linking to subpages.
- Use realistic sample content and enough interaction to demonstrate the intended behavior. Keep the scope to a mockup, not a production implementation.
- Use semantic HTML: `<button>` for clickable actions, `<label>` for inputs, alt text for images. Keep keyboard focus working and keep text/background contrast readable.
- Design for desktop screens only (roughly 1280×800 and up). Do not add tablet or mobile layouts unless the task explicitly asks for them.

## Design exploration

- When the task leaves room for exploration, try a few meaningfully different designs. Vary layout, composition, hierarchy, density, or styling, not just colors. For example, compare a compact table with grouped cards. Do not force alternatives when the user asks for a specific design or a small adjustment.
- Make alternatives easy to compare: put all variants in the mockup's single file, with clear labels and the same representative content.

## Design baseline

- Use the design system in [design-tokens.md](design-tokens.md) (colors, radii, shadows, gradient borders) as the default styling baseline for product mockups, unless the task asks for a specific different look.
- Look at the reference screenshot in [assets/components-overview.png](assets/components-overview.png) for visual inspiration: it shows how buttons, inputs, badges, chips, tables, cards, and other components look when styled with these tokens.
- Write modular, maintainable CSS: define all shared values (colors, radii, shadows, spacing, font sizes) as CSS variables on `:root` and reference the variables everywhere instead of repeating literal values. Structure rules around reusable classes or component-scoped blocks rather than one-off selectors, so a change to a single variable or rule propagates consistently through the whole mockup.
- Recreate the appearance and behavior of any component with plain HTML, CSS, and minimal JavaScript. Do not use component libraries or other external dependencies.

## Verification and handoff

- Load the [agent-browser skill](../agent-browser/SKILL.md) and use it to open the files and check layout and any interactions before handing them over.
- If you cannot check them, state that limitation. Include the file paths in the handoff.

## Final checklist

Before handing off, confirm:

- [ ] Everything lives in one self-contained `.html` file: all variants, inline CSS, JavaScript, and assets — no build step, CDN, external resource, or linked subpages.
- [ ] The styling uses the design tokens from [design-tokens.md](design-tokens.md): colors, radii, shadows, and fonts come from the CSS variables defined there, not from ad-hoc values. Shared values are defined once on `:root` and reused — no repeated literal values scattered through the CSS.
- [ ] Sample content is realistic — names, dates, amounts — with no placeholder text like Lorem ipsum.
- [ ] The mockup was opened in a browser via the agent-browser skill and iterated on with screenshots until the layout and interactions look correct — not just written once and handed over.
- [ ] The result was compared side by side with the reference screenshot in [assets/components-overview.png](assets/components-overview.png): colors, radii, shadows, and overall component styling look similar to the reference design.
- [ ] All demonstrated interactions work, interactive elements are semantic HTML with visible focus states, and variants are labeled and use the same representative content.
- [ ] The handoff includes the file path and states any limitations, such as anything that could not be verified.
