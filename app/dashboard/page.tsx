'use client';

import { useAuth } from '../contexts/authContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [userLogin, setUser] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const response = await axios.get('/api/get-session');
            setUser(response.data.session);
        };

        fetchSession();
    }, []);
console.log('userLogin');
console.log(userLogin);
    return (
        <div>
            <h1>Bienvenue, {user ? user.username : 'Utilisateur'}</h1>
            <button onClick={logout} className="bg-red-500 text-white rounded-lg p-2.5">
                Logout
            </button>
        </div>
    );
}
