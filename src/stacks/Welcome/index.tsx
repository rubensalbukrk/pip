import React, { useContext, useRef, useEffect, useState } from "react";
import { View, TouchableOpacity, StatusBar } from "react-native";
import Animated, {
  BounceInDown,
  FadeInRight,
  ZoomOutDown,
  Layout,
  FadeInLeft,
  FadeInUp,
  BounceInUp,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import BackgroundWave from "../../../assets/svgs/Welcome-wave.svg";
import { height, width } from "../../utils/dimensions";
import { LottieView } from "../../utils/LottieView";
import { AuthContext } from "../../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProps } from "../../interfaces/User";
import { TextExtra, TextXl } from "../../../components/TextLg/Text";

export default function Welcome() {
  const { auth, setAuth } = useContext(AuthContext);
  const { setLogged, setAvatar } = useContext<any>(UserContext);
  const { navigate } = useNavigation();
  const [fogos, setFogos] = useState(false);

  const animation = useRef(null);

  useEffect(() => {
    auth && navigate("HomeApp");
  }, [auth]);
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

  async function getMyLogin() {
    try {
      const token = await AsyncStorage.getItem("token").then((value) => {
        const user: UserProps = JSON.parse(value);
        if (user?.cpf && user?.email) {
          setLogged(user);
          setAuth(true);
        }
      });
      const picture = await AsyncStorage.getItem("picture").then((value) => {
        const picture = JSON.parse(value);
        if (!picture?.uri) {
        }
        if (picture?.uri) {
          setAvatar(picture.uri);
        }
      });
    } catch (e) {
      return alert("Não foi encontrado dados de usuário salvo.");
    }
  }
  useEffect(() => {
    getMyLogin();
  }, []);

  return (
    <View className="flex-1 w-full items-center bg-white">
      <BackgroundWave
        style={{ position: "absolute" }}
        width={width}
        height={height + 50}
      />
      <Animated.View
        entering={FadeInUp.delay(1000).duration(2000)}
        style={{ zIndex: 4 }}
        className="w-full mt-8"
      >

      </Animated.View>
      <Animated.Image
      entering={BounceInUp.duration(2000)}
        alt="pip-logo"
        resizeMode="contain"
        style={{ width: "50%", height: "30%" }}
        source={require("../../../assets/pip-icon.png")}
      />
      <Animated.Text
      className={"self-center my-2 text-6xl text-black font-default"}
      entering={FadeIn.delay(1000).duration(2000)}
      exiting={FadeOut}
      layout={Layout}
      >
        PIP
      </Animated.Text>
      <Animated.View
        entering={FadeInLeft.delay(1800).duration(2000)}
        style={{ zIndex: 4 }}
        className="w-full ml-4"
      >
        <TextExtra text="Bem vindo(a)!" className="text-zinc-800" />
      </Animated.View>

      <Animated.View
        entering={FadeInRight.delay(2000).duration(2000)}
        className="w-full justify-center"
      >
        <TextXl
          className="text-zinc-800 self-center mb-20"
          text="Somos o Projeto Inclusão Popular e aqui você vai encontrar serviços,
          notícias e muito mais..."
        />
      </Animated.View>

      <Animated.View
        entering={BounceInDown.delay(1700).duration(2000)}
        exiting={ZoomOutDown.delay(1000)}
        layout={Layout}
        style={{ zIndex: 9 }}
        className="w-100 rounded-full"
      >
        <TouchableOpacity
          style={{ zIndex: 9, width: 80, height: 80 }}
          className="items-center justify-center"
          onPress={() => setFogos(true)}
        >
          <LottieView
            style={{ width: 80, height: 80 }}
            autoPlay={true}
            loop
            duration={1700}
            source={require("../../../assets/animations/animated-button-next.json")}
          />
        </TouchableOpacity>
      </Animated.View>

      <LottieView
        style={{
          zIndex: 0,
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 240,
        }}
        duration={1600}
        ref={animation}
        source={require("../../../assets/animations/fogos-animation.json")}
      />

      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </View>
  );
}
