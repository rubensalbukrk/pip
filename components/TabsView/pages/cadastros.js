import React from "react";
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
      <ScrollView mb="5%" flex={1} w="100%" horizontal={false}>

          <VStack alignSelf="center" shadow={2} w="90%" bg="darkBlue.200" rounded="lg" alignItems="center" justifyContent="center">
            <PieGraphic />
            <HStack alignItems="center">

            
            <VStack my="10" w="40%" space={3}>  
              <HStack>
                <Circle size="20px" bg="#0005ff" />
                <Text> PESSOAS</Text>
              </HStack>
              <HStack>
                <Circle size="20px" bg="#9555ff" />
                <Text> AUTISTAS</Text>
              </HStack>
            </VStack>

            <VStack  my="10" w="40%" space={3}>
              <HStack>
                <Circle size="20px" bg="#00255c" />
                <Text> VOLUNTÁRIOS</Text>
              </HStack>
              <HStack>
                <Circle size="20px" bg="#EDFF86" />
                <Text> COORDENADORES</Text>
              </HStack>
            </VStack>

            </HStack>
          </VStack>
          <HStack mt="5" h="200px" space={2} alignSelf="center" shadow={2} w="90%" bg="lightBlue.300" rounded="lg" alignItems="center" justifyContent="center">
            <Heading color="light.100" shadow={1} fontSize="xl">Familias por Bairro</Heading>

          </HStack>
     
      </ScrollView>
      

  );
}
