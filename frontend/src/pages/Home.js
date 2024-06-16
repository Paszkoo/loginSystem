import { useLogout } from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { usePassword } from "../hooks/usePasswords";

const Home = () => {
    const logout = useLogout();

    const [passwords, setPassword] = useState([]);
    const [userHasNoPasswords, setUserHasNoPasswords] = useState(false);
    const [showCopyboardScreen, setShowCopyboardScreen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const {  password, isLoading, error } = usePassword();

    useEffect(() => {
        const fetchData = async () => {
           try {
            const response = await fetch('/api/passwords/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: JSON.parse(localStorage.getItem('user')).email
                })
            });
            console.log(JSON.parse(localStorage.getItem('user')).email)
            const data = await response.json();
            
            console.log(data);
            if(data.err === "No passwords found"){
                setUserHasNoPasswords(true);
            }else{
                setPassword(data);
            }
            }catch(err){
                console.log(err);
            } 
        }
        fetchData();
    }, []);

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
        <div className="container">
            Welcome, you are logged in<br/>
            {passwords && (
                <>
                    {userHasNoPasswords && (
                        <div className="errorNoPass">
                            <h3>you don't have any passwords saved</h3>
                        </div>
                    )}
                    {passwords.map((password) => (
                    <div className="passContainer">
                        <div key={password._id} className="passBox">
                            <div className="passRow1">
                                <div className="passLabel">Strona: </div>
                                <div className="passLabelC" onClick={(e) => clipboard(password.site,e)}>{password.site}</div>
                            </div>
                            <div className="passRow2">
                                <div className="passLabel">Hasło: </div>
                                <div className="passP" onClick={(e) => clipboard(password.password,e)}>{password.password}</div>
                                <div className="passLabel">E-mail: </div>
                                <div className="passP" onClick={(e) => clipboard(password.email,e)}>{password.email}</div>
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
                            Copied to clipboard!
                        </div>
                    )}
                        </>
                    )}

                    {/* Dodaj nowe haslo */}
                    <div className="passContainerBlue">
                        <div className="passBox">
                            <div className="passRow1">
                                <div className="passLabel">Strona: </div>
                                <input className="ADpassLabelC" ></input>
                            </div>
                            <div className="passRow2">
                                <div className="passLabel">Hasło: </div>
                                <input className="ADpassP" ></input>
                                <div className="passLabel">E-mail: </div>
                                <input className="ADpassP" ></input>
                            </div>

                            <div className="passRow3">
                                <div className="addButton">Dodaj</div>
                                <div className="deleteButton">Wyczyść pola</div>
                            </div>
                            
                        </div>
                    </div>
                
        </div>
    );
}

export default Home;
