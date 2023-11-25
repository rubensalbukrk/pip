import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons, Feather } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";

export const Login = () => {
  const [isEnabled , setIsEnable] = useState(false)
  const { users, logged, setNotices } = useContext(UserContext);
  const { Authentication, submit, setSigningAuto, signingAuto } =
    useContext(AuthContext);
  const [cpf, setCpf] = useState(String);
  const [password, setPassword] = useState(String);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (logged?.cpf) {
      navigation.navigate("HomeApp");
    }
  }, [logged]);

  const toggleSigningAuto = () => {
    setSigningAuto((previousState) => !previousState);
  };

  return (
    <View className="flex-1 p-6 justify-center items-center bg-blue-600" p="6">
      <Image
        style={{
          resizeMode: "contain",
          width: "90%",
          height: 300,
          marginHorizontal: "15%",
          alignSelf: "center",
        }}
        alt="pip-logo"
        source={require("../../../assets/pip-icon.png")}
      />

      <View className="w-full my-5 py-5 items-center rounded-2xl bg-white/20">
        <View className="flex-row w-64 h-12 mb-5 items-center rounded-2xl border-2 border-white/25">
          <Feather name="user" size={32} color={"rgba(255, 255, 255, 0.70)"} />
          <TextInputMask
            style={{
              width: "100%",
              borderColor: "#23B5D3",
              marginLeft: "3%",
              color: "#f9f9f9",
              height: 50,
              textAlign: "left",
              fontSize: 24,
              fontFamily: 'Doppio One'
            }}
            type="cpf"
            bg={"rgba(255, 255, 255, 0.32)"}
            placeholderTextColor={"rgba(255, 255, 255, 0.62)"}
            value={cpf}
            placeholder="000.000.000-00"
            onChangeText={(text) => setCpf(text)}
          />
        </View>

        <TextInput
          className="w-64 h-11 rounded-2xl border-2 text-white font-default text-center text-2xl border-white/30"
          onChangeText={(pass) => setPassword(pass)}
          placeholderTextColor={"rgba(255, 255, 255, 0.32)"}
          type={show ? "text" : "password"}
          blurOnSubmit={true}
          secureTextEntry={true}
          placeholder="******"
        />

        <View className="self-start mx-5 my-2">
          <Text className="font-default text-xl mt-2 text-white">Lembrar-me</Text>
          <Switch
            className="self-start "
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            value={signingAuto}
            onValueChange={() => {
              toggleSigningAuto();
            }}
          />
        </View>

        {!submit ? (
          <TouchableOpacity
            className="w-48 h-14 rounded-2xl items-center justify-center bg-white/20"
            onPress={() => {
              Authentication(cpf, password);
            }}
          >
            <Text className="font-default self-center text-4xl text-white">Entrar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="w-48 h-14 rounded-2xl items-center justify-center bg-white/10">
            <Text className="font-default text-4xl text-white/30">
              Aguarde <ActivityIndicator />
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        className="w-48 h-14 rounded-2xl items-center justify-center bg-white/20"
        onPress={() => navigation.navigate("Cadastrar")}
      >
        <Text className="font-default text-xl text-white">REGISTRAR</Text>
      </TouchableOpacity>
    </View>
  );
};
