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
import axios from "axios";

import { MaterialIcons, AntDesign,FontAwesome } from "@expo/vector-icons";
import { UserContext } from "../../../src/contexts/UserContext";
import { deleteNotice, addNotice, apiNotice} from "../../../src/requisitions/api";

const dateNow = new Date("Mar 25 2015")

const NewNotice = {
    title: String,
    date: dateNow,
    descr: String,
    img: String
}

export default function TabManager() {
  const {setNotices} = useContext(UserContext) 
  useEffect(() => {
    getNotices();
  },[apiNotice])

  const getNotices = () => {
    axios
      .get(apiNotice, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      .then((response) => {
        const notices = response.data.notices;
        setNotices(notices);
      })
      .catch((error) => console.log(error));
  };
  const { notices } = useContext(UserContext);

  return (
    <ScrollView mb="5%" flex={1} w="100%">
    <Center flex={1} w="100%" px="5">
    <VStack
    mt="4%"
    py="2"
      w="100%"
      h="300px"
      alignSelf="center"
      shadow={2}
      bg="darkBlue.300"
      rounded="lg"
      alignItems="center"
      justifyContent="center"
    ><Box position={'absolute'} left="2%" top="2%">
   <FontAwesome name="newspaper-o" size={40} color="white" />
</Box>
  <Heading color={"light.100"}>Notícias</Heading>
  <Divider ml="12%" my="2" w="70%" />
      <Text mt="2%" color={"light.100"}>Atuais</Text>
      <FlatList
        data={notices}
        horizontal={false}
        keyExtractor={(item) => item.id}
        style={{
          flex: 1,
          width: "100%",
          height: 300,
          marginBottom: "9%",
          borderRadius: 20,
        }}
        renderItem={({ item, index }) => {
          return (
            <Center my="3%" w="100%" h="100px">
              <HStack>
               
                <VStack bg="lightBlue.400" rounded="xl" py="5%" px="3%" w="88%" h="100%">
                  <Text>Titulo: {item.title} </Text>
                  <Text>Descrição: {item.mensagem} </Text>
                  <Text>Data: {item.date} </Text>
                  <TouchableOpacity
                    style={{ position: 'absolute', right: 1, top: 1, width: 40, height: 40, opacity: 0.8}}
                    onPress={() => deleteNotice(item.id)}
                  >
                    <MaterialIcons
                      name="delete-forever"
                      size={40}
                      color="white"
                    />
                  </TouchableOpacity>
                </VStack>


              </HStack>
            </Center>
          );
        }}
      />
      <Button colorScheme={"darkBlue"}>
        Adicionar
      </Button>
    </VStack>
    <Divider />

    <VStack
    mt="4%"
    py="2"
      w="100%"
      h="300px"
      alignSelf="center"
      shadow={2}
      bg="darkBlue.300"
      rounded="lg"
      alignItems="center"
      justifyContent="center"
    ><Box position={'absolute'} left="2%" top="2%">
        <AntDesign
                      name="exception1"
                      size={40}
                      color="white"
                    />
    </Box>
      <Heading color={"light.100"}>Solicitações</Heading>
      <Divider ml="12%" my="2" w="70%" />
      <Text color={"light.100"}>Benefícios</Text>
      <FlatList
        data={notices}
        horizontal={false}
        keyExtractor={(item) => item.id}
        style={{
          flex: 1,
          width: "100%",
          height: 300,
          marginBottom: "9%",
          borderRadius: 20,
        }}
        renderItem={({ item, index }) => {
          return (
            <Center my="5%" mx="5%" w="90%" h="100px">
              <HStack>
               
                <VStack bg="lightBlue.400" rounded="xl" py="5%" px="5%" w="90%" h="100">
                  <Text>Nome: {item.title} </Text>
                  <Text>Serviço: {item.mensagem} </Text>
                  <Text>Data: {item.date} </Text>
                </VStack>

                <Box ml="5%" flex={1} justifyContent={"center"} alignItems="center">
                  <TouchableOpacity
                    style={{ alignSelf: 'center', width: 40, height: 40 }}
                    onPress={() => deleteNotice(item.id)}
                  >
                    <AntDesign
                      name="exception1"
                      size={40}
                      color="white"
                    />
                  </TouchableOpacity>
                </Box>
              </HStack>
            </Center>
          );
        }}
      />
    </VStack>
    </Center>
    </ScrollView>
  );
}
