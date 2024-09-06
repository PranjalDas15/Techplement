import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8000/profile', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                setUser(null); // User is not logged in
            } finally {
                setLoading(false); // Stop loading state
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {!loading ? children : <div>Loading...</div>} {/* Render content after user is fetched */}
        </UserContext.Provider>
    );
}
    