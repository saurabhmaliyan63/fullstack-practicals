# Practical 8: Authentication – JWT Login & Signup with Bcrypt

## Aim
Implement user registration (Signup) with `bcryptjs` password hashing and user login issuing signed JSON Web Tokens (JWT), alongside protected route authorization middleware.

## Concepts Demonstrated
1. **Password Hashing with Bcrypt**:
   - Salting (`bcrypt.genSalt(10)`) and one-way hashing (`bcrypt.hash()`).
   - Secure constant-time password comparison (`bcrypt.compare()`).
   - Protecting user credentials by never persisting plaintext passwords.
2. **JSON Web Tokens (JWT)**:
   - Token structure: Header (algorithm), Payload (user claims), Signature (HMAC SHA-256).
   - Signing tokens with secret key and expiration timestamp (`jwt.sign()`).
3. **Authorization Middleware**:
   - Intercepting HTTP requests, parsing `Authorization: Bearer <token>`.
   - Validating signature and expiry using `jwt.verify()`.
   - Attaching verified payload to `req.user`.
4. **Role-Based Access Control (RBAC)**:
   - Differentiating regular `user` privileges from `admin` access.

## Project Structure
```
08-jwt-authentication/
├── package.json                   # Dependencies: express, bcryptjs, jsonwebtoken, cors, dotenv
├── .env.example                   # JWT_SECRET and expiration config
├── middleware/
│   └── authMiddleware.js          # verifyToken & authorizeRoles middleware
├── controllers/
│   └── authController.js          # signup, login, getProfile, getAdminDashboard
├── routes/
│   └── authRoutes.js              # Public and protected endpoints
├── test-client.html               # Interactive browser client to test JWT visually!
├── server.js                      # Express server entry point
└── README.md                      # Documentation & instructions
```

## How to Set Up & Run

1. Open a terminal in this directory:
   ```bash
   cd "08-jwt-authentication"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Test in browser:
   Open [test-client.html](file:///d:/Programs/fullstack%20pratical/08-jwt-authentication/test-client.html) directly in your browser for a full graphical interface to signup, login, and inspect your JWT token!

## Sample API Requests (curl)

### 1. Register a New User (POST)
```bash
curl -X POST http://localhost:5004/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "Password123!",
    "role": "user"
  }'
```

### 2. Log In & Receive JWT Token (POST)
```bash
curl -X POST http://localhost:5004/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "Password123!"
  }'
```

### 3. Access Protected Route (GET with Bearer Token)
```bash
curl http://localhost:5004/api/auth/profile \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN_HERE>"
```
