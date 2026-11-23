# Practical 7: NoSQL Database – MongoDB Blog Application

## Aim
Implement a document-oriented NoSQL database system using MongoDB and Mongoose ODM for a scalable Blog application with embedded comments and text search indexing.

## Concepts Demonstrated
1. **NoSQL Document Modeling with Mongoose**:
   - Schema types, default values, required validators, and enums.
   - Subdocuments: Embedding comments array inside blog posts.
   - Auto timestamps (`createdAt`, `updatedAt`).
2. **Text Search & Compound Indexing**:
   - `postSchema.index({ title: 'text', content: 'text' })` for keyword searches.
3. **Mongoose Query Methods**:
   - `Post.find()`, `Post.findById()`, `Post.create()`, `Post.findByIdAndUpdate()`, `Post.findByIdAndDelete()`.
   - Atomic operators: `$inc` for liking posts without race conditions.

## Project Structure
```
07-mongodb-blog-app/
├── package.json               # Dependencies: express, mongoose, dotenv, cors
├── .env.example               # MongoDB URI template
├── config/
│   └── db.js                  # Mongoose connection logic
├── models/
│   └── Post.js                # Blog post and comment schemas
├── controllers/
│   └── postController.js      # CRUD, comments, and like handlers
├── routes/
│   └── postRoutes.js          # REST routes
├── server.js                  # Express server entry point
└── README.md                  # Documentation & setup guide
```

## How to Set Up & Run

### Step 1: Install MongoDB or Use MongoDB Atlas (Cloud)
- **Local MongoDB**: Ensure MongoDB service is running on `mongodb://localhost:27017`
- **Cloud MongoDB Atlas**: Create a free tier cluster and get your connection string.

### Step 2: Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Set your `MONGODB_URI`:
```env
MONGODB_URI=mongodb://localhost:27017/blog_db
PORT=5003
```

### Step 3: Run the Server
```bash
cd "07-mongodb-blog-app"
npm install
npm start
```

## Sample API Requests (curl / Postman)

### 1. Create a Blog Post
```bash
curl -X POST http://localhost:5003/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mastering Full Stack Web Development",
    "content": "Full stack development involves mastering both client and server architectures...",
    "author": "Alex Rivera",
    "category": "Tech",
    "tags": ["fullstack", "javascript", "nodejs", "mongodb"]
  }'
```

### 2. Get All Posts (with tag filter)
```bash
curl "http://localhost:5003/api/posts?tag=nodejs"
```

### 3. Add a Comment to Post
```bash
curl -X POST http://localhost:5003/api/posts/<POST_ID>/comments \
  -H "Content-Type: application/json" \
  -d '{
    "author": "Sarah Connor",
    "text": "Great article! Very clear explanation of NoSQL schemas."
  }'
```

### 4. Like a Post
```bash
curl -X PATCH http://localhost:5003/api/posts/<POST_ID>/like
```
