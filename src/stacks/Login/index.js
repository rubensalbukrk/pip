import React, { useContext, useState } from "react";
import * as Animatable from "react-native-animatable";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../components/GlobalStyles";
import { Box, Image, Text, Input, Button, Pressable, Icon } from "native-base";
import { UserContext } from "../../contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";

export const Login = () => {
  const [cpf, setCpf] = useState();
  const [show, setShow] = React.useState(false);
  const navigation = useNavigation();
  const { ObterDados } = useContext(UserContext);
  return (
    <Box
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
      }}
    >
      <Animatable.View
        style={{ flex: 1, width: "100%", height: "20%" }}
        delay={400}
        animation="bounceIn"
      >
        <Image
          style={{
            resizeMode: "contain",
            width: "100%",
            height: "100%",
          }}
          alt="pip-logo"
          source={require("../../../assets/imgs/pip-logo.jpg")}
        />
      </Animatable.View>
      <Animatable.View style={{width: '80%', height:'50%'}} animation="bounceIn" delay={500}>
      <Box
        w="100%"
        h="100%"
        py="1"
        justifyContent={"center"}
        alignItems="center"
        px="2"
        bgColor={"light.100"}
        rounded="2xl"
      >
        <Text fontSize={"3xl"}>ÁREA DE ACESSO</Text>

        <Text
          style={{
            width: "100%",
            textAlign: "left",
            marginTop: 10,
            marginLeft: "12%",
          }}
        >
          CPF
        </Text>
        <Box
          w="90%"
          h="12"
          alignItems={"center"}
          justifyContent="center"
          borderWidth="1"
          borderColor={"#d9d9d9"}
          rounded="4"
        >
          <TextInputMask
            style={{ width: "100%", height: 40, textAlign: "center" }}
            type={"cpf"}
            value={cpf}
            onChangeText={(text) => {
              setCpf(...[cpf], { cpf: text });
            }}
          />
        </Box>

        <Text
          style={{
            width: "100%",
            textAlign: "left",
            marginTop: 20,
            marginLeft: "12%",
          }}
        >
          SENHA
        </Text>
        <Input
          fontSize="2xl"
          w="90%"
          textAlign={"center"}
          type={show ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <Ionicons name={show ? "eye-outline" : "eye-off-outline"} />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          placeholder="*******"
        />
        <Button
          size={"lg"}
          w="80%"
          mt="10"
          onPress={() => navigation.navigate("HomeApp")}
        >
          ENTRAR
        </Button>
      </Box>
      </Animatable.View>
      <Button
        variant={"outline"}
        size={"lg"}
        w="200"
        mt="10"
        mb="10"
        onPress={() => navigation.navigate("Cadastrar")}
      >
        FAZER MEU CADASTRO
      </Button>
    </Box>
  );
};
