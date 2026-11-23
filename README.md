# Full Stack Web Development Practical Lab Repository

A comprehensive, clean, and beginner-friendly repository containing complete solutions for 10 core Full Stack Web Development practicals. Each practical is contained within its own dedicated folder with standalone code, documentation, and instructions.

---

## Index of Practicals

| # | Practical Topic | Tech Stack | Folder Link | Key Highlights |
|---|----------------|------------|-------------|----------------|
| **01** | **Responsive Personal Portfolio** | HTML5, CSS3, JS | [01-responsive-portfolio](./01-responsive-portfolio/) | Semantic tags, Flexbox & CSS Grid, smooth scroll, mobile hamburger menu. |
| **02** | **Form Validation & DOM Events** | Vanilla JS, DOM, CSS | [02-javascript-form-validation](./02-javascript-form-validation/) | RegEx email/phone/password validation, strength meter, live feedback, modal. |
| **03** | **React To-Do List Application** | React 18, Vite | [03-react-todo-app](./03-react-todo-app/) | `useState`, `useEffect`, `localStorage` persistence, filters (All/Active/Done). Includes `standalone.html` for zero-install run! |
| **04** | **Express.js Server & Routing** | Express.js, Node.js | [04-express-basic-routing](./04-express-basic-routing/) | HTTP GET, POST, PUT, DELETE, route parameters, query strings, custom logger. |
| **05** | **Student Management CRUD API** | Express.js, REST API | [05-student-management-crud-api](./05-student-management-crud-api/) | MVC architecture, full CRUD, course/grade filters, aggregate statistical summary. |
| **06** | **MySQL Database Integration** | Express, MySQL, SQL | [06-mysql-database-integration](./06-mysql-database-integration/) | `mysql2` connection pool, prepared statements (`?`), SQL migration script (`schema.sql`). |
| **07** | **MongoDB Blog Application** | Express, Mongoose | [07-mongodb-blog-app](./07-mongodb-blog-app/) | NoSQL schema modeling, embedded comments subdocument, text search indexing, likes. |
| **08** | **JWT Authentication & Bcrypt** | Express, JWT, Bcrypt | [08-jwt-authentication](./08-jwt-authentication/) | Salted password hashing, JWT issue & verify middleware, RBAC (`user`/`admin`), interactive web tester. |
| **09** | **Full Stack E-Commerce Store** | Express + Vanilla JS | [09-fullstack-ecommerce](./09-fullstack-ecommerce/) | Complete store: live catalog search, category pills, slide-over cart drawer, checkout modal, order API. |
| **10** | **Cloud Deployment & Git Guide** | Netlify, Render, Git | [10-deployment-guide](./10-deployment-guide/) | GitHub CI/CD, Netlify frontend, Render/Heroku backend, `Procfile`, `netlify.toml`, `render.yaml`. |

---

## Directory Structure

```
fullstack pratical/
├── 01-responsive-portfolio/              # Practical 1: Responsive Portfolio
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
│
├── 02-javascript-form-validation/        # Practical 2: Form Validation & DOM Events
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
│
├── 03-react-todo-app/                    # Practical 3: React To-Do List
│   ├── standalone.html                   # (Double-click to run immediately!)
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── README.md
│
├── 04-express-basic-routing/             # Practical 4: Express Routing & Middleware
│   ├── package.json
│   ├── server.js
│   └── README.md
│
├── 05-student-management-crud-api/       # Practical 5: Student Management CRUD
│   ├── package.json
│   ├── server.js
│   ├── models/studentModel.js
│   ├── controllers/studentController.js
│   ├── routes/studentRoutes.js
│   └── README.md
│
├── 06-mysql-database-integration/        # Practical 6: MySQL Database Integration
│   ├── package.json
│   ├── .env.example
│   ├── schema.sql
│   ├── config/db.js
│   ├── controllers/studentDbController.js
│   ├── routes/studentRoutes.js
│   ├── server.js
│   └── README.md
│
├── 07-mongodb-blog-app/                  # Practical 7: MongoDB Blog Application
│   ├── package.json
│   ├── .env.example
│   ├── config/db.js
│   ├── models/Post.js
│   ├── controllers/postController.js
│   ├── routes/postRoutes.js
│   ├── server.js
│   └── README.md
│
├── 08-jwt-authentication/                # Practical 8: JWT Auth & Bcrypt
│   ├── package.json
│   ├── .env.example
│   ├── middleware/authMiddleware.js
│   ├── controllers/authController.js
│   ├── routes/authRoutes.js
│   ├── test-client.html                  # Interactive browser test client
│   ├── server.js
│   └── README.md
│
├── 09-fullstack-ecommerce/               # Practical 9: Full Stack E-Commerce
│   ├── backend/
│   │   ├── package.json
│   │   ├── server.js
│   │   ├── data/products.json
│   │   └── routes/
│   │       ├── productRoutes.js
│   │       └── orderRoutes.js
│   ├── frontend/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── app.js
│   └── README.md
│
└── 10-deployment-guide/                  # Practical 10: Netlify, Heroku & Git
    ├── DEPLOYMENT_GUIDE.md
    ├── GIT_CHEAT_SHEET.md
    ├── README.md
    └── config-templates/
        ├── netlify.toml
        ├── _redirects
        ├── Procfile
        ├── render.yaml
        └── vercel.json
```

---

## Quick Start Summary

- **Frontend Practicals (01, 02, 03-standalone, 08-client, 09-frontend)**: Can be opened and tested directly in any browser with zero setup.
- **Node.js/Express Practicals (04, 05, 06, 07, 08, 09-backend)**: Run `npm install` followed by `npm start` inside each respective directory.
