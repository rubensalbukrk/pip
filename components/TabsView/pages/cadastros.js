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

import { UserContext } from "../../../src/contexts/UserContext";

import PieChartWithDynamicSlices from "../../Graphics/DinamicGraphic";

export default function TabCadastros() {
  const { users } = useContext(UserContext);
  let tibiri = users?.filter((item) => {
    if (item.bairro === String("Tibiri")) {
      return item;
    }
  });
  let santaRita = users?.filter((item) => {
    if (item.bairro === String("Santa Rita")) {
      return item;
    }
  });
  let marcosMoura = users?.filter((item) => {
    if (item.bairro === "Marcos Moura") {
      return item;
    }
  });
  let varzeaNova = users?.filter((item) => {
    if (item.bairro === "Varzea Nova") {
      return item;
    }
  });
  let cruzEspiritoSanto = users?.filter((item) => {
    if (item.bairro === "Cruz do Espirito Santo") {
      return item;
    }
  });

  let tibiriCount = tibiri?.length;
  let santaRitaCount = santaRita?.length;
  let marcosMouraCount = marcosMoura?.length;
  let varzeaNovaCount = varzeaNova?.length;
  let cruzEspiritoSantoCount = cruzEspiritoSanto?.length;

  return (
    <ScrollView mb="5%" flex={1} w="100%" horizontal={false}>
      <VStack
        alignSelf="center"
        shadow={2}
        w="90%"
        rounded="lg"
        alignItems="center"
        justifyContent="center"
      >
      
       <PieChartWithDynamicSlices />
      
      </VStack>

      <Heading color="light.100" ml="4%" shadow={3} fontFamily="Doppio One" fontSize="3xl">
        Familias por bairro
      </Heading>
      <Divider my="2" />
      <HStack
        mb="4%"
        alignItems="center"
        justifyContent="center"
        flexWrap={1}
        w="100%"
      >
        <Center
          h="140px"
          mx="4"
          my="2"
          w="140px"
          rounded="lg"
          shadow={6}
          bg="rgba(255,255,255, 0.15)"
        >
          <Text color="light.100" fontSize="6xl" fontFamily="Doppio One">
            {" "}
            {tibiriCount ? tibiriCount : "0"}{" "}
          </Text>
          <Text color="light.100" fontSize="lg" fontFamily="Doppio One">
            Tibiri
          </Text>
        </Center>

        <Center
          h="140px"
          mx="4"
          my="2"
          w="140px"
          rounded="lg"
          shadow={6}
          bg="rgba(255,255,255, 0.15)"
        >
          <Text color="light.100" fontSize="6xl" fontFamily="Doppio One">
            {" "}
            {varzeaNovaCount ? varzeaNovaCount : "0"}{" "}
          </Text>
          <Text color="light.100" fontSize="lg" fontFamily="Doppio One">
            Varzea Nova
          </Text>
        </Center>

        <Center
          h="140px"
          mx="4"
          my="2"
          w="140px"
          rounded="lg"
          shadow={6}
          bg="rgba(255,255,255, 0.15)"
        >
          <Text color="light.100" fontSize="6xl" fontFamily="Doppio One">
            {" "}
            {santaRitaCount ? santaRitaCount : "0"}{" "}
          </Text>
          <Text color="light.100" fontSize="lg" fontFamily="Doppio One">
            Santa Rita
          </Text>
        </Center>

        <Center
          h="140px"
          mx="4"
          my="2"
          w="140px"
          rounded="lg"
          shadow={6}
          bg="rgba(255,255,255, 0.15)"
        >
          <Text color="light.100" fontSize="6xl" fontFamily="Doppio One">
            {" "}
            {marcosMouraCount ? marcosMouraCount : "0"}{" "}
          </Text>
          <Text color="light.100" fontSize="lg" fontFamily="Doppio One">
            Marcos Moura
          </Text>
        </Center>
        <Center
          h="140px"
          mx="4"
          my="2"
          w="140px"
          rounded="lg"
          shadow={6}
          bg="rgba(255,255,255, 0.15)"
        >
          <Text color="light.100" fontSize="6xl" fontFamily="Doppio One">
            {" "}
            {cruzEspiritoSantoCount ? cruzEspiritoSantoCount : "0"}{" "}
          </Text>
          <Text color="light.100" fontSize="md" fontFamily="Doppio One">
            Cruz do Espirito S.
          </Text>
        </Center>
        <Center
          h="140px"
          mx="4"
          my="2"
          w="140px"
          rounded="lg"
          shadow={6}
          bg="rgba(255,255,255, 0.15)"
        >
          <Text color="light.100" fontSize="6xl" fontFamily="Doppio One">
            {" "}
            0{" "}
          </Text>
          <Text color="light.100" fontSize="lg" fontFamily="Doppio One">
            Outros
          </Text>
        </Center>
      </HStack>
    </ScrollView>
  );
}
