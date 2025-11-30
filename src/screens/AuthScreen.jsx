
import React, { useState } from 'react';
import { auth } from '../firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "firebase/auth";

const AuthScreen = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true); // Toggle between Login and Sign Up
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            if (isSignUp) {
                // Firebase function to create a new user
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                onLoginSuccess(userCredential.user);
            } else {
                // Firebase function to sign in an existing user
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                onLoginSuccess(userCredential.user);
            }
        } catch (err) {
            setError(err.message); // Display any errors from Firebase
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900">
            <div className="w-full max-w-md text-center">
                <h1 className="font-pixel text-4xl text-cyan-400 text-shadow-cyan mb-2">
                    {isSignUp ? 'Join the Quest' : 'Welcome Back!'}
                </h1>
                <p className="text-gray-400 mb-8">
                    {isSignUp ? 'Create an account to save your progress.' : 'Log in to continue your adventure.'}
                </p>

                <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg pixel-border">
                    <div className="mb-4">
                        <label htmlFor="email-input" className="block font-pixel text-sm mb-2 text-left">Email</label>
                        <input type="email" id="email-input" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg" required autoComplete="email" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password-input" className="block font-pixel text-sm mb-2 text-left">Password</label>
                        <input type="password" id="password-input" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-lg" required autoComplete="current-password" />
                    </div>
                    
                    {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                    <button type="submit" className="mt-6 btn-pixel w-full bg-emerald-500 hover:bg-emerald-600 text-gray-900 py-3 rounded-lg text-md">
                        {isSignUp ? 'Sign Up' : 'Log In'}
                    </button>
                </form>

                <button onClick={() => setIsSignUp(!isSignUp)} className="mt-6 text-cyan-400 hover:text-cyan-300">
                    {isSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
                </button>
            </div>
        </div>
    );
};

export default AuthScreen;