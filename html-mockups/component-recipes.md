# Component recipes

Plain HTML and CSS recipes for recreating `@gastromatic/components` in self-contained
mockups. Place the `:root`, `body`, and `.outlined` blocks from
[design-tokens.md](design-tokens.md) before these rules so component classes can override
`--surface`, `--border-gradient`, and `border-color`. Cross-check rendered components
against [assets/components-overview.png](assets/components-overview.png).

## Core components (copyable CSS)

### Buttons

Pill-shaped (`border-radius: var(--border-radius-pill)`), `font-weight: 500`, default
height `36px`. Icon-only buttons set `width` equal to `height` with `padding: 0`.

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: var(--border-radius-pill);
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: var(--neutral-100);
  color: var(--text-black);
  transition: background 0.12s ease-in-out, border-color 0.12s ease-in-out;
}
.btn:hover:not(:disabled) { background: var(--neutral-200); }
.btn:focus-visible { outline: 2px solid var(--text-black); outline-offset: 2px; }
.btn:disabled {
  background: var(--neutral-50);
  border-color: var(--neutral-200);
  color: var(--neutral-300);
  cursor: not-allowed;
}

.btn-primary { background: var(--primary-900); color: var(--secondary-200); }
.btn-primary:hover:not(:disabled) { background: var(--primary-800); }

.btn-secondary { background: var(--secondary-200); color: var(--primary-900); }
.btn-secondary:hover:not(:disabled) { background: var(--secondary-300); }

.btn-danger { background: var(--danger-500); color: var(--fixed-black); }
.btn-danger:hover:not(:disabled) { background: var(--danger-600); }

.btn-warning { background: var(--warning-700); color: var(--fixed-black); }
.btn-warning:hover:not(:disabled) { background: var(--warning-600); }

.btn-white { background: var(--background-light-80); backdrop-filter: blur(5px); }
.btn-white:hover:not(:disabled) { background: var(--layer-1); }

.btn-ai {
  background:
    linear-gradient(90deg, #4A3F75 0%, #7C6BB8 72%) padding-box,
    var(--ai-border-gradient) border-box;
  color: var(--fixed-white);
}
.btn-ai:hover:not(:disabled) {
  background:
    linear-gradient(90deg, #3F3663 0%, #6D5AB0 72%) padding-box,
    var(--ai-border-gradient) border-box;
}

.btn-icon { width: 36px; padding: 0; }
```

**Button size scale** (adjust `height`, `padding`, `font-size`, and icon size):

| Size | Height | Padding | Font size | Icon size |
| --- | --- | --- | --- | --- |
| 24 | 24px | `0 6px` | 12px | 16px |
| 28 | 28px | `0 8px` | 12px | 16px |
| 36 (default) | 36px | `0 12px` | 14px | 20px |
| 40 | 40px | `0 14px` | 16px | 20px |
| 44 | 44px | `0 16px` | 16px | 20px |

- **Icon action (`Action`):** transparent button (`height: 24px`, `padding: 0 4px`, `border-radius: 8px`, `border: none`, `background: transparent`). Text actions use `font-weight: 500`, `text-decoration: underline`. Destructive actions use `--danger-600` / `--danger-700`.
- **Close (`Close`):** `16px` or `24px` circle (`border-radius: 50%`), `--neutral-100` fill, `--neutral-600` icon; hover `--neutral-300` fill, `--neutral-700` icon.

### Badges

Default badges pair a soft tinted fill with the matching gradient border via `.outlined`.
Sizes: `12` (`height: 12px`, `font-size: 9px`, `padding: 0 4px`), `16` default (`height: 16px`, `font-size: 11px`, `padding: 0 6px`), `20` (`height: 20px`, `font-size: 14px`, `padding: 0 9px`).

```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  padding: 0 6px;
  border-radius: var(--border-radius-pill);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  color: var(--text-black);
  --surface: var(--neutral-100);
}

/* Soft gradient-bordered variants (use together with .outlined) */
.badge-primary { --surface: var(--secondary-100); --border-gradient: var(--primary-border-gradient); }
.badge-warning { --surface: var(--warning-100); --border-gradient: var(--warning-border-gradient); }
.badge-danger  { --surface: var(--danger-100);  --border-gradient: var(--danger-border-gradient); }
.badge-ai      { --surface: var(--purple-100);  --border-gradient: var(--ai-border-gradient); color: var(--purple-700); }

/* Expressive solid variants (omit .outlined) */
.badge-solid-primary { background: var(--primary-900); color: var(--secondary-200); }
.badge-solid-warning { background: var(--warning-700); color: var(--text-black); }
.badge-solid-danger  { background: var(--danger-500);  color: var(--fixed-white); }
.badge-solid-ai      { background: var(--purple-800);  color: var(--fixed-white); }
```

### Form fields

Text inputs, selects, number fields, date inputs, and textareas share `.outlined`, label
styling, and the same size scale.

```css
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label {
  display: flex;
  align-items: center;
  height: 24px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: var(--text-black);
}
.field-label.optional::after {
  content: "optional";
  margin-left: 4px;
  font-size: 10px;
  color: var(--neutral-700);
  transform: translateY(1px);
}

/* Use together with .outlined */
.input {
  width: 100%;
  height: 36px;
  padding: 8px 12px;
  border-radius: var(--border-radius-12);
  font-family: inherit;
  font-size: 14px;
  color: var(--text-black);
}
.input::placeholder { color: var(--neutral-500); }
.input:focus { outline: none; border-color: var(--neutral-500); }
.input:disabled {
  --surface: var(--neutral-100);
  color: var(--neutral-800);
  cursor: not-allowed;
}

.input-error { --border-gradient: var(--danger-border-gradient); }
.input-error:focus { border-color: var(--danger-600); }

.input-warning { --surface: var(--warning-50); --border-gradient: var(--warning-border-gradient); }
.input-warning:focus { border-color: var(--warning-700); }

textarea.input { height: auto; min-height: 80px; resize: vertical; }

.field-help { font-size: 11px; line-height: 1.6; color: var(--neutral-800); }
.field-help.error { color: var(--danger-700); }
```

**Field size scale** (textarea size 44 uses `12px 16px` padding):

| Size | Input height | Textarea min-height | Padding | Font size | Border radius |
| --- | --- | --- | --- | --- | --- |
| 24 | 24px | 60px | `4px 8px` | 12px | 8px |
| 28 | 28px | 70px | `4px 12px` | 13px | 8px |
| 36 (default) | 36px | 80px | `8px 12px` | 14px | 12px |
| 40 | 40px | 100px | `8px 12px` | 16px | 8px |
| 44 | 44px | 120px | `8px 16px` (`12px 16px` textarea) | 16px | 16px |

- **Affixes:** clear button uses a 16px `Close` circle inside the right edge; selects show a subtle right chevron; number fields show stacked up/down steppers separated by a `1px` `--neutral-200` divider.

### Cards

Cards default to `--layer-0` and use `--layer-1` on a `--neutral-50` canvas (as in the
showcase). They have no resting shadow and do not lift on hover; clickable cards step up
one surface layer instead.

```css
/* Use together with .outlined */
.card {
  padding: 16px;
  border-radius: var(--border-radius-16);
}
.card-layer-1 { --surface: var(--layer-1); }

.card-clickable { cursor: pointer; }
.card-clickable:hover { --surface: var(--layer-1); }
.card-layer-1.card-clickable:hover { --surface: var(--layer-2); }

.card-active { border-color: var(--primary-500); }

/* Semantic cards add a subtle inner corner wash (use --purple-200 for ai) */
.card-primary {
  --border-gradient: var(--primary-border-gradient);
  box-shadow: 0 0 96px -64px var(--primary-200) inset;
}
```

### Tables

Wrap `<table>` in a rounded, gradient-bordered container with `overflow: hidden`.

```css
/* Use .table-wrap together with .outlined */
.table-wrap {
  width: 100%;
  border-radius: var(--border-radius-12);
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
  background: var(--layer-0);
}

.table th {
  height: 36px;
  padding: 0 8px;
  text-align: left;
  font-weight: 400;
  color: var(--neutral-800);
  background: var(--layer-2);
  border-right: 1px solid var(--layer-3);
  border-bottom: 1px solid var(--layer-3);
  white-space: nowrap;
}

.table td {
  padding: 8px;
  line-height: 24px;
  color: var(--text-black);
  border-right: 1px solid var(--layer-3);
  border-bottom: 1px solid var(--layer-3);
}

.table th:last-child, .table td:last-child { border-right: none; }
.table tbody tr:last-child td { border-bottom: none; }
```

## Other components (visual specs)

### Chips

- **Default (`32px` height):** `.outlined` with `--layer-0`, `border-radius: var(--border-radius-16)`, `padding: 0 8px` (`padding-right: 4px` when closable), `font-size: 13px`, `font-weight: 500`, optional 16px `Close` button.
- **Compact (`24px` height):** `padding: 0 6px` (`padding-right: 0` when closable), `font-size: 11px`.

### Selection and controls

- **Checkbox:** `16px` (`border-radius: 6px`) or `24px` (`border-radius: 8px`).
  - Unchecked: `.outlined` (`--layer-0`).
  - Checked: solid `--primary-500` fill and border with white checkmark.
  - Indeterminate: `.outlined` with `--warning-50` and `--warning-border-gradient`, warning minus mark.
  - Disabled: `--neutral-200` fill, `--neutral-300` border, label `--neutral-500`.
- **Radio:** `16px` or `24px` circle. Unchecked uses `.outlined` (`--layer-0`). Checked uses `--primary-500` fill with a white center dot (`8px` for 16px, `12px` for 24px). Disabled uses `--neutral-100` fill.
- **Toggle:** pill track (`36×24px` compact, `52×32px` large) using `.outlined`: `--neutral-100` off, `--primary-500` with `--primary-border-gradient` on, and a white circular thumb inside (`opacity: 0.5` when disabled).
- **SegmentedButton (single select):** pill `.outlined` container with `padding: 2px`. Inactive segments are transparent pill buttons (`font-weight: 500`); the active segment sits on `--secondary-200` with `1px solid var(--primary-500)`.
- **ToggleButton (multi-select):** pill `.outlined` container with no inner padding and `1px` `--neutral-200` vertical dividers. Selected segments use `--neutral-100` (or `--primary-500` primary) with `box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.25)`.
- **Slider:** `2px` (size 16) or `4px` (size 24) `--neutral-200` pill track, filled portion and circular thumb (`16px` or `24px`) in `--primary-900`, optional neutral `-`/`+` icon buttons and `12px` value below the thumb.

### Feedback and overlays

- **Alert (and Toast, which renders an Alert):** `.outlined` with `border-radius: 24px`, `padding: 12px` (or `16px`), semantic `--border-gradient`, and soft inset wash (`box-shadow: 0 0 96px -64px var(--<variant>-200) inset`, using `--purple-200` for AI). Leading `24×24px` circular icon badge:
  - Primary: `--primary-900` circle, `--secondary-200` check, `--primary-border-gradient`.
  - Warning: `--warning-700` circle, `--fixed-black` exclamation, `--warning-border-gradient`.
  - Danger: `--danger-500` circle, `--fixed-black` cross, `--danger-border-gradient`.
  - AI: `--purple-100` circle, `--purple-800` sparkle, `--ai-border-gradient`.
  - Default: `--neutral-100` circle, `--text-black` info icon, `--layer-border-gradient`.
  - Expressive: solid `--primary-900` fill, `--secondary-200` text and icon circle.
- **Modal:** centered over `background: var(--backdrop); backdrop-filter: blur(2px)`. Panel uses `--layer-0`, `border-radius: var(--border-radius-16)`, `box-shadow: var(--shadow-modal)`, default `width: 504px`, `max-height: 90vh`, header with title and 24px `Close`, scrollable body, and right-aligned footer buttons.
- **Popover and Menu:** `.outlined` (`--layer-0`), `border-radius: var(--border-radius-12)`, `box-shadow: var(--shadow-raised)`. Menu uses `padding: 8px`; items are `height: 36px`, `padding: 8px`, `border-radius: 20px`, `gap: 8px`, hover `--neutral-50`, selected `--secondary-200` with `--primary-600` text (danger items: `--danger-700` text, `--danger-50` hover).
- **Tooltip:** `background: var(--text-black)`, `color: var(--text-white)`, `padding: 6px 12px`, `border-radius: 6px`, `font-size: 12px`, `line-height: 16px`, `box-shadow: var(--shadow-tooltip)`.
- **Skeleton:** `background: var(--neutral-100)`, `border-radius: var(--border-radius-8)` (or `50%` for circles).

### Avatars and dividers

- **Avatar:** circle (`24`, `32`, `40`, `44`, or `48px`; initials `11`, `14`, `16`, `17`, `18px`), `font-weight: 500`:
  - Neutral: `--neutral-100` bg, `--neutral-600` text
  - Primary: `--primary-100` bg, `--primary-700` text
  - Secondary: `--secondary-100` bg, `--secondary-600` text
  - Purple: `--purple-100` bg, `--purple-700` text
- **Divider:** `1px` line in `--neutral-200`.
