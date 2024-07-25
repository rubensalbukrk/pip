import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  ContextType,
} from "react";
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api } from "../../api/api";
import { Alert } from "react-native";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { setLogged, setAvatar } = useContext(UserContext);
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signingAuto, setSigningAuto] = useState(false);
  const [token, setToken] = useState(String);

  const saveMyLogin = async (user) => {
    if (user) {
      const data = JSON.stringify(user);
      await AsyncStorage.setItem("token", data);
    } else {
      alert("Houve um problema ao salvar o usuário!");
    }
  };

  async function Authentication(cpf, password) {
    try {
      const response = await axios.post(`${api.BASE_URL}/login`, {
        cpf,
        password,
      });
      setAuth(true);
      setLogged(response?.data?.user);
      setToken(response?.data?.token);
      setAvatar(response?.data?.user?.avatar);

      if (signingAuto) {
        saveMyLogin(response?.data?.user);
      }

    } catch (error) {
      Alert.alert("Aviso", "CPF e/ou senha inválida!");
      setIsLoading(false);
    }
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
  );
}
