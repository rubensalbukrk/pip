import React, { createContext, useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const adminx = {
    id: 1,
    isAdmin: true,
    isVolt: false,
    status: true,
    date: '3/8/2023 23:30:08',
    nome: 'Rubens Developer',
    genero: true,
    idade: 27,
    avatar: "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-19/363793891_247920134771958_5616203686962323957_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=IKaaGNRj1mkAX-44Eds&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfDvuRg6DxA_qL-ZwayTw-_uTmLXGufzBStY4dahzcCRGg&oe=64E69A51&_nc_sid=ee9879",
    address: 'rua dos curioso',
    phone: "83 986731696",
    cpf: "111.222.333-44",
    nis: "01020304051",
    email: "rubiinho@live.it",
    password: "123",
    parentsName: [
      {
	id: 1,
        name: "João",
        idade: 4
      },
      {
	id: 2,
        name: "Pedro",
        idade: 2
      }
    ],
    question1: true,
    question2: "É um projeto prospero e muito escálavel!"
  }

export const AuthContext = createContext();


export default function AuthProvider({children}){
    
    const { users } = useContext(UserContext)
    const [auth , setAuth] = useState(false)
    const [logged, setLogged ] = useState({});
    const [submit, setSubmit] = useState(false)

    function Authentication(cpf, password) {
        setSubmit(true)
        let userCpf = cpf
        let userPassword = password
        const user = users.find(user => String(user.cpf) === String(userCpf) && String(user.password) === String(userPassword) )
        

            if (adminx){
                setLogged(adminx)
                setAuth(true)
                setSubmit(false)
                
            }else {
                Alert.alert('Falhou', 'Dados inválidos tente novamente!')
                setSubmit(false)
            }
            return true
    }       
    const contexts = {
        Authentication,
        logged,
        auth,
        submit,
        setAuth,
        setLogged,
        setSubmit
    }

    return (

        <AuthContext.Provider value={contexts}>
            {children}
        </AuthContext.Provider>
    )
}