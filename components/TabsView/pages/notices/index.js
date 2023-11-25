import React, { useContext, useState } from "react";
import axios from "axios";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { api, deleteNotice, getNotices } from "../../../../src/api/api";
import { UserContext } from "../../../../src/contexts/UserContext";
import {
  MaterialIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";


export default function NewNotice() {
  const [dataNotice, setData] = useState({
  })  
  const { refreshing, setRefreshing, setNotices, notices } = useContext(UserContext);
  const navigation = useNavigation();

  if(refreshing){
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

  return (

    <View className='flex-1 w-full pt-10 px-5 bg-blue-600'
    >
      <View className='flex-row top-2'>
        <FontAwesome name="newspaper-o" size={40} color="white" />
        <Text className="font-default text-2xl text-white">
          Gerênciador de Notícias
        </Text>
      </View>

    
      <Text className="font-default mb-2 text-lg text-white">
        Atuais
      </Text>

      <FlatList
      className='flex-1 w-full mb-3 rounded-xl'
        data={notices}
        keyExtractor={(item) => item.id.toString()}
        rounded="xl"
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        renderItem={({ item, index }) => {
          return (
            <View className='w-full h-110 my-5'>
            
                <View className='w-80 h-20 mx-2 px-3 py-1 rounded-xl bg-white/20 justify-center'
                > 
                <View
                className='self-center justify-center'
                >
                  <Text className="font-default text-lg text-white">Titulo: {item.title} </Text>
                  <Text className="font-default text-lg text-white" numberOfLines={1} ellipsizeMode="tail" >Descrição: {item.mensagem} </Text>
                  <Text className="font-default text-lg text-white">Data: {item.date} </Text>
                </View>
                  
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
                </View>
            </View>
          );
        }}
      />
        <Text className="font-default mb-2 text-2xl text-white">
        Nova notícia
      </Text>
      <View className='py-2 px-5 rounded-xl bg-white/20'>
        <Text className="font-default text-lg text-white">
          Titulo
        </Text>
        <TextInput className='w-72 bg-white/20 opacity-80'
        onChangeText={(value) => setData({...dataNotice, title: value})}
        />
        <Text className="font-default text-lg text-white">
          Descrição
        </Text>
        <TextInput className='w-72 h-72 mb-4 bg-white/20 opacity-80'
          onChangeText={(value) => setData({...dataNotice, mensagem: value})}
        />
        <View className='flex-row justify-between'>
          <TouchableOpacity
          className='w-28 h-28 rounded-xl bg-white/25'
          onPress={() => pickImageAsync()}
          >
            <Feather name="image" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
          className='w-56 h-13 rounded-xl bg-white/25'
          onPress={() => addNotice() & console.log(dataNotice)}
          >
            <View className='flex-row gap-3'>
                <FontAwesome5 name="check" size={24} color="white" />
            <Text className="font-default text-lg text-white">Adicionar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

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
    </View>
  );
}
