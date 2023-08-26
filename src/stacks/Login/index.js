import React, { useContext, useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { Box, Image, Text, Input, Button, Pressable, Icon } from "native-base";
import { Ionicons, Feather } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { AuthContext } from "../../contexts/AuthContext";
import { Alert } from "react-native";
import { UserContext } from "../../contexts/UserContext";


export const Login = () => {
  const {users} = useContext(UserContext)
  const { submit, setSubmit, auth, Authentication, logged } = useContext(AuthContext)
  const [cpf, setCpf] = useState(String)
  const [password, setPassword] = useState(String)
  const [show, setShow] = useState(false)
  const navigation = useNavigation()

  const accessPage = () => navigation.navigate('HomeApp')

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
          flexDir="row"
          alignItems={"center"}
          justifyContent="space-between"
          borderWidth="1"
          borderColor={"#d9d9d9"}
          rounded="2xl"        >
          <Feather name="user" size={32} color="#d9d9d9" />
          <TextInputMask
            style={{ width: "100%",marginLeft: '5%', height: 50, textAlign: "left", fontSize: 24 }}
            type="cpf"
            value={cpf}
            defaultValue="111-222-333-44"
            placeholder="000.000.000-00"
            onChangeText={(text) => setCpf(text)}
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
          onChangeText={(pass) => setPassword(pass)}
          fontSize="2xl"
          w="90%"
          rounded="2xl"
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
          InputLeftElement={<Feather name="lock" size={32} color="#d9d9d9" />}
          placeholder="654321"
          defaultValue="654321"
        />
        
        {!submit ? 
        <Button  
        size={"lg"}
        w="80%"
        mt="10"
        rounded="2xl"
        onPress={() => {Authentication(cpf, password) & setSubmit(true) & accessPage()}} 
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
      rounded="2xl"></Button>
      }
        
        
       
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
