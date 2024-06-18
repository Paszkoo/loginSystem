import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';

const Navbar = () => {

    const { logout } = useLogout();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleClick = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        if(user){
          navigate('/home');
        }
      },[])

    return (
        <header>
            <div className='container'>
                <nav>
                    <ul>
                        {user ? (
                            <>
                                <li>{user.email}</li>
                                <button onClick={handleClick} className='logout'>Wyloguj</button>
                            </>
                        ):(
                            <>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/signup'>Rejestracja</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;