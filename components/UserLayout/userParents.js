import React, { useContext } from "react";
import { Box, Text, Container, Divider } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from "../../src/contexts/UserContext";

export default function MyParents(props) {
    return (
      <Box
        key={props.cpf}
        w="100%"
        mt="4%"
        px="2"
        py="3"
        bg="lightBlue.400"
        rounded="lg"
        opacity={0.5}
      >
        <Text ml="2" color="light.700" fontSize="lg">
          Nome
        </Text>
        <Box
          h="10"
          justifyContent="center"
          rounded="md"
          opacity="0.9"
          bg="lightBlue.500"
        >
          <Text color="black" paddingX="4" fontSize="lg">
            {props.nome}
          </Text>
        </Box>
        <Text mt="2" ml="2" color="light.700" fontSize="lg">
          CPF
        </Text>
        <Box
          h="10"
          w="65%"
          mb="2"
          justifyContent="center"
          rounded="md"
          opacity="0.9"
          bg="lightBlue.500"
        >
          <Text color="black" paddingX="4" fontSize="lg">
            {props.cpf}
          </Text>
        </Box>
        <Text ml="2" color="light.700" fontSize="lg">
          Idade
        </Text>
      
          <Box
            opacity={0.9}
            mb="4%"
            w="25%"
            h="10"
            bg="lightBlue.500"
            rounded="md"
            justifyContent="center"
          >
            <Text paddingX="4" color="black" mr="3" fontSize="lg">
              {props.idade}
            </Text>
          </Box>
          <Divider w="100%" alignSelf={"center"} />
        
      </Box>
    );

}
