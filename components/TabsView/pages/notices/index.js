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
  NativeBaseProvider
} from "native-base";
import { TouchableOpacity } from "react-native";
import { api, deleteNotice, getNotices } from "../../../../src/requisitions/api";
import { UserContext } from "../../../../src/contexts/UserContext";
import {
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import BackButton from "../../../BackButton";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

const apiUpload = `${api}/upload`;

export default function NewNotice() {
  const [updateList, setUpdateList] = useState(false)
  const [dataNotice, setData] = useState({
  })  
  const { setNotices, notices } = useContext(UserContext);
  const navigation = useNavigation();

  function getNotices(){
    axios
    .get(`${api}/notices`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
    .then((response) => {
      const notices = response.data.notices;
      setNotices(notices)
      setUpdateList(false)
    })
    .catch((error) => console.log(error));
  }

  if(updateList){
    getNotices();
  }

  const pickImageAsync = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!canceled) {
      const filename = assets[0].uri.substring(
        assets[0].uri.lastIndexOf("/") + 1,
        assets[0].uri.length
      );
      const extend = filename.split(".")[1];
      const formData = new FormData();
      formData.append(
        "file",
        JSON.parse(
          JSON.stringify({
            name: filename,
            uri: assets[0].uri,
            type: "image/" + extend,
          })
        )
      );
      axios
        .post(`${api}/upload`, formData, {
          headers: new Headers({
            "ngrok-skip-browser-warning": "69421",
          }),
        })
        .then(() => {
          setData({ ...dataNotice, img: `${api}/files/${filename}` })
        })

    } else {
      alert("Você não escolheu uma imagem!");
    }
  };

function addNotice(){
    axios.post(`${api}/notices`, dataNotice, {
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

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};
  return (
    <NativeBaseProvider config={config}>
    <Box flex={1} w="100%" pt="10" px="5"
    bg={{
      linearGradient: {
        colors: ["lightBlue.600", "lightBlue.400"],
        start: [0, 0],
        end: [1, 0],
      },
    }}
    >
      <Box flexDir="row" top="2%">
        <FontAwesome name="newspaper-o" size={40} color="white" />
        <Heading mx="3" fontFamily="Doppio One" color="light.100">
          Gerênciador de Notícias
        </Heading>
      </Box>

      <Divider my="4" />
      <Text fontSize="lg" fontFamily="Doppio One" mb="2%" color={"light.100"}>
        Atuais
      </Text>

      <FlatList
        data={notices}
        keyExtractor={(item) => item.id.toString()}
        
        flex={1}
        w="100%"
        maxH="270px"
        mb="3%"
        rounded="xl"
        refreshing={updateList}
        onRefresh={() => setUpdateList(true)}
        renderItem={({ item, index }) => {
          return (
            <Center w="100%" h="110px" mb="5%" mt="5%">
            
                <VStack
                  bg="rgba(255,255,255, 0.15)"
                  rounded="xl"
                  py="1%"
                  px="3%"
                  mx="2"
                  w="88%"
                  h="110px"
                 justifyContent={"center"}
                > 
                <Box alignSelf="center" justifyContent={"center"}>
                  <Text fontFamily="Doppio One" color="light.100">Titulo: {item.title} </Text>
                  <Text fontFamily="Doppio One" color="light.100" numberOfLines="1" ellipsizeMode="tail" >Descrição: {item.mensagem} </Text>
                  <Text fontFamily="Doppio One" color="light.100">Data: {item.date} </Text>
                </Box>
                  
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
        <Text fontFamily="Doppio One" fontSize="lg" mb="2%" color={"light.100"}>
        Nova notícia
      </Text>
      <VStack bg="rgba(255,255,255, 0.15)" rounded="xl" py="2" px="5">
        <Text fontSize={"lg"} fontFamily="Doppio One" color="light.100">
          Titulo
        </Text>
        <Input 
        w="75%" 
        variant="ghost" 
        bg="rgba(255,255,255, 0.15)" 
        opacity={0.8}
        onChangeText={(value) => setData({...dataNotice, title: value})}
        />
        <Text fontSize={"lg"} fontFamily="Doppio One" color="light.100">
          Descrição
        </Text>
        <Input
          mb="4%"
          h="70"
          variant="ghost"
          bg="rgba(255,255,255, 0.15)"
          opacity={0.8}
          onChangeText={(value) => setData({...dataNotice, mensagem: value})}
        />
        <HStack justifyContent="space-between">
          <Button variant={"ghost"}
          onPress={() => pickImageAsync()}
          >
            <Feather name="image" size={32} color="white" />
          </Button>

          <Button
          size={"sm"} 
          colorScheme={"info"}
          onPress={() => addNotice() & console.log(dataNotice)}
          >
            <HStack space={3}>
                <FontAwesome5 name="check" size={24} color="white" />
            <Text fontFamily="Doppio One" color="light.100">Adicionar</Text>
            </HStack>
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
          marginTop: "10%",
        }}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left-circle" size={40} color="white" />
      </TouchableOpacity>
    </Box>
    </NativeBaseProvider>
  );
}
