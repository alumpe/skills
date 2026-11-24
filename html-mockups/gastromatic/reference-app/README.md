# Reference app

A small Vite + React app that renders real components from the published
`@gastromatic/components`, `@gastromatic/icons`, and `@gastromatic/themes` packages. It has two
pages, and a screenshot of each is the skill's visual reference:

| Page | URL | Source | Screenshot |
| --- | --- | --- | --- |
| Basic components and their variants | `/#/basics` | [src/showcase/BasicsPage.jsx](src/showcase/BasicsPage.jsx) | [../assets/components-basics.png](../assets/components-basics.png) |
| Larger and combined components | `/#/patterns` | [src/showcase/PatternsPage.jsx](src/showcase/PatternsPage.jsx) | [../assets/components-patterns.png](../assets/components-patterns.png) |

A third image, [../assets/components-filter-panel.png](../assets/components-filter-panel.png),
is a close-up of the open `FilterBar` panel on the patterns page. `TreeSelect` uses similar
grouped options, but shows a back button and, by default, no confirm button.

[src/showcase/layout.jsx](src/showcase/layout.jsx) holds the page frame shared by both pages, and
[src/showcase/data.js](src/showcase/data.js) the sample records of the patterns page.

## Running

The `@gastromatic` packages come from the GitHub npm registry. [.npmrc](.npmrc) points the scope
there; the auth token must be in `~/.npmrc`.

```sh
bun install
bun run dev
```

## Page rules

- Each page fits a single 1440×900 viewport without scrolling in its initial state, so one
  screenshot shows all of it at a size where small text stays readable. The page keeps its
  1440px minimum width. Narrower windows scroll horizontally; shorter windows or taller
  sections (for example after clearing the table filter) can scroll vertically.
- Section titles name the components shown. Samples name their own variant where possible
  (a button labelled `Primär`, a card labelled `Layer 2`), so the screenshot needs few captions.
- Components that normally open over the page are shown in place: `Modal` with
  `withBackdrop={false}`, `Drawer` with `inline`, `Menu` without a popover, `TooltipSurface`
  instead of a hover tooltip. The patterns page opens one toast that stays in the page header.
- Not shown, because they only appear on interaction or did not fit: `ConfirmModal`, `Popover`,
  `Collapsible` (looks like one `Accordion` item), `SelectMulti`, `SignatureInput`,
  `ProgressiveFade`, `ChatActivityIndicator`, the line, radar, and radial charts, and the
  open dropdowns of `Select` and `DatePicker`. `Stack` and `Grid` are layout helpers without
  a look of their own.
- The bar chart labels its values directly. The area and donut charts show legends, so their
  series can be identified without hovering. The first column leaves room for all three
  charts and their labels side by side.

## Refreshing the reference

Do this by hand, now and then, or when the foundation adds or changes components:

1. Update the `@gastromatic/*` packages to their latest versions.
2. Compare the installed component and chart exports (`node_modules/@gastromatic/components/dist/index.d.ts`
   and `dist/chart.d.ts` in the same package) with what the two pages use. Add new components and adjust changed ones, following the page rules above.
3. Screenshot both pages with the agent-browser skill at a 1440×900 viewport, in the light
   theme, and save them over `../assets/components-basics.png` and
   `../assets/components-patterns.png`. Reload each page and wait about three seconds first,
   so fonts are loaded and the toast on the patterns page is open.
4. Retake the filter panel close-up on the patterns page: set the viewport to 336×356, close
   the toast, scroll to x 231, y 92 (`window.scrollTo(231, 92)`), click the `+` button of the
   filter bar, click `Bereich`, and save the screenshot over
   `../assets/components-filter-panel.png`. Adjust the scroll position if the toolbar moved.
5. Check [../design-tokens.md](../design-tokens.md) against the light-theme `body` block in
   `node_modules/@gastromatic/themes/dist/themes.css`. The file is a curated subset of those
   variables: update changed values, and add new variables only if mockups need them. The
   variables under the "Mockup helpers" comment (`--border-radius-pill`, `--shadow-*`,
   `--font-family`) come from component styles rather than the theme.
6. Check [../component-recipes.md](../component-recipes.md) against the installed component
   styles and rendered states. Use `~/Work/gastromatic-foundation/packages/components/src`
   only if it matches the installed release. Distinguish library defaults from showcase
   overrides, and add any newly referenced theme variables to the copyable token block.
