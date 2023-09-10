import React, { useContext, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import {
  Box,
  Circle,
  ScrollView,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  Center,
  Divider,
  Button,
} from "native-base";
import {
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TabManager() {
  const navigation = useNavigation();
  return (
    <ScrollView mb="5%" flex={1} w="100%">
      <Center flex={1} w="100%" px="5">
        <VStack
          mt="4%"
          w="100%"
          maxH="240px"
          space={2}
          alignSelf="center"
          shadow={2}
          bg="darkBlue.300"
          rounded="lg"
          alignItems="center"
          justifyContent="center"
        >
          <Box position={"absolute"} left="5%" top="5%">
            <FontAwesome name="newspaper-o" size={40} color="white" />
          </Box>
          <Heading color={"light.100"}>Notícias</Heading>

          <Divider ml="12%" my="2" w="70%" />

          <Text fontSize="xl" color={"light.100"}>
            Gerêncie todas as notícias!
          </Text>

          <Button
            my="2"
            mb="4"
            rounded={"xl"}
            colorScheme={"darkBlue"}
            onPress={() => navigation.navigate("NewNotices")}
          >
            <Feather name="arrow-right-circle" size={28} color="white" />
          </Button>
        </VStack>

        <Divider my="3" />

        <VStack
          px="4"
          w="100%"
          maxH="240px"
          space={2}
          alignSelf="center"
          shadow={2}
          bg="darkBlue.300"
          rounded="lg"
          alignItems="center"
          justifyContent="center"
        >
          <Box position={"absolute"} left="5%" top="5%">
            <AntDesign name="exception1" size={40} color="white" />
          </Box>
          <Heading color={"light.100"}>Solicitações</Heading>
          <Divider ml="12%" my="2" w="70%" />
          <Text fontSize="xl" color={"light.100"}>
            Gerêncie todos os pedidos de serviços!
          </Text>
          <Button
            my="2"
            mb="4"
            rounded={"xl"}
            colorScheme={"orange"}
            onPress={() => navigation.navigate("Solicitation")}
          >
            <Feather name="arrow-right-circle" size={28} color="white" />
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
}
