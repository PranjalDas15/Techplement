import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; 
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import reload from '../components/Assets/reload.png';
import save from '../components/Assets/save.svg';

export default function Home({ searchedQuote, searchedAuthor }) {
    const { user } = useContext(UserContext); 

    const [quote_home, setQuote_home] = useState("");
    const [author_home, setAuthor_home] = useState("");
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);

    useEffect(() => {
        if (searchedQuote) {
            setQuote_home(searchedQuote);
            setAuthor_home(searchedAuthor);
            setIsSearchPerformed(true);
        } else {
            fetchRandomQuote();
            setIsSearchPerformed(false);
        }
    }, [searchedQuote, searchedAuthor]);

    // Function to fetch a random quote
    const fetchRandomQuote = () => {
        fetch("http://api.quotable.io/random")
            .then(res => res.json())
            .then(data => {
                setQuote_home(data.content);
                setAuthor_home(data.author);
            })
            .catch(error => console.error('Error fetching random quote:', error));
    };

    // Function to fetch a random quote by searched author
    const fetchQuoteByAuthor = (authorName) => {
        fetch(`http://api.quotable.io/quotes?author=${authorName}`)
            .then(res => res.json())
            .then(data => {
                if (data.results.length > 0) {
                    const randomQuote = data.results[Math.floor(Math.random() * data.results.length)];
                    setQuote_home(randomQuote.content);
                    setAuthor_home(randomQuote.author);
                } else {
                    setQuote_home("No quotes found for this author.");
                    setAuthor_home("");
                }
            })
            .catch(error => console.error('Error fetching quotes by author:', error));
    };

    // Function to handle refreshing the quote
    const handleRefresh = () => {
        if (isSearchPerformed && searchedAuthor) {
            fetchQuoteByAuthor(searchedAuthor);
        } else {
            fetchRandomQuote();
        }
    };

    // Save Quote in database

    const handleSaveQuote = async () => {
        if (!user || !user._id) {
            toast.error('User is not logged in.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8000/api/save-quote', {
                userId: user._id,
                quote: quote_home,
                author: author_home
            });
    
            if (response.data.message === 'Quote saved successfully!') {
                toast.success('Quote saved successfully!');
            } else {
                toast.error('Failed to save the quote.');
            }
        } catch (error) {
            console.error('Error saving the quote:', error);
            toast.error('Error saving the quote.');
        }
    };
    
    

    return (
        <div className='flex justify-center mt-[10vh] md:mt-[20vh]'>
            <div className='flex flex-col items-center w-[300px] sm:w-[500px] md:w-[600px] px-5 tracking-tight shadow-innershadow-inner bg-white shadow-md rounded-2xl'>
                <h2 className='mt-5 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400'>
                    {searchedQuote ? 'Searched Quote' : 'A Random Quote'}
                </h2>
                <div className='border-b-2 from-pink-500 to-orange-400 w-full opacity-40 py-2'></div>
                <div className='w-full'>
                    <p className='pt-5 pb-2 font-semibold text-lg text-left'>"{quote_home}"</p>
                </div>
                <div className='w-full'>
                    <p className='pt-5 pb-2 font-semibold text-sm text-left'>- {author_home}</p>
                </div>
                <div className='flex gap-10'>
                    <button
                        onClick={handleSaveQuote}
                        className='flex justify-center items-center text-white min-w-[120px] my-8 py-2 rounded-3xl bg-black hover:bg-gradient-to-r from-blue-400 to-violet-400 relative transition-all top-0 hover:top-1 drop-shadow-[0px_5px_0px_rgba(0,0,0,0.15)] hover:drop-shadow-none'>
                        <img src={save} width={25} alt="save" />
                        <p className='mx-2'>Save</p>
                    </button>
                    <button  onClick={handleRefresh} className='flex justify-center items-center text-white min-w-[120px] my-8 py-2 rounded-3xl bg-black hover:bg-gradient-to-r from-blue-400 to-violet-400 relative transition-all top-0 hover:top-1 drop-shadow-[0px_5px_0px_rgba(0,0,0,0.15)] hover:drop-shadow-none'>
                        <img src={reload} width={25} alt="reload" />
                        <p className='mx-2'>Refresh</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
