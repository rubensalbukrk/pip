import React, { createContext, useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();


export default function AuthProvider({children}){
    const { users, setLogged } = useContext(UserContext)
    const [auth , setAuth] = useState(false)
    const [submit, setSubmit] = useState(false);


    function Authentication(cpf, password) {
        setSubmit(true)
        let userCpf = cpf
        let userPassword = password
        setSubmit(true);
        const user = users.find(user => String(user.cpf) === String(userCpf) && String(user.password) === String(userPassword) )
    
            if (user){
                
                setLogged(user)
                setAuth(true)
                setSubmit(false)
                
            }else {
                setSubmit(false)
                Alert.alert('Falhou', 'Dados inválidos tente novamente!')
                
            }
    }

    const contexts = [
        auth,
        submit,
        Authentication,
        setAuth,
        setSubmit
    ]

    return (

        <AuthContext.Provider value={{auth, Authentication, setSubmit, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}