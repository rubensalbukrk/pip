import React, { useEffect, useContext, useState } from "react";
import * as Animatable from "react-native-animatable";
import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../components/GlobalStyles";
import { Box, Image, Text, Input, Button, Pressable, Icon } from "native-base";
import { UserContext } from "../../contexts/UserContext";
import { Ionicons, Feather } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { AuthContext } from "../../contexts/AuthContext";

export const Login = () => {
  const { auth, logged, Authentication } = useContext(AuthContext);
  const [cpf, setCpf] = useState(String);
  const [password, setPassword] = useState(String);
  const [show, setShow] = React.useState(false);
  const [submit, setSubmit] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    auth ? navigation.navigate("HomeApp") : null;
  }, [auth]);

  return (
    <Box
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"darkBlue.400"}
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
      <Animatable.View
        style={{ width: "80%", height: "50%" }}
        animation="bounceIn"
        delay={500}
      >
        <Box
          w="100%"
          h="80%"
          mt="10"
          justifyContent={"center"}
          alignItems="center"
          px="1"
          shadow={9}
          bgColor={"light.100"}
          rounded="2xl"
        >
          <Text
            color={"lightBlue.400"}
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
            flexDir="row"
            alignItems={"center"}
            justifyContent="space-between"
            borderWidth="1"
            borderColor={"lightBlue.300"}
            rounded="2xl"
          >
            <Feather
              name="user"
              size={32}
              style={{ marginHorizontal: "3%" }}
              color="#30b8ff"
            />
            <TextInputMask
              style={{
                width: "100%",
                color: "#30b8ff",
                marginLeft: "5%",
                height: 50,
                textAlign: "left",
                fontSize: 24,
              }}
              type="cpf"
              value={cpf}
              defaultValue="111-222-333-44"
              placeholder="000.000.000-00"
              placeholderTextColor={"#D2D2D2"}
              onChangeText={(text) => setCpf(text)}
            />
          </Box>

          <Text
            color={"lightBlue.400"}
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
            color={"lightBlue.400"}
            borderColor={"lightBlue.300"}
            fontSize="2xl"
            w="90%"
            rounded="2xl"
            textAlign={"center"}
            onChangeText={(pass) => setPassword(pass)}
            type={show ? "text" : "password"}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <Ionicons name={show ? "eye-outline" : "eye-off-outline"} />
                  }
                  size={5}
                  mr="2"
                  color="lightBlue.300"
                />
              </Pressable>
            }
            InputLeftElement={
              <Feather
                name="lock"
                style={{ marginHorizontal: "3%" }}
                size={28}
                color="#38b6ff"
              />
            }
          />

          <Button
            size={"lg"}
            w="80%"
            mt="5"
            bg="darkBlue.400"
            rounded="2xl"
            isLoading={submit ? true : false}
            isLoadingText="Aguarde..."
            onPress={() => {
              setSubmit(!submit) & Authentication(cpf, password);
            }}
          >
            ENTRAR
          </Button>
        </Box>
      </Animatable.View>
      <Text
      fontSize="lg" 
      textDecorationLine={'underline'}
      textDecorationColor={"lightBlue.400"}
      color={"darkBlue.600"}
      
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
  );
};
