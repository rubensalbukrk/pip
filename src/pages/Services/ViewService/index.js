import React, { useState, useContext } from "react";
import axios from "axios";
import {
  ScrollView,
  Box,
  Text,
  Image,
  Center,
  Container,
  Heading,
  Button,
  HStack,
  VStack,
  NativeBaseProvider
} from "native-base";
import BackButton from "../../../../components/BackButton";
import { UserContext } from "../../../contexts/UserContext";
import { api } from "../../../requisitions/api";
import { LinearGradient } from "expo-linear-gradient";
export default function ViewService({ route }) {
  const {logged} = useContext(UserContext)

  function handleSolicitation(service){
    let newSolicitation = {
        userInfo: logged,
        nome: logged?.nome,
        cpf: logged?.cpf,
        service: service,
        pasta: `${route?.params?.pasta}`,
        status: "Aguardando analise..."
      }
    axios
      .post(`${api}/solicitations`, newSolicitation, {
        method: "post",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69421",
        }),
      })
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => console.error(error));
  }

  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  return (
    <NativeBaseProvider config={config}>
    <ScrollView flex={1} bg="lightBlue.700" w="100%">
      <Box
        w="100%"
        minHeight="900"
        py="46"
       
        alignItems="center"
        bg={{
          linearGradient: {
            colors: ["lightBlue.500", "lightBlue.700"],
            start: [1, 1],
            end: [0, 0],
          },
        }}
      >
        <Box position="absolute" top="9%" left="4%">
          <BackButton />
        </Box>
        <Image
          resizeMode='cover'
          rounded="full"
          my="15%"
          alt="pip-service"
          size={64}
          source={route?.params?.picture}
        />
        <Box px="3" w="100%">
          <Heading alignSelf="right" fontFamily="Doppio One" color="#fff" mt="2%" fontSize="4xl">
            {route?.params?.titulo}
          </Heading>

          <Box
           rounded="lg"
           shadow={7}
           px="2"
           py="3"
            bg="rgba(255,255,255, 0.15)"
          >
            <Heading
              fontFamily="Doppio One"
              fontSize="md"
              color={"light.100"}
            >
              {route?.params?.descricao}
            </Heading>
          </Box>
          <Text alignSelf="right" fontFamily="Doppio One" color="#fff" mt="2%" fontSize="2xl">
            Serviços disponíveis
          </Text>
          <VStack
            px="2"
            py="2"
            w="100%"
            bg="rgba(255,255,255, 0.15)"
            rounded="lg"
            space={1}
            maxH="800"
          >
            
            {route?.params?.requisite[0] ? <Button onPress={() => handleSolicitation(route?.params?.requisite[0])} colorScheme={'darkBlue'}>{route?.params?.requisite[0]}</Button> : null }
            {route?.params?.requisite[1] ? <Button onPress={() => handleSolicitation(route?.params?.requisite[1])} colorScheme={'darkBlue'}>{route?.params?.requisite[1]}</Button> : null }
            {route?.params?.requisite[2] ? <Button onPress={() => handleSolicitation(route?.params?.requisite[2])} colorScheme={'darkBlue'}>{route?.params?.requisite[2]}</Button> : null }
            {route?.params?.requisite[3] ? <Button onPress={() => handleSolicitation(route?.params?.requisite[3])} colorScheme={'darkBlue'}>{route?.params?.requisite[3]}</Button> : null }
         
          </VStack>

        </Box>
      </Box>
    </ScrollView>
   </NativeBaseProvider>
  );
}
