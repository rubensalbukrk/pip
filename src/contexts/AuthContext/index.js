import React, { createContext, useState, useContext, ReactNode } from "react";
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../../api/api";


export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { users, setLogged } = useContext(UserContext);
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [signingAuto, setSigningAuto] = useState(false);
  const [token, setToken] = useState(String)

  const saveMyLogin = async(user) => {
    if (user) {
      const data = JSON.stringify(user);
      await AsyncStorage.setItem("token", data);
    } else {
      alert("Houve um problema ao salvar o usuário!");
    }
  }
  if(isLoading) {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000);
  }

  async function Authentication(cpf, password) {
    try {
        const response = await axios.post(`${api.BASE_URL}/login`, {
          cpf,
          password
        })
        setLogged(response?.data?.user); 
        setToken(response?.data?.token);
        setAuth(true);
    } catch (error) {
      alert("Erro na autenticação",);
      setIsLoading(false)
    }

    // if (signingAuto){
    //     saveMyLogin(user)
    // }
  }
  
  const contexts = {
    auth,
    token,
    isLoading,
    signingAuto,
    setIsLoading,
    setAuth,
    saveMyLogin,
    Authentication,
    setSigningAuto,
  };

  return (
    <AuthContext.Provider value={contexts}>{children}</AuthContext.Provider>
  )
  }