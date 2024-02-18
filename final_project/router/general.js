const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if(!isValid(username)){
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //res.send(JSON.stringify(books,null,4))
  async function asyncBooks() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(res.status(300).json(books));
      }, 2000)
    });
    await promise;
  }
  asyncBooks()
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  //res.send(books[isbn])
  async function asyncBooksISBN() {
    const promiseISBN = new Promise((resolve, reject) => {
      let booksISBN = {};
      booksISBN[`${isbn}`] = books[isbn];
      setTimeout(() => {
        resolve(res.status(300).json(booksISBN));
      }, 2000)
    });
    await promiseISBN;
  }
  asyncBooksISBN()
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  //let filtered_author = Object.values(books).filter((book) => book.author === author);
  //res.send(filtered_author)
  const booksWithSameAuthor = {};
  async function asyncAuthor() {
    const promiseAuthor = new Promise((resolve, reject) => {
      for (let key in books) {
        if (books[key]["author"] === author) {
          booksWithSameAuthor[`${key}`] = books[key];
        }
      }
      resolve(res.status(300).json(booksWithSameAuthor));
    })
    await promiseAuthor;
  }
  asyncAuthor()
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //const title = req.params.title;
  //let filtered_title = Object.values(books).filter((book) => book.title === title);
  //res.send(filtered_title)
  const title = req.params.title;
  const booksWithSameTitle = {};
  async function asyncTitle(){
    const promiseTitle = new Promise((resolve, reject) => {
      for (let key in books){
        if(books[key]["title"] === title){
          booksWithSameTitle[`${key}`] = books[key];
        }
      }
      resolve(res.status(300).json(booksWithSameTitle));
    });
    await promiseTitle;
  }
  asyncTitle();
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;
    const reviews = req.params.reviews;
    let filtered_review = Object.values(books).filter((book) => book.isbn === isbn);
    res.send(books[isbn].reviews)
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
