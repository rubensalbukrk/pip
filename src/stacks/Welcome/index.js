import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../requisitions/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Welcome() {
  const { setUsers, logged, setLogged } =
    useContext(UserContext);
  const { navigate } = useNavigation();

  useEffect(() => {
    getMyLogin();
    if (logged?.cpf) {
      navigate("HomeApp");
    }
  }, []);

  function getMyLogin() {
    AsyncStorage.getItem("token").then((value) => {
      let dataUser = JSON.parse(value);
      setLogged(dataUser);
    });
  }

  const getUsers = async () => {
    try {
      const response = await axios.get(`${api}/users`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      const data = await response.data.users;
      setUsers(data);
    } catch (error) {
      alert("Não houve respostas do servidor, tente novamente!");
    }
  };

  return (
    <View className="flex-1 w-full items-center bg-blue-500">
      <View className="w-full h-48">
        <Image
          className="absolute w-60 h-40 right-7 top-2 mt-20"
          alt="pip-logo"
          resizeMode="cover"
          source={require("../../../assets/pip-icon.png")}
        />
      </View>

      <View className="absolute w-full h-full gap-3 top-32 left-4">
        <Text className="font-default my-1 mx-2 text-white text-4xl">Olá,</Text>
        <Text className="font-default w-72 text-4xl text-white mx-2 my-1">
          Bem vindo(a)!
        </Text>
      </View>

      <View className="w-full rounded-xl h-20 justify-center bg-white/5">
        <Text className="font-default self-center mx-3 text-white text-2xl">
          Somos o projeto inclusão popular e aqui você vai encontrar serviços,
          notícias e muito mais...
        </Text>
      </View>

      <TouchableOpacity
        className="w-52 mt-32 rounded-2xl bg-white/10"
        onPress={() => getUsers() && navigate("Login")}
      >
        <View className="w-full flex-row">
          <Text fontFamily="Doppio One" color="#fff" fontSize="2xl">
            Começar
          </Text>
          <AntDesign name="arrowright" size={40} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
