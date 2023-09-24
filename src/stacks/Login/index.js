import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Image,
  Text,
  Input,
  Button,
  Pressable,
  Icon,
  NativeBaseProvider,
} from "native-base";
import { Ionicons, Feather } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../requisitions/api";
import { UserContext } from "../../contexts/UserContext";
import { LinearGradient } from "expo-linear-gradient";

export const Login = () => {
  const { users, setUsers } = useContext(UserContext);
  const { auth, Authentication, logged } = useContext(AuthContext);
  const [cpf, setCpf] = useState(String);
  const [password, setPassword] = useState(String);
  const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const navigation = useNavigation();
  const accessPage = () => navigation.navigate("HomeApp");
  const getUsers = () => {
    axios
      .get(`${api}/users`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      .then((response) => {
        const users = response.data.users;
        setUsers(users);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  return (
    <NativeBaseProvider config={config}>
      <Box
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        bg={{
          linearGradient: {
            colors: ["lightBlue.400", "lightBlue.600"],
            start: [1, 1],
            end: [0, 1],
          },
        }}
        p="12"
        rounded="xl"
        _text={{
          fontSize: "md",
          fontWeight: "medium",
          color: "warmGray.50",
          textAlign: "center",
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
              width: "60%",
              marginTop: "10%",
              alignSelf: "center",
            }}
            alt="pip-logo"
            source={require("../../../assets/imgs/pip-logoTESTE.png")}
          />
        </Animatable.View>

        <Box
          bgColor="rgba(255, 255, 255, 0.22)"
          h="44%"
          shadow={6}
          mb="5%"
          rounded={"2xl"}
          w="95%"
          alignItems={"center"}
          justifyContent="center"
        >
          <Box
            w="90%"
            h="12"
            mb="5%"
            flexDir="row"
            alignItems={"center"}
            justifyContent="space-between"
            borderWidth="1"
            borderColor={"rgba(255, 255, 255, 0.32)"}
            rounded="2xl"
          >
            <Feather name="user" size={32} color={"rgba(255, 255, 255, 0.32)"} />
            <TextInputMask
              style={{
                width: "100%",
                borderColor: "#23B5D3",
                color: "#fff",
                marginLeft: "15%",
                height: 50,
                textAlign: "left",
                fontSize: 24,
              }}
              type="cpf"
              bg={"rgba(255, 255, 255, 0.32)"}
              placeholderTextColor={"rgba(255, 255, 255, 0.62)"}
              value={cpf}
              placeholder="000.000.000-00"
              onChangeText={(text) => setCpf(text)}
            />
          </Box>

          <Input
            onChangeText={(pass) => setPassword(pass)}
            fontSize="2xl"
            w="90%"
            
            style={{ color: "rgba(255, 255, 255, 0.32)" }}
            borderColor={"rgba(255, 255, 255, 0.32)"}
            placeholderTextColor={"rgba(255, 255, 255, 0.32)"}
            rounded="2xl"
            textAlign={"center"}
            type={show ? "text" : "password"}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <Ionicons name={show ? "eye-outline" : "eye-off-outline"} />
                  }
                  size={9}
                  mr="2"
                  color={"rgba(255, 255, 255, 0.52)"}
                />
              </Pressable>
            }
            InputLeftElement={<Feather name="lock" size={32} color={"rgba(255, 255, 255, 0.32)"} />}
            placeholder="******"
            defaultValue="123456"
          />

          {!submit ? (
            <Button
              size={"lg"}
              w="80%"
              mt="10"
              
              bg={"rgba(255, 255, 255, 0.22)"}
              rounded="2xl"
              onPress={() => {
                setSubmit(true) & Authentication(cpf, password) & accessPage();
              }}
            >
              <Text
              color="light.100"
              fontSize="lg"
              fontFamily={"Doppio One"}
              >
                Entrar
              </Text>
            </Button>
          ) : (
            <Button
            fontFamily={"Doppio One"}
              isLoading
              isLoadingText="Aguarde..."
              variant="outline"
              size={"lg"}
              w="80%"
              mt="10"
              rounded="2xl"
            ></Button>
          )}
        </Box>
        <Text
          fontSize="lg"
          fontFamily={"Doppio One"}
          textDecorationLine={"underline"}
          textDecorationColor={"lightBlue.400"}
          color={"light.100"}
        >
          Esqueci minha senha
        </Text>
        <Button
          variant={"subtle"}
          color="lightBlue.800"
          size={"lg"}
          w="200"
          mt="10"
          shadow={9}
          mb="10"
          onPress={() => navigation.navigate("Cadastrar")}
        >
          FAZER MEU CADASTRO
        </Button>
      </Box>
    </NativeBaseProvider>
  );
};
