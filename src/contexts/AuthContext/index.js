import React, { createContext, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { users, setLogged, logged } = useContext(UserContext);
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [signingAuto, setSigningAuto] = useState(false);

  function saveMyLogin(user) {
    //function to save the value in AsyncStorage
    if (user) {
      let data = JSON.stringify(user);
      AsyncStorage.setItem("token", data);
    } else {
      alert("Houve um problema ao salvar o usuário!");
      //alert for the empty InputText
    }
  }

  function Authentication(cpf, password) {
    let userCpf = cpf;
    let userPassword = password;
    const user = users.find(
      (user) =>
        String(user.cpf) === String(userCpf) &&
        String(user.password) === String(userPassword)
    );

    if (user) {
      setLogged(user);
      setAuth(true);
    } else {
      alert("Houve algum problema", "Dados inválidos tente novamente!");
      setIsLoading(false)
    }
    if (signingAuto){
        saveMyLogin(user)
    }
  }
  const contexts = {
    auth,
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
  );
}
