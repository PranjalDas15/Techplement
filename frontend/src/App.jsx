import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from 'react-hot-toast';
import React, { useState } from 'react';
import { UserContextProvider } from "../context/userContext";
import Favourites from "./pages/Favourites";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchedQuote, setSearchedQuote] = useState("");
  const [searchedAuthor, setSearchedAuthor] = useState("");

  // Fetch quotes by author
  const fetchQuoteByAuthor = (authorName) => {
    fetch(`http://api.quotable.io/quotes?author=${authorName}`)
      .then(res => res.json())
      .then((data) => {
        if (data.results.length > 0) {
          const randomQuote = data.results[Math.floor(Math.random() * data.results.length)];
          setSearchedQuote(randomQuote.content);
          setSearchedAuthor(randomQuote.author);
        } else {
          setSearchedQuote("No quotes found for this author.");
          setSearchedAuthor("");
        }
      })
      .catch(error => console.error('Error fetching quotes by author:', error));
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchQuoteByAuthor(searchAuthor);
  };

  // Function to fetch random quote
  const fetchRandomQuote = () => {
    fetch("http://api.quotable.io/random")
      .then(res => res.json())
      .then(data => {
        setSearchedQuote(data.content);
        setSearchedAuthor(data.author);
      })
      .catch(error => console.error('Error fetching random quote:', error));
  };

  return (
    <>
    <UserContextProvider>
      <div className="bg-gradient-to-br from-blue-100 to-orange-100 h-screen">
        <Toaster position="top-right" toastOptions={{duration: 2000}}/>
        <Navbar 
          searchAuthor={searchAuthor} 
          setSearchAuthor={setSearchAuthor} 
          handleSearch={handleSearch} 
        />
        <Routes>
          <Route path="/"   element={<Home searchedQuote={searchedQuote} searchedAuthor={searchedAuthor}  fetchRandomQuote={fetchRandomQuote}/>}/>
          <Route path="/favourites" element={<Favourites/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </UserContextProvider>
    </>
  );
}

export default App;
