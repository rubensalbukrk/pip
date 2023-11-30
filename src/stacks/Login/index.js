import React, { useContext, useState, useEffect } from "react";
import { width } from "../../utils/dimensions";
import { View, Text, TouchableOpacity, TextInput, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackgroundLogin from "../../../assets/svgs/wave-top-gray.svg";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import Animated, {
  StretchInX,
  StretchOutX,
  Easing,
  PinwheelIn,
  PinwheelOut,
  BounceInDown,
} from "react-native-reanimated";
import { LottieView } from "../../utils/LottieView";

export const Login = () => {
  const [isEnabled, setIsEnable] = useState(false);
  const { logged } = useContext(UserContext);
  const { Authentication, setSigningAuto, signingAuto, isLoading, setIsLoading } =
    useContext(AuthContext);
  const [cpf, setCpf] = useState(String);
  const [password, setPassword] = useState(String);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    if (logged?.cpf) {
      setTimeout(() => {
        navigation.navigate("HomeApp");
        setIsLoading(false)
      }, 3000);
    }else{
      setIsLoading(false)
    }
  }, [logged]);

  const toggleSigningAuto = () => {
    setSigningAuto((previousState) => !previousState);
  };

  return (
    <View className="flex-1 px-7 justify-around items-center">
      <BackgroundLogin style={{ position: "absolute", top: 0 }} width={width} />
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

      <Animated.View
        entering={StretchInX.duration(1400).easing(Easing.bounce)}
        exiting={StretchOutX}
        className="w-72 py-7 shadow-lg shadow-black justify-center items-center rounded-2xl bg-gray-200"
      >
        <View className="flex-row w-64 gap-x-3 h-12 mb-5 self-center items-center rounded-2xl border-2 border-gray-600/30">
          <FontAwesome5 name="user-alt" size={28} color={"#6f6f6f"} />
          <TextInputMask
            style={{
              width: "100%",
              color: "#4f4f4f",
              height: 50,
              textAlign: "left",
              fontSize: 22,
              fontFamily: "Doppio One",
            }}
            type="cpf"
            selectionColor={"#9f9f9f"}
            placeholderTextColor={"#6f6f6f"}
            value={cpf}
            placeholder="000.000.000-00"
            onChangeText={(text) => setCpf(text)}
          />
        </View>

        <View className="flex-row w-64 h-12 gap-x-3 items-center rounded-2xl border-2 border-gray-600/30">
          <Ionicons name="key" size={32} color={"#6f6f6f"} />
          <TextInput
            className="font-default text-start text-gray-600 text-2xl"
            onChangeText={(pass) => setPassword(pass)}
            placeholderTextColor={"#6f6f6f"}
            selectionColor={"#9f9f9f"}
            type={show ? "text" : "password"}
            secureTextEntry={true}
            placeholder="******"
          />
        </View>

        <View className="self-start mx-5">
          <Text className="font-default text-lg top-2 text-gray-600">
            Lembrar-me
          </Text>
          <Switch
            className="self-start "
            trackColor={{ false: "#9f9f9f", true: "#767590" }}
            thumbColor={isEnabled ? "#767580" : "#f4f3f4"}
            value={signingAuto}
            onValueChange={toggleSigningAuto}
          />
        </View>

        {isLoading ?
        <View
        className="w-48 h-40 items-center justify-center"
        > 
          <LottieView autoPlay resizeMode="contain" source={require('../../../assets/animations/animation-pip-balls-286f.json')} />
          </View>
        : 
          <TouchableOpacity
            className="w-48 h-14 mt-2 rounded-2xl shadow-lg shadow-gray-800 items-center justify-center bg-gray-500"
            onPress={() => {
             setIsLoading(true) & Authentication(cpf, password);
            }}
          >
            <Text className="font-default self-center text-2xl text-white">
              Entrar
            </Text>
          </TouchableOpacity>
        }
      </Animated.View>

      <Animated.View
        entering={BounceInDown.duration(1400).easing(Easing.bounce)}
      >
        <TouchableOpacity
          className="w-48 h-14 my-5 rounded-2xl items-center justify-center shadow-md shadow-black bg-gray-600"
          onPress={() => navigation.navigate("Cadastrar")}
        >
          <Text className="font-default text-xl text-white">REGISTRAR</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
