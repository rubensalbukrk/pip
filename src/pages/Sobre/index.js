import React from "react";
import {
  Box,
  ScrollView,
  Image,
  Text,
  Heading,
  NativeBaseProvider,
} from "native-base";
import BackButton from "../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { GlobalStyles } from "../../../components/GlobalStyles";

export default function Sobre() {
  const height = Dimensions.get("window").height;
  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  return (
    <NativeBaseProvider config={config}>
      <ScrollView w="100%" h={height} bg="lightBlue.400">
        <Box
          h={height}
          flex={1}
          w="100%"
          justifyContent={"center"}
          alignItems="center"
          bg={{
            linearGradient: {
              colors: ["lightBlue.600", "lightBlue.400"],
              start: [0, 0],
              end: [1, 0],
            },
          }}
        >
          <Image
            w="90%"
            position="absolute"
            blurRadius={9}
            opacity={0.8}
            alt="pip-logo"
            resizeMode="cover"
            source={require("../../../assets/pip-icon.png")}
          />

          <Heading fontFamily={"Doppio One"} fontSize={"9xl"} color="light.100" opacity={0.8}>PIP</Heading>

          <Heading style={[GlobalStyles.fontSystem]} fontSize="lg">
            O que é o PROJETO INCLUSÃO SOCIAL?
          </Heading>

          <Box
            w="90%"
            mt="2%"
            py="2"
            px="3"
            bg="rgba(255,255,255, 0.15)"
            rounded="lg"
          >
            <Text style={[GlobalStyles.fontSystem]} fontSize="md">
              O PIP é uma associação sem fins lucrativos, inscrito no CNPJ :
              46.612.280/0001-90 e atuando no município de Santa Rita -PB. Somo
              uma equipe de voluntários que se dividem em VOLUNTÁRIOS INTEGRAIS
              e VOLUNTÁRIOS LOCAIS, atuando de forma descentralizada nos bairros
              mais vulneráveis. Nossas ações são realizadas em parcerias com
              poder público e uma rede de empresas privadas que tem como alvo
              minorar as vulnerabilidades sociais.
            </Text>
          </Box>

          <Heading style={[GlobalStyles.fontSystem]} mt="3%" fontSize="2xl">
            Coordenação
          </Heading>

          <Box
            w="90%"
            mb="3%"
            px="2"
            py="3"
            bg="rgba(255,255,255, 0.15)"
            rounded="lg"
          >
            <Text
              style={[GlobalStyles.fontSystem]}
              alignText="center"
              fontSize="sm"
            >
              O PIP é composto por 04 coordenações de cunho administrativo e 10
              coordenações das pastas de atuação.
            </Text>
          </Box>
          <BackButton />
          <Text style={[GlobalStyles.fontSystem]} my="1%" fontSize="lg">
            Todos os direitos reservados 2023 .
          </Text>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
}
