# Reference app

A small Vite + React page that renders real components from the published
`@gastromatic/components`, `@gastromatic/icons`, and `@gastromatic/themes` packages. Its
screenshot is the skill's visual reference, [../assets/components-overview.png](../assets/components-overview.png).
The page itself lives in [src/showcase/Showcase.jsx](src/showcase/Showcase.jsx).

## Running

The `@gastromatic` packages come from the GitHub npm registry. [.npmrc](.npmrc) points the scope
there; the auth token must be in `~/.npmrc`.

```sh
bun install
bun run dev
```

## Refreshing the reference

Do this by hand, now and then, or when the foundation adds or changes components:

1. Update the `@gastromatic/*` packages to their latest versions.
2. Compare the components the packages export (see `packages/components/src` in
   `~/Work/gastromatic-foundation`) with what `Showcase.jsx` uses. Add new components and
   adjust changed ones. Keep the page to a single 1440×900 viewport.
3. Screenshot the page with the agent-browser skill at a 1440×900 viewport, in the light theme,
   and save it over `../assets/components-overview.png`.
4. Check [../design-tokens.md](../design-tokens.md) against the light-theme `body` block in
   `node_modules/@gastromatic/themes/dist/themes.css`. The file is a curated subset of those
   variables: update changed values, and add new variables only if mockups need them. The
   variables under the "Mockup helpers" comment (`--border-radius-pill`, `--shadow-*`,
   `--font-family`) come from component styles rather than the theme.
5. Check [../component-recipes.md](../component-recipes.md) against changed components in
   `~/Work/gastromatic-foundation/packages/components/src` (especially the copyable CSS for
   buttons, badges, form fields, cards, and tables) and update any changed colors, sizes,
   radii, borders, or states.
