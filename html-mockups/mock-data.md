# Mock data and state

How to keep a mockup consistent: every place that shows the same data shows the same
values, and when the user changes something in one place, every other place changes with
it, as if a real backend were attached.

## The rule

The page is never the source of truth. All sample data lives once in a JavaScript object,
and everything visible is drawn from it. An interaction changes the data and then redraws;
it never edits the page directly.

Mockups become inconsistent when a click handler patches the page itself, for example by
appending a table row or bumping a counter. Every other place that shows the same data is
then easy to forget. Drawing everything from one object makes that mistake impossible.

## The parts

| Part      | Holds                                                    | Real-app equivalent    |
| --------- | -------------------------------------------------------- | ---------------------- |
| `db`      | The records: employees, departments, shifts              | Backend and database   |
| `ui`      | View state: selection, filters, open dialog              | Component state, store |
| Queries   | Functions that read and derive: lookups, counts, filters | Selectors, API reads   |
| `actions` | The only functions that change `db` or `ui`              | API calls, mutations   |
| `regions` | One function per page area that returns its HTML         | Components             |
| Handlers  | Maps from markup names to action calls                   | Event props            |
| Plumbing  | `render()` and the event listeners, copied unchanged     | The framework          |

A static mockup that only repeats records across sections or variants needs `db`, queries,
`regions`, and the plumbing. Add `ui`, `actions`, and handlers once an interaction changes
something.

The markup connects to the JavaScript through four attributes:

| Attribute     | On                         | Meaning                                              |
| ------------- | -------------------------- | ---------------------------------------------------- |
| `data-region` | An empty container         | Filled by the region function of that name           |
| `data-action` | A button                   | A click calls the click handler of that name         |
| `data-input`  | An input, select, checkbox, or each radio button of a group | Mirrors the `ui` field of that name, in both directions |
| `data-form`   | A form                     | Submitting calls the form handler of that name       |

## Skeleton

Copy this structure. Replace the employee example in part 1 with the mockup's own data, and
copy part 2 unchanged.

```html
<nav>
  Employees <span class="badge" data-region="employee-count"></span>
</nav>

<main>
  <h1>Employees <small data-region="employee-count"></small></h1>

  <input type="search" data-input="search" aria-label="Search employees" placeholder="Search" />
  <button type="button" data-action="clear-search">Clear</button>
  <button type="button" data-action="open-create-dialog">Add employee</button>

  <table>
    <thead>
      <tr><th>Name</th><th>Department</th><th>Status</th></tr>
    </thead>
    <tbody data-region="employee-rows"></tbody>
  </table>
</main>

<aside data-region="employee-detail"></aside>
<div data-region="dialog"></div>
```

```js
// ===== Part 1: the mockup's own data and behavior. Replace the example. =====

// db: what the backend would own. One copy of each record, linked by id.
const db = {
  departments: [
    { id: "d1", name: "Küche" },
    { id: "d2", name: "Service" },
  ],
  employees: [
    { id: "e1", name: "Jana Köhler", departmentId: "d1", status: "active" },
    { id: "e2", name: "Mehmet Yıldız", departmentId: "d2", status: "active" },
    { id: "e3", name: "Lena Brandt", departmentId: "d2", status: "inactive" },
  ],
};

// ui: what the frontend would own. Ids and filters, never copies of records.
const ui = { search: "", selectedEmployeeId: null, dialog: null };

// Queries: read and derive. Nothing computed here is ever stored.
const byId = (records, id) => records.find((record) => record.id === id);
const departmentName = (employee) => byId(db.departments, employee.departmentId).name;
const activeCount = () => db.employees.filter((employee) => employee.status === "active").length;

const visibleEmployees = () => {
  const search = ui.search.trim().toLowerCase();
  return db.employees.filter((employee) => employee.name.toLowerCase().includes(search));
};

// actions: the only code that changes db or ui. Every action ends with render().
let lastId = 100;
const nextId = (prefix) => `${prefix}${++lastId}`;

const actions = {
  createEmployee({ name, departmentId }) {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    const employee = { id: nextId("e"), name: trimmedName, departmentId, status: "active" };

    db.employees.push(employee);
    ui.selectedEmployeeId = employee.id;
    ui.dialog = null;

    render();
  },

  setEmployeeStatus(id, status) {
    byId(db.employees, id).status = status;
    render();
  },

  selectEmployee(id) {
    ui.selectedEmployeeId = id;
    render();
  },

  search(text) {
    ui.search = text;
    render();
  },

  setDialog(name) {
    ui.dialog = name;
    render();
  },
};

// regions: each page area returns its HTML from db and ui.
const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const regions = {
  "employee-count": () => `${activeCount()} active`,

  "employee-rows": () => {
    const rows = visibleEmployees().map((employee) => {
      const selected = employee.id === ui.selectedEmployeeId;

      return `
        <tr class="${selected ? "selected" : ""}">
          <td><button type="button" data-action="select-employee" data-id="${employee.id}">${escapeHtml(employee.name)}</button></td>
          <td>${escapeHtml(departmentName(employee))}</td>
          <td>${employee.status}</td>
        </tr>`;
    });

    return rows.join("");
  },

  "employee-detail": () => {
    const employee = byId(db.employees, ui.selectedEmployeeId);

    if (!employee) {
      return `<p>Select an employee.</p>`;
    }

    const nextStatus = employee.status === "active" ? "inactive" : "active";

    return `
      <h2>${escapeHtml(employee.name)}</h2>
      <p>${escapeHtml(departmentName(employee))} · ${employee.status}</p>
      <button type="button" data-action="set-status" data-id="${employee.id}" data-status="${nextStatus}">
        Set ${nextStatus}
      </button>`;
  },

  dialog: () => {
    if (ui.dialog !== "create-employee") {
      return "";
    }

    const options = db.departments.map((department) => {
      return `<option value="${department.id}">${escapeHtml(department.name)}</option>`;
    });

    return `
      <form class="dialog" data-form="create-employee">
        <label>Name <input name="name" required /></label>
        <label>Department <select name="departmentId">${options.join("")}</select></label>
        <button type="button" data-action="close-dialog">Cancel</button>
        <button type="submit">Create</button>
      </form>`;
  },
};

// Handlers: connect the names in the markup to actions. They never touch the page.
const clickHandlers = {
  "clear-search": () => actions.search(""),
  "open-create-dialog": () => actions.setDialog("create-employee"),
  "close-dialog": () => actions.setDialog(null),
  "select-employee": (element) => actions.selectEmployee(element.dataset.id),
  "set-status": (element) => actions.setEmployeeStatus(element.dataset.id, element.dataset.status),
};

const inputHandlers = {
  search: (input) => actions.search(input.value),
};

const formHandlers = {
  "create-employee": (values) => actions.createEmployee(values),
};

// ===== Part 2: plumbing. Copy unchanged. =====

const drawnHtml = {};

function render() {
  for (const [name, draw] of Object.entries(regions)) {
    const slots = document.querySelectorAll(`[data-region="${name}"]`);

    if (slots.length === 0) {
      throw new Error(`No element with data-region="${name}" in the markup`);
    }

    const html = draw();

    // A region is only redrawn when its HTML changed, so untouched regions keep their
    // scroll position and half-typed form input.
    if (drawnHtml[name] === html) {
      continue;
    }

    for (const slot of slots) {
      redraw(slot, html);
    }

    drawnHtml[name] = html;
  }

  for (const input of document.querySelectorAll("[data-input]")) {
    syncInput(input);
  }
}

// Redrawing replaces the elements in a slot, so focus is put back on the new element
// that matches the one that had it.
function redraw(slot, html) {
  const focused = slot.contains(document.activeElement) ? focusSelector(document.activeElement) : "";

  slot.innerHTML = html;

  if (focused) {
    slot.querySelector(focused)?.focus();
  }
}

function focusSelector(element) {
  const attributes = ["data-action", "data-input", "data-id", "name"];
  const present = attributes.filter((attribute) => element.hasAttribute(attribute));

  return present.map((attribute) => `[${attribute}="${CSS.escape(element.getAttribute(attribute))}"]`).join("");
}

// Lets an action reset or change an input (for example "Clear filters") through ui alone.
function syncInput(input) {
  const value = ui[input.dataset.input];

  if (input.type === "checkbox") {
    input.checked = value;
    return;
  }

  if (input.type === "radio") {
    input.checked = input.value === String(value);
    return;
  }

  if (input.value !== String(value)) {
    input.value = value;
  }
}

// Listeners sit on the document, so they survive redraws.
document.addEventListener("click", (event) => {
  const element = event.target.closest("[data-action]");

  if (element) {
    clickHandlers[element.dataset.action](element);
  }
});

// The input event also fires for selects, checkboxes, and radio buttons, so no separate
// change listener is needed.
document.addEventListener("input", (event) => {
  const name = event.target.dataset.input;

  if (name) {
    inputHandlers[name](event.target);
  }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = event.target.dataset.form;

  if (name) {
    formHandlers[name](Object.fromEntries(new FormData(event.target)));
  }
});

render();
```

The dialog markup above is a placeholder for the form. Backdrop, Escape to close, and focus
handling belong to the dialog component and are styled and built like any other component.

## Rules

### Data

- **No data in the markup.** The HTML holds empty `data-region` containers. Every name, row,
  count, and option comes from `db`. A name typed into the markup is a second copy that
  goes stale.
- **Link records by id.** A shift stores `employeeId`, not the employee's name, so a rename
  shows up everywhere. `ui` also stores ids (`selectedEmployeeId`), not record copies.
- **Never store what can be computed.** Counts, totals, badges, and filtered lists are
  query functions. A stored count goes stale the first time an action forgets to update it.
- **Handlers call actions, actions call `render()`.** No handler and no action touches the
  page. If something on screen has to change, the data behind it changes.
- **An action does everything the real backend call would.** Deleting a department also
  has to deal with its employees. Creating a record validates the input and sets its
  defaults and its id. Do not add fallbacks to queries for records that might be missing;
  a broken link is a bug in an action and should fail visibly.
- **Reloading resets the mockup.** Do not persist to `localStorage`; a demo that always
  starts from the same seed data is repeatable.

### Regions

- **Regions live in the static markup and are never nested.** A `data-region` container is
  written in the HTML, never produced by another region. A nested region is emptied when
  its parent redraws and is not filled again.
- **The same region can appear in several places.** Repeat the `data-region` container
  wherever that content is shown, as the skeleton does with `employee-count`.
- **Keep regions small.** A region that redraws loses the scroll position and typed text
  inside it. Give each independent page area its own region rather than drawing the whole
  page as one, so a change only redraws the areas that show it.
- **Make focusable elements identifiable.** Focus is restored after a redraw by matching
  `data-action`, `data-input`, `data-id`, and `name`. Two buttons in one region with the
  same action need a `data-id` to tell them apart.

### Inputs and forms

- **Keep inputs outside the regions they change.** The search field above is static markup,
  not part of `employee-rows`, so it keeps its text and cursor while the rows redraw on
  every keystroke.
- **Mirror filter inputs in `ui` with `data-input`.** The input handler writes the value to
  `ui`, and `render()` writes `ui` back to the input. An action such as "Clear filters"
  then only sets the `ui` field and the input follows.
- **Leave simple form drafts in the form.** Read the values on submit through the form
  handler. This only works while the form's region does not redraw during typing.
- **If a form changes while it is open, protect the draft.** Inline validation messages, a
  dropdown that depends on another field, or a saving state on the submit button all redraw
  the form's region and wipe what was typed. Either give the changing part its own region
  next to the form, or keep the draft fields in `ui`.

## Seed data

- Seed enough records to show the real states: a long name, an inactive record, an empty
  group, a list long enough to need scrolling if that is part of the design.
- Keep the seed consistent with itself: every `departmentId` points at a department that
  exists, and dates and amounts agree across records.

## Design variants

All variants in the file draw from the same `db`, each through its own regions (for example
`table-rows` and `card-grid`). An employee created in one variant then appears in the
others, and the variants are guaranteed to show the same content. Share `ui` as well, unless
the variants need independent selection or filters.

Each variant is its own static `<section>` that contains its regions and inputs. Do not
wrap a whole variant in a single region. A switcher that shows one variant at a time is
part of the mockup's frame, not of the mocked app, and may toggle `hidden` on the sections
directly.

## Simulated loading

Actions are synchronous by default. Only when a loading state is part of what the mockup
demonstrates, let the action set a flag in `ui`, render, and finish in a `setTimeout`. The
region reads the flag to show a spinner or disable its button.

```js
saveEmployee(id, changes) {
  ui.savingEmployeeId = id;
  render();

  setTimeout(() => {
    Object.assign(byId(db.employees, id), changes);
    ui.savingEmployeeId = null;

    render();
  }, 600);
},
```

An error state works the same way: the action sets a field such as `ui.saveError`, a region
shows it, and a dismiss action clears it. Give the error a fixed trigger, such as one
specific name that always fails, so it can be shown on demand.
