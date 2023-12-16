import React, { useContext, useRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  BounceInDown,
  Easing,
  FadeInRight,
  PinwheelIn,
  PinwheelOut,
  ZoomOutDown,
  ZoomInEasyUp,
  Layout,
} from "react-native-reanimated";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../api/api";
import BackgroundWave from "../../../assets/svgs/Welcome-wave.svg";
import { height, width } from "../../utils/dimensions";
import { LottieView } from "../../utils/LottieView";
import { AuthContext } from "../../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProps } from "../../interfaces/User";

export default function Welcome() {
  const { auth, setAuth } = useContext(AuthContext);
  const { setUsers, setLogged } = useContext<any>(UserContext);
  const { navigate } = useNavigation();
  const [fogos, setFogos] = useState(false);
  const [button, setButton] = useState(false);
  const animation = useRef(null);
  const animationButton = useRef(null);

  useEffect(() => {
    if (fogos) {
      animation.current?.play(0, 36);
      setTimeout(() => {
        setFogos(false);
        navigate("Login");
      }, 1000);
    } else {
      animation.current?.play(0, 0);
    }
  }, [fogos]);

  useEffect(() => {
    if (button) {
      animationButton.current?.play(0, 57);
    } else {
      animationButton.current?.pause();
    }
  }, [button]);

  async function getMyLogin() {
    try {
      const token = await AsyncStorage.getItem("token").then((value) => {
        const user: UserProps = JSON.parse(value);
        setLogged(user);
        setAuth(true)
        navigate('HomeApp')
      })
    } catch (e) {
      alert("Falha ao obter usuário salvo!");
    }
  }

  useEffect(() => {
    getMyLogin();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${api.BASE_URL}/users`, {
        method: "get",
      });
      const data = await response.data.results;
      setUsers(data);
    } catch (error) {
      alert("Não houve respostas do servidor, tente novamente!");
    }
  };

  return (
    <View className="flex-1 w-full items-center bg-gray-100">
      <BackgroundWave style={{ position: "absolute" }} width={width} height={height + 50} />
      <Animated.Image
        entering={PinwheelIn.duration(2000).easing(Easing.bounce)}
        exiting={PinwheelOut}
        style={{ zIndex: 3 }}
        className="w-60 h-52 mt-5 self-end"
        alt="pip-logo"
        resizeMode="cover"
        source={require("../../../assets/pip-icon.png")}
      />

      <Animated.View
        entering={ZoomInEasyUp.delay(1000)}
        style={{ zIndex: 4 }}
        className="w-full h-32 ml-4"
      >
        <Text className="font-default my-1 mx-2 text-black text-4xl">Olá,</Text>
        <Text className="font-default w-72 text-4xl text-black mx-2 my-1">
          Bem vindo(a)!
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInRight.delay(1400).duration(1600)}
        className="w-full h-48 justify-center"
      >
        <Text className="font-default self-center mx-3 text-black text-2xl">
          Somos o projeto inclusão popular e aqui você vai encontrar serviços,
          notícias e muito mais...
        </Text>
      </Animated.View>

      <Animated.View
        entering={BounceInDown.delay(1700).duration(2000)}
        exiting={ZoomOutDown.delay(1000)}
        layout={Layout}
        className="h-100 w-100 mt-3 rounded-full"
      >
        <TouchableOpacity
          style={{ zIndex: 3 }}
          className="items-center justify-center"
          onPress={() => [setFogos(true), setButton(true), getUsers()]}
        >
          <LottieView
            resizeMode="contain"
            style={{ position: "absolute", width: 180, height: 180 }}
            ref={animationButton}
            duration={3000}
            source={require("../../../assets/animations/animation-butto-welcome-21-57f.json")}
          />
          <LottieView
            style={{ width: 80, height: 80 }}
            autoPlay={true}
            loop
            duration={1700}
            source={require("../../../assets/animations/button-start-gray-animation-70f.json")}
          />
        </TouchableOpacity>
      </Animated.View>

      <LottieView
        style={{
          zIndex: 1,
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 150,
        }}
        duration={1600}
        ref={animation}
        source={require("../../../assets/animations/fogos-animation.json")}
      />
    </View>
  );
}
