import React, { useContext, useState, useEffect } from "react";
import { width } from "../../utils/dimensions";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  StatusBar,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackgroundLogin from "../../../assets/svgs/login-center.svg";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { AuthContext } from "../../contexts/AuthContext";
import Animated, {
  StretchInX,
  Easing,
  BounceInDown,
  Layout,
  ZoomOut,
  FadeInLeft,
  BounceInUp,
  FadeIn,
} from "react-native-reanimated";
import { LottieView } from "../../utils/LottieView";
import PasswordIcon from "../../../assets/svgs/password.svg";
import {
  TextExtra,
  TextLarge,
  TextMedium,
  TextSmall,
} from "../../../components/TextLg/Text";

export const Login = () => {
  const [isEnabled, setIsEnable] = useState(false);
  const {
    Authentication,
    setSigningAuto,
    signingAuto,
    isLoading,
    auth,
    setIsLoading,
  } = useContext(AuthContext);
  const [cpf, setCpf] = useState(String);
  const [password, setPassword] = useState(String);
  const [show, setShow] = useState(false);
  const { navigate } = useNavigation();

  useEffect(() => {
    if (auth) {
      navigate("HomeApp");
    }
  }, [auth]);

  const toggleSigningAuto = () => {
    setSigningAuto((previousState) => !previousState);
    setIsEnable((previousState) => !previousState);
  };

  return (
    <View className="flex-1 bg-white items-center">
      <BackgroundLogin
        style={{ position: "absolute", top: "40%", alignSelf: "center" }}
        width={width}
        opacity={1}
      />
      
      <Animated.Image
      entering={BounceInUp.duration(2000)}
      exiting={BounceInDown}
      layout={Layout}
      
      fadeDuration={2000}
        resizeMode="contain"
        style={{ width: "50%", height: "20%"}}
        source={require("../../../assets/pip-icon.png")}
      />
      <Animated.View 
      className={"w-full items-center justify-center self-center"}
      entering={FadeIn.delay(1000).duration(2000)}>
        <TextExtra text="PIP" className="text-black text-5xl" />
      <Text className="font-default text-blue-400 text-lg">ÁREA DE ACESSO</Text>
      </Animated.View>
      
      <Animated.View
        entering={FadeIn.delay(300).duration(600).easing(Easing.bounce)}
        exiting={FadeInLeft.delay(100)}
        layout={Layout}
        className="w-72 shadow-lg my-5 pt-3 shadow-black justify-between items-center rounded-2xl bg-gray-200"
      >
        <View className="flex-row w-64 gap-x-3 h-12 mb-5 self-center items-center rounded-2xl border-2 border-gray-600/30">
          <FontAwesome5 name="user-alt" size={28} color={"#c5c5c5"} />
          <TextInputMask
            style={{
              width: "100%",
              color: "#bdbdbd",
              height: 50,
              textAlign: "left",
              fontSize: 22,
              fontFamily: "Doppio One",
            }}
            type="cpf"
            selectionColor={"#9f9f9f"}
            placeholderTextColor={"#bdbdbd"}
            value={cpf}
            placeholder="000.000.000-00"
            onChangeText={(text) => setCpf(text)}
          />
        </View>

        <View className="flex-row w-64 h-12 gap-x-3 items-center rounded-2xl border-2 border-gray-600/30">
          <PasswordIcon />
          <TextInput
            className="font-default text-start text-gray-600 text-2xl"
            onChangeText={(pass) => setPassword(pass)}
            placeholderTextColor={"#bdbdbd"}
            selectionColor={"#9f9f9f"}
            secureTextEntry={true}
            placeholder="******"
          />
        </View>

        <View className="flex-row w-full h-24 px-4 mt-2 justify-between items-center">
          <View className="self-start">
            <Text className="font-default text-lg top-2 text-gray-600">
              Salvar
            </Text>
            <Switch
              className="self-start "
              trackColor={{ false: "#cfcfcf", true: "#bebebe" }}
              thumbColor={isEnabled ? "#217aff" : "#cecece"}
              value={signingAuto}
              onValueChange={toggleSigningAuto}
            />
          </View>

          {isLoading ? (
            <Animated.View
              exiting={ZoomOut.delay(2000)}
              layout={Layout}
              className="w-24 h-24 items-center justify-center"
            >
              <LottieView
                autoPlay
                resizeMode="contain"
                source={require("../../../assets/animations/animation-load-balls-colors.json")}
              />
            </Animated.View>
          ) : (
            <TouchableOpacity
              className="w-32 h-12 rounded-2xl shadow-lg shadow-black items-center justify-center bg-blue-600"
              onPress={() => {
                setIsLoading(true) & Authentication(cpf, password);
              }}
            >
              <TextLarge text="Entrar" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
      <TextSmall
        text="Ainda não tem uma conta?"
        className="text-blue-400 my-2"
      />
      <Animated.View entering={BounceInDown.duration(1400)}>
        <TouchableOpacity
          className="w-48 h-14 my-3 rounded-2xl items-center justify-center shadow-md shadow-black bg-blue-500"
          onPress={() => navigate("Cadastrar")}
        >
          <TextMedium text="Registrar-me" />
        </TouchableOpacity>
      </Animated.View>
      <StatusBar barStyle="dark-content" />
    </View>
  );
};
