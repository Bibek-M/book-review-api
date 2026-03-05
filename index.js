const express = require("express");
const bodyParser = require("body-parser");

const books = require("./booksdb");
const users = require("./usersdb");

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

/////////////////////////////
// TASK 1
// Get all books
/////////////////////////////

app.get("/books", (req, res) => {
  res.json(books);
});

/////////////////////////////
// TASK 2
// Get book by ISBN
/////////////////////////////

app.get("/books/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    res.json(books[isbn]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/////////////////////////////
// TASK 3
// Get books by author
/////////////////////////////

app.get("/books/author/:author", (req, res) => {
  const author = req.params.author;

  const result = Object.values(books).filter(
    (book) => book.author.toLowerCase() === author.toLowerCase()
  );

  res.json(result);
});

/////////////////////////////
// TASK 4
// Get books by title
/////////////////////////////

app.get("/books/title/:title", (req, res) => {
  const title = req.params.title;

  const result = Object.values(books).filter(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  );

  res.json(result);
});

/////////////////////////////
// TASK 5
// Get book review
/////////////////////////////

app.get("/books/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    res.json(books[isbn].reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/////////////////////////////
// TASK 6
// Register user
/////////////////////////////

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const userExists = users.find((u) => u.username === username);

  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });

  res.json({ message: "User registered successfully" });
});

/////////////////////////////
// TASK 7
// Login
/////////////////////////////

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid login" });
  }
});

/////////////////////////////
// TASK 8
// Add / Modify Review
/////////////////////////////

app.put("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const { username, review } = req.body;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[isbn].reviews[username] = review;

  res.json({ message: "Review added or modified" });
});

/////////////////////////////
// TASK 9
// Delete Review
/////////////////////////////

app.delete("/review/:isbn/:username", (req, res) => {
  const { isbn, username } = req.params;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  delete books[isbn].reviews[username];

  res.json({ message: "Review deleted" });
});

/////////////////////////////

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});