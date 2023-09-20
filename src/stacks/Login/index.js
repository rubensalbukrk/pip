import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { Box, Image, Text, Input, Button, Pressable, Icon } from "native-base";
import { Ionicons, Feather } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../requisitions/api";
import { UserContext } from "../../contexts/UserContext";

export const Login = () => {
  const {users, setUsers} = useContext(UserContext)
  const { auth, Authentication, logged } = useContext(AuthContext)
  const [cpf, setCpf] = useState(String)
  const [password, setPassword] = useState(String)
  const [show, setShow] = useState(false)
  const [submit, setSubmit] = useState(false)
  const navigation = useNavigation()

  const accessPage = () => navigation.navigate('HomeApp')

  useEffect(() => {
    getUsers();
  },[]);

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
          source={require("../../../assets/imgs/pip-logoTESTE.png")} />
      </Animatable.View>
      <Box bg="light.100" h="44%" shadow={6} mb="5%" rounded={"2xl"} w="80%" alignItems={"center"} justifyContent="center">
      <Box
        w="90%"
        h="12"
        mb="5%"
        flexDir="row"
        alignItems={"center"}
        justifyContent="space-between"
        borderWidth="1"
        borderColor={"lightBlue.300"}
        rounded="2xl">
         
        <Feather name="user" size={32} color="#23B5D3" />
        <TextInputMask
          style={{ width: "100%", borderColor: '#23B5D3', color: '#23B5D3', marginLeft: '15%', height: 50, textAlign: "left", fontSize: 24 }}
          type="cpf"
          placeholderTextColor={"#23B5D3"}
          value={cpf}
          placeholder="000.000.000-00"
          onChangeText={(text) => setCpf(text)} />
      </Box>

      <Input
        onChangeText={(pass) => setPassword(pass)}
        fontSize="2xl"
        w="90%"
        style={{color: '#23B5D3'}}
        borderColor={"lightBlue.300"}
        rounded="2xl"
        textAlign={"center"}
        type={show ? "text" : "password"}
        InputRightElement={<Pressable onPress={() => setShow(!show)}>
          <Icon
            as={<Ionicons name={show ? "eye-outline" : "eye-off-outline"} />}
            size={5}
            mr="2"
            color="#23B5D3" />
        </Pressable>}
        InputLeftElement={<Feather name="lock" size={32} color="#23B5D3" />}
        placeholder="******"
        defaultValue="123456" />

      {!submit ?
        <Button
          size={"lg"}
          w="80%"
          mt="10"
          colorScheme={"lightBlue"}
          rounded="2xl"
          onPress={() => { setSubmit(true) & Authentication(cpf, password) & accessPage()} }
        >
          ENTRAR
        </Button>
        :
        <Button isLoading
          isLoadingText="Aguarde..."
          variant="outline"
          size={"lg"}
          w="80%"
          mt="10"
          rounded="2xl"></Button>}
    </Box>
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
    
  )
};