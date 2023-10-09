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
  ZStack,
} from "native-base";
import PieGraphic from "../../Graphics/PieGraphic";
import { UserContext } from "../../../src/contexts/UserContext";

export default function TabCadastros() {
 const {users} = useContext(UserContext)
 let tibiri = users?.filter((item) => {
  if (item.bairro === String("Tibiri")){
      return item
  }
})
let santaRita = users?.filter((item) => {
  if(item.bairro === String("Santa Rita")){
      return item
  }
})
let marcosMoura = users?.filter((item) => {
  if(item.bairro === "Marcos Moura"){
    return item
  }
})
let varzeaNova = users?.filter((item) => {
  if(item.bairro === "Varzea Nova"){
    return item
  }
})
let cruzEspiritoSanto = users?.filter((item) => {
  if(item.bairro === "Cruz do Espirito Santo"){
    return item
  }
})

let tibiriCount = tibiri?.length
let santaRitaCount = santaRita?.length
let marcosMouraCount = marcosMoura?.length
let varzeaNovaCount = varzeaNova?.length
let cruzEspiritoSantoCount = cruzEspiritoSanto?.length

  return (
      <ScrollView mb="5%" flex={1} w="100%" horizontal={false}>

          <VStack alignSelf="center" shadow={2} w="90%" rounded="lg" alignItems="center" justifyContent="center">
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
                <Circle size="20px" bg="#FF3100"/>
                <Text> VOLUNTÁRIOS</Text>
              </HStack>
              <HStack>
                <Circle size="20px" bg="#41bb" />
                <Text> COORDENADORES</Text>
              </HStack>
            </VStack>

            </HStack>
          </VStack>
        
            <Heading color="lightBlue.400" ml="4%" shadow={1} fontSize="3xl">Familias por bairro</Heading>
              <Divider my="2" />
            <HStack mb="4%" alignItems="center" justifyContent="center" flexWrap={1} w="100%">
              <Center h="140px" mx="4" my="2" w="140px" rounded="lg" bg="lightBlue.500">
                <Text color="light.100" fontSize="6xl"> {tibiriCount ? tibiriCount : "0"} </Text>
                <Text color="light.100" fontSize="lg">Tibiri</Text>
              </Center>

              <Center h="140px" mx="4" my="2" w="140px" rounded="lg" bg="lightBlue.500">
                <Text color="light.100" fontSize="6xl"> {varzeaNovaCount ? varzeaNovaCount : "0"} </Text>
                <Text color="light.100" fontSize="lg">Varzea Nova</Text>
              </Center>

              <Center h="140px" mx="4" my="2" w="140px" rounded="lg" bg="lightBlue.500">
                <Text color="light.100" fontSize="6xl"> {santaRitaCount ? santaRitaCount : "0"} </Text>
                <Text color="light.100" fontSize="lg">Santa Rita</Text>
              </Center>

              <Center h="140px" mx="4" my="2" w="140px" rounded="lg" bg="lightBlue.500">
                <Text color="light.100" fontSize="6xl"> {marcosMouraCount ? marcosMouraCount : "0"} </Text>
                <Text color="light.100" fontSize="lg">Marcos Moura</Text>
              </Center>
              <Center h="140px" mx="4" my="2" w="140px" rounded="lg" bg="lightBlue.500">
                <Text color="light.100" fontSize="6xl"> {cruzEspiritoSantoCount ? cruzEspiritoSantoCount : "0"} </Text>
                <Text color="light.100" fontSize="md">Cruz do Espirito S.</Text>
              </Center>
              <Center h="140px" mx="4" my="2" w="140px" rounded="lg" bg="lightBlue.500">
                <Text color="light.100" fontSize="6xl"> 0 </Text>
                <Text color="light.100" fontSize="lg">Outros</Text>
              </Center>
            
            </HStack>
        
   
      </ScrollView>
      

  );
}
