import React, { createContext, useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();


export default function AuthProvider({children}){
    const { users, setLogged } = useContext(UserContext)
    const [auth , setAuth] = useState(false)


    function Authentication(cpf, password) {
        let userCpf = cpf
        let userPassword = password;
        const user = users.find(user => String(user.cpf) === String(userCpf) && String(user.password) === String(userPassword) )
    
            if (user){
                setLogged(user)
                setAuth(true)
            }else {
                Alert.alert('Falhou', 'Dados inválidos tente novamente!')
                
            }
    }

    const contexts = {
        auth,
        Authentication,
        setAuth,
    }

    return (

        <AuthContext.Provider value={contexts}>
            {children}
        </AuthContext.Provider>
    )
}