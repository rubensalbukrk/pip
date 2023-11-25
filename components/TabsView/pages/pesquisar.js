import React, { useState, useContext } from "react";
import axios from "axios";
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../src/contexts/UserContext";
import { api } from "../../../src/api/api";
import UserAvatar from "../../UserAvatar";

export default function TabSearch() {
  const { refreshing, setRefreshing, users, setUsers } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([users]);
  const navigation = useNavigation();


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
    className="flex-1 w-full px-5 justify-center items-center">
      <View
      className='w-full gap-5 self-center'
      >
        <Ionicons name="ios-search" size={32} color='white' />
        <TextInput
        className='w-full h-16 font-default rounded-xl text-lg px-2 mb-4 mt-6 border-2 border-white/60'
          onChangeText={(text) => searchFilter(text)}
          value={search}
          placeholder="Procurar por nome"
          placeholderTextColor={"rgba(255,255,255, 0.65)"}
          
        />
      </View>
     
      <FlatList
      className='flex-1 w-full h-300 mb-9 rounded-lg'
        data={filteredData}
        horizontal={false}
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
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
              <View className='flex-row items-center gap-3'>
                <UserAvatar x={70} y={70} source={{ uri: item.avatar }} />
                <View className='flex-1'>
                  <View className='flex-1 rounded-lg mr-16'>
                    <Text className='font-default line-clamp-1 text-ellipsis text-white'>
                      {item.nome}
                    </Text>
                  </View>
                  <View className='flex-1 mr-16 rounded-lg bg-white/10'>
                    <Text
                    className='font-default line-clamp-1 text-ellipsis text-white'
                    >
                      {item.question2}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                className='absolute right-10 bottom-52 opacity-80'
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
                      question2: item.question2,
                    })
                  }
                >
                  <FontAwesome5 name="user-edit" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}