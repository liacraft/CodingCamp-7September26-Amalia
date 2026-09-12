# Implementation Plan: To-Do List Life Dashboard

## Overview

Build a single-page, client-side dashboard from scratch as exactly three files: `index.html`, `css/style.css`, and `js/app.js`. Each task group produces a working, testable increment. Tasks are ordered so that every step integrates with what came before — no orphaned code.

---

## Tasks

- [x] 1. Project scaffolding — create the three empty project files
  - Create `index.html` at the project root (minimal valid HTML5 boilerplate linking `css/style.css` and `js/app.js`)
  - Create `css/style.css` (empty file with a top comment)
  - Create `js/app.js` (empty file with a top comment and ten section headers matching the design's organisation)
  - _Requirements: 13.1_

- [x] 2. HTML structure — write all widget markup in `index.html`
  - [x] 2.1 Add the theme toggle button (`#theme-toggle`) in `<body>` before `<main>`
    - Must carry `aria-label="Toggle dark mode"` for accessibility
    - _Requirements: 12.1_
  - [x] 2.2 Add the Greeting widget section (`#widget-greeting`) inside `.dashboard-grid`
    - Include `#date`, `#clock`, `#greeting`, `#name-input`, `#name-save` exactly as specified in the design
    - _Requirements: 1.1, 1.2, 2.1, 3.1_
  - [x] 2.3 Add the Timer widget section (`#widget-timer`) inside `.dashboard-grid`
    - Include `#timer-display` (initial text "25:00"), `#timer-start`, `#timer-stop` (disabled), `#timer-reset`
    - _Requirements: 4.1, 4.7, 4.8_
  - [x] 2.4 Add the Todo widget section (`#widget-todo`) inside `.dashboard-grid`
    - Include `#todo-input`, `#todo-add`, `#duplicate-warning` (hidden paragraph), `#todo-list` (`<ul>`)
    - _Requirements: 5.1, 9.2_
  - [x] 2.5 Add the Links widget section (`#widget-links`) inside `.dashboard-grid`
    - Include `#link-label`, `#link-url`, `#link-add`, `#links-list`
    - _Requirements: 10.1_

- [x] 3. CSS foundation — layout, widget cards, and base typography in `style.css`
  - [x] 3.1 Define CSS custom properties for both light and dark themes on `:root` and `[data-theme="dark"]`
    - Variables: `--bg-primary`, `--bg-secondary`, `--text-primary`, `--text-muted`, `--accent`, `--border`, `--shadow`, `--done-opacity` (exact values from design)
    - _Requirements: 12.2, 12.5_
  - [x] 3.2 Write the responsive `.dashboard-grid` CSS grid layout
    - Two-column grid on wide screens, single-column on narrow screens (media query)
    - _Requirements: 1.3_
  - [x] 3.3 Style `.widget` card (background, border-radius, padding, box-shadow using CSS variables)
    - _Requirements: 1.3_
  - [x] 3.4 Style base typography: `body`, `h1`, `h2`, `p`, and general font settings using CSS variables
    - _Requirements: 1.1, 1.2_
  - [x] 3.5 Style the theme toggle button (`#theme-toggle`) — fixed position, top-right corner
    - _Requirements: 12.1_

- [x] 4. CSS components — widget-specific styles and visual polish
  - [x] 4.1 Style the Greeting widget: `#clock` (large display), `#date`, `#greeting`, `.name-row` (flex row)
    - _Requirements: 1.1, 1.2, 2.1, 3.2_
  - [x] 4.2 Style the Timer widget: `#timer-display` (large monospace countdown), `.timer-controls` button row
    - Include disabled-state opacity for Start/Stop buttons
    - _Requirements: 4.1, 4.7, 4.8_
  - [x] 4.3 Style the Todo widget: `.todo-input-row`, `#todo-list` (`<ul>`), individual task `<li>` items
    - Completed task style: strikethrough text and reduced opacity using `--done-opacity`
    - `.warning` visible/hidden states (the `hidden` class hides `#duplicate-warning`)
    - _Requirements: 5.1, 7.2, 9.2_
  - [x] 4.4 Style the Links widget: `.links-input-row`, link buttons in `#links-list`
    - Link buttons should look clickable and open-on-hover
    - _Requirements: 10.1, 10.3_
  - [x] 4.5 Style form controls globally: `<input>`, `<button>` — consistent padding, border, focus ring
    - _Requirements: 5.1, 6.1, 10.1_

- [x] 5. JavaScript utilities and state — SECTION 1 & 2 of `app.js`
  - [x] 5.1 Declare all module-scoped state variables
    - `tasks[]`, `links[]`, `timerSeconds` (default 1500), `timerInterval` (null), `clockInterval` (null)
    - _Requirements: 4.1, 5.4, 10.4_
  - [x] 5.2 Implement `generateId()` — `crypto.randomUUID()` with fallback to `Date.now() + Math.random()`
    - _Requirements: 13.4_
  - [x] 5.3 Implement pure formatting utilities: `padTwo(n)`, `formatTime(date)`, `formatDate(date)`, `formatTimer(seconds)`, `getGreeting(hour)`
    - `formatTime` → "HH:MM:SS"; `formatDate` → "Weekday, DD Month YYYY"; `formatTimer` → "MM:SS"; `getGreeting` → hours 5–11 Morning, 12–17 Afternoon, all others Evening
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 4.2_
  - [ ]* 5.4 Write property test for `getGreeting` (Property 11)
    - **Property 11: Time-based greeting covers all hours**
    - Use `fc.integer({min: 0, max: 23})`; assert result is exactly one of the three valid strings; cover boundary hours 5, 11, 12, 17, 18, 0, 4, 23
    - **Validates: Requirements 2.1, 2.2, 2.3**
  - [ ]* 5.5 Write unit tests for `formatTimer`, `formatTime`, `formatDate`
    - `formatTimer(1500)` → "25:00", `formatTimer(0)` → "00:00", `formatTimer(61)` → "01:01"
    - _Requirements: 1.1, 4.1_

- [x] 6. JavaScript localStorage helpers — SECTION 3 of `app.js`
  - [x] 6.1 Implement `loadTasks()` and `persistTasks()`
    - `loadTasks`: `JSON.parse(localStorage.tasks)` with `try/catch` → falls back to `[]`; assigns result to `tasks`
    - `persistTasks`: `JSON.stringify(tasks)` → `localStorage.tasks` wrapped in `try/catch`
    - _Requirements: 5.5, 5.6, 13.2, 13.4_
  - [x] 6.2 Implement `loadLinks()` and `persistLinks()`
    - Same pattern as tasks but for `localStorage.quickLinks` and the `links` array
    - _Requirements: 10.5, 10.6, 13.2, 13.4_
  - [x] 6.3 Implement `loadUserName()` and `persistUserName(name)`
    - `loadUserName`: reads `localStorage.userName`; returns `""` if absent
    - `persistUserName("")`: removes the key; non-empty: sets the key
    - _Requirements: 3.3, 3.4, 3.5, 13.3_
  - [-] 6.4 Implement `loadTheme()` (reading only; `persistTheme` lives in the Theme component)
    - Returns `localStorage.theme` or `"light"` as default
    - _Requirements: 12.4, 12.5, 13.3_
  - [ ]* 6.5 Write property test for task persistence round-trip (Property 3)
    - **Property 3: Task persistence round-trip**
    - Use `fc.array(fc.record({id: fc.string(), text: fc.string(), done: fc.boolean()}))`; assert deep equality after `persistTasks()` → `loadTasks()`
    - **Validates: Requirements 5.5, 5.6, 7.4, 8.3, 13.2**
  - [ ]* 6.6 Write property test for links persistence round-trip (Property 10)
    - **Property 10: Links persistence round-trip**
    - Use `fc.array(fc.record({id: fc.string(), label: fc.string(), url: fc.string()}))`; assert deep equality after `persistLinks()` → `loadLinks()`
    - **Validates: Requirements 10.5, 10.6, 11.3, 13.2**
  - [ ]* 6.7 Write property test for corrupt localStorage fallback (Property 13)
    - **Property 13: Corrupt localStorage data returns empty default without throwing**
    - Use `fc.string().filter(s => { try { JSON.parse(s); return false; } catch { return true; } })`; assert `loadTasks()` / `loadLinks()` returns `[]` without throwing
    - **Validates: Requirements 13.4**

- [~] 7. Checkpoint — Ensure all utility and storage tests pass
  - Confirm `getGreeting`, `formatTimer`, and all `load*`/`persist*` functions behave correctly before building UI components on top of them.
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. JavaScript Theme component — SECTION 4 of `app.js`
  - [~] 8.1 Implement `applyTheme(theme)` and `persistTheme(theme)`
    - `applyTheme`: sets `document.documentElement.dataset.theme`; updates `#theme-toggle` icon (🌙 / ☀️)
    - `persistTheme`: writes `localStorage.theme` wrapped in `try/catch`
    - _Requirements: 12.2, 12.3_
  - [~] 8.2 Implement `toggleTheme()`
    - Reads current `document.documentElement.dataset.theme`, flips it, calls `applyTheme()` and `persistTheme()`
    - _Requirements: 12.2, 12.3_
  - [ ]* 8.3 Write property test for theme toggle inverse (Property 12)
    - **Property 12: Theme toggle is its own inverse**
    - Use `fc.constantFrom("light", "dark")`; call `toggleTheme()` twice; assert DOM attribute and `localStorage` restored to original
    - **Validates: Requirements 12.2, 12.3**

- [ ] 9. JavaScript Clock/Greeting component — SECTION 5 of `app.js`
  - [~] 9.1 Implement `updateClock()`
    - Creates a `new Date()`; writes formatted time to `#clock`, formatted date to `#date`
    - Calls `getGreeting(hour)` and appends `userName` (from `localStorage`) to `#greeting`
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4, 3.2, 3.4_
  - [~] 9.2 Implement `startClock()`
    - Calls `updateClock()` immediately, then `setInterval(updateClock, 1000)` stored in `clockInterval`
    - _Requirements: 1.3, 1.4_
  - [~] 9.3 Implement `saveName()`
    - Reads `#name-input` value; trims it; calls `persistUserName()`; calls `updateClock()` to refresh greeting immediately
    - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [ ] 10. JavaScript Timer component — SECTION 6 of `app.js`
  - [~] 10.1 Implement `renderTimerDisplay()` and `updateTimerButtons(running)`
    - `renderTimerDisplay`: formats `timerSeconds` and writes to `#timer-display`
    - `updateTimerButtons`: sets `disabled` on `#timer-start` when running; sets `disabled` on `#timer-stop` when not running
    - _Requirements: 4.3, 4.7, 4.8_
  - [~] 10.2 Implement `tickTimer()`
    - Decrements `timerSeconds`; calls `renderTimerDisplay()`; when `timerSeconds === 0` calls `stopTimer()` and fires `window.alert()`
    - _Requirements: 4.3, 4.6_
  - [~] 10.3 Implement `startTimer()`, `stopTimer()`, `resetTimer()`
    - `startTimer`: guards against duplicate interval; sets `timerInterval = setInterval(tickTimer, 1000)`; calls `updateTimerButtons(true)`
    - `stopTimer`: clears `timerInterval`; sets `timerInterval = null`; calls `updateTimerButtons(false)`
    - `resetTimer`: calls `stopTimer()`; resets `timerSeconds = 1500`; calls `renderTimerDisplay()`
    - _Requirements: 4.2, 4.4, 4.5, 4.7, 4.8_

- [ ] 11. JavaScript Todo component — SECTION 7 of `app.js`
  - [~] 11.1 Implement `isDuplicate(text)` and `renderTasks()`
    - `isDuplicate`: trims and lowercases input; checks against every task in `tasks[]`; returns boolean
    - `renderTasks`: clears and rebuilds `#todo-list` innerHTML from `tasks[]`; each `<li>` has `data-id`; applies `.done` class for completed tasks; includes Edit, Delete, and checkbox controls per task
    - _Requirements: 5.4, 7.2, 9.1_
  - [ ]* 11.2 Write property test for duplicate detection (Property 4)
    - **Property 4: Duplicate task is rejected**
    - Build a task array; generate candidate text matching an existing task (same/different case/trim); assert `tasks` array unchanged after `addTask()` attempt
    - **Validates: Requirements 9.1**
  - [~] 11.3 Implement `addTask()`
    - Reads and trims `#todo-input`; rejects empty input (keeps focus); calls `isDuplicate()`; if duplicate shows `#duplicate-warning` and keeps input text; otherwise pushes `{id, text, done: false}` to `tasks[]`, hides warning, clears input, calls `persistTasks()` and `renderTasks()`
    - _Requirements: 5.2, 5.3, 5.5, 9.1, 9.2, 9.3_
  - [ ]* 11.4 Write property test for valid task addition (Property 1)
    - **Property 1: Valid task addition grows the list**
    - Use `fc.string().filter(s => s.trim().length > 0)` for text not already in tasks; assert `tasks.length === original + 1` and new task text equals trimmed input
    - **Validates: Requirements 5.2**
  - [ ]* 11.5 Write property test for whitespace task rejection (Property 2)
    - **Property 2: Whitespace-only task is rejected**
    - Use `fc.string().map(s => s.replace(/\S/g, ' '))`; assert `tasks` array completely unchanged
    - **Validates: Requirements 5.3**
  - [~] 11.6 Implement `toggleTask(id)` and `deleteTask(id)`
    - `toggleTask`: finds task by `id`; flips `task.done`; calls `persistTasks()` and `renderTasks()`
    - `deleteTask`: filters out task with matching `id`; calls `persistTasks()` and `renderTasks()`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 8.1, 8.2, 8.3_
  - [ ]* 11.7 Write property test for toggle inverse (Property 5)
    - **Property 5: Task completion toggle is its own inverse**
    - Use `fc.boolean()`; assert `toggle(toggle(done)) === done`
    - **Validates: Requirements 7.3**
  - [ ]* 11.8 Write property test for delete removes one (Property 6)
    - **Property 6: Task deletion removes exactly one item**
    - Task array with ≥1 item and valid `id`; assert length − 1, `id` absent, all others intact
    - **Validates: Requirements 8.2**
  - [~] 11.9 Implement `startEditTask(id)` and `saveEditTask(id, text)`
    - `startEditTask`: in `renderTasks` output, replaces text span with a pre-filled `<input>` and Save/Cancel controls for the target task
    - `saveEditTask`: trims new text; if non-empty updates `task.text`, calls `persistTasks()` and `renderTasks()`; if empty reverts (calls `renderTasks()` without saving)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  - [ ]* 11.10 Write property test for edit outcome (Property 7)
    - **Property 7: Task edit outcome depends on text validity**
    - Use `fc.string()` for candidate text; assert non-empty → task text updated; whitespace-only → task text unchanged
    - **Validates: Requirements 6.3, 6.4**

- [ ] 12. JavaScript Links component — SECTION 8 of `app.js`
  - [~] 12.1 Implement `renderLinks()`
    - Rebuilds `#links-list` from `links[]`; each entry is an `<a target="_blank">` wrapped with a Delete button; uses `data-id`
    - Normalises URL: prepends `"https://"` if URL does not start with `http://` or `https://`
    - _Requirements: 10.3, 10.6_
  - [~] 12.2 Implement `addLink()`
    - Reads and trims `#link-label` and `#link-url`; rejects if either is empty; pushes `{id, label, url}` to `links[]`; calls `persistLinks()` and `renderLinks()`; clears input fields
    - _Requirements: 10.2, 10.4, 10.5_
  - [ ]* 12.3 Write property test for valid link addition (Property 8)
    - **Property 8: Valid link addition grows the links list**
    - Use `fc.record({label: fc.string().filter(s=>s.trim()!==''), url: fc.string().filter(s=>s.trim()!=='')})`; assert `links.length === original + 1` and entry contains label/URL
    - **Validates: Requirements 10.2**
  - [ ]* 12.4 Write property test for empty label/URL rejection (Property 9)
    - **Property 9: Empty label or URL prevents link addition**
    - Generate link with empty label, empty URL, or both; assert `links` array unchanged
    - **Validates: Requirements 10.4**
  - [~] 12.5 Implement `deleteLink(id)`
    - Filters out link with matching `id`; calls `persistLinks()` and `renderLinks()`
    - _Requirements: 11.2, 11.3_

- [~] 13. Checkpoint — Ensure all component tests pass
  - Confirm all Todo and Links property tests pass before wiring events.
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 14. JavaScript event wiring and init — SECTION 9 & 10 of `app.js`
  - [~] 14.1 Wire all event listeners in SECTION 9
    - `#theme-toggle` → `toggleTheme()`
    - `#name-save` → `saveName()`
    - `#name-input` keydown Enter → `saveName()`
    - `#timer-start` → `startTimer()`; `#timer-stop` → `stopTimer()`; `#timer-reset` → `resetTimer()`
    - `#todo-add` → `addTask()`; `#todo-input` keydown Enter → `addTask()`
    - `#todo-list` delegated click → `toggleTask`, `deleteTask`, `startEditTask`, `saveEditTask` (matched by `data-action` or class)
    - `#link-add` → `addLink()`
    - `#links-list` delegated click → `deleteLink` (matched by `data-action`)
    - _Requirements: 2.4, 3.1, 4.2, 4.4, 4.5, 5.2, 6.2, 7.1, 8.2, 10.2, 11.2, 12.1_
  - [~] 14.2 Implement the `DOMContentLoaded` init handler in SECTION 10
    - Call `loadTheme()` first (before anything else, to prevent flash of wrong theme)
    - Call `loadUserName()`, `loadTasks()`, `loadLinks()`
    - Call `applyTheme(loadTheme())`, `renderTasks()`, `renderLinks()`
    - Call `startClock()`, `renderTimerDisplay()`, `updateTimerButtons(false)`
    - _Requirements: 1.3, 3.4, 4.1, 5.6, 10.6, 12.4, 13.2_

- [~] 15. Final checkpoint — Full integration check
  - Open `index.html` directly in a browser; verify all four widgets render with persisted data, theme applies without flash, clock ticks, timer counts down, tasks and links add/delete correctly.
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints at tasks 7, 13, and 15 ensure incremental validation
- Property tests (P1–P13) validate universal correctness properties; unit tests validate specific examples
- The PBT test harness (`tests/index.html` + `tests/pbt.js`) is development-only and not part of the three production files
- All `localStorage` reads and writes are wrapped in `try/catch` throughout

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5"] },
    { "id": 2, "tasks": ["3.1", "3.2", "3.3", "3.4", "3.5", "5.1", "5.2", "5.3"] },
    { "id": 3, "tasks": ["4.1", "4.2", "4.3", "4.4", "4.5", "5.4", "5.5", "6.1", "6.2", "6.3", "6.4"] },
    { "id": 4, "tasks": ["6.5", "6.6", "6.7", "8.1"] },
    { "id": 5, "tasks": ["8.2", "9.1", "10.1"] },
    { "id": 6, "tasks": ["8.3", "9.2", "9.3", "10.2", "11.1", "12.1"] },
    { "id": 7, "tasks": ["10.3", "11.2", "11.3", "12.2"] },
    { "id": 8, "tasks": ["11.4", "11.5", "11.6", "12.3", "12.4", "12.5"] },
    { "id": 9, "tasks": ["11.7", "11.8", "11.9"] },
    { "id": 10, "tasks": ["11.10", "14.1"] },
    { "id": 11, "tasks": ["14.2"] }
  ]
}
```
