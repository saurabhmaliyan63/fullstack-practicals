# Practical 3: React.js To-Do List Application

## Aim
Build an interactive, modular To-Do application using the React front-end library, highlighting core React concepts like component architecture, JSX syntax, state management with Hooks, and local storage synchronization.

## Concepts Demonstrated
1. **React Hooks**:
   - `useState`: Manages tasks array, text input string, and active filter tab.
   - `useEffect`: Watches state changes and serializes todos to `localStorage`.
2. **Component Lifecycle & Immutability**:
   - Non-mutating state updates using array methods (`map()`, `filter()`, spread operator `[...]`).
3. **Event Handling in React**:
   - Form submission `onSubmit` handling with `e.preventDefault()`.
   - Controlled input component using `value` and `onChange`.
4. **Conditional Rendering & List Keys**:
   - Rendering empty state vs list items.
   - Using unique keys (`todo.id`) for optimized virtual DOM reconciliation.

## Project Structure
```
03-react-todo-app/
├── standalone.html    # Standalone zero-install React 18 file (Double-click to run!)
├── package.json       # Dependencies & build scripts (Vite + React)
├── vite.config.js     # Vite configuration
├── index.html         # HTML root for Vite
├── src/
│   ├── App.jsx        # Main Todo application component
│   ├── main.jsx       # React DOM root render
│   └── index.css      # CSS styles
└── README.md          # Practical documentation
```

## How to Run

### Option A: Instant Run (No Node.js / No install required)
Just double click or open [standalone.html](file:///d:/Programs/fullstack%20pratical/03-react-todo-app/standalone.html) in your browser! It loads React 18 & Babel via CDN.

### Option B: Modern Vite Development Server
1. Open terminal inside this folder:
   ```bash
   cd "03-react-todo-app"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173` in your browser.
