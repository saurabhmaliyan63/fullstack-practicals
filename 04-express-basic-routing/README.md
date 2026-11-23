# Practical 4: Express.js Server Setup & Basic Routing

## Aim
Initialize a Node.js server using the Express.js framework, implement basic routing for various HTTP verbs (GET, POST, PUT, DELETE), manage route and query parameters, and handle custom middleware.

## Concepts Demonstrated
1. **Express Server Lifecycle**:
   - Initializing the Express instance (`const app = express()`).
   - Starting the HTTP listener (`app.listen(PORT)`).
2. **HTTP Methods (CRUD Basics)**:
   - `app.get()`: Retrieve data.
   - `app.post()`: Create data with JSON request body.
   - `app.put()`: Update existing resource by ID.
   - `app.delete()`: Remove resource by ID.
3. **Route & Query Parameters**:
   - Route params: `req.params.id` from `/api/items/:id`.
   - Query strings: `req.query.q` from `/search?q=chair`.
4. **Middleware Layers**:
   - Built-in `express.json()` parser.
   - Custom logger middleware tracking timestamps and URLs.
   - Fallback 404 handler for nonexistent routes.
   - Global 4-parameter error handler `(err, req, res, next)`.

## Project Structure
```
04-express-basic-routing/
├── package.json    # Project config & dependencies
├── server.js        # Express application with routing & middleware
└── README.md       # API documentation & testing commands
```

## How to Run

1. Open a terminal in this directory:
   ```bash
   cd "04-express-basic-routing"
   ```
2. Install express:
   ```bash
   npm install
   ```
3. Run the server:
   ```bash
   npm start
   ```
4. Access the server in your browser or Postman at: `http://localhost:5000`

## API Testing Reference (curl / PowerShell)

- **Get Root Info**:
  ```bash
  curl http://localhost:5000/
  ```
- **Get All Items**:
  ```bash
  curl http://localhost:5000/api/items
  ```
- **Search Query**:
  ```bash
  curl "http://localhost:5000/search?q=keyboard"
  ```
- **Get Item By ID**:
  ```bash
  curl http://localhost:5000/api/items/1
  ```
- **Create New Item (POST)**:
  ```bash
  curl -X POST http://localhost:5000/api/items -H "Content-Type: application/json" -d "{\"name\":\"Wireless Mouse\",\"category\":\"Hardware\"}"
  ```
- **Update Item (PUT)**:
  ```bash
  curl -X PUT http://localhost:5000/api/items/1 -H "Content-Type: application/json" -d "{\"name\":\"Full Stack Mastery Bootcamp\"}"
  ```
- **Delete Item (DELETE)**:
  ```bash
  curl -X DELETE http://localhost:5000/api/items/2
  ```
