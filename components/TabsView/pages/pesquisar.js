import React, { useState, useEffect, useContext } from "react";
import {
  Icon,
  HStack,
  VStack,
  Box,
  Button,
  Avatar,
  Text,
  Center,
  Input,
  Heading,
  Divider,
  Container,
} from "native-base";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../src/contexts/UserContext";
import axios from "axios";
import { api } from "../../../src/requisitions/api";

export default function TabSearch() {
  const [updateList, setUpdateList] = useState(false)
  const { users, setUsers } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const navigation = useNavigation();
  const asUser = `${api}/files/user.png`

  useEffect(() => {
    getUsers()
  },[])

 function getUsers(){
  axios
  .get(`${api}/users`, {
    method: "get",
    headers: new Headers({
      "ngrok-skip-browser-warning": "69420",
    }),
  })
  .then((response) => {
    const users = response.data.users;
    setUsers(users);
    setFilteredData(users);
    setMasterData(users);
    setUpdateList(false)
  })
  .catch((error) => (
    <Box
    flex={1}
    w="100%"
    bg="lightBlue.400"
    >
      <Heading>UM PROBLEMA FOI ENCONTRADO</Heading>

      <Text color={"light.100"}>{error}</Text>

      <Button
      colorScheme={"darkBlue"}
      onPress={() => navigation.navigate('HomeApp')}
      >
        VOLTAR
      </Button>
    </Box>
  ));
 }
 if (updateList){
  getUsers()
 }

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter(function (item) {
        if (item.nome) {
          const itemData = item.nome.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
    } else {
      setFilteredData(masterData);
    }
    setSearch(text);
  };

  return (
    <Center flex={1} w="100%" px="5">
      <VStack w="100%" space={5} alignSelf="center">
       
        <Input
          mt="5%"
          onChangeText={(text) => searchFilter(text)}
          value={search}
          placeholder="Procurar por nome"
          placeholderTextColor={ "rgba(255,255,255, 0.65)"}
          variant="outline"
          width="100%"
          fontFamily={"Doppio One"}
          h="50px"
          colorScheme={"lightBlue"}
          focusOutlineColor={"lightBlue.300"}
          borderRadius="10"
          borderColor={ "rgba(255,255,255, 0.65)"}
          mb="4%"
          px="2"
          InputLeftElement={
            <Icon
              ml="2"
              size="5"
              color="light.100"
              as={<Ionicons name="ios-search" />}
            />
          }
        />
      </VStack>
      <Divider color={"lightBlue.300"} my="2%" />
      <FlatList
        data={filteredData}
        horizontal={false}
        refreshing={updateList}
        onRefresh={() => setUpdateList(true)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        style={{
          flex: 1,
          width: "100%",
          height: 300,
          fontFamily: "Doppio One",
          marginBottom: "9%",
          borderRadius: 20,
        }}
        renderItem={({ item }) => {
          return (
            <View
              key={(item) => `key-${item}`}
              style={{
                justifyContent: "center",
                width: "100%",
                height: 80,
                borderRadius: 20,
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: "rgba(255,255,255, 0.15)",
              }}
            >
              <HStack space={4} alignItems="center">
                <Avatar ml="4%" source={{ uri: item.avatar }} />
                <VStack flex="1">
                  <Box rounded="lg" flex="1" mr="18%">
                    <Text fontFamily="Doppio One" numberOfLines={1} ellipsizeMode="tail" color="white">
                      {item.nome}
                    </Text>
                  </Box>
                  <Box rounded="lg" fontFamily="Doppio One" flex="1" mr="18%" bg="rgba(255,255,255, 0.10)">
                    <Text
                    ml="2"
                    fontFamily="Doppio One"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ flex: 1 }}
                      color="light.100"
                    >
                      {item.question2}
                    </Text>
                  </Box>
                </VStack>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    opacity: 0.8,
                    bottom: "50%",
                    right: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("EditUser", {
                      id: item.id,
                      status: item.status,
                      isAutist: item.isAutist,
                      isVolt: item.isVolt,
                      isEtg: item.isEtg,
                      isCoordMulher: item.isCoordMulher,
                      isCoordAutist: item.isCoordAutist,
                      isCoordSaude: item.isCoordSaude,
                      isCoordAlimentar: item.isCoordAlimentar,
                      isCoordPasse: item.isCoordPasse,
                      isCoordCidadania: item.isCoordCidadania,
                      isCoordProtagonista: item.isCoordProtagonista,
                      avatar: item.avatar,
                      nome: item.nome,
                      idade: item.idade,
                      filhos: item.filhos,
                      address: item.address,
                      bairro: item.bairro,
                      phone: item.phone,
                      cpf: item.cpf,
                      nis: item.nis,
                      email: item.email,
                      password: item.password,
                      question1: item.question1,
                    })
                  }
                >
                  <FontAwesome5 name="user-edit" size={24} color="white" />
                </TouchableOpacity>
              </HStack>
            </View>
          );
        }}
      />
    </Center>
  );
}
