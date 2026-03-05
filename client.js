const axios = require("axios");

const BASE_URL = "http://localhost:3000";

/////////////////////////////
// TASK 10
// Get all books using async/await
/////////////////////////////

async function getAllBooks() {
  const res = await axios.get(`${BASE_URL}/books`);

  console.log("All Books:");
  console.log(res.data);
}

/////////////////////////////
// TASK 11
// Search by ISBN using Promises
/////////////////////////////

function getBookByISBN() {
  axios
    .get(`${BASE_URL}/books/isbn/9781593279509`)
    .then((res) => {
      console.log("Book by ISBN:");
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

/////////////////////////////
// TASK 12
// Search by Author
/////////////////////////////

async function getBooksByAuthor() {
  const res = await axios.get(`${BASE_URL}/books/author/Marijn Haverbeke`);

  console.log("Books by Author:");
  console.log(res.data);
}

/////////////////////////////
// TASK 13
// Search by Title
/////////////////////////////

async function getBooksByTitle() {
  const res = await axios.get(`${BASE_URL}/books/title/Eloquent JavaScript`);

  console.log("Books by Title:");
  console.log(res.data);
}

/////////////////////////////

async function run() {
  await getAllBooks();
  getBookByISBN();
  await getBooksByAuthor();
  await getBooksByTitle();
}

run();
