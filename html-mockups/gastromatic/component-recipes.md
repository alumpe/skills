# Component recipes

Plain HTML and CSS recipes for recreating `@gastromatic/components` in self-contained
mockups. Place the `:root`, `body`, and `.outlined` blocks from
[design-tokens.md](design-tokens.md) before these rules so component classes can override
`--surface`, `--border-gradient`, and `border-color`. Cross-check rendered components
against [assets/components-basics.png](assets/components-basics.png) (basic components and
their variants), [assets/components-patterns.png](assets/components-patterns.png) (tables,
lists, overlays, calendar, charts, chat), and
[assets/components-filter-panel.png](assets/components-filter-panel.png) (open filter panel).

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

- **Action:** transparent 24px button, `padding: 0 4px`, `border-radius: 8px`. Labels are underlined at weight 500; icons can stand alone. Colors: `--text-black` (default), `--neutral-600`, `--danger-700`, `--primary-700`, `--purple-800` (AI), or `--text-white`. Disabled actions use `--neutral-400` without an underline.
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
reference screenshots). They have no resting shadow and do not lift on hover; clickable cards step up
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
- **Popover and Menu:** the popover supplies the `.outlined` panel (`--layer-0`, `24px` radius, `16px` default padding, `--shadow-raised`). The inline menu shown in Patterns has no panel or padding of its own. Items have `min-height: 36px`, `8px` padding and gap, and a `20px` radius. Default items hover to `--neutral-50`; selection adds `--secondary-200` fill and a `1px` `--primary-500` border. Danger items use `--danger-700` text and `--danger-50` hover; disabled items use `--neutral-400`. Group labels are `14px/600` in `--neutral-600`; add a divider explicitly where needed.
- **Tooltip:** `background: var(--text-black)`, `color: var(--text-white)`, `padding: 6px 12px`, `border-radius: 6px`, `font-size: 12px`, `line-height: 16px`, `box-shadow: var(--shadow-tooltip)`.
- **Skeleton:** `background: var(--neutral-100)`, `border-radius: var(--border-radius-8)` (or `50%` for circles).
- **Progress:** pill track in `--neutral-200` with a `--primary-500` fill, `6px` high by default. Stacked segments use shades of one color (`--primary-700`, `--primary-500`, `--primary-300`). The steps variant is a row of equal `6px` pills with `4px` gaps, done steps filled. The ring variant is `40px` wide with a `4px` stroke by default and can hold a short centered label.
- **Drawer:** the floating panel defaults to `400px` wide with an `8px` viewport inset, `16px` radius, gradient border, and `--shadow-modal`. It reads as white (`--layer-0`) throughout. Header and footer have `24px` padding; the scrolling body has `0 24px`. The header has a `20px/700` title and a 24px `Close`. The 300px inline drawer in Patterns keeps `--layer-0` but has square corners, no shadow, and a `1px` `--neutral-200` inner divider.
- **Filter chips and selection panel:** an applied filter is a 32px chip (`Group: value, value`, `13px`, `font-weight: 500`, leading 16px icon, `Close` button), followed by a round neutral 28px `+` button. The panel it opens is `.outlined` (`--layer-0`), `width: 320px`, `padding: 8px`, `border-radius: 20px`, `box-shadow: var(--shadow-raised)`: a search row, a `12px` breadcrumb (`Alle › Group`), a select-all row (`font-weight: 500`, mixed checkbox when partly selected), one checkbox row per option, and a full-width `36px` primary button to confirm. See [assets/components-filter-panel.png](assets/components-filter-panel.png).
- **Upload:** drop area with `1px dashed var(--neutral-300)`, `border-radius: var(--border-radius-16)`, `padding: 24px`, `min-height: 120px`, a centered file illustration and one line of text. Border turns `--primary-500` while dragging over it and `--danger-400` on error.

### Lists and disclosure

- **ListCard group:** optional `12px/500` `--neutral-600` title above one `.outlined` container (`16px` radius, no padding). Rows have `8px` padding, `4px` gap, a `16px` radius, a 20px leading icon, a `14px` label, and a trailing value or chevron. Default active rows use `--layer-3` with `--layer-border-gradient`. Warning, danger, and primary rows use `--warning-100`, `--danger-50`, and `--secondary-50`; when active they use `--warning-100`, `--danger-100`, and `--secondary-200` with the matching border gradient. Disabled rows use `opacity: 0.5`.
- **ListTable:** each group has one `.outlined` `--layer-1` container with `16px` corners, `16px` column gaps, and inset row dividers. Row padding defaults to `12px`; Patterns uses `8px 12px` and a `500` weight for the shift name. The optional status pill is fixed at `8×40px`: `--primary-500` for success, `--warning-700` for warning, `--danger-500` for error, or `--neutral-300` for default. Selection replaces the glass column headers with a count and 28px action buttons; the header checkbox is mixed when only some rows are selected. The trailing `…` opens the row menu.
- **Accordion:** each item is a trigger row (`padding: 12px 0`, `14px`, `font-weight: 500`, chevron at the right that flips when open) with its content below; items are separated by `1px solid var(--neutral-100)`.

### Calendar

- Month label centered (`14px`, `font-weight: 600`) between previous/next month and year icon buttons, then a weekday row (`12px`, `--neutral-800`) and optional week numbers (`11px`, `--neutral-500`) in a leading column.
- Days are circles of `28`, `36`, or `44px` with `2px` gaps. Numbers are `12px` in 28px cells and `14px` in larger cells. Selected days and every day of a selected range: `--secondary-200` fill, `1px solid var(--primary-500)`, `font-weight: 500`. Today: `--primary-500` text, `font-weight: 600`. Marked days carry a small colored dot under the number.

### Chat

- **User message:** right-aligned bubble, `background: var(--primary-900)`, `color: var(--secondary-200)`, `padding: 12px 16px`, `border-radius: 16px 16px 4px 16px`, `14px` text with `line-height: 1.6`.
- **Assistant message:** no bubble. A name row (sparkle icon and name in `--purple-800`, `font-weight: 500`) sits above plain `14px` text; suggested replies are neutral buttons in a wrapping row below the message. The narrow drawer shows them on separate lines.
- **Input:** one pill-shaped `.outlined` field with the send icon button inside its right edge.

### Charts

- The default chart palette starts with the theme tokens `--custom-periwinkle-mist` (first series and bars), `--custom-skyline-blue`, and `--custom-garden-mint`. Set explicit colors when a chart should follow the product palette, for example `--primary-500` against `--neutral-700` for actual versus plan.
- **Bar chart:** bars with rounded tops, value above each bar (`16px`, `font-weight: 600`), category labels below (`14px`, `--neutral-600`), no axis lines.
- **Area and line chart:** thin line per series over a vertical gradient fill that fades out, dashed horizontal grid lines, `14px` axis labels.
- **Donut and pie:** segments separated by a `--layer-0` stroke (`4px` by default) with rounded ends, values on the ring (`12px`, `font-weight: 600`).
- **Legend:** centered below the chart, one small dot and a `12px` `--neutral-600` label per series. Always show it, or label the series directly.

### Avatars and dividers

- **Avatar:** circle (`24`, `32`, `40`, `44`, or `48px`; initials `11`, `14`, `16`, `17`, `18px`), `font-weight: 500`:
  - Neutral: `--neutral-100` bg, `--neutral-600` text
  - Primary: `--primary-100` bg, `--primary-700` text
  - Secondary: `--secondary-100` bg, `--secondary-600` text
  - Purple: `--purple-100` bg, `--purple-700` text
- **Divider:** `1px` line in `--neutral-200`.
