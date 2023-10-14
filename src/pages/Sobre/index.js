import React from "react";
import {
  Box,
  ScrollView,
  Image,
  Center,
  Text,
  Heading,
  NativeBaseProvider,
} from "native-base";
import BackButton from "../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

export default function Sobre() {

  const height = Dimensions.get('window').height
 
  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  return (
    <NativeBaseProvider config={config}>
      <ScrollView flex={1} w="100%" bg="lightBlue.400">
        <Center 
          w="100%"
          height={height}
          bg={{
            linearGradient: {
              colors: ['lightBlue.600', 'lightBlue.400'],
              start: [0, 0],
              end: [1, 0]
            }
          }}
          >
          <Box position="absolute" left="2%" top="8%">
            <BackButton />
          </Box>
          <Image
            w="80%"
            my="10%"
            resizeMode="stretch"
            
            source={require("../../../assets/imgs/pip-logoTESTE.png")}
          />
          <Heading color="#fff" fontSize="lg">
            O que é o PROJETO INCLUSÃO SOCIAL?
          </Heading>

          <Box
            shadow={3}
            w="90%"
            mt="2%"
            py="2"
            px="3"
            bg="rgba(255,255,255, 0.15)"
            rounded="lg"
          >
            <Text color="#fff" fontSize="md">
              O PIP é uma associação sem fins lucrativos, inscrito no CNPJ :
              46.612.280/0001-90 e atuando no município de Santa Rita -PB. Somo
              uma equipe de voluntários que se dividem em VOLUNTÁRIOS INTEGRAIS
              e VOLUNTÁRIOS LOCAIS, atuando de forma descentralizada nos bairros
              mais vulneráveis. Nossas ações são realizadas em parcerias com
              poder público e uma rede de empresas privadas que tem como alvo
              minorar as vulnerabilidades sociais.
            </Text>
          </Box>

          <Heading mt="3%" fontSize="2xl" color="#fff">
            Coordenação
          </Heading>

          <Box
            shadow={8}
            w="90%"
            mb="3%"
            px="2"
            py="3"
            bg="rgba(255,255,255, 0.15)"
            rounded="lg"
          >
            <Text color="#fff" alignText="center" fontSize="sm">
              O PIP é composto por 04 coordenações de cunho administrativo e 10
              coordenações das pastas de atuação.
            </Text>

            <Text color="light.100" fontSize="lg" bold>
              Somos:
            </Text>
          </Box>
          <Text color="light.100" fontSize="md">
            Todos os direitos reservados 2023 .
          </Text>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}
