# Practical 2: JavaScript Basics – Form Validation & DOM Events

## Aim
Implement client-side form validation and interactive DOM event handling using vanilla JavaScript.

## Concepts Demonstrated
1. **DOM Selection**: `document.getElementById()`, `querySelector()`.
2. **DOM Event Handling**:
   - `input`: Real-time character validation as user types.
   - `blur`: Validates fields as soon as user clicks away.
   - `change`: Checkbox state handling.
   - `click`: Password visibility eye toggle, modal close.
   - `submit`: Intercepted with `event.preventDefault()` to stop browser reload and run comprehensive validation checks.
3. **Regular Expressions (RegEx)**:
   - Full Name: `^[a-zA-Z\s]{3,30}$`
   - Email: RFC 5322 compatible regex pattern.
   - Phone: `^[0-9]{10}$`
   - Strong Password: Minimum 8 characters with lowercase, uppercase, number, and special symbol.
4. **Dynamic DOM Manipulation**:
   - Adding/removing CSS classes (`.success`, `.error`, `.active`).
   - Dynamic password strength meter bar and color transitions.
   - Injected submission summary data modal.

## Project Structure
```
02-javascript-form-validation/
├── index.html       # HTML form structure and modal dialog
├── style.css        # Card layout, error states & animations
├── script.js        # DOM event listeners and validation algorithms
└── README.md        # Documentation
```

## How to Run
Open [index.html](file:///d:/Programs/fullstack%20pratical/02-javascript-form-validation/index.html) in any browser.
Test invalid inputs to observe real-time error states, then fill in valid details to see the confirmation modal.
