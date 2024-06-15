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
                                <button onClick={handleClick}>Logout</button>
                            </>
                        ):(
                            <>
                                <li><Link to='/home'>Home</Link></li>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/signup'>Signup</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;