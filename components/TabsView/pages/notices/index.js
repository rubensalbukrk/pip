import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Center,
  Button,
  VStack,
  Text,
  FlatList,
  Heading,
  Divider,
  Input,
  HStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { apiNotice, deleteNotice } from "../../../../src/requisitions/api";
import { UserContext } from "../../../../src/contexts/UserContext";
import {
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import BackButton from "../../../BackButton";
import { useNavigation } from "@react-navigation/native";

export default function NewNotice() {
  const [dataNotice, setData] = useState({
  })  
  const { setNotices, notices } = useContext(UserContext);
  const navigation = useNavigation();
  const dateNow = new Date("Mar 25 2015");

  useEffect(() => {
    axios
      .get(apiNotice, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      .then((response) => {
        const notices = response.data.notices;
        setNotices(notices)
      })
      .catch((error) => console.log(error));
  }, []);
function addNotice(){
    axios.post(apiNotice, dataNotice, {
        method: 'post',
        headers: new Headers({
            "ngrok-skip-browser-warning" : "69421"
        })
    })
    .then(response => {
      alert(JSON.stringify(response.data))
    })
    .catch(error => console.error(error));
}

  return (
    <Box flex={1} w="100%" bg="darkBlue.400" pt="10" px="5">
      <Box flexDir="row" top="2%">
        <FontAwesome name="newspaper-o" size={40} color="white" />
        <Heading mx="3" color="light.100">
          Gerênciador de Notícias
        </Heading>
      </Box>

      <Divider my="4" />
      <Text fontSize="lg" mb="2%" color={"light.100"}>
        Atuais
      </Text>

      <FlatList
        data={notices}
        keyExtractor={(item) => item.id.toString()}
        bgColor="lightBlue.400"
        flex={1}
        w="100%"
        maxH="240px"
        mb="3%"
        rounded="xl"
        renderItem={({ item, index }) => {
          return (
            <Center w="100%" h="100px">
            
                <VStack
                  bg="lightBlue.300"
                  rounded="xl"
                  py="1%"
                  px="3%"
                  w="88%"
                  h="70%"
                  
                >
                  <Text>Titulo: {item.title} </Text>
                  <Text numberOfLines="1" ellipsizeMode="tail" >Descrição: {item.mensagem} </Text>
                  <Text>Data: {item.date} </Text>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 1,
                      top: 1,
                      width: 40,
                      height: 40,
                      opacity: 0.8,
                    }}
                    onPress={() => deleteNotice(item.id)}
                  >
                    <MaterialIcons
                      name="delete-forever"
                      size={40}
                      color="white"
                    />
                  </TouchableOpacity>
                </VStack>
            </Center>
          );
        }}
      />
        <Text fontSize="lg" mb="2%" color={"light.100"}>
        Nova notícia
      </Text>
      <VStack bg="lightBlue.400" rounded="xl" py="2" px="5">
        <Text fontSize={"lg"} color="white">
          Titulo
        </Text>
        <Input 
        w="75%" 
        variant="ghost" 
        bg="lightBlue.300" 
        opacity={0.8}
        onChangeText={(value) => setData({...dataNotice, title: value})}
        />
        <Text fontSize={"lg"} color="white">
          Descrição
        </Text>
        <Input
          mb="4%"
          h="70"
          variant="ghost"
          bg="lightBlue.300"
          opacity={0.8}
          onChangeText={(value) => setData({...dataNotice, mensagem: value})}
        />
        <HStack justifyContent="space-between">
          <Button variant={"ghost"}>
          <Feather name="image" size={32} color="white" />
          </Button>
          <Button colorScheme={"lightBlue"} w="50%" alignSelf="center"
          onPress={() => addNotice() & console.log(dataNotice)}
          >
            Adicionar
          </Button>
        </HStack>
      </VStack>
      <TouchableOpacity
        style={{
          width: 70,
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          marginTop: "3%",
        }}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left-circle" size={40} color="white" />
      </TouchableOpacity>
    </Box>
  );
}
