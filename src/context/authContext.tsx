"use client"

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{isAuthenticated: boolean; setIsAuthenticated: (auth: boolean) => void, userInfo: any | null, setUserInfo: (user: any | null) => void}>
    ({
        isAuthenticated: false, 
        setIsAuthenticated: () => {}, 
        userInfo: null,
        setUserInfo: () => {}
    });

const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(()=>{
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/check', {
                    method: 'GET',
                    credentials: 'include',
                });

                if(res.ok){
                    const data = await res.json();
                    setIsAuthenticated(true);
                    setUserInfo(data.user);
                }
                else setIsAuthenticated(false);
            } catch (error) {
                console.error('❌ Error checking authentication:', error);
                setIsAuthenticated(false);
            }
        }

        checkAuth();
    },[]);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, userInfo, setUserInfo}}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };