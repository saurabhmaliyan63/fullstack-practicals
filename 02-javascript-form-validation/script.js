// ==============================================================
// Practical 2: Form Validation & DOM Event Handling Logic
// Demonstrates:
// 1. DOM Element Selection
// 2. Event Listeners ('input', 'blur', 'submit', 'click')
// 3. Regular Expressions (RegEx) for Email, Phone & Password
// 4. Dynamic DOM Class & Style Manipulation
// 5. Form submission handling & data extraction
// ==============================================================

// DOM Elements Selection
const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsInput = document.getElementById('terms');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const successModal = document.getElementById('successModal');
const submittedData = document.getElementById('submittedData');
const closeModalBtn = document.getElementById('closeModalBtn');

// Control Wrappers
const nameControl = document.getElementById('nameControl');
const emailControl = document.getElementById('emailControl');
const phoneControl = document.getElementById('phoneControl');
const passwordControl = document.getElementById('passwordControl');
const confirmPasswordControl = document.getElementById('confirmPasswordControl');
const termsControl = document.getElementById('termsControl');

// -------------------------------------------------------------
// Helper Functions: Set Error or Success state in DOM
// -------------------------------------------------------------
function setError(control, message) {
  control.classList.remove('success');
  control.classList.add('error');
  const errorMsg = control.querySelector('.error-msg');
  if (errorMsg) errorMsg.textContent = message;
}

function setSuccess(control) {
  control.classList.remove('error');
  control.classList.add('success');
}

// -------------------------------------------------------------
// Validation Logic
// -------------------------------------------------------------

// 1. Full Name: Required, min 3 chars, letters and spaces only
function validateName() {
  const value = fullNameInput.value.trim();
  const nameRegex = /^[a-zA-Z\s]{3,30}$/;

  if (value === '') {
    setError(nameControl, 'Full name is required');
    return false;
  } else if (!nameRegex.test(value)) {
    setError(nameControl, 'Name must be 3-30 letters without special characters');
    return false;
  } else {
    setSuccess(nameControl);
    return true;
  }
}

// 2. Email: Valid RFC 5322-compatible regex format
function validateEmail() {
  const value = emailInput.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (value === '') {
    setError(emailControl, 'Email address is required');
    return false;
  } else if (!emailRegex.test(value)) {
    setError(emailControl, 'Please enter a valid email address (e.g., user@domain.com)');
    return false;
  } else {
    setSuccess(emailControl);
    return true;
  }
}

// 3. Phone: Exactly 10 digits
function validatePhone() {
  const value = phoneInput.value.trim();
  const phoneRegex = /^[0-9]{10}$/;

  if (value === '') {
    setError(phoneControl, 'Phone number is required');
    return false;
  } else if (!phoneRegex.test(value)) {
    setError(phoneControl, 'Phone number must be exactly 10 digits');
    return false;
  } else {
    setSuccess(phoneControl);
    return true;
  }
}

// 4. Password: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
function validatePassword() {
  const value = passwordInput.value;
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  updatePasswordStrength(value);

  if (value === '') {
    setError(passwordControl, 'Password is required');
    return false;
  } else if (!strongRegex.test(value)) {
    setError(passwordControl, 'Min 8 chars with 1 uppercase, 1 lowercase, 1 digit & 1 symbol');
    return false;
  } else {
    setSuccess(passwordControl);
    return true;
  }
}

// Dynamic Password Strength Meter
function updatePasswordStrength(password) {
  let score = 0;
  if (!password) {
    strengthBar.style.width = '0%';
    strengthBar.style.backgroundColor = 'transparent';
    strengthText.textContent = 'Password strength: None';
    return;
  }

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;

  switch (score) {
    case 1:
      strengthBar.style.width = '25%';
      strengthBar.style.backgroundColor = '#ef4444'; // Red
      strengthText.textContent = 'Password strength: Weak';
      strengthText.style.color = '#ef4444';
      break;
    case 2:
      strengthBar.style.width = '50%';
      strengthBar.style.backgroundColor = '#f59e0b'; // Amber
      strengthText.textContent = 'Password strength: Medium';
      strengthText.style.color = '#f59e0b';
      break;
    case 3:
      strengthBar.style.width = '75%';
      strengthBar.style.backgroundColor = '#3b82f6'; // Blue
      strengthText.textContent = 'Password strength: Good';
      strengthText.style.color = '#3b82f6';
      break;
    case 4:
      strengthBar.style.width = '100%';
      strengthBar.style.backgroundColor = '#10b981'; // Green
      strengthText.textContent = 'Password strength: Very Strong';
      strengthText.style.color = '#10b981';
      break;
    default:
      strengthBar.style.width = '15%';
      strengthBar.style.backgroundColor = '#ef4444';
      strengthText.textContent = 'Password strength: Very Weak';
      strengthText.style.color = '#ef4444';
  }
}

// 5. Confirm Password: Must strictly match password
function validateConfirmPassword() {
  const confirmVal = confirmPasswordInput.value;
  const passwordVal = passwordInput.value;

  if (confirmVal === '') {
    setError(confirmPasswordControl, 'Please re-enter your password');
    return false;
  } else if (confirmVal !== passwordVal) {
    setError(confirmPasswordControl, 'Passwords do not match');
    return false;
  } else {
    setSuccess(confirmPasswordControl);
    return true;
  }
}

// 6. Terms Checkbox
function validateTerms() {
  if (!termsInput.checked) {
    setError(termsControl, 'You must agree to the terms and conditions');
    return false;
  } else {
    termsControl.classList.remove('error');
    return true;
  }
}

// -------------------------------------------------------------
// DOM Event Listeners
// -------------------------------------------------------------

// Live feedback on 'input' event
fullNameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
passwordInput.addEventListener('input', () => {
  validatePassword();
  if (confirmPasswordInput.value.length > 0) {
    validateConfirmPassword();
  }
});
confirmPasswordInput.addEventListener('input', validateConfirmPassword);
termsInput.addEventListener('change', validateTerms);

// Validate on 'blur' (when user leaves input field)
fullNameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
passwordInput.addEventListener('blur', validatePassword);
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

// Password visibility toggle
togglePasswordBtn.addEventListener('click', () => {
  const currentType = passwordInput.getAttribute('type');
  const newType = currentType === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', newType);
  togglePasswordBtn.textContent = newType === 'password' ? '👁️' : '🙈';
});

// Form Submission Event
form.addEventListener('submit', (event) => {
  // Prevent default HTTP form submission/page reload
  event.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isPasswordValid = validatePassword();
  const isConfirmValid = validateConfirmPassword();
  const isTermsValid = validateTerms();

  const isFormValid = isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmValid && isTermsValid;

  if (isFormValid) {
    // Show submitted details in modal
    submittedData.innerHTML = `
      <strong>Registered Name:</strong> ${fullNameInput.value.trim()}<br>
      <strong>Email:</strong> ${emailInput.value.trim()}<br>
      <strong>Phone:</strong> +91 ${phoneInput.value.trim()}<br>
      <strong>Timestamp:</strong> ${new Date().toLocaleTimeString()}
    `;
    successModal.classList.add('active');
  }
});

// Close modal & reset form
closeModalBtn.addEventListener('click', () => {
  successModal.classList.remove('active');
  form.reset();
  [nameControl, emailControl, phoneControl, passwordControl, confirmPasswordControl, termsControl].forEach(c => {
    c.classList.remove('success', 'error');
  });
  updatePasswordStrength('');
});
