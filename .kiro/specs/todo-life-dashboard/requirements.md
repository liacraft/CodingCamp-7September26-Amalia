# Requirements Document

## Introduction

The To-Do List Life Dashboard is a single-page, browser-based personal productivity tool built with HTML, CSS, and Vanilla JavaScript. It requires no backend, no login, and no build tools — users open `index.html` directly in a browser. The dashboard combines four core widgets: a live clock with a time-based greeting, a Pomodoro focus timer, a to-do list, and a quick links panel. All user data (tasks, links, preferences, and custom name) is stored in the browser's Local Storage so it persists across sessions on the same device.

Three optional enhancements are also included: a light/dark mode toggle, a custom name in the greeting, and duplicate task prevention.

---

## Glossary

- **Dashboard**: The single HTML page (`index.html`) that contains all four widgets and their controls.
- **Greeting_Widget**: The section of the Dashboard that displays the current time, date, and a personalised greeting message.
- **Timer_Widget**: The section of the Dashboard that implements the Pomodoro focus timer.
- **Todo_Widget**: The section of the Dashboard that manages the user's task list.
- **Links_Widget**: The section of the Dashboard that manages the user's quick-access website links.
- **Task**: A text entry in the Todo_Widget representing a single item the user wants to complete.
- **Link**: A saved website URL and label stored in the Links_Widget.
- **Local_Storage**: The browser's `localStorage` API used to persist all user data client-side.
- **Theme**: The visual colour scheme of the Dashboard, either "light" or "dark".
- **Pomodoro_Session**: A 25-minute (or user-configured) countdown interval managed by the Timer_Widget.
- **Duplicate_Task**: A Task whose trimmed, case-insensitive text matches an existing Task in the Todo_Widget.

---

## Requirements

### Requirement 1: Live Clock and Date Display

**User Story:** As a user, I want to see the current time and date on the Dashboard, so that I always know what time it is without leaving the page.

#### Acceptance Criteria

1. THE Greeting_Widget SHALL display the current time in HH:MM:SS format, updated every second.
2. THE Greeting_Widget SHALL display the current date in a human-readable format (e.g., "Monday, 26 September 2025").
3. WHEN the Dashboard is loaded, THE Greeting_Widget SHALL immediately render the correct time and date without requiring user interaction.
4. WHILE the Dashboard is open, THE Greeting_Widget SHALL continue updating the time display every second.

---

### Requirement 2: Time-Based Greeting

**User Story:** As a user, I want to see a greeting that reflects the time of day, so that the Dashboard feels personal and contextual.

#### Acceptance Criteria

1. WHEN the local hour is between 05:00 and 11:59, THE Greeting_Widget SHALL display the greeting "Good Morning".
2. WHEN the local hour is between 12:00 and 17:59, THE Greeting_Widget SHALL display the greeting "Good Afternoon".
3. WHEN the local hour is between 18:00 and 04:59 (inclusive of midnight), THE Greeting_Widget SHALL display the greeting "Good Evening".
4. THE Greeting_Widget SHALL update the greeting text if the Dashboard remains open across a time boundary (e.g., 11:59 → 12:00).

---

### Requirement 3: Custom Name in Greeting

**User Story:** As a user, I want to enter my name so the greeting addresses me personally, so that the Dashboard feels tailored to me.

#### Acceptance Criteria

1. THE Greeting_Widget SHALL provide an input field that allows the user to enter a custom name.
2. WHEN the user saves a custom name, THE Greeting_Widget SHALL append the name to the greeting (e.g., "Good Morning, Amalia").
3. WHEN the user saves a custom name, THE Dashboard SHALL persist the name in Local_Storage under the key `userName`.
4. WHEN the Dashboard is loaded and Local_Storage contains a saved `userName` value, THE Greeting_Widget SHALL display the saved name in the greeting without requiring re-entry.
5. IF the user clears the custom name field and saves, THEN THE Greeting_Widget SHALL display the greeting without a name suffix and SHALL remove the `userName` key from Local_Storage.

---

### Requirement 4: Pomodoro Focus Timer

**User Story:** As a user, I want a 25-minute countdown timer with start, stop, and reset controls, so that I can use the Pomodoro technique to stay focused.

#### Acceptance Criteria

1. THE Timer_Widget SHALL initialise the countdown display to 25:00 (minutes:seconds) when the Dashboard is loaded.
2. WHEN the user activates the Start control, THE Timer_Widget SHALL begin counting down from the current displayed time in one-second decrements.
3. WHILE the timer is running, THE Timer_Widget SHALL update the countdown display every second.
4. WHEN the user activates the Stop control, THE Timer_Widget SHALL pause the countdown at the current value without resetting it.
5. WHEN the user activates the Reset control, THE Timer_Widget SHALL stop any active countdown and restore the display to 25:00.
6. WHEN the countdown reaches 00:00, THE Timer_Widget SHALL stop the countdown automatically and notify the user with a browser alert or audio cue.
7. WHILE the timer is running, THE Timer_Widget SHALL disable the Start control to prevent duplicate intervals.
8. WHILE the timer is stopped or reset, THE Timer_Widget SHALL disable the Stop control.

---

### Requirement 5: To-Do List — Add and Display Tasks

**User Story:** As a user, I want to add tasks to a list and see them displayed, so that I can track what I need to do.

#### Acceptance Criteria

1. THE Todo_Widget SHALL provide a text input field and an Add button for entering new tasks.
2. WHEN the user submits a non-empty task text (via Add button or Enter key), THE Todo_Widget SHALL append the new Task to the task list and clear the input field.
3. IF the user attempts to submit an empty or whitespace-only task, THEN THE Todo_Widget SHALL not add the Task and SHALL keep focus on the input field.
4. THE Todo_Widget SHALL display all Tasks in the order they were added.
5. WHEN a Task is added, THE Todo_Widget SHALL persist the updated task list to Local_Storage under the key `tasks`.
6. WHEN the Dashboard is loaded and Local_Storage contains a saved `tasks` value, THE Todo_Widget SHALL render all persisted Tasks in their saved state.

---

### Requirement 6: To-Do List — Edit Tasks

**User Story:** As a user, I want to edit an existing task's text, so that I can correct mistakes or update what needs to be done.

#### Acceptance Criteria

1. THE Todo_Widget SHALL provide an Edit control for each Task in the list.
2. WHEN the user activates the Edit control for a Task, THE Todo_Widget SHALL replace the Task text display with an editable input field pre-populated with the current Task text.
3. WHEN the user saves an edited Task (via a Save/Confirm control or Enter key), THE Todo_Widget SHALL update the Task text and restore the display view.
4. IF the user saves an edited Task with empty or whitespace-only text, THEN THE Todo_Widget SHALL not update the Task and SHALL revert to the original text.
5. WHEN a Task is edited, THE Todo_Widget SHALL persist the updated task list to Local_Storage.

---

### Requirement 7: To-Do List — Mark Tasks as Done

**User Story:** As a user, I want to mark tasks as complete, so that I can see my progress at a glance.

#### Acceptance Criteria

1. THE Todo_Widget SHALL provide a checkbox or toggle control for each Task to mark it as done.
2. WHEN the user marks a Task as done, THE Todo_Widget SHALL visually distinguish the completed Task (e.g., strikethrough text or reduced opacity).
3. WHEN the user marks a completed Task again, THE Todo_Widget SHALL toggle the Task back to an incomplete state.
4. WHEN a Task's completion state changes, THE Todo_Widget SHALL persist the updated task list to Local_Storage.

---

### Requirement 8: To-Do List — Delete Tasks

**User Story:** As a user, I want to delete tasks I no longer need, so that my list stays relevant and uncluttered.

#### Acceptance Criteria

1. THE Todo_Widget SHALL provide a Delete control for each Task in the list.
2. WHEN the user activates the Delete control for a Task, THE Todo_Widget SHALL remove that Task from the list immediately.
3. WHEN a Task is deleted, THE Todo_Widget SHALL persist the updated task list to Local_Storage.

---

### Requirement 9: Prevent Duplicate Tasks

**User Story:** As a user, I want the app to prevent me from adding the same task twice, so that my list stays clean and deduplicated.

#### Acceptance Criteria

1. WHEN the user submits a new Task whose trimmed, case-insensitive text matches an existing Task in the Todo_Widget, THE Todo_Widget SHALL not add the duplicate Task.
2. WHEN a duplicate Task submission is rejected, THE Todo_Widget SHALL display a visible warning message to the user (e.g., "Task already exists").
3. WHEN a duplicate Task submission is rejected, THE Todo_Widget SHALL keep the input field populated with the submitted text so the user can modify it.

---

### Requirement 10: Quick Links — Add and Display Links

**User Story:** As a user, I want to save links to my favourite websites and open them with one click, so that I can navigate quickly without typing URLs.

#### Acceptance Criteria

1. THE Links_Widget SHALL provide input fields for a link label and a URL, and an Add button for saving new Links.
2. WHEN the user submits a Link with a non-empty label and a non-empty URL, THE Links_Widget SHALL add the Link to the link list and clear the input fields.
3. THE Links_Widget SHALL display each saved Link as a clickable button or anchor that opens the URL in a new browser tab.
4. IF the user attempts to submit a Link with an empty label or empty URL, THEN THE Links_Widget SHALL not add the Link.
5. WHEN a Link is added, THE Links_Widget SHALL persist the updated link list to Local_Storage under the key `quickLinks`.
6. WHEN the Dashboard is loaded and Local_Storage contains a saved `quickLinks` value, THE Links_Widget SHALL render all persisted Links.

---

### Requirement 11: Quick Links — Delete Links

**User Story:** As a user, I want to remove quick links I no longer need, so that the links panel stays tidy.

#### Acceptance Criteria

1. THE Links_Widget SHALL provide a Delete control for each saved Link.
2. WHEN the user activates the Delete control for a Link, THE Links_Widget SHALL remove that Link from the list immediately.
3. WHEN a Link is deleted, THE Links_Widget SHALL persist the updated link list to Local_Storage.

---

### Requirement 12: Light / Dark Mode Toggle

**User Story:** As a user, I want to switch between a light and dark colour scheme, so that I can use the Dashboard comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE Dashboard SHALL provide a toggle control to switch between "light" and "dark" themes.
2. WHEN the user activates the theme toggle, THE Dashboard SHALL apply the selected Theme to all visible elements without requiring a page reload.
3. WHEN the user selects a Theme, THE Dashboard SHALL persist the selected Theme in Local_Storage under the key `theme`.
4. WHEN the Dashboard is loaded and Local_Storage contains a saved `theme` value, THE Dashboard SHALL apply the saved Theme immediately on load, before the page is visible to the user (preventing a flash of the wrong theme).
5. IF Local_Storage does not contain a saved `theme` value, THEN THE Dashboard SHALL default to the "light" Theme on load.

---

### Requirement 13: Data Persistence and Storage Keys

**User Story:** As a user, I want my data to persist between browser sessions on the same device, so that I don't have to re-enter my tasks, links, and preferences each time.

#### Acceptance Criteria

1. THE Dashboard SHALL use Local_Storage as the sole persistence mechanism, with no backend calls.
2. THE Dashboard SHALL read from Local_Storage on every page load and restore all widgets to their last saved state.
3. THE Dashboard SHALL use the following reserved Local_Storage keys: `tasks` (task list), `quickLinks` (link list), `userName` (custom name), and `theme` (colour scheme).
4. IF Local_Storage data for a key is missing or unparseable, THEN THE Dashboard SHALL silently fall back to the default empty or initial state for the affected widget, without throwing an unhandled error.
