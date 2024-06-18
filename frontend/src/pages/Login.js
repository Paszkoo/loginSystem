import { useState } from "react";
import { useLogin } from '../hooks/useLogin';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
            // wylaczenie odswiezenia sie strony po zatwierdzeniu forma
        e.preventDefault();
        console.log(email,password);

        await login(email, password);
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/home');
    }
    
    return (
        <>
            <form className="login" onSubmit={handleSubmit}>
                <h3>Zaloguj się!</h3>
                <label>Email:</label>
                <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label>Hasło:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type="submit" className="logout">Zaloguj</button>
                {error && <div className="error">Błąd!<br/>{error}</div>}
            </form>
            {/* <button className=""><Link to="/signup">Register here</Link></button> */}
        </>
    )
}

export default Login;