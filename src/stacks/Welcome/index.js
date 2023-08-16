import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  GlobalStyles,
  PersianBlue,
  CelestialBlue,
  SkyBlue,
  NavyBlue,
  FederalBlue,
} from "../../../components/GlobalStyles";
import { UserContext } from "../../contexts/UserContext";
import { Box, Button, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const Welcome = () => {
  const navigation = useNavigation();
  const { users, ObterDados } = useContext(UserContext);

  return (
    <Box flex="1" bg={"white"} alignItems="center">
      <Image
        resizeMode="contain"
        w="100%"
        height="55%"
        alt="piplogo"
        source={require("../../../assets/imgs/pip-logo.jpg")}
      />

      <Text my="1" mx="5" fontFamily="Doppio One" fontSize="2xl">
        Aqui você tem acesso a todos os nossos serviços sociais
      </Text>

      <TouchableOpacity
        style={{
          marginTop: "10%",
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#26B7FF",
          borderRadius: 50,
        }}
        onPress={() => navigation.navigate("Login") & ObterDados()}
      >
        <AntDesign name="arrowright" size={32} color="white" />
      </TouchableOpacity>
    </Box>
  );
};
