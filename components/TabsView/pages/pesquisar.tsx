import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../../src/api/api";
import { useFetchData } from "../../../src/hooks/useFetchData";
import { AuthContext } from "../../../src/contexts/AuthContext";
import { UserProps } from "../../../src/interfaces/User";
import { UserContext } from "../../../src/contexts/UserContext";
import firestore from '@react-native-firebase/firestore'

export default function TabSearch() {
  const {setUsers, users} = useContext<any>(UserContext)
  const [filteredData, setFilteredData] = useState([]);
  const { navigate } = useNavigation();
  
  useEffect(() => {
    getUsers();
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = users?.filter(function (item) {
        if (item.nome) {
          const itemData = item.nome.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
    } else {
      setFilteredData(users);
    }
  };
  const getUsers = async () => {
    try {
        const users = firestore().collection('usuarios').onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUsers(data)
          setFilteredData(data)
        })
    } catch (error) {
      alert('Houve um problema na conexão, tente novamente!')
    }
  }

  return (
    <View className="flex-1 w-full justify-center items-center">
      <View className="flex-row w-80 h-14 px-2 self-center items-center rounded-lg border-2 border-blue-300/60 ">
        <Ionicons name="ios-search" size={32} color="#1f86ff" />
        <TextInput
          className="w-80 h-12 px-2 font-default text-blue-500 rounded-xl text-lg"
          onChangeText={(text) => searchFilter(text)}
          placeholder="Procurar por nome"
          placeholderTextColor={"rgba(102, 197, 248, 0.809)"}
        />
      </View>
    
      <FlatList
        className="flex-1 w-full h-300 mt-3"
        data={filteredData}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View className="flex-row w-80 h-22 py-2 my-2 self-center items-center rounded-lg bg-blue-400/20">
              <Image
                className="w-12 h-12 rounded-full mx-3 bg-gray-600"
                source={{ uri: item.avatar }}
              />

              <View className="w-80 rounded-lg">
                <Text numberOfLines={1} className="font-default text-blue-500">
                  {item.nome}
                </Text>
                <Text numberOfLines={1} className="font-default text-blue-400">
                  {item.question2}
                </Text>
              </View>

              <TouchableOpacity
                className="absolute right-2 top-2 opacity-80"
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
                    avatar: item?.avatar,
                    nome: item.nome,
                    idade: item.idade,
                    address: item.address,
                    bairro: item?.bairro,
                    phone: item.phone,
                    cpf: item.cpf,
                    nis: item.nis,
                    email: item.email,
                    password: item.password,
                    question1: item.question1,
                    question2: item.question2,
                    parents: item.parents,
                  })
                }
              >
                <FontAwesome5 name="user-edit" size={24} color="#1f86ff" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
