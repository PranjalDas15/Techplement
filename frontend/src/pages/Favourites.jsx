import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import bin from '../components/Assets/delete.svg';

export default function Favourites() {
    const { user } = useContext(UserContext); // Access user from context
    const [savedQuotes, setSavedQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedQuotes = async () => {
            if (!user) {
                toast.error('User not logged in.');
                setLoading(false);
                return;
            }
        
            try {
                const response = await axios.get(`http://localhost:8000/api/saved-quotes/${user._id}`, {
                    withCredentials: true
                });
                setSavedQuotes(response.data);
            } catch (error) {
                console.error('Error fetching saved quotes:', error);
                toast.error('Failed to fetch saved quotes.');
            } finally {
                setLoading(false);
            }
        };

        fetchSavedQuotes();
    }, [user]);

    const handleDeleteQuote = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/delete-quote/${id}`, {
                withCredentials: true
            });
            toast.success('Quote deleted successfully!');
            // Refresh the list of saved quotes
            setSavedQuotes(savedQuotes.filter(quote => quote._id !== id));
        } catch (error) {
            console.error('Error deleting quote:', error);
            toast.error('Failed to delete the quote.');
        }
    };

    return (
        <div className='flex justify-center mt-[5vh]'>
            <div className='w-[90%] max-w-[800px] bg-white shadow-md rounded-3xl h-[90%] max-h-[90%] px-10 py-5 overflow-hidden'>
                <h2 className='text-3xl font-bold mb-5 text-center border-b pb-5'>Your Favourite Quotes</h2>
                <div className='bg-white overflow-y-scroll  max-h-[65vh] sm:max-h-[60vh] scrollbar-thin scrollbar-thumb-gradient-to-r from-pink-500 to-orange-400 scrollbar-track-gray-200'>
                {loading ? (
                    <p>Loading your saved quotes...</p>) : savedQuotes.length === 0 ? (
                    <p className='text-center'>You have no saved quotes.</p>) : (
                    <ul className='space-y-4'>
                        {savedQuotes.map((quote) => (
                            <li key={quote._id} className='p-4 border-b bg-white flex flex-col'>
                                <p className='text-lg font-semibold'>"{quote.quote}"</p>
                                <p className='text-sm text-left mt-2'>- {quote.author}</p>
                                <button onClick={() => handleDeleteQuote(quote._id)} className='text-sm text-red-500 mt-2 flex flex-1 justify-end'>
                                    <img src={bin} width={25} alt="" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                </div>
            </div>
        </div>
    );
}
