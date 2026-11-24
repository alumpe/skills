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

## Design craft

Keep product UI mockups quiet, scannable, and intentional:

- **One focal point and one primary button per view:** Promote the main task and visibly demote supporting elements (avoid rows of equal-weight stat cards). Keep one filled primary button (`.btn-primary`) per view (a modal counts as its own view) and place extra actions in the neutral default `.btn`, `.btn-secondary` for one clear second choice, or an overflow menu.
- **Climb the surface ladder before using cards:** Separate groups with whitespace first, then a hairline divider (`--neutral-200`), then a tinted area, and use `.card` only for distinct or independently interactive blocks. The tint is `--layer-2` inside a white card or page; on the `--neutral-50` canvas `--layer-2` is the same color and does not show, so go from divider straight to `.card-layer-1` there. Never nest cards inside cards.
- **Prefer tables over card grids for record lists:** Keep desktop work surfaces dense (`36px` controls, `36px` table headers with `40px` rows as in the table recipe, `24–28px` controls in compact toolbars) rather than uniformly airy. Reach for modals only after inline editing and disclosure do not fit.
- **Space unevenly and align edges in the container:** Keep related items tight (`4–8px`), sibling groups medium (`12–16px`), and sections wide (`24px` or more), with more space above headings than below. Align icon columns, labels, and trailing actions through grid/flex containers, never one-off margins.
- **Keep screens 90–95% neutral:** Reserve brand accents (`--primary-*`, `--secondary-*`) for primary actions, selection, active states, and one chart series, and reserve purple/AI styling (`--purple-*`, `.btn-ai`) strictly for real AI features. Keep body copy in ink (`--text-black`) and muted text you add in `--neutral-800`: `--neutral-700` reaches only 4.3:1 on white, and `--neutral-500` and `--neutral-600` are too light for text people need to read. Never place grey text on colored fills.
- **Use badges only for real, changing state:** Use soft `.outlined` badges for live status, plain muted text (`--neutral-800`) for static metadata, and solid badges (`.badge-solid-*`) only for urgent counts or alerts. The same goes for semantic cards and alerts (`.card-primary`, warning, danger, AI): use them only when the content has that state. Always pair semantic color with text or an icon.
- **Keep depth flat and borders quiet:** Shadows (`--shadow-raised`, `--shadow-tooltip`, `--shadow-modal`) belong only on floating overlays, never on cards or tables. Borders come from `.outlined`; do not swap in solid grey or thicker borders. The only gradients are the ones in the recipes (`.outlined` borders, the semantic card and alert wash, `.btn-ai`): do not add decorative gradients, glows, blurred blobs, or colored left-edge accent stripes on cards or rows.
- **Use sentence case and scannable data:** Write headings, labels, table headers, buttons, and badges in sentence case, with no uppercase tracked eyebrows and no single accented word in a heading. Keep the system's weights: `400` body, `500` labels and buttons, `600` group titles, `700` headlines only. Apply `font-variant-numeric: tabular-nums` to numbers, dates, and table columns, keep one format per screen, and state the reference on deltas (`+12% vs last month`).
- **Handle overflow deliberately:** Decide wrap, clamp, or truncate per field; never truncate numbers, amounts, or dates. Put `min-width: 0` on shrinking flex children.
- **Cut reflexive decoration and narration:** Skip icons in tinted rounded squares, decorative icons beside every label, emoji as icons, fake `01 / 02 / 03` numbering, arrows glued to buttons or links, pulsing dots, fake sparklines, subtitles under every heading, helper text narrating obvious controls, and exclamation marks. Keep headings short (5 words or fewer) and reuse one verb through a flow (`Publish` → `Published`). Where an icon carries meaning, draw it in the library's style: a filled single-color glyph on a 24px grid, shown at `16px` or `20px`, not a thin stroke icon.
- **Keep states and feedback restrained:** Give every input a visible `.field-label`, mark optional fields with `.field-label.optional` instead of starring required ones, use `placeholder` only for format examples, validate on blur or submit, and show inline errors (`.input-error` with `.field-help.error`) explaining how to recover. If a loading state is shown, use skeleton blocks in the shape of the content instead of a centered spinner. Stay silent when a result is already visible (reserve toasts for failures or off-screen effects; prefer undo over confirmation when reversible). Give empty states a clear cause and one recovery action, distinguishing first-run from filtered-to-nothing.
- **Default to static motion:** Hover is a single color or surface transition (`≤150ms`) on interactive elements only, with no card lift or stacked shadows. Skip page-load sequences, count-up numbers, bounce, and animations on tables, charts, or frequent keyboard actions. If a dialog or menu animates in, keep it to `150–200ms` ease-out on explicit properties (never `transition: all`).

## Mock data and state

Follow [mock-data.md](mock-data.md) in two steps, depending on what the mockup needs:

- **The same records appear in more than one section or variant** (employees, shifts, orders): keep all sample data once in a JavaScript object and draw every place from it; the HTML markup holds no data of its own. This applies to static mockups too, and guarantees that all design variants show the same content.
- **An interaction creates, changes, or deletes data**: additionally change the data only through action functions that then redraw. Never patch the page directly from an event handler (appending a row, bumping a counter), because every other place showing that data is then left out of date. The mockup then behaves as if a real backend were attached: creating an employee makes them appear in the list, the counters, and every other variant.

A small static exploration without repeated records, such as comparing three button styles, stays plain HTML.

## Verification and handoff

Load the [agent-browser skill](../agent-browser/SKILL.md) and confirm these checks before handing off:

- [ ] Opened the mockup at a desktop viewport (for example, 1440×900 or 1280×800) and iterated with screenshots until layout, hierarchy, and interactions look right, rather than handing over the first render.
- [ ] Checked the rendered screenshots against `Design craft`: one focal point and one primary button per view, no nested cards, neutral-dominant color, and no decorative badges, icons, or narration without meaning.
- [ ] If using the default design baseline, compared the rendered mockup side by side with [assets/components-overview.png](assets/components-overview.png) to confirm colors, radii, borders, shadows, and spacing match (typeface and weight differences are expected when the system font falls back from Roboto).
- [ ] If the mockup has data-changing interactions, performed every data-changing action in the browser and verified that every other place showing that data (lists, counters, detail panels, other variants) updated.
- [ ] Checked that demonstrated interactions and visible keyboard focus states work as expected.
- [ ] Included the file path in the handoff, noted if it is in a temporary location, and stated any limitations (such as anything that could not be verified in a browser).
