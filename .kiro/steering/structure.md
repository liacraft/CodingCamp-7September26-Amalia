# Project Structure

## Folder Layout

```
CodingCamp-7September26-Amalia/
├── index.html          # Single HTML entry point
├── css/
│   └── style.css       # Only 1 CSS file allowed
├── js/
│   └── app.js          # Only 1 JS file allowed
├── .kiro/
│   └── steering/
└── README.md
```

## Folder Rules

- `css/` — exactly 1 file: `style.css`
- `js/` — exactly 1 file: `app.js`
- All HTML lives in `index.html` at the root
- No subfolders for components, modules, or partials

## Code Conventions

- Keep code clean, readable, and well-commented
- Use meaningful variable and function names
- Group related logic together in `app.js` (e.g., timer functions together, todo functions together)
- CSS should use clear class names that reflect the UI section (e.g., `.todo-list`, `.timer`, `.quick-links`)

## Design Guidelines

- Clean, minimal interface with clear visual hierarchy
- Readable typography
- User-friendly aesthetic
- No complex setup or configuration required for the end user
