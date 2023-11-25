import React, { useContext, useRef, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LottieView = require("lottie-react-native")

export default function Welcome() {
  const { setUsers, logged, setLogged } = useContext(UserContext);
  const { navigate } = useNavigation();
  const [fogos, setFogos] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    getMyLogin();
    if (logged?.cpf) {
      navigate("HomeApp");
    }
  }, []);

  useEffect(() => {
    if (fogos) {
      animation.current?.play(0, 36);
      setTimeout(() => {
        setFogos(false)
        navigate("Login")
      }, 1000);
    } else {
      animation.current?.play(0, 0);
      
    }
  }, [fogos]);

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
    <View className="flex-1 w-full items-center bg-blue-600">
      <View className="w-full h-52">
        <Image
          className="w-60 h-52 mt-5 self-end"
          alt="pip-logo"
          resizeMode="cover"
          source={require("../../../assets/pip-icon.png")}
        />
      </View>

      <View className="w-full h-32 ml-4">
        <Text className="font-default my-1 mx-2 text-white text-4xl">Olá,</Text>
        <Text className="font-default w-72 text-4xl text-white mx-2 my-1">
          Bem vindo(a)!
        </Text>
      </View>

      <View className="w-full h-48 justify-center bg-white/20">
        <Text className="font-default self-center mx-3 text-white text-2xl">
          Somos o projeto inclusão popular e aqui você vai encontrar serviços,
          notícias e muito mais...
        </Text>
      </View>

      <TouchableOpacity
      style={{zIndex: 10}}
        className="flex-row relative top-20 w-52 h-16 items-center justify-center rounded-2xl bg-white/10"
        onPress={() => setFogos(true) & getUsers()}
      >
          <Text className="font-default self-center mx-3 text-white text-2xl">
            Começar
          </Text>
          <AntDesign name="arrowright" size={40} color="white" />
      </TouchableOpacity>

      <LottieView
        style={{width: '100%', height: 300}}
        autoPlay={true}
        loop
        duration={1000}
        ref={animation}
        source={require("../../../assets/animations/fogos-animation.json")}
      />
  
    </View>
  );
}
