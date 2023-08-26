import React, { useContext } from "react";
import { View, Dimensions } from "react-native";
import {
  Box,
  Circle,
  ScrollView,
  Container,
  FlatList,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  Center,
  Divider,
} from "native-base";
import PieGraphic from "../../Graphics/PieGraphic";

export default function TabCadastros() {

 
  return (
    <Box flex={1} w="100%">
      <ScrollView h="100%" horizontal={false}>
       

          <HStack alignSelf="center" shadow={2} w="90%" bg="lightBlue.100" rounded="lg" alignItems="center" justifyContent="center">
            <PieGraphic />
            <VStack w="40%" space={3} justifyContent="center">  
              <HStack>
                <Circle size="20px" bg="#0005ff" />
                <Text> PESSOAS</Text>
              </HStack>
              <HStack>
                <Circle size="20px" bg="#9555ff" />
                <Text> CRIANÇAS</Text>
              </HStack>
              <HStack>
                <Circle size="20px" bg="#65cdfc" />
                <Text> AUTISTAS</Text>
              </HStack>
              <HStack>
                <Circle size="20px" bg="#c6ceff" />
                <Text> VOLUNTÁRIOS</Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack mt="5" h="200px" space={2} alignSelf="center" shadow={2} w="90%" bg="lightBlue.200" rounded="lg" alignItems="center" justifyContent="center">
            <Heading color="light.100" shadow={1} fontSize="xl">Familias por Bairro</Heading>

          </HStack>
     
      </ScrollView>
      
    </Box>
  );
}
