import React, { useContext } from "react";
import axios from "axios";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../api/api";
import * as ImagePicker from "expo-image-picker";

import { Feather, Entypo } from "@expo/vector-icons";
import InputInfoUser from "../../../components/UserLayout/inputUser";
import MyParents from "../../../components/UserLayout/userParents";
import UserAvatar from "../../../components/UserAvatar";
import TopBackground from "../../../assets/svgs/User-top-waves.svg";
import BottomBackground from '../../../assets/svgs/User-bottom-wave.svg'
import { width } from "../../utils/dimensions";
import { LottieView } from "../../utils/LottieView";

export const User = () => {
  const { logged, setAvatar, setLogged } = useContext(UserContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { navigate, goBack } = useNavigation();

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
      if (formData) {
        axios
          .post(`${api}/upload`, formData, {
            method: "POST",
            headers: {
              "ngrok-skip-browser-warning": "69421",
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            updateUserAvatar(filename);
          })
          .then(() => {
            getUserData();
          })
          .then(() => {
            setAvatar(logged.avatar);
          })
          .catch((error) => console.log(error));
      }
    } else {
      alert("Você não escolheu uma imagem!");
    }
  };
  function updateUserAvatar(fileName) {
    let userUpdate = {
      ...logged,
      avatar: `${api}/files/${fileName}`,
    };
    axios.put(`${api}/users/${logged.id}`, userUpdate, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69421",
      }),
    });
  }
  function getUserData() {
    axios
      .get(`${api}/users/${logged.id}`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      .then((response) => {
        const user = response.data;
        setLogged(user);
      })
      .catch((error) => console.log('Desculpa, o servidor está em manutenção!'));
  }

  return (
    <View className="flex-1 w-full h-full justify-between items-center">
        
      <View className="w-full h-44 items-center justify-between">

        <View className="flex-row w-full h-14">
        <TopBackground width={width} style={{zIndex: 0, position: 'absolute', top: -5}} />
          <View
            className="flex-row w-full h-full top-8 absolute items-center justify-between"
            style={{ zIndex: 2 }}
          >
            <TouchableOpacity
              className="w-20 h-20 items-center justify-center"
              onPress={() => {
                goBack();
              }}
            >
              <Feather name="arrow-left-circle" color="white" size={32} />
            </TouchableOpacity>

            <TouchableOpacity
              className="w-20 h-20  items-center justify-center opacity-80"
              onPress={() => navigate("PopMenu")}
            >
              <Feather size={32} color="white" name="settings" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{zIndex: 2}} className="w-40 h-40 mt-2 absolute">
          <View className="w-50 h-50 shadow-xl shadow-black mt-4 items-center justify-center rounded-full">
            <UserAvatar x={130} y={130} />
          </View>

          <View className="w-14 h-7 absolute right-1 top-5 items-center justify-center  bg-gray-500 shadow-lg shadow-black rounded-md">
            <Text className="font-default text-center text-xs text-white">
              {logged?.isAdmin == true
                ? "Admin"
                : "Membro" && logged?.isEtg == true
                ? "Estágiario"
                : "Membro" && logged?.isVolt == true
                ? "Voluntário"
                : "Membro" && logged?.isCoordCidadania == true
                ? "Coord Cidadania"
                : "Membro" && logged?.isCoordAutist == true
                ? "Coord Autistas"
                : "Membro" && logged?.isCoordMulher == true
                ? "Coord Mulher"
                : "Membro" && logged?.isCoordSaude == true
                ? "Coord Saúde"
                : "Membro" && logged?.isCoordAlimentar == true
                ? "Coord Alimentar"
                : "Membro" && logged?.isCoordProtagonista == true
                ? "Coord Protagonista"
                : "Membro" && logged?.isCoordPasse == true
                ? "Coord Passe"
                : "Membro"}
            </Text>
          </View>
          <View className=" right-6 self-end bottom-3 absolute">
            <TouchableOpacity
              className="h-5 w-5 items-center justify-center bg-gray-400 shadow-md shadow-black rounded-lg"
              onPress={() => pickImageAsync()}
            >
              <Entypo name="camera" size={12} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        className="w-full px-10 py-5 bg-gray-50"
        horizontal={false}
      >
        <View className="w-full mb-10 rounded-lg">
          <InputInfoUser
            infoLabel="Data de inscrição"
            infoValue={logged?.date}
          />
          <InputInfoUser infoLabel="Nome Civil" infoValue={logged?.nome} />
          <InputInfoUser infoLabel="Idade" infoValue={logged?.idade} />
          <InputInfoUser infoLabel="Endereço" infoValue={logged?.address} />
          <InputInfoUser infoLabel="Bairro" infoValue={logged?.bairro} />

          <InputInfoUser infoLabel="CPF" infoValue={logged?.cpf} />
          <InputInfoUser infoLabel="NIS" infoValue={logged?.nis} />
          <InputInfoUser infoLabel="Email" infoValue={logged?.email} />
          <InputInfoUser infoLabel="Telefone" infoValue={logged?.phone} />
          <InputInfoUser
                infoLabel="Filhos"
                infoValue={
                  logged?.filhos?.length === "0"
                    ? "Não"
                    : `${logged?.filhos?.length}`
                }
          />
        </View>
      </ScrollView>
      <ScrollView horizontal={true} style={{zIndex: 2}} className='w-full h-48 pb-4 mx-6' >
            {logged?.filhos?.length === 0
              ? <Text className='font-default text-center self-center text-white text-xl'> </Text>
              : logged?.filhos?.map((item) => {
                  return (
                      <View className="mx-3">
                        <MyParents
                        nome={item.nome}
                        cpf={item.cpf}
                        idade={item.idade}
                        isAutist={item.isAutist}
                      />
                      </View>
                  );
                })}
           </ScrollView>
           <BottomBackground width={width} style={{zIndex: 0, position: 'absolute', bottom: 0}} />
    </View>
  );
};
