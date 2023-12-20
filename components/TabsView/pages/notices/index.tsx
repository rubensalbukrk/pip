import React, { useContext, useEffect, useState } from "react";
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
import { TextExtra, TextLarge, TextMedium } from "../../../TextLg/Text";
import { AuthContext } from "../../../../src/contexts/AuthContext";

export default function NewNotice() {
  const {token} = useContext(AuthContext)
  var [dataNotice, setData] = useState({});
  const {list, getData} = useFetchData(api.getNotices)

  useEffect(() => {
    getData()
  },[])

  function addNotice() {
    axios
      .post(`${api.BASE_URL}/notices`, dataNotice, {
        method: "post",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => console.error(error));
  }

  return (
    <View className="flex-1 w-full pt-10 justify-center bg-zinc-500">
      <View className="flex-row ml-4 mb-5 top-2">
        <FontAwesome name="newspaper-o" size={40} color="white" />
        <TextMedium text="Gerênciador de Notícias" />
      </View>
      <View className="absolute top-20 right-3">
      <BackButton />
      </View>
      <TextMedium text="Atuais" />

      <FlatList
        className="w-full h-64 mb-3 rounded-xl"
        data={list}
        renderItem={({item}) => {
          return (
            <View className="w-80 h-24 my-2 px-2 py-4 self-center justify-center rounded-xl bg-white/20 ">
                <TextLarge text={`Titulo: ${item.title}`} />
                <TextLarge text={`Mensagem: ${item.mensagem}`}
                  numberOfLines={1}
                  ellipsizeMode="tail" />
                <TextLarge text={`Data: ${item.date}`} />
                <TouchableOpacity
                className="absolute top-1 right-1 w-8 h-8 opacity-80"
                onPress={() => api.deleteNotice(item.id)}
              >
                <MaterialIcons name="delete-forever" size={32} color="white" />
              </TouchableOpacity>
              </View>

  
          );
        }}
      />
      <TextMedium text="Nova notícia" />
      <View className="py-2 px-5 rounded-xl mb-2 bg-white/20">
        <TextLarge text="Título"/>
        <TextInput
          className="w-full h-8 text-lg text-white font-default px-2 bg-white/20 rounded-md opacity-80"
          onChangeText={(value) => setData({ ...dataNotice, title: value })}
        />
        <TextLarge text="Link de imagem" />
        <TextInput
          className="w-full h-8 text-lg text-white font-default px-2 bg-white/20 rounded-md opacity-80"
          onChangeText={(value) => setData({ ...dataNotice, img: value })}
        />
        <TextLarge text="Descrição"/>
        <TextInput
          className="w-full h-32 mb-4 text-inherit text-white font-default px-2 rounded-md bg-white/20 opacity-80"
          onChangeText={(value) => setData({ ...dataNotice, mensagem: value })}
        />
      
          <TouchableOpacity
            className="w-44 h-10 justify-center items-center rounded-lg bg-white/25"
            onPress={() => addNotice()}
          >
            <View className="flex-row">
              <FontAwesome5 name="check" size={24} color="white" />
              <TextLarge text="Adicionar" />
            </View>
          </TouchableOpacity>
        
      </View>
    </View>
  );
}
