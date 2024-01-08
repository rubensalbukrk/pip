import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
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
import { TextLarge, TextMedium } from "../../../TextLg/Text";
import { AuthContext } from "../../../../src/contexts/AuthContext";
import data from "../../../../src/utils/dateNow";
import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import firebase from "@react-native-firebase/app";

export default function NewNotice() {
  const { token } = useContext<any>(AuthContext);

  const [image, setImage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [link, setLink] = useState<string>("ds");
  const { list, getData } = useFetchData(api.getNotices);
  const [dataNotice, setData] = useState({
    date: data,
    title: undefined,
    mensagem: undefined,
    img: `https://firebasestorage.googleapis.com/v0/b/mychat-900b3.appspot.com/o/${link}?alt=media`,
  });

  const getNotices = firestore().collection("Users").get();
  console.log(`image valor: ${image}, progress valor: ${progress}`);
  console.log(getNotices);

  function addNotice() {
    firestore()
      .collection("notices")
      .add(dataNotice)
      .then(() => alert("Notícia adicionada!"));
  }

  const pickImageAsync = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!canceled) {
      try {
        const filename = assets[0].uri.substring(
          assets[0].uri.lastIndexOf("/") + 1
        );
        setImage(assets[0].uri);
        const uri = image.replace("file://", "");
        const task = storage().ref(filename).putFile(uri);
        task.on("state_changed", (e) => {
          const progress = e.bytesTransferred / e.totalBytes;
          setProgress(progress);
        });
        task.then((e) => {
          Alert.alert("Pronto", "Upload de imagem conclúido!");
          setLink(filename);
        });
      } catch (error) {
        Alert.alert(
          "Ops",
          `Houve um problema com o servidor, tente mais tarde!`
        );
      }
    } else {
      alert("Nenhuma imagem foi selecionada!");
    }
  };

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
        renderItem={({ item }) => {
          return (
            <View className="w-80 h-24 my-2 px-2 py-4 self-center justify-center rounded-xl bg-white/20 ">
              <TextLarge text={`Titulo: ${item.title}`} />
              <TextLarge
                text={`Mensagem: ${item.mensagem}`}
                numberOfLines={1}
                ellipsizeMode="tail"
              />
              <TextLarge text={`Data: ${item.date}`} />
              <TouchableOpacity
                className="absolute top-1 right-1 w-8 h-8 opacity-80"
                onPress={() => api.deleteNotice(item.id, token)}
              >
                <MaterialIcons name="delete-forever" size={32} color="white" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <TextMedium text="Nova notícia" />
      <View className="py-2 px-5 rounded-xl mb-2 bg-white/20">
        <TextLarge text="Título" />
        <TextInput
          className="w-full h-8 text-lg text-white font-default px-2 bg-white/20 rounded-md opacity-80"
          onChangeText={(value) => setData({ ...dataNotice, title: value })}
        />
        <TextLarge text="Descrição" />
        <TextInput
          className="w-full h-32 mb-4 text-inherit text-white font-default px-2 rounded-md bg-white/20 opacity-80"
          onChangeText={(value) => setData({ ...dataNotice, mensagem: value })}
        />

        <View className="flex-row w-full h-36">
          <TouchableOpacity
            className="w-44 h-10 justify-center items-center rounded-lg bg-white/25"
            onPress={() => pickImageAsync()}
          >
            <FontAwesome5 name="images" size={24} color="white" />
          </TouchableOpacity>
        
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
    </View>
  );
}
