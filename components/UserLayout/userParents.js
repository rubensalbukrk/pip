import React,{ useContext } from "react";
import { Box, Text, Container } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../src/contexts/AuthContext";

export default function MyParents() {
    const {logged} = useContext(AuthContext)
    const parentsCount = logged.parentsName?.map((item) => {
        return (
        <Box key={item.id} w="100%" mt="4%" bg="indigo.400" px="4%" py="4%" opacity="0.7" rounded="lg" justifyContent="left">
            <Text ml="2" color="white" fontSize="lg">
              Nome
            </Text>
            <Box h="10" justifyContent="center" rounded="md" opacity="0.9" bgColor="indigo.500">
              <Text color="white" paddingX="4" fontSize="lg" >
                {item.name}
              </Text>
            </Box>
                <Text ml="2" color="white" fontSize="lg">
                Idade
                </Text>
                <Container>
            <Box h="10" bg="indigo.500" rounded="md" justifyContent="center">
              <Text paddingX="4" color="white" mr="3" fontSize="lg" >
                {item.idade}
              </Text>
            </Box>
            </Container>
        </Box>
        )
    })
  return parentsCount
}
