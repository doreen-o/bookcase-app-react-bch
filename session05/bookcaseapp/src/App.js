import React, {useState} from 'react';
import Book from './components/Book';
import BookList from './components/BookList';
import bookData from './models/books.json';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import About from './pages/About';
import Search from './components/Search'; 


const App = () => {

  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState(bookdata);
  const [bookcase, setBookcase] =useState ([]);
  
  // function addBook(title) {
  // console.log(`The Book ${props.title} was clicked`);
  // }
  
  async function findBook(keyword) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${keyword}&filter=paid-ebooks&print-type=books&projection=lite`;
  const results = await fetch(url).then((res) => res.json());
  
  if (!results.error) {
  setBooks(results.items);
  }

  else{
    console.log("API Error", results.error);
  }
  return results;
}
function addBook(id) {
  const bookToAdd = books.find((book) => book.id === id);
  console.log(bookToAdd)

  if (bookToAdd){
    setBookcase([...bookcase,bookToAdd]);
    setBooks(books.filter(book => book.volumeInfo.title !== bookToAdd.volumeInfo.title))
  }
  else {
    console.log("This book wasn't found in this bookcase");
  }
}

function removeBook(id){
  const bookToRemove = bookcase.find((book) => book.id === id);
  if (bookToRemove){
    setBookcase(bookcase.filter(book => book.volumeInfo.title !== bookToRemove.volumeInfo.title))
    setBooks([bookToRemove, ...books])
  }
  else{
    console.log('No books found');
  }
}
  
  return (
  <Router>
    <Header />
      <Routes>
      <Route exact path="/" element={
        <>
          <HomePage books={books} addBook={addBook}></HomePage> 
            <Search setKeyword={setKeyword} keyword={keyword} findBook={findBook} />
            </>
      }
      /> 
      <Route path="/bookcase" element={
        <>
        <BookcasePage bookcase={bookcase} removeBook={removeBook}></BookcasePage>
        <Search setKeyword={setKeyword} keyword={keyword} findBook={findBook} />
        </>
      }
      />
      <Route 
      path="About" element={
        <About/>
      }
      /> 
      </Routes>
      </Router>
   
  
  );
  
  };
  
  export default App;


