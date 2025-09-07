"use client";

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, BrainCircuit } from 'lucide-react';
import { authClient } from '@/lib/auth-client'; // Import the auth client

export default function LoginPage() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage('Signing in...');
        const { error } = await authClient.auth.signInWithPassword({ email, password })
        if (error) {
            setMessage(`Sign-in Failed: ${error.message}`);
        }
        else {
            setMessage('Sign-in Sucessful');
            //set the user to new page
            window.location.href = "/chronos";
        }
        //clear out values after submit
        setEmail('');
        setPassword('');
    };

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage('Signing up...');
        try {
            const { data, error } = await authClient.auth.signUp({ email, password });
            if (error && error.message) {
                setMessage(`Sign-up failed: ${error.message}`);
            } else if (error) {
                setMessage(`Sign-up failed: ${JSON.stringify(error)}`);
            } else {
                //store the user in db
                const {error: dbError} = await authClient
                    .from('profiles')
                    .insert({id: data.user?.id, email: data.user?.email});

                if(dbError){
                    console.error('Database insertion failed', dbError.message);
                    
                }
                setMessage('Sign-up successful! Please check your email for a verification link.');
            }
        } catch (error: any) {
            setMessage(`Sign-up failed: ${error?.message || JSON.stringify(error)}`);
        }
         //clear out values after submit
        setEmail('');
        setPassword('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-white">
            <div className="relative p-8 bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
              
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-indigo-500 shadow-[0_0_15px_#6b46c1]">
                    <BrainCircuit className="w-6 h-6 text-white" />
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-2 text-black">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to your account or create a new one</p>
                </div>

                <div className="flex bg-white rounded-full p-1 mb-6">
                    <button
                        onClick={() => setIsSignIn(true)}
                        className={`flex-1 py-2 px-4 rounded-full text-sm font-medium ${isSignIn ? ' text-blue-500' : 'text-black'
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsSignIn(false)}
                        className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${!isSignIn ? ' text-blue-600' : 'text-black'
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {isSignIn ? (
                    <form onSubmit={handleSignIn}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">

                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-10 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-400"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"

                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
                        >
                            Sign In
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSignUp}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">

                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-10 py-2 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-400"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
                        >
                            Sign Up
                        </button>
                    </form>
                )}

                {message && (
                    <p className="mt-4 text-center text-sm font-medium text-gray-400">
                        {message}
                    </p>
                )}

                <p className="text-xs text-gray-500 text-center mt-6">
                    By continuing, you agree to our <a href="#" className="underline hover:text-white">Terms of Service</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
}
