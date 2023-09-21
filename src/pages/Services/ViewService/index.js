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
} from "native-base";
import BackButton from "../../../../components/BackButton";
import { UserContext } from "../../../contexts/UserContext";
import { api } from "../../../requisitions/api";

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

  return (
    <ScrollView flex={1} bg="lightBlue.400" w="100%">
      <Box
        w="100%"
        py="46"
        justifyContent="center"
        alignItems="center"
        bg="lightBlue.400"
      >
        <Box position="absolute" top="4%" left="4%">
          <BackButton />
        </Box>
        <Image
          rounded="full"
          mb="3"
          alt="pip-service"
          size={48}
          source={route?.params?.picture}
        />
        <Box px="3" w="100%">
          <Heading alignSelf="right" color="#fff" mt="2%" fontSize="4xl">
            {route?.params?.titulo}
          </Heading>

          <VStack
            px="2"
            py="2"
            w="100%"
            bg="lightBlue.300"
            rounded="lg"
            space={1}
          >
            <Heading
              _text={{ color: "darkBlue.700" }}
              w="80"
              fontSize="md"
              color={"darkBlue.700"}
            >
              {route?.params?.descricao}
            </Heading>
          </VStack>
          <Text alignSelf="right" color="#fff" mt="2%" fontSize="2xl">
            Serviços disponíveis
          </Text>
          <VStack
            px="2"
            py="2"
            w="100%"
            bg="lightBlue.300"
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
  );
}
