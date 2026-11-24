# Gastromatic design system baseline

Use this baseline when creating HTML mockups for gastromatic: inside a gastromatic repository or product, or when the user asks for a gastromatic view, feature, or design. Follow the general rules in [../SKILL.md](../SKILL.md) alongside the gastromatic-specific references and craft mappings below.

## References

- **Tokens and core mechanics:** Copy the `:root`, `body`, and `.outlined` blocks from [design-tokens.md](design-tokens.md) instead of inventing ad-hoc colors, radii, or shadows. Add `:root` variables for extra values that repeat across the mockup.
- **Component CSS and visual specs:** Use [component-recipes.md](component-recipes.md) to recreate `@gastromatic/components` with plain HTML, CSS, and JavaScript.
- **Reference screenshots:** Open and inspect these before building components. They are component catalogs: copy how the components look, not the page layout, which is packed tighter than a product screen (for example `12px` card padding instead of `16px`, and cards holding sample cards).
  - [assets/components-basics.png](assets/components-basics.png): basic components and variants (typography, cards, buttons, badges, chips, avatars, form fields, selection controls, alerts, progress).
  - [assets/components-patterns.png](assets/components-patterns.png): larger and combined components (table with toolbar and filters, list table, list cards, modal, drawer with chat, menu, accordion, calendar, charts, toast).
  - [assets/components-filter-panel.png](assets/components-filter-panel.png): close-up of the open `FilterBar` panel, with search, breadcrumb, mixed select-all, and confirmation (`TreeSelect` uses similar grouped options).
- **MCP server (when available):** Use the local tokens, recipes, and screenshots for ready-to-use plain HTML/CSS. If a `gastromatic-design-system` MCP server is available in your environment, use it for components, props, tokens, or guidelines not covered locally, or to check for newer design-system changes. If the local files and the MCP server conflict, follow the MCP server.
- **Maintenance only:** `reference-app/` is a Vite + React app used solely to refresh the screenshots and docs (see [reference-app/README.md](reference-app/README.md)). Do not read or run it while creating a mockup.

## Gastromatic craft mappings

Apply these token and component mappings to the `Design craft` rules in [../SKILL.md](../SKILL.md):

- **Buttons:** primary = `.btn-primary`, neutral extra actions = `.btn`, quieter secondary = `.btn-secondary`.
- **Surfaces:** divider = `--neutral-200`, tint inside a white card or page = `--layer-2`, card = `.card`. On the `--neutral-50` canvas, `--layer-2` is the same color and does not show, so go from a divider straight to `.card-layer-1`.
- **Density:** `36px` controls, `36px` table headers with `40px` rows (as in the table recipe), and `24–28px` controls in compact toolbars.
- **Color and contrast:** brand accents = `--primary-*`, `--secondary-*`; purple/AI styling (`--purple-*`, `.btn-ai`) is strictly for real AI features. Body copy = `--text-black`; muted text you add = `--neutral-800` (`--neutral-700` reaches only 4.3:1 on white, and `--neutral-500` and `--neutral-600` are too light for readable text).
- **Badges and semantic surfaces:** live status = soft `.outlined` badges, static metadata = plain `--neutral-800` text, urgent counts or alerts = `.badge-solid-*`, semantic cards and alerts = `.card-primary`, warning, danger, and AI variants.
- **Depth, borders, and gradients:** overlay shadows = `--shadow-raised`, `--shadow-tooltip`, `--shadow-modal`. Borders come from `.outlined`; do not swap in solid grey or thicker borders. Use gradients only where a recipe calls for them (including area-chart fills). The `ListTable` status pill is for row status only; pair it with a readable status cue.
- **Icons:** filled single-color glyph on a 24px grid, shown at `16px` or `20px`, not a thin stroke icon.
- **Form fields and errors:** visible label = `.field-label`, optional marker = `.field-label.optional`, inline error = `.input-error` with `.field-help.error`.

## Verification

In addition to the checks in [../SKILL.md](../SKILL.md):

- [ ] Compared the rendered mockup side by side with [assets/components-basics.png](assets/components-basics.png) and [assets/components-patterns.png](assets/components-patterns.png) for the components used. For an open `FilterBar`, also check [assets/components-filter-panel.png](assets/components-filter-panel.png). Confirmed that colors, radii, borders, shadows, and spacing match (typeface and weight differences are expected when the system font falls back from Roboto).
