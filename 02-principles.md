# Software Engineering Principles in Confession Cathedral

This document outlines the core software engineering and React-specific principles utilized in the Confession Cathedral application, along with plain-language definitions and the exact lines of code where they appear.

---

## 1. Separation of Concerns
**Definition:** Breaking down a computer program into distinct sections so that each section addresses a separate, specific job. Instead of having one giant file do everything, different files handle different tasks.

**Where it appears:**
*   **The entire component structure:** 
    *   `src/components/ConfessionForm.jsx` handles only user input.
    *   `src/components/ConfessionItem.jsx` handles only the display and editing of a single confession.
    *   `src/components/ConfessionFeed.jsx` handles only the layout of the list.
    *   `src/App.jsx` handles only the overall layout and the global data.

## 2. Lifting State Up
**Definition:** Moving data (state) to a common "parent" component so that multiple "child" components can share and interact with that same data. 

**Where it appears:**
*   **`src/App.jsx` (Lines 6, 39, 46):** 
    The `confessions` array is managed in the `App` component. We "lifted" it here so that the `ConfessionForm` can add new items to it (via the `handleAddConfession` prop on line 39), and the `ConfessionFeed` can read and display it (via the `confessions` prop on line 46).

## 3. Immutability
**Definition:** The practice of never directly modifying (mutating) an existing data structure (like an array or object). Instead, when a change is needed, a brand-new copy of the data structure is created with the updated values. This prevents unpredictable bugs and allows React to know exactly when to redraw the screen.

**Where it appears:**
*   **`src/App.jsx` (Line 18):** 
    `setConfessions((prev) => [newConfession, ...prev]);`
    *(We don't use `prev.push(newConfession)`. We create a brand new array with `newConfession` at the front, followed by all the items from the old array `...prev`.)*
*   **`src/App.jsx` (Lines 22-28):** 
    `prev.map(confession => confession.id === id ? { ...confession, text: newText, isEdited: true } : confession)`
    *(When editing, we use `.map()` to create a completely new list, and the spread operator `{ ...confession }` to create a new object instead of changing the old one.)*

## 4. Controlled Components
**Definition:** A pattern in React where the form inputs (like text boxes) get their values directly from React's state memory, rather than the browser's HTML DOM. Every time the user types a key, React updates its memory, and then pushes that updated memory back into the input box.

**Where it appears:**
*   **`src/components/ConfessionForm.jsx` (Lines 34-36):**
    ```javascript
    value={nickname}
    onChange={(e) => setNickname(e.target.value)}
    ```
*   **`src/components/ConfessionForm.jsx` (Lines 47-49):**
    ```javascript
    value={text}
    onChange={(e) => setText(e.target.value)}
    ```
*   **`src/components/ConfessionItem.jsx` (Lines 60-61):**
    ```javascript
    value={editText}
    onChange={(e) => setEditText(e.target.value)}
    ```

## 5. Single Source of Truth
**Definition:** Designing data architectures so that every piece of critical data is stored in exactly one place. If other parts of the application need that data, they reference that one central place instead of keeping their own separate copies.

**Where it appears:**
*   **`src/App.jsx` (Line 6):** 
    `const [confessions, setConfessions] = useState([]);`
    The `App` component holds the one and only list of confessions. The `ConfessionFeed` component does not have its own `useState` for the list; it relies entirely on the data passed down to it from `App.jsx`.

## 6. Declarative UI
**Definition:** Writing code that describes *what* the user interface should look like based on the current data (state), rather than writing step-by-step instructions on *how* to change it (imperative programming).

**Where it appears:**
*   **`src/components/ConfessionItem.jsx` (Line 50):** 
    `{isEditing ? ( ... ) : ( ... )}`
    Instead of writing code that says "find the paragraph, hide it, create a textarea, and show it", we declaratively say: "If `isEditing` is true, show the textarea; otherwise, show the paragraph."
*   **`src/components/ConfessionForm.jsx` (Line 59):** 
    `disabled={isDisabled}`
    We declare that the button is disabled based on our logic variables, rather than manually targeting the button element with JavaScript to remove/add a disabled attribute.

## 7. Component Composition
**Definition:** Building complex user interfaces by combining smaller, simpler, reusable components together.

**Where it appears:**
*   **`src/components/ConfessionFeed.jsx` (Lines 17-23):** 
    ```javascript
    {confessions.map((confession) => (
      <ConfessionItem
        key={confession.id}
        confession={confession}
        onEdit={onEdit}
      />
    ))}
    ```
    The `ConfessionFeed` does not know how to display the nickname, the edit button, or the time. It simply "composes" a list by repeatedly rendering the `ConfessionItem` component, delegating those responsibilities.
