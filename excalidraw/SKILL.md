---
name: excalidraw
description: Draw, edit, and export Excalidraw diagrams on a live canvas with the mcp-excalidraw-server CLI. Use when asked to draw, sketch, or visualize a diagram, convert Mermaid to Excalidraw, export .excalidraw/PNG/SVG files, or check, start, or stop the Excalidraw canvas.
---

# Excalidraw

Drive a live Excalidraw canvas with the upstream CLI (tested with 2.0.0):

```sh
npx -y mcp-excalidraw-server <command>
```

Commands below omit that prefix. Results are JSON on stdout, except `describe` (plain text). Exit code 3 means the canvas is unreachable; 4 means a browser tab is required.

## Canvas

- **Check:** `status`. `"running": true` means the backend is up, not that a renderer tab is connected (`browserClients`). Use the URL the CLI reports; respect an existing `EXPRESS_SERVER_URL` or `--url`.
- **Start:** `start`. Canvas commands also autostart the backend.
- **Stop:** `stop`, only when the user asks. The scene and snapshots live in memory, so export first.

If startup fails, read stderr. For a port conflict, identify the other service (`ss -ltnp 'sport = :3000'`, `docker ps --filter publish=3000`) and tell the user. Do not stop it or switch ports yourself.

`screenshot` and `mermaid` need a connected browser tab. To check your own work, load the `agent-browser` skill and open the canvas URL in a named session; otherwise ask the user to open it. Keep the tab open until rendering and export are done.

## Workflow

1. Clarify ambiguous requests. Run `describe` before changing an existing canvas, and never clear someone else's diagram.
2. Plan coordinates: x grows right, y grows down, (0, 0) is the scene origin. Use the [design guide](references/cheatsheet.md#design-guide) for sizes and colors.
3. Create shapes, then arrows, in one `add` call. Give elements readable `id`s:

   ```sh
   npx -y mcp-excalidraw-server add <<'EOF'
   [
     {"id": "api", "type": "rectangle", "x": 0, "y": 0, "width": 160, "height": 60, "text": "API"},
     {"id": "db", "type": "rectangle", "x": 0, "y": 160, "width": 160, "height": 60, "text": "Postgres"},
     {"type": "arrow", "x": 0, "y": 0, "startElementId": "api", "endElementId": "db"}
   ]
   EOF
   ```

4. `screenshot --out <file>.png`, look at the image, and fix [quality issues](#quality-check) before adding more.
5. Tidy with `arrange align|distribute`, then screenshot the final state again.
6. Save with `export --out <name>.excalidraw`. For important deliverables, check the saved file too: export and the live renderer can differ. Use `share` only when the user wants an external link; anyone with the full link can view the upload.

## Element rules

- Label shapes with `"text"`. Bind arrows with `startElementId` / `endElementId`; bound arrows follow shapes moved via the CLI.
- Keep labels on one line: start with width ≥ `labelChars * 12`, then check the render.
- Don't put `text` on large background zones; it is centered over the children. Add a separate `text` element at the zone's top-left.
- Bound arrows are straight edge-to-edge lines that ignore custom waypoints and obstacles, even with `elbowed: true`. For a custom route, omit the bindings and supply `points` (relative to the arrow's `x`/`y`): 3+ points with `"roundness": {"type": 2}` for curves, or right-angle segments with `"elbowed": true`. Move unbound arrows yourself when shapes move.
- Use arrow labels only when essential, 12 characters or fewer.

## Editing

Get IDs and positions from `describe`, then use `update <id> --set '{...}'`, `delete <id>`, or several changes in one `apply`. `apply` is not atomic: earlier changes stay if a later one fails, so inspect the scene before retrying.

Run `snapshot save <name>` before risky edits; `snapshot restore <name>` replaces the whole scene. `import --replace` and `clear --yes` wipe the scene, so snapshot or export first.

`arrange duplicate` copies keep their arrows pointing at the original shapes. Add new arrows between the copies.

**Imported or browser-synced scenes** use native Excalidraw elements. As soon as a browser tab is open, CLI-created elements are synced into this format too:

- Labels are separate text elements. Update the one found by `query --type text --filter containerId=<shape-id>`; setting `text` on the shape does not change the visible label.
- Arrows don't follow CLI moves until you [rebind them](references/cheatsheet.md#editing-imported-or-browser-synced-diagrams).
- Duplicating a shape doesn't copy its label. Rebuild labeled copies with `add` instead.

## Mermaid

`mermaid diagram.mmd` (or `mermaid -` for stdin) works well for flowcharts and sequence diagrams. Use `add` when layout precision matters.

- Output is added to the existing scene, usually at the origin. Snapshot first, and don't run the conversion twice.
- Exit 0 only means the request was sent. Confirm new elements with `describe`, then screenshot.
- ER diagrams become a single image that export, share, and snapshots don't preserve. Build editable ER diagrams with `add`, or screenshot while the tab is still open.

## Quality check

After each batch, fix these in the screenshot before continuing:

- Truncated text (shape too small).
- Overlapping shapes, or zones without padding around their children.
- Arrows or arrow labels crossing unrelated shapes.
- Fonts under 16 for body text or 20 for titles.

If elements seem missing, they may be off-screen: zoom to fit (Shift+1) or ask the user to.

## Reference

- [references/cheatsheet.md](references/cheatsheet.md): all commands, the element format, imported-diagram repairs, export limits, and the design guide.
- Upstream: https://github.com/yctimlin/mcp_excalidraw
