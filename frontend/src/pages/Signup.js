import { useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useSignup();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
            // wylaczenie odswiezenia sie strony po zatwierdzeniu forma
        e.preventDefault();
        console.log(email,password);
        await signup(email, password);
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/home');
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Zarejestruj się!</h3>
            <label>Email</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button type="submit" className="logout">Sign Up</button>
            {error && <div className="error">Błąd!</div>}
        </form>
    )
}

export default Signup;