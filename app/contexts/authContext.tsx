'use client';

import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: { username: string } | null;
    login: (username: string, password: string) => void;
    signup: (username: string, email: string, password: string) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const router = useRouter();

    const [isActive, setIsActive] = useState(true);
    const [countdown, setCountdown] = useState(60);
    const countdownRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const handleActivity = () => {
            setIsActive(true);
            setCountdown(60);
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setIsActive(false);
                startCountdown();
            }, 60000); // 1 minute of inactivity before starting the countdown
        };

        const startCountdown = () => {
            countdownRef.current = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(countdownRef.current);
                        alert("User is inactive for 1 minute");
                        sessionStorage.clear();
                        router.push('/');
                        return 60;
                    }
                    return prev - 1;
                });
            }, 1000);
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keypress', handleActivity);
        window.addEventListener('click', handleActivity);

        // Cleanup event listeners on unmount
        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keypress', handleActivity);
            window.removeEventListener('click', handleActivity);
            clearTimeout(timeoutRef.current);
            clearInterval(countdownRef.current);
        };
    }, []);

    // Fonction pour démarrer une session
    function startSession(username) {
        sessionStorage.setItem('username', username);
    }

    // Fonction pour vérifier si la session est expirée
    // function checkSession() {
    //     const now = Date.now();
    //     const expiryTime = sessionStorage.getItem('expiryTime');

    //     if (now >= expiryTime) {
    //         alert('Session expirée');
    //         sessionStorage.clear(); // Nettoyer la session
    //     }
    // }

    // Fonction pour détruire la session
    // function endSession() {
    //     sessionStorage.clear();
    //     alert('Session terminée');
    // }

    // Démarrer une session de 30 secondes pour l'utilisateur 'JohnDoe'
    if (user) {
        startSession(user.username);
    }
    console.log('actuelle');
    console.log(user);
    

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8000/connexion/', {
                username,
                password,
            });
            if (response.data.status === 'success') {
                setUser({ username });
                router.push('/dashboard');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            alert('Login failed');
        }
    };

    const signup = async (username: string, email: string, password: string) => {
        // try {
        //     const response = await axios.post('http://localhost:8000/api/signup/', {
        //         username,
        //         email,
        //         password,
        //     });
        //     if (response.data.status === 'success') {
        //         setUser({ username });
        //         router.push('/dashboard');
        //     } else {
        //         alert('Signup failed');
        //     }
        // } catch (error) {
        //     alert('Signup failed');
        // }
    };

    const logout = () => {
        setUser(null);
        router.push('/connexion');
        sessionStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
