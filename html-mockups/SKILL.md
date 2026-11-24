---
name: html-mockups
description: Creates self-contained HTML mockups for features and UI elements. Use when asked to mock up an interface, prototype a UI, or explore visual design alternatives in HTML.
---

# HTML mockups

## Format and scope

- Create a single self-contained `.html` file per mockup: the whole design, all variants, all CSS, all JavaScript, and all assets (for example, SVG icons) live in that one file, so it can be sent to others and opened anywhere. Do not require a build step, framework, CDN, or external resource, and do not split a mockup into multiple pages or an index page linking to subpages.
- Save the file to the path the user specifies. If no path is given, save it in a temporary or scratch location outside tracked repository files.
- Use realistic sample content (names, dates, amounts) with no placeholder text like Lorem ipsum, and include enough interaction to demonstrate the intended behavior. Keep the scope to a mockup, not a production implementation.
- Use semantic HTML: `<button>` for clickable actions, `<label>` for inputs, alt text for images. Keep keyboard focus working and keep text/background contrast readable.
- Design for desktop screens only (roughly 1280×800 and up). Do not add tablet or mobile layouts unless the task explicitly asks for them.

## Design exploration

- When the task leaves room for exploration, try a few meaningfully different designs. Vary layout, composition, hierarchy, density, or styling, not just colors. For example, compare a compact table with grouped cards. Do not force alternatives when the user asks for a specific design or a small adjustment.
- Make alternatives easy to compare: clearly label each variant and use the same representative content across them.

## Design baseline

- Use the tokens in [design-tokens.md](design-tokens.md) and component styles in [component-recipes.md](component-recipes.md) as the default styling baseline for product mockups, unless the task asks for a specific different look.
- Open and inspect the reference screenshot in [assets/components-overview.png](assets/components-overview.png) when using the default baseline: it shows how buttons, inputs, badges, chips, tables, cards, and other components look when styled with these tokens.
- Write modular, maintainable CSS: use the variables from [design-tokens.md](design-tokens.md) instead of ad-hoc colors, radii, or shadows, add `:root` variables for extra values that repeat across the mockup, and structure rules around reusable component classes rather than one-off selectors.
- Recreate the appearance and behavior of any component with plain HTML, CSS, and JavaScript.

## Mock data and state

Follow [mock-data.md](mock-data.md) in two steps, depending on what the mockup needs:

- **The same records appear in more than one section or variant** (employees, shifts, orders): keep all sample data once in a JavaScript object and draw every place from it; the HTML markup holds no data of its own. This applies to static mockups too, and guarantees that all design variants show the same content.
- **An interaction creates, changes, or deletes data**: additionally change the data only through action functions that then redraw. Never patch the page directly from an event handler (appending a row, bumping a counter), because every other place showing that data is then left out of date. The mockup then behaves as if a real backend were attached: creating an employee makes them appear in the list, the counters, and every other variant.

A small static exploration without repeated records, such as comparing three button styles, stays plain HTML.

## Verification and handoff

Load the [agent-browser skill](../agent-browser/SKILL.md) and confirm these checks before handing off:

- [ ] Opened the mockup at a desktop viewport (for example, 1440×900 or 1280×800) and iterated with screenshots until layout and interactions look right, rather than handing over the first render.
- [ ] If using the default design baseline, compared the rendered mockup side by side with [assets/components-overview.png](assets/components-overview.png) to confirm colors, radii, borders, shadows, and spacing match (typeface and weight differences are expected when the system font falls back from Roboto).
- [ ] If the mockup has data-changing interactions, performed every data-changing action in the browser and verified that every other place showing that data (lists, counters, detail panels, other variants) updated.
- [ ] Checked that demonstrated interactions and visible keyboard focus states work as expected.
- [ ] Included the file path in the handoff, noted if it is in a temporary location, and stated any limitations (such as anything that could not be verified in a browser).
