import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const usePassword = () => {
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const password = async (data) => {
        if(user){
            setIsLoading(true);
            setError(null);
            const response = await fetch('api/passwords/delOne', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    id: data
                })
            })

            const json = await response.json();

            if(!response.ok) {
                setError(json.error);
                setIsLoading(false);
            }else{
                console.log("usunieto obiekt z bazy")
            }
        }
    }

    const addPassword = async (data) => {
        setIsLoading(true);
        setError(null);
        console.log(JSON.stringify(data))
        const response = await fetch('api/passwords/newPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })
    };


    return { password, addPassword, isLoading, error };
}