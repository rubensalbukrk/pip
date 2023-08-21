import React,{ useContext } from "react";
import { Box, Text, Container } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../src/contexts/AuthContext";

export default function MyParents() {
    const {logged} = useContext(AuthContext)
    const parentsCount = logged.parentsName.map((item) => {
        return (
        <Box key={item.id} w="100%" mt="4%" bg="light.300" px="4%" py="4%" opacity="0.6" rounded="lg" justifyContent="left">
            <Text ml="2" fontSize="lg">
              Nome
            </Text>
            <Box h="10" justifyContent="center" rounded="md" bgColor="light.200">
              <Text paddingX="4" fontSize="lg" >
                {item.name}
              </Text>
            </Box>
                <Text ml="2" fontSize="lg">
                Idade
                </Text>
                <Container>
            <Box h="10" bg="light.300" rounded="md" justifyContent="center">
              <Text paddingX="4" mr="3" fontSize="lg" >
                {item.idade}
              </Text>
            </Box>
            </Container>
        </Box>
        )
    })
  return parentsCount
}
