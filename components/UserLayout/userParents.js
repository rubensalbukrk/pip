import React,{ useContext } from "react";
import { Box, Text, Container } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from "../../src/contexts/UserContext";

export default function MyParents() {
    const {logged} = useContext(UserContext)
    const parentsCount = logged.parentsName?.map((item) => {
        return (
        <Box key={item.id} w="100%" mt="4%" bg="light" px="4%" py="4%" opacity="0.3" rounded="lg" justifyContent="left">
            <Text ml="2" color="light.700" fontSize="lg">
              Nome
            </Text>
            <Box h="10" justifyContent="center" rounded="md" opacity="0.9" bgColor="light.200">
              <Text color="black" paddingX="4" fontSize="lg" >
                {item.name}
              </Text>
            </Box>
                <Text ml="2" color="light.700" fontSize="lg">
                Idade
                </Text>
                <Container>
            <Box opacity={0.9} mb="4%" h="10" bg="light.200" rounded="md" justifyContent="center">
              <Text paddingX="4" color="black" mr="3" fontSize="lg" >
                {item.idade}
              </Text>
            </Box>
            </Container>
        </Box>
        )
    })
  return parentsCount
}
