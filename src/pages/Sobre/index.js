import React from "react";
import { View } from "react-native";
import {
  Box,
  ScrollView,
  HStack,
  Image,
  Center,
  VStack,
  Text,
  Heading,
  Avatar,
} from "native-base";
import BackButton from "../../../components/BackButton";

export default function Sobre() {
  return (
    <ScrollView flex={1} w="100%" px="3" bg="lightBlue.400">
      
      <Box
        position="absolute"
        left="2%"
        top="4%"
      >
        <BackButton />
      </Box>
      <Center mt="3%" w="100%">
      <Image
          w="80%"
          h="120"
          mb="5%"
          resizeMode="contain"
          shadow={3}
          source={require("../../../assets/imgs/pip-logoTESTE.png")}
        />
      <Heading 
      color="#fff"
      fontSize="lg">
        O que é o PROJETO INCLUSÃO SOCIAL?</Heading>

      <Box shadow={8} w="90%" mt="2%" py="2" px="3" bg="lightBlue.300" rounded="lg">
        <Text color="#fff" fontSize="md">
        O PIP é uma associação sem fins lucrativos, inscrito no CNPJ : 46.612.280/0001-90 e atuando no município de Santa Rita -PB.

        Somo uma equipe de voluntários que se dividem em VOLUNTÁRIOS INTEGRAIS e VOLUNTÁRIOS LOCAIS, atuando de forma descentralizada nos bairros mais vulneráveis.

        Nossas ações são realizadas em parcerias com poder público e uma rede de empresas privadas que tem como alvo minorar as vulnerabilidades sociais.
        </Text>
      </Box>

      <Heading mt="3%" fontSize="2xl" color="#fff">
        Coordenação
      </Heading>

      <Box shadow={8} w="90%" mb="3%" px="2" py="3" bg="lightBlue.300" rounded="lg">
        <Text color="#fff" alignText="center" fontSize="sm">
        O PIP é composto por 04 coordenações de cunho administrativo e 10 coordenações das pastas de atuação.
        </Text>
       
       <Text 
       color="light.100"
       fontSize="lg"
       bold>
        Somos:
       </Text>
        
      </Box>
      <Text color="light.100" fontSize="md">
          Todos os direitos reservados 2023 .
        </Text>
 
      </Center>
    </ScrollView>
  );
}
