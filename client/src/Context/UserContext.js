import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState({});

    const login = async (userData) => {
        const useremail = userData.email
        const response = await axios.post('http://127.0.0.1:8800/get/currentuser', { email: useremail });
        const data = response.data

        if (data) {
            console.log(data)
            setUser(data)
            console.log(user)
        }

    };

    const signup = (userData) => {
        console.log(userData)
        setUser(userData);
    };

    const logout = () => {

        setUser({})
    };

    useEffect(() => {
        console.log(user); 
    }, [user]);

    return (
        <UserContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </UserContext.Provider>
    );
}
