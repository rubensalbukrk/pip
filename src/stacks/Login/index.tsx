import React, { useContext, useState, useEffect } from "react";
import { width } from "../../utils/dimensions";
import { View, Text, TouchableOpacity, TextInput, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackgroundLogin from "../../../assets/svgs/login-center.svg";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { AuthContext } from "../../contexts/AuthContext";
import Animated, {
  StretchInX,
  StretchOutX,
  Easing,
  EasingFn,
  PinwheelIn,
  PinwheelOut,
  BounceInDown,
  ZoomOutDown,
  Layout,
} from "react-native-reanimated";
import { LottieView } from "../../utils/LottieView";
import PasswordIcon from '../../../assets/svgs/password.svg'


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
  const {navigate} = useNavigation();

  useEffect(() => {
    if (auth) {
      setTimeout(() => {
        navigate('HomeApp');
      }, 3000);
    } else {
      setIsLoading(false);
    }
  }, [auth]);

  const toggleSigningAuto = () => {
    setSigningAuto((previousState) => !previousState);
  };



  return (
    <View className="flex-1 px-7 justify-around bg-gray-300 items-center">
      <BackgroundLogin
        style={{ position: "absolute", top: "40%", alignSelf: "center" }}
        width={width}
        opacity={1}
      />
      <Animated.Image
        entering={PinwheelIn.duration(2000).easing(Easing.bounce)}
        exiting={PinwheelOut}
        style={{
          resizeMode: "cover",
          width: "90%",
          height: "30%",
        }}
        alt="pip-logo"
        source={require("../../../assets/pip-icon.png")}
      />
      <Text className="font-default text-stone-800 text-lg">
        PROJETO INCLUSÃO POPULAR
      </Text>
      <Animated.View
        entering={StretchInX.duration(1400).easing(Easing.bounce)}
        exiting={StretchOutX}
        className="w-72 shadow-lg pt-3 shadow-black justify-between items-center rounded-2xl bg-gray-200"
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
              trackColor={{ false: "#9f9f9f", true: "#767590" }}
              thumbColor={isEnabled ? "#767580" : "#f4f3f4"}
              value={signingAuto}
              onValueChange={toggleSigningAuto}
            />
          </View>

          {isLoading ? (
            <Animated.View
              exiting={ZoomOutDown.delay(2000)}
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
              className="w-32 h-14 rounded-2xl shadow-lg shadow-gray-800 items-center justify-center bg-gray-600"
              onPress={() => {
                setIsLoading(true) & Authentication(cpf, password);
              }}
            >
              <Text className="font-default self-center text-2xl text-white">
                Entrar
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
              <Text className='font-default underline underline-offset-1 text-gray-700'>
                Esqueci minha senha
                </Text>
      <Animated.View
        entering={BounceInDown.duration(1400)}
      >
        <TouchableOpacity
          className="w-48 h-14 my-5 rounded-2xl items-center justify-center shadow-md shadow-black bg-gray-600"
          onPress={() => navigate("Cadastrar")}
        >
          <Text className="font-default text-xl text-white">REGISTRAR</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
