import { useLogout } from "../hooks/useLogout";
import { useEffect } from "react";

const Home = () => {
    const logout = useLogout();

    return (
        <div className="container">
            Welcome, you are logged in<br/>
        </div>
    );
}

export default Home;
