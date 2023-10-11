import React, { createContext, useState, useEffect } from 'react';
import { serverJWTRequest } from '../services/ServerRequest'

export const AuthContext = createContext({
    isAuth: false,
    userData: null,
  });

export const AuthController = ({children}) => {


    const [userData, setUserData] = useState(null);
    const [isAuth, setIsAuth] = useState(false);   

    const updateUserAuth = async () => {
        try {
            const data = await serverJWTRequest('/user')
            if (!data) {
                setIsAuth(false);
            }
            if (!!data.message) {
                setIsAuth(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateUserData = async () => {
        try {
            const data = await serverJWTRequest('/user')
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const authLogIn = (token) => {
        localStorage.setItem("token", token);
        setIsAuth(true);
    };

    const authLogOut = () => {
        localStorage.removeItem("token");      
        setUserData(null);
        setIsAuth(false);
    };

    useEffect( ()=>{ 
        const fetchUserData = async () => {
            try {
                const data = await serverJWTRequest('/user')
                if (!data) {
                    authLogOut();
                } else if (!!data.message) {
                    authLogOut();
                } else {
                    setUserData(data)
                    setIsAuth(true);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
    },[isAuth])

    const value = { updateUserAuth, updateUserData, isAuth, userData, authLogIn, authLogOut };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};
