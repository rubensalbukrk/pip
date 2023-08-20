import React, { createContext, useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export const AuthContext = createContext();


export default function AuthProvider({children}){
    const { users } = useContext(UserContext)
    const [auth , setAuth] = useState(false)
    const [logged, setLogged ] = useState({ nome: 'Rubens'});


    function Authentication(cpf, password) {
        let userCpf = cpf
        let userPassword = password
        const user = users.find(user => String(user.cpf) === String(userCpf) && String(user.password) === String(userPassword) )
    
            if (user){
                setLogged(user)
                Alert.alert('deu certo','aguarde')
                setAuth(true)
            }else {
                Alert.alert('Falhou', 'Dados inválidos tente novamente!')
            }
    }

    const contexts = [
        logged,
        auth,
        Authentication,
        setAuth,
        setLogged
    ]

    return (

        <AuthContext.Provider value={{auth, Authentication, logged, setAuth, setLogged}}>
            {children}
        </AuthContext.Provider>
    )
}