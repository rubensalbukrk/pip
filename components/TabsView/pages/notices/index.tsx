import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity
} from "react-native";
import { api } from "../../../../src/api/api";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { TextLarge, TextMedium, TextSmall } from "../../../TextLg/Text";
import { AuthContext } from "../../../../src/contexts/AuthContext";
import data from "../../../../src/utils/dateNow";
import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import firebase from "@react-native-firebase/app";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

export default function NewNotice() {
  const { token } = useContext<any>(AuthContext);
  const [progress, setProgress] = useState<number>(0.4);
  const [list, setList] = useState([]);
  const [isUploadImage, setIsUpload] = useState(false);
  const [dataNotice, setData] = useState({
    date: data,
    title: undefined,
    mensagem: undefined,
    img: undefined
  });

  const navigation = useNavigation();
  
  useEffect(() => {
    const getNotices = firebase
      .firestore()
      .collection("notices")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setList(data);
      });
    return () => getNotices();
  }, []);

  const addNotice = async () => {
    firestore()
      .collection("notices")
      .add(dataNotice)
      .then(() => alert("Notícia adicionada!"));
  };
  const deleteNotice = (id) => {
    firebase
      .firestore()
      .collection("notices")
      .doc(id)
      .delete()
      .then(() => alert("Notícia deletada com sucesso!"));
  };
  const uploadImage = (filename: string, uri: string) => {
    try {
      const task = storage().ref(filename).putFile(uri);
      task.on("state_changed", (event) => {
        const progress = Math.round(
          (event.bytesTransferred / event.totalBytes) * 100
        )
        setProgress(progress)
      })

      task.then((e) => {
        setIsUpload(false);
        setData({...dataNotice, img: `https://firebasestorage.googleapis.com/v0/b/mychat-900b3.appspot.com/o/${filename}?alt=media`})
      });
    } catch (error) {
      alert('Não foi possível fazer upload da imagem, tente novamente mas tarde!')
    }
  };

  const pickImageAsync = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!canceled) {
      const filename = assets[0].uri.substring(
        assets[0].uri.lastIndexOf("/") + 1
      );
      const uri = assets[0].uri.replace("file://", "");

      setIsUpload(true)
      uploadImage(filename, uri);
      
    } else {
      setIsUpload(false);
      alert("Nenhuma imagem foi selecionada!");
    }
  };

  return (
    <View className="flex-1 w-full pt-2 justify-center bg-slate-200">
      <View className="flex-row ml-4 mb-5 top-2">
        <FontAwesome name="newspaper-o" size={40} color={colors['blue'][500]} />
        <TextMedium className="text-blue-500 text-xl" text="Gerênciador de Notícias" />
      </View>
      <View className="absolute top-12 right-3">
      <TouchableOpacity
        style={{
          width: 70,
          height: 70,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Feather  name="arrow-left-circle" color={colors['blue'][500]} size={32} />
      </TouchableOpacity>
      </View>

      <TextMedium className="text-blue-500" text="Nova notícia" />
      <View className="py-2 px-5 rounded-xl mb-2 bg-white">
        <TextLarge className="text-blue-500" text="Título" />
        <TextInput
          className="w-full h-8 text-lg text-black font-default px-2 bg-gray-50/40 rounded-md"
          onChangeText={(value) => setData({ ...dataNotice, title: value })}
        />
        <TextLarge className="text-blue-500" text="Descrição" />
        <TextInput
          className="w-full h-32 text-left text-ellipsis text text-black font-default px-2 rounded-md bg-gray-50/40"
          onChangeText={(value) => setData({ ...dataNotice, mensagem: value })}
        />

        <View className="flex-row w-full h-20 justify-between items-center">
          <TouchableOpacity
            className="w-12 h-10 justify-center items-center rounded-lg bg-slate-100 shadow-lg shadow-blue-800"
            onPress={() => pickImageAsync()}
          >{isUploadImage ? (
            <Progress.Pie
              progress={progress}
              unfilledColor="#e5f3ff"
              color={colors.blue[500]}
              size={30}
              style={{
                zIndex: 20,
                alignSelf: "center"
              }}
            />
          ) :
            <FontAwesome5 name="images" size={24} color={colors['blue'][500]} />}
          </TouchableOpacity>
      
          <TouchableOpacity
            className="w-44 h-10 justify-center items-center rounded-lg border-2 bg-green-600 border-green-600 shadow-lg shadow-green-600 opacity-100"
            onPress={() => addNotice()}
          >
            <View className="flex-row justify-center items-center">
              <FontAwesome5 name="check" size={18} color={"white"} />
              <TextLarge className="text-white" text="Adicionar" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TextMedium className="text-blue-500" text="Atuais" />

      <FlatList
        className="w-full h-64 mb-3 rounded-xl"
        data={list}
        renderItem={({ item }) => {
          return (
            <View className="w-80 my-2 px-2 py-4 self-center justify-center rounded-xl bg-white shadow-lg shadow-blue-300">
              <View>
              <TextSmall className="text-base text-blue-400" text="Titulo" />
              <TextSmall className="text-gray-600" text={`${item.title}`} />
              </View>
              <View>
              <TextSmall className="text-base text-blue-400" text="Descrição" />
              <TextSmall
                text={`Mensagem: ${item.mensagem}`}
                className="text-gray-600"
                numberOfLines={1}
                ellipsizeMode="tail"
              />
              </View>
              <TextSmall text={`Data: ${item.date}`} />
              <TouchableOpacity
                className="absolute top-0 right-0 w-9 h-9 justify-center items-center bg-red-500 rounded-tr-lg rounded-bl-lg"
                onPress={() => deleteNotice(item.id)}
              >
                <FontAwesome
                  name="trash-o" size={26} color={'white'} />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
