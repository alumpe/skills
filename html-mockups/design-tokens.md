# Design tokens

Base design system for mockups: a small set of CSS variables and a few recipes that cover
colors, shapes, and elevation. Copy the `:root` block into a mockup and build on top of it.

## Variables

```css
:root {
  /* Primary (brand teal) */
  --primary-50: #FAFCFB;
  --primary-100: #EFF5F3;
  --primary-200: #DCEFEA;
  --primary-300: #9DE3D0;
  --primary-400: #49D6B7;
  --primary-500: #36B297; /* accent */
  --primary-700: #10796E;
  --primary-800: #18574D;
  --primary-900: #0E3734; /* filled buttons, dark text */

  /* Secondary (soft green, for selected/active states) */
  --secondary-100: #E7FBDD;
  --secondary-200: #D1FCCD;
  --secondary-300: #BAF5C8;
  --secondary-600: #7FB2A0;

  /* Neutral (cool grey, borders and secondary text) */
  --neutral-100: #E1E9EF;
  --neutral-200: #CCDCE5;
  --neutral-300: #BDD1DD;
  --neutral-700: #667E8D;

  /* Status */
  --danger-300: #ffa3a4;
  --danger-500: #ff7072;
  --danger-600: #e04a4a;
  --warning-100: #fffcd6;
  --warning-500: #fff266;
  --warning-700: #fbde00; /* filled warning elements */

  /* Surfaces */
  --layer-0: #ffffff;  /* page */
  --layer-1: #FCFDFD;  /* raised cards */
  --layer-2: #F4F7F9;  /* sunken areas, inputs */

  /* Text */
  --text-black: #0E3734;
  --text-white: #ffffff;

  /* Shape */
  --border-radius-8: 8px;   /* inputs */
  --border-radius-12: 12px; /* menus */
  --border-radius-16: 16px; /* cards, modals, chips */

  /* Elevation */
  --drop-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-raised: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 10px 25px rgba(0, 0, 0, 0.1);
  --shadow-modal: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);

  /* Misc */
  --backdrop: #262C2660;
  --header-height: 60px;
  --transition-duration: 0.3s;

  --font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  --font-size: 14px;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-black);
  background: var(--layer-0);
}
```

## Colors

- **Primary teal** drives the identity: `--primary-500` for accents, `--primary-900` for filled
  elements, `--primary-100` for subtle tints.
- **Secondary green** marks selected/active states (`--secondary-200` backgrounds).
- **Status**: danger red `#ff7072`, warning yellow `#fbde00` (use the `-700` step for filled
  elements — the lighter yellows have poor contrast).
- **Text**: `--text-black` on light surfaces, `--text-white` on filled/colored surfaces.

## Border radius

| Radius | Use |
| --- | --- |
| `--border-radius-8` | Inputs, textareas |
| `--border-radius-12` | Menus, popovers |
| `--border-radius-16` | Cards, modals, chips |
| Pill (`border-radius: <full height>`) | Buttons and toggles are always fully rounded |

## Box shadows and hover elevation

Elements sit flat by default and gain elevation on interaction — a shadow level is a state:

```css
.card    { box-shadow: var(--drop-shadow); }    /* resting */
.card:hover { box-shadow: var(--shadow-hover); } /* lifts on hover */
.menu    { box-shadow: var(--shadow-raised); }  /* floating menus, popovers */
.modal   { box-shadow: var(--shadow-modal); }   /* dialogs */
```

Transitions use `var(--transition-duration)` (0.3s); menus animate a bit faster (150ms).
Modals dim the page with `background: var(--backdrop)` plus a slight `backdrop-filter: blur(2px)`.

## Gradient borders

Outlined elements (chips, toggles, unchecked checkboxes) use a two-layer background instead
of a solid border. It gives the border a subtle vertical gradient:

```css
.outlined {
  background:
    linear-gradient(var(--layer-0), var(--layer-0)) padding-box,
    var(--border-gradient) border-box;
  border: 1px solid transparent;
}
```

Define `--border-gradient` per state, e.g. resting
`linear-gradient(180deg, #F4F7F9 0%, #BDD1DD 35%, #BDD1DD 100%)`, selected
`linear-gradient(180deg, #5af8d4 0%, #36B297 35%, #36B297 100%)`.

## Focus

Interactive elements show `outline: 2px solid var(--text-black); outline-offset: 2px` on
keyboard focus; inputs instead use a soft ring: `box-shadow: 0 0 0 3px var(--primary-100)`.
