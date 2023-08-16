import React, { createContext, useState, useEffect, useContext } from 'react'

export const AuthContext = createContext();


export default function AuthProvider({children}){

    const [isActivate, setIsActivate ] = useState(false);

    function Authentication() {
        setIsActivate(true)
    }

    return (

        <AuthContext.Provider value={isActivate}>
            {children}
        </AuthContext.Provider>
    )
}