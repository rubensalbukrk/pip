import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { api } from "../../../../src/api/api";
import {
  MaterialIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import BackButton from "../../../BackButton";
import { useFetchData } from "../../../../src/hooks/useFetchData";


export default function NewNotice() {
  const [dataNotice, setData] = useState({});
  const {list, getData} = useFetchData(api.getNotices)

  useEffect(() => {
    getData()
  },[])

  function addNotice() {
    axios
      .post(`${api.BASE_URL}/notices`, dataNotice, {
        method: "post",
      })
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => console.error(error));
  }

  return (
    <View className="flex-1 w-full pt-10 justify-center bg-zinc-600">
      <View className="flex-row ml-4 mb-5 top-2">
        <FontAwesome name="newspaper-o" size={40} color="white" />
        <Text className="font-default px-3 text-2xl text-white">
          Gerênciador de Notícias
        </Text>
      </View>
      <View className="absolute top-20 right-3">
      <BackButton />
      </View>
      <Text className="font-default my-3 px-3 text-2xl text-white">
        Atuais
      </Text>

      <FlatList
        className="w-full py-3 h-64 bg-zinc-700/30 mb-3 rounded-xl"
        data={list}
        keyExtractor={(item) => item.id.toString()}

        renderItem={({ item, index }) => {
          return (
            <View className="w-80 h-24 my-2 px-2 py-4 self-center justify-center rounded-xl bg-white/20 ">
                <Text className="font-default text-lg text-white">
                  Titulo: {item.title}
                </Text>
                <Text
                  className="font-default text-lg text-white"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  Descrição: {item.mensagem}
                </Text>
                <Text className="font-default text-lg text-white">
                  Data: {item.date}
                </Text>
                <TouchableOpacity
                className="absolute top-1 right-1 w-12 h-12 opacity-80"
                onPress={() => api.deleteNotice(item.id)}
              >
                <MaterialIcons name="delete-forever" size={40} color="white" />
              </TouchableOpacity>
              </View>

  
          );
        }}
      />
      <Text className="font-default mb-2 px-3 text-2xl text-white">
        Nova notícia
      </Text>
      <View className="py-2 px-5 rounded-xl bg-white/20">
        <Text className="font-default text-lg text-white">Titulo</Text>
        <TextInput
          className="w-72 h-10 text-lg text-white font-default px-2 bg-white/20 rounded-md opacity-80"
          onChangeText={(value) => setData({ ...dataNotice, title: value })}
        />
        <Text className="font-default text-lg text-white">Descrição</Text>
        <TextInput
          className="w-full h-40 mb-4 text-inherit text-white font-default px-2 rounded-md bg-white/20 opacity-80"
          onChangeText={(value) => setData({ ...dataNotice, mensagem: value })}
        />
        <View className="flex-row mb-2 items-center justify-between">
          <TouchableOpacity
            className="w-20 h-10 justify-center items-center rounded-xl bg-white/25"
            
          >
            <Feather name="image" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-44 h-10 justify-center items-center rounded-lg bg-white/25"
            onPress={() => addNotice()}
          >
            <View className="flex-row">
              <FontAwesome5 name="check" size={24} color="white" />
              <Text className="font-default text-lg text-white">Adicionar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
