# Excalidraw CLI Cheatsheet

Tested against `mcp-excalidraw-server` 2.0.0. Prefix every command with `npx -y mcp-excalidraw-server`; `help <command>` shows usage. Unpinned `npx` can resolve a newer release, so check `--version` and recheck the version-specific notes after an upgrade.

Default URL: http://127.0.0.1:3000, overridden by `EXPRESS_SERVER_URL` or `--url <url>`. `EXCALIDRAW_NO_AUTOSTART=1` disables autostart; `start` still works.

## Commands

| Command | Description |
|---------|-------------|
| `status` | Backend health, element count, `browserClients` (connected tabs) |
| `start` / `stop` | Start the canvas in the background / stop it. `stop` only stops the canvas process it identifies |
| `add [file\|-]` | Create elements from a JSON array (file or stdin); `add --one '{...}'` for one element |
| `apply [file\|-]` | `{"create": [...], "update": [{"id": "a", "set": {...}}], "delete": ["id"]}`. Not atomic. Updates take `set` or direct fields, not both |
| `get <id>` | One element |
| `query` | `--type rectangle`, `--bbox x0,y0,x1,y1`, `--filter key=value` (nested keys like `label.text=API` work), `--filter-json '{...}'` |
| `update <id> --set '{...}'` | Change properties |
| `delete <id> [...]` | Delete elements |
| `describe` | Plain-text summary: IDs, positions, labels, connections, groups, bounding box |
| `screenshot` | PNG to `--out file.png` (without `--out`: JSON with a temp path). `--format svg` (raw SVG on stdout without `--out`), `--no-background`. Needs a tab |
| `mermaid [file\|-]` | Add converted elements to the scene. Needs a tab; exit 0 only confirms the request was sent |
| `export` | `.excalidraw` JSON to `--out file` or stdout. A `.md` path, or `--format obsidian`, writes Obsidian format |
| `import [file\|-]` | Load `.excalidraw` or `.excalidraw.md`. Merges by default, overwriting matching IDs. `--replace` clears first, even if the import then fails |
| `snapshot save\|list\|restore [name]` | In-memory snapshots, lost on restart. `save`/`restore` need a name; `restore` replaces the scene |
| `arrange align --ids a,b --to left\|center\|right\|top\|middle\|bottom` | Align 2+ elements |
| `arrange distribute --ids a,b,c --to horizontal\|vertical` | Space 3+ elements evenly |
| `arrange group --ids a,b` / `arrange ungroup --group <groupId>` | Group or ungroup |
| `arrange lock\|unlock --ids a,b` | Lock in the UI only; `update` still works |
| `arrange duplicate --ids a,b [--offset 20,20]` | Clone with an offset. Copied arrows keep the original endpoints |
| `share` | Upload an encrypted copy and return an excalidraw.com link |
| `clear --yes` | Remove all elements |

Exit codes: 0 ok, 1 error, 2 usage, 3 canvas unreachable or wrong service, 4 browser tab required.

## Editing imported or browser-synced diagrams

Import and browser sync store native Excalidraw elements instead of the CLI's `label` / `start` / `end` shorthand. Check `get <id>` before editing.

- **Labels:** `query --type text --filter containerId=db` returns the shape's text element; change it with `update <text-id> --set '{"text":"Database"}'`. A larger element count after sync is normal, since every label is its own element. Don't delete text elements that have a `containerId`.
- **Arrows:** native `startBinding` / `endBinding` don't follow CLI moves. Rebind with `update <arrow-id> --set '{"start":{"id":"api"},"end":{"id":"db"}}'`; later moves of `api` or `db` then reroute the arrow. `update` ignores `startElementId` / `endElementId` in 2.0.0. Browser edits can replace the bindings again, so recheck after UI changes.
- **Copies:** `arrange duplicate` doesn't copy separate labels. Rebuild copies with `add` (new IDs, same geometry and style, `text`), then add arrows between them. Don't reuse the originals' `boundElements`.
- **Manual routes:** don't rebind an arrow whose waypoints must stay. Use unbound points and adjust them yourself:

```sh
npx -y mcp-excalidraw-server add --one '{"id":"manual-route","type":"arrow","x":160,"y":180,"points":[[0,0],[0,120],[360,120],[360,0]],"elbowed":true}'
```

## Export limitations

- `screenshot` renders in the browser; `export` builds scene JSON on the server. Defaults such as corner roundness and label size can differ, so reopen important exports and check them.
- Mermaid ER conversion produces one `image` element whose data export omits (`files` is empty). It reopens as a missing-image placeholder. Screenshot PNG/SVG before closing the tab.
- In export, shape labels default to size 16 (set `fontSize` on the shape to change it). Arrow labels are always 14, so use a separate text element when a saved arrow label must be larger.

## Element format

- Types: `rectangle`, `ellipse`, `diamond`, `text`, `arrow`, `line` (imports may also contain `freedraw` and `image`). Every element needs `type`, `x`, `y`.
- `points`: `[[x, y]]` tuples or `[{x, y}]` objects, relative to the element's `x`/`y`.
- `fontFamily`: `"virgil"`, `"helvetica"`, `"cascadia"`, `"excalifont"`, `"nunito"`, `"lilita"`, `"comic"`, or IDs 1, 2, 3, 5, 6, 7, 8.
- `strokeStyle`: `solid`, `dashed` (async flows, zone borders), `dotted` (weak dependencies).
- `startArrowhead` / `endArrowhead`: `arrow`, `dot`, `null`, and other Excalidraw styles. Arrows default to an end arrowhead only; lines have none.
- `fillStyle` defaults to `solid` here. Set `"hachure"` for sketchy shading.

## Design guide

- Stroke / fill pairs: red `#e03131` / `#ffc9c9`, green `#2f9e44` / `#b2f2bb`, blue `#1971c2` / `#a5d8ff`, purple `#9c36b5` / `#eebefa`, orange `#e8590c` / `#ffd8a8`, cyan `#0c8599` / `#99e9f2`, gray `#868e96` / `#e9ecef`. Use at most 3–4 fills per diagram.
- Shapes: at least 120×60 and width ≥ `labelChars * 12`; diamonds need extra room. Same-role shapes share a size.
- Fonts: 16+ for body text, 20+ for titles.
- Spacing: 40–80px between shapes, 80–120px between tiers, 120px+ for labeled arrows, 50px padding inside zones. Align to a 20px grid.
- Order: background zones, primary shapes, arrows, annotations, then align and distribute.
- Templates:
  - Architecture: 160×80 services, one fill per layer, solid arrows for sync calls, dashed for async.
  - Flowchart: 160×80 steps, 160×120 diamonds (grow for long labels), top to bottom, green start, red end.
  - ER: 180×80 entities (grow for attributes), 80px apart. Add explicit cardinality text; arrowheads don't encode it.
