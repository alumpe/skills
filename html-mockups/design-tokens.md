# Design tokens

Light-theme tokens from `@gastromatic/themes` plus the core visual mechanics (surfaces,
gradient borders, typography, spacing, and focus states) shared across mockups. Copy the
`:root`, `body`, and `.outlined` blocks into a mockup, then use
[component-recipes.md](component-recipes.md) and
[assets/components-overview.png](assets/components-overview.png) to build components.

## 1. Base tokens

```css
:root {
  /* Primary (brand teal) */
  --primary-50: #FAFCFB;
  --primary-100: #EFF5F3;
  --primary-200: #DCEFEA;
  --primary-300: #9DE3D0;
  --primary-400: #49D6B7;
  --primary-500: #36B297; /* accent, checked controls, active outlines */
  --primary-600: #2C957F;
  --primary-700: #10796E;
  --primary-800: #18574D;
  --primary-900: #0E3734; /* primary buttons, dark fills */

  /* Secondary (soft green for selected states and secondary buttons) */
  --secondary-100: #E7FBDD;
  --secondary-200: #D1FCCD;
  --secondary-300: #BAF5C8;
  --secondary-400: #A6E0C1;
  --secondary-600: #7FB2A0;

  /* Neutral (cool grey for canvas, borders, muted text, disabled states) */
  --neutral-50: #F4F7F9;  /* page canvas, hover rows, disabled buttons */
  --neutral-100: #E1E9EF; /* neutral buttons, disabled inputs, skeletons */
  --neutral-200: #CCDCE5; /* dividers, slider tracks, disabled borders */
  --neutral-300: #BDD1DD; /* muted borders, disabled button text */
  --neutral-400: #A6C1D1;
  --neutral-500: #90B2C6; /* placeholders, input focus border */
  --neutral-600: #83A2B4; /* subtle icons, close buttons */
  --neutral-700: #667E8D; /* optional labels, group titles */
  --neutral-800: #4F626D; /* muted text, table headers, helper text, disabled input text */

  /* Danger */
  --danger-50: #ffebeb;
  --danger-100: #ffd6d7;
  --danger-200: #ffc2c3;
  --danger-300: #ffa3a4;
  --danger-400: #ff8586;
  --danger-500: #ff7072; /* filled danger buttons */
  --danger-600: #e04a4a; /* hover danger, error input focus */
  --danger-700: #b33535; /* error helper text, active danger */

  /* Warning */
  --warning-50: #fffeeb; /* warning input and indeterminate checkbox fill */
  --warning-100: #fffcd6;
  --warning-200: #fffac2;
  --warning-500: #fff266;
  --warning-600: #ffec3d; /* hover warning */
  --warning-700: #fbde00; /* filled warning buttons and badges */
  --warning-800: #b8a200;
  --warning-900: #5c4600;

  /* Purple (AI accents) */
  --purple-100: #EBE6FF;
  --purple-200: #E2D9FF;
  --purple-500: #B7ABEE;
  --purple-600: #A39ADE;
  --purple-700: #8275BB;
  --purple-800: #625299;
  --purple-900: #4A3F75;

  /* Surfaces (higher layer = slightly cooler tint) */
  --layer-0: #ffffff;  /* default cards, inputs, tables, chips, modals, popovers */
  --layer-1: #FCFDFD;  /* cards on a --neutral-50 canvas */
  --layer-2: #F4F7F9;  /* table headers, subtle hover fills */
  --layer-3: #EEF4F7;  /* table cell borders, nested hover fills */
  --layer-4: #e8eff3;
  --background-light-80: #ffffffcc;

  /* Text */
  --text-black: #0E3734;
  --text-white: #ffffff;
  --fixed-black: #0E3734;
  --fixed-white: #ffffff;

  /* Gradient borders (top fades lighter, lower 65% holds full color) */
  --layer-border-gradient: linear-gradient(180deg, #F4F7F9 0%, #BDD1DD 35%, #BDD1DD 100%);
  --primary-border-gradient: linear-gradient(180deg, #5af8d4 0%, #36B297 35%, #36B297 100%);
  --warning-border-gradient: linear-gradient(180deg, #fffac2 0%, #fbde00 35%, #fbde00 100%);
  --danger-border-gradient: linear-gradient(180deg, #ffc2c3 0%, #ff7072 35%, #ff7072 100%);
  --ai-border-gradient: linear-gradient(180deg, #FFFFFF 0%, #BFADFF 35%, #625299 100%);

  /* Theme shape, elevation, typography, misc */
  --border-radius-8: 8px;
  --border-radius-12: 12px;
  --border-radius-16: 16px;
  --drop-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --backdrop: #262C2660;
  --header-height: 60px;
  --transition-duration: 0.3s;
  --font-size: 14px;

  /* Mockup helpers (extracted from component styles, not in @gastromatic/themes) */
  --border-radius-pill: 9999px;
  --shadow-raised: 0 4px 12px rgba(0, 0, 0, 0.1);   /* menus, popovers */
  --shadow-tooltip: 0 4px 12px rgba(0, 0, 0, 0.15); /* tooltips */
  --shadow-modal: 0 10px 25px rgba(0, 0, 0, 0.1);   /* modals */
  --font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1.4;
  color: var(--text-black);
  background: var(--neutral-50); /* or --layer-0 for full-bleed white pages */
}
```

## 2. Core visual mechanics

### Surface hierarchy

The library keeps contrast soft and cool-toned rather than relying on heavy drop shadows:

- Page canvas: `--neutral-50` behind cards (or `--layer-0` for full-bleed white layouts).
- Cards: `--layer-0` by default, or `--layer-1` on a `--neutral-50` canvas (as in the showcase).
- Inputs, tables, chips, popovers, and modals: `--layer-0`.
- Table headers and subtle hover fills: `--layer-2`.
- Hairline borders inside tables: `--layer-3`.

### Gradient borders

Most outlined surfaces (cards, inputs, chips, badges, tables, popovers, alerts, unchecked checkboxes and radios, segmented buttons) use a 1px vertical gradient border via two background layers instead of a solid grey border:

```css
.outlined {
  --surface: var(--layer-0);
  --border-gradient: var(--layer-border-gradient);
  background:
    linear-gradient(var(--surface), var(--surface)) padding-box,
    var(--border-gradient) border-box;
  border: 1px solid transparent;
}
```

Place `.outlined` before all component CSS in the stylesheet. Defining `--surface` and `--border-gradient` on `.outlined` itself prevents an outer card or alert from leaking its fill or border into nested outlined controls, while putting `.outlined` first lets component classes override `--surface`, `--border-gradient`, and `border-color`.

### Typography and spacing

| Role | Size | Line height | Weight | Color |
| --- | --- | --- | --- | --- |
| Headline 1 / 2 / 3 | 32 / 28 / 24px | 1.2 | 700 | `--text-black` |
| Headline 4 / 5 / 6 | 20 / 18 / 16px | 1.2 | 700 | `--text-black` |
| Body | 14px | 1.4 | 400 | `--text-black` |
| Field label | 14px (12px for size 24/28) | 1 | 500 | `--text-black` |
| `optional` suffix | 10px | 1 | 500 | `--neutral-700` |
| Group title / caption | 12px | 16px | 600 | `--neutral-700` |
| Helper / error text | 11px | 1.6 | 400 | `--neutral-800` / `--danger-700` |

Use 4, 8, 12, 16, and 24px spacing steps: 4px between title and subtitle or label and field, 8px between inline controls, 12px between form fields, 16px for card padding and grid gaps, and 24px for outer page margins.

### Focus states

- **Buttons, checkboxes, radios, toggles, and links:** `outline: 2px solid var(--text-black); outline-offset: 2px;` on `:focus-visible`.
- **Text inputs, selects, and textareas:** `outline: none;` and switch the border on `:focus` to a solid 1px color (`--neutral-500` default, `--danger-600` on error, `--warning-700` on warning). Do not add a `:focus-visible` outline on text inputs in plain CSS, because Chromium triggers `:focus-visible` on mouse clicks into text fields.
