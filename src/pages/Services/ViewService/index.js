import React from "react";
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

export default function ViewService({ route }) {
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
            Requerimentos
          </Text>
          <VStack
            px="2"
            py="2"
            w="100%"
            bg="lightBlue.300"
            rounded="lg"
            space={1}
          >
            <Text textDecorationLine={"underline"}>
              {route?.params?.requisite[0]}
            </Text>
            <Text textDecorationLine={"underline"}>
              {route?.params?.requisite[1]}
            </Text>
            <Text textDecorationLine={"underline"}>
              {route?.params?.requisite[2]}
            </Text>
            <Text textDecorationLine={"underline"}>
              {route?.params?.requisite[4]}
            </Text>
          </VStack>
          <Button mt="9%" w="70%" alignSelf="center" colorScheme={"darkBlue"}>
            SOLICITAR
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
}
