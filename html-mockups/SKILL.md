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

## Styling and design systems

- **Gastromatic work:** When working inside a gastromatic repository or product, or when the user asks for a gastromatic mockup, design, or view, read [gastromatic/README.md](gastromatic/README.md) first and follow its tokens, component recipes, reference screenshots, craft mappings, and verification steps.
- **Another existing product or repository:** Match the project's existing design system, CSS tokens, or visual language by inspecting local styles or following references the user provides.
- **Standalone mockups:** When no existing design system applies, define a cohesive `:root` token set in the file (a neutral scale, one primary accent, semantic status colors, radii, spacing steps, and a clean system font stack or fitting typography) tailored to the task rather than leaving controls unstyled or scattering ad-hoc values.
- **Modular CSS and plain web tech:** Write maintainable CSS using `:root` custom properties and reusable component classes rather than one-off selectors. Recreate component appearance and behavior with plain HTML, CSS, and JavaScript.

## Design craft

Default guidelines for quiet, scannable, intentional application UI (adapt when the task calls for a marketing page, brand showcase, or a specific requested aesthetic):

- **One focal point and one primary button per view:** Promote the main task and visibly demote supporting elements (avoid rows of equal-weight stat cards). Keep one filled primary action per view (a modal counts as its own view) and place extra actions in neutral buttons, a single quieter secondary button, or an overflow menu.
- **Climb the surface ladder before using cards:** Separate groups with whitespace first, then a hairline divider, then a subtle tinted surface, and use bordered cards only for distinct or independently interactive blocks. Never nest cards inside cards.
- **Prefer tables over card grids for record lists:** Keep desktop work views dense (`32–36px` controls, `~36px` table headers with `~40px` rows, `24–28px` controls in compact toolbars) rather than uniformly airy. Reach for modals only after inline editing and disclosure do not fit.
- **Space unevenly and align edges in the container:** Keep related items tight (`4–8px`), sibling groups medium (`12–16px`), and sections wide (`24px` or more), with more space above headings than below. Align icon columns, labels, and trailing actions through grid/flex containers, never one-off margins.
- **Keep screens 90–95% neutral:** Reserve brand accents for primary actions, selection, active states, and one highlighted data series. Keep body and muted text readable (at least 4.5:1 contrast for body and supporting copy). Never place grey text on colored fills.
- **Use badges only for real, changing state:** Use soft badges for live status, plain muted text for static metadata, and solid high-contrast badges only for urgent counts or alerts. Apply semantic tinting to cards and alerts only when the content carries that state, and always pair semantic color with text or an icon.
- **Keep depth flat and borders quiet:** Reserve drop shadows for floating overlays (menus, popovers, tooltips, modals), not cards or tables. Keep borders thin and subtle. Skip decorative gradients, glows, blobs, and colored edge stripes unless a specific style calls for them.
- **Use sentence case and scannable data:** Write headings, labels, table headers, buttons, and badges in sentence case, with no uppercase tracked eyebrows and no single accented word in a heading. Stick to a disciplined font-weight scale (`400` body, `500` labels and buttons, `600` group titles, `700` headlines only) rather than bolding everything. Apply `font-variant-numeric: tabular-nums` to numbers, dates, and table columns, keep one format per screen, and state the reference on deltas (`+12% vs last month`).
- **Handle overflow deliberately:** Decide wrap, clamp, or truncate per field; never truncate numbers, amounts, or dates. Put `min-width: 0` on shrinking flex children.
- **Cut reflexive decoration and narration:** Skip icons in tinted rounded squares, decorative icons beside every label, emoji as icons, fake `01 / 02 / 03` numbering, arrows glued to buttons or links, pulsing dots, fake sparklines, subtitles under every heading, helper text narrating obvious controls, and exclamation marks. Keep headings short (5 words or fewer) and reuse one verb through a flow (`Publish` → `Published`). Where an icon carries meaning, use one consistent icon style and size scale across the mockup.
- **Keep states and feedback restrained:** Give every input a visible label, mark optional fields instead of starring required ones, use `placeholder` only for format examples, validate on blur or submit, and show inline errors explaining how to recover. If a loading state is shown, use skeleton blocks in the shape of the content instead of a centered spinner. Stay silent when a result is already visible (reserve toasts for failures or off-screen effects; prefer undo over confirmation when reversible). Give empty states a clear cause and one recovery action, distinguishing first-run from filtered-to-nothing.
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
- [ ] If using the gastromatic design system, completed the visual comparison check in [gastromatic/README.md](gastromatic/README.md).
- [ ] If the mockup has data-changing interactions, performed every data-changing action in the browser and verified that every other place showing that data (lists, counters, detail panels, other variants) updated.
- [ ] Checked that demonstrated interactions and visible keyboard focus states work as expected.
- [ ] Included the file path in the handoff, noted if it is in a temporary location, and stated any limitations (such as anything that could not be verified in a browser).
