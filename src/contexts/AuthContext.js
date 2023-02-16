import React, { createContext, useState, useEffect } from 'react';
import { serverJWTRequest } from '../services/ServerRequest'

export const AuthContext = createContext({
    isAuth: false,
    userData: null,
  });

export const AuthController = ({children}) => {


    const [userData, setUserData] = useState(null);
    //const [isAuth, setIsAuth] = useState(false);   

    const authLogIn = (token) => {
        localStorage.setItem("token", token);
        //setIsAuth(true);
        console.log('authLog In !!!')
        window.location.reload();
    };
    
    const authLogOut = () => {
        localStorage.removeItem("token");      
        setUserData(null);
        //setIsAuth(false);
        console.log('authLog Out !!!')
        window.location.reload();
    };

    useEffect( ()=>{
        const fetchUserData = async () => {
            try {
                const data = await serverJWTRequest('/user')
                console.log('HOC: ',data)
                if (!data) {
                    setUserData(null)
                    //setIsAuth(false);
                    localStorage.removeItem("token");
                } else if ((data.message === "Unauthorized")) {
                    setUserData(null)
                    //setIsAuth(false);
                    localStorage.removeItem("token");
                } else {
                    setUserData(data)
                    //setIsAuth(true);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
        console.log('!!!! H.O.C. useEffect')
    },[])

    const value = { userData, authLogIn, authLogOut};

    console.log('Value in AuthContext: ',value)

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};
