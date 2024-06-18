import { useLogout } from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { usePassword } from "../hooks/usePasswords";
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
    const logout = useLogout();

    const [passwords, setPassword] = useState([]);
    const [userHasNoPasswords, setUserHasNoPasswords] = useState(false);
    const [showCopyboardScreen, setShowCopyboardScreen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { user } = useAuthContext();
    const { password, addPassword, isLoading, error } = usePassword();

    // stany dla formularza dodania nowego hasla
    const [site, setSite] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                console.log("User is not available yet.");
                return;
            }else{
                console.log("user: ", user);
                try {
                    const response = await fetch('/api/passwords/all', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify({
                            email: user.email
                        })
                    });
                    const data = await response.json();

                    console.log(data);
                    if (data.err === "No passwords found") {
                        setUserHasNoPasswords(true);
                    } else {
                        setPassword(data);
                    }
                } catch (err) {
                    console.log(err); 
                }
            }
        };

        const timeoutId = setTimeout(fetchData, 1000);

        // Cleanup timeout if component unmounts before fetchData is called
        return () => clearTimeout(timeoutId);
    }, [user]);


    const handleAddPass = async (e) => {
        e.preventDefault();
        if(user){
            let data = {
                owner: user.email,
                email: email,
                password:  pass,
                site: site
            }
            await addPassword(data);
            await new Promise(resolve => setTimeout(resolve, 2000));
            window.location.reload();
        }
    };
    useEffect(() => {
        if(showCopyboardScreen){
            const timer = setTimeout(() => {
                setShowCopyboardScreen(false);
            }, 700); // (ms)

            // Cleanup timer on component unmount or when showCopyboardScreen changes
            return () => clearTimeout(timer);
        }
    },[showCopyboardScreen])


    const clipboard = async (text,e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard: ', text);
        }).catch(err => {
            console.log('Failed to copy: ', err);
        });
        return setShowCopyboardScreen(true);
            
    }

    const handleClick = async (action, data) => {
        console.log(action, data);
        switch(action){
            case "del":
                    await password(data).then(() => {
                        window.location.reload();
                    })

                break;
            default:
                break;
        }
    };

    return (
        <>
            {user ? (
                <div className="container">
                    Witaj {user.email}!<br />
                    {passwords && (
                        <>
                            {userHasNoPasswords && (
                                <div className="errorNoPass">
                                    <h3>Nie masz zapisanych żadnych haseł!</h3>
                                </div>
                            )}
                            {passwords.map((password) => (
                                <div key={password._id} className="passContainer">
                                    <div className="passBox">
                                        <div className="passRow1">
                                            <div className="passLabel">Strona: </div>
                                            <div className="passLabelC" onClick={(e) => clipboard(password.site, e)}>{password.site}</div>
                                        </div>
                                        <div className="passRow2">
                                            <div className="passLabel">Hasło: </div>
                                            <div className="passP" onClick={(e) => clipboard(password.password, e)}>{password.password}</div>
                                            <div className="passLabel">E-mail: </div>
                                            <div className="passP" onClick={(e) => clipboard(password.email, e)}>{password.email}</div>
                                        </div>
                                        <div className="passRow3">
                                            <div className="modifyButton">Zmodyfikuj</div>
                                            <div className="deleteButton" onClick={() => handleClick("del", password._id)}>Usuń</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {showCopyboardScreen && (
                                <div style={{
                                    position: 'absolute',
                                    top: `${position.y}px`,
                                    left: `${position.x}px`,
                                    backgroundColor: '#e0f7fa', // light blue background
                                    color: '#00796b', // teal text color
                                    padding: '10px 15px',
                                    border: '1px solid #00796b', // teal border color
                                    borderRadius: '1em',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                    zIndex: 1000,
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                }}>
                                    Skopiownao do schowka!
                                </div>
                            )}
                        </>
                    )}
    
                    {/* Dodaj nowe haslo */}
                    <form className="passContainerBlue" onSubmit={handleAddPass}>
                        <div className="passBox">
                            <div className="passRow1">
                                <div className="passLabel">Strona: </div>
                                <input
                                    className="ADpassP"
                                    onChange={(e) => setSite(e.target.value)}
                                    value={site}
                                ></input>
                            </div>
                            <div className="passRow2">
                                <div className="passLabel">Hasło: </div>
                                <input
                                    className="ADpassP"
                                    onChange={(e) => setPass(e.target.value)}
                                    value={pass}
                                ></input>
                                <div className="passLabel">Email: </div>
                                <input
                                    className="ADpassP"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                ></input>
                            </div>
                            <div className="passRow3">
                                <button type="submit" className="addButton">Dodaj</button>
                                <div className="deleteButton">Wyczyść pola</div>
                            </div>
                        </div>
                    </form>
                </div>
            ):(
                <div className="container">
                    <div className="errorNoPass">
                        <h3>Nie jesteś zalogowany!</h3>
                    </div>
                </div>
            )}
        </>
    );
    
}

export default Home;
