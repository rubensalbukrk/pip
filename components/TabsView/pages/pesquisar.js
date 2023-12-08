import React, { useState, useContext } from "react";
import axios from "axios";
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../src/contexts/UserContext";
import { api } from "../../../src/api/api";

export default function TabSearch() {
  const { refreshing, setRefreshing, users, setUsers } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([users]);
  const {navigate} = useNavigation();

 if (refreshing){
  getUsers()
  setRefreshing(false)
 }

async function getUsers(){
  try {
    const response = await axios.get(`${api}/users`, {
    method: "get",
    headers: new Headers({
      "ngrok-skip-browser-warning": "69420",
    }),
  })
    const data = await response.data.users;
    setUsers(data);
    setFilteredData(data);
    setMasterData(data);
    setRefreshing(false)
  } catch (error) {
    alert(`Houve um problema com o servidor, tente novamente! ${error}`)
  }
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
    <View
    className="flex-1 w-full justify-center items-center">
      <View
      className='flex-row w-80 h-14 px-2 self-center items-center rounded-lg border-2 border-white/60 '
      >
        <Ionicons name="ios-search" size={32} color='white' />
        <TextInput
        className='w-80 h-12 px-2 font-default rounded-xl text-lg'
          onChangeText={(text) => searchFilter(text)}
          value={search}
          placeholder="Procurar por nome"
          placeholderTextColor={"rgba(255,255,255, 0.65)"}
        />
      </View>
     
      <FlatList
      className='flex-1 w-full h-300 mt-3'
        data={filteredData}
        horizontal={false}
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
              <View className='flex-row w-80 h-22 py-2 my-2 self-center items-center rounded-lg bg-gray-400/20'>
                <Image className='w-12 h-12 rounded-full mx-3 bg-gray-600' source={{ uri: item.avatar }} />
               
                  <View className='w-80 rounded-lg'>
                    <Text numberOfLines={1} className='font-default text-white'>
                      {item.nome}
                    </Text>
                    <Text
                    numberOfLines={1}
                    className='font-default text-gray-300'
                    >
                      {item.question2}
                    </Text>
                  </View>
                    
                <TouchableOpacity
                className='absolute right-2 top-2 opacity-80'
                  onPress={() =>
                    navigate("EditUser", {
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
                      question2: item.question2,
                    })
                  }
                >
                  <FontAwesome5 name="user-edit" size={24} color="white" />
                </TouchableOpacity>
              </View>
            
          );
        }}
      />
    </View>
  );
}