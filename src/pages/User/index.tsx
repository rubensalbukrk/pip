import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import * as ImagePicker from "expo-image-picker";
import { Feather, Entypo } from "@expo/vector-icons";
import InputInfoUser from "../../../components/UserLayout/inputUser";
import MyParents from "../../../components/UserLayout/userParents";
import UserAvatar from "../../../components/UserAvatar";
import TopBackground from "../../../assets/svgs/User-top-waves.svg";
import BottomBackground from "../../../assets/svgs/User-bottom-wave.svg";
import { width } from "../../utils/dimensions";
import { TextSmall } from "../../../components/TextLg/Text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParentsProps } from "../../interfaces/Parents";
import Animated, {
  BounceInUp,
  FadeInUp,
} from "react-native-reanimated";
import storage from '@react-native-firebase/storage'
import axios from "axios";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/AuthContext";
import { UserProps } from "../../interfaces/User";

export const User = () => {
  const {token} = useContext(AuthContext)
  const { logged, setAvatar, avatar } = useContext<any>(UserContext);
  const { navigate, goBack } = useNavigation();
  const [isUploadImage, setIsUpload] = useState<boolean>(false);

  function copiarSemUserId(parents) {
    const { userId, ...copiaParent } = parents;
    return copiaParent;
  }

  const updateAvatar = async (userUpdated: UserProps) => {
    try {
      const response = await axios.put(`${api.BASE_URL}/users/${logged.id}`, userUpdated, {
        method: 'put',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      } ).then(() => alert('Perfil atualizado com sucesso!'))
    } catch (e) {
      alert(`problema ao atulizar o profile no servidor: ${e}`)
    }
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
        setAvatar(assets[0].uri);
        if(avatar){
          const uri = avatar.replace('file://', '');
          let parentsWithID = logged?.parents?.map(copiarSemUserId);
          const userProfileUpdate: UserProps = {
            id: logged.id,
            isAdmin: logged?.isAdmin, 
            nome: logged.nome,
            idade: logged.idade,
            phone: logged.phone,
            address: logged.address,
            bairro: logged.bairro,
            avatar: `https://firebasestorage.googleapis.com/v0/b/mychat-900b3.appspot.com/o/${filename}?alt=media`,
            cpf: logged.cpf,
            password: logged.password,
            parents: parentsWithID
          
          }
          const task = storage().ref(filename).putFile(uri);
          task.snapshot?.metadata.fullPath
          task.then(() => {
            updateAvatar(userProfileUpdate);
          });          
        }

        const extend = filename.split(".")[1]
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
          AsyncStorage.setItem("picture", JSON.stringify(assets[0]));
        }
      } catch (error) {
        Alert.alert('STORAGE UPLOAD', `Erro encontrado: ${error}`)
      }
    } else {
      alert("O Perfil não foi alterado!");
    }
  };

  return (
    <View className="flex-1 w-full h-full justify-between items-center">
      <View className="w-full h-44 items-center justify-between">
        <Animated.View
          style={{ zIndex: 0, width: "100%", backgroundColor: "#fff" }}
          entering={FadeInUp.duration(1000)}
        >
          <View className="flex-row w-full h-14">
            <TopBackground
              width={width}
              style={{ zIndex: 0, position: "absolute", top: -5 }}
            />
            <View
              className="flex-row w-full h-full top-2 absolute items-center justify-between"
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
        </Animated.View>

        
          <Animated.View 
          entering={BounceInUp.duration(2000).delay(400)}
          style={{ zIndex: 2 }} className="w-40 h-40 mt-2 absolute">
            <View className="w-50 h-50  mt-4 items-center justify-center rounded-full">
              <UserAvatar x={130} y={130} />
            </View>

            <View className="w-52 h-7 absolute self-center bottom-0 items-center justify-center bg-blue-400 shadow-md shadow-black rounded-md">
              <TextSmall
                text={
                  logged?.isAdmin == true
                    ? "CEO Fundador"
                    : "Membro" && logged?.isEtg == true
                    ? "Estágiario"
                    : "Membro" && logged?.isVolt == true
                    ? "Voluntário"
                    : "Membro" && logged?.isCoordCidadania == true
                    ? "Coordenação da Cidadania"
                    : "Membro" && logged?.isCoordAutist == true
                    ? "Coordenação dos Autistas"
                    : "Membro" && logged?.isCoordMulher == true
                    ? "Coordenação das Mulheres"
                    : "Membro" && logged?.isCoordSaude == true
                    ? "Coordenação da Saúde"
                    : "Membro" && logged?.isCoordAlimentar == true
                    ? "Coordenação da Alimentação"
                    : "Membro" && logged?.isCoordProtagonista == true
                    ? "Coordenação dos Protagonistas"
                    : "Membro" && logged?.isCoordPasse == true
                    ? "Coordenação dos Passes"
                    : "Membro" && logged?.isCoordCursos == true
                    ? "Coordenação dos Cursos"
                    : "Membro" && logged?.isCoordOptometria == true
                    ? "Coordenação da Optometria"
                    : "Membro" && logged?.isBusiness == true
                    ? "Empresa"
                    : "Membro"
                }
              />
            </View>
            <View className="right-6 self-end top-5 absolute">
              <TouchableOpacity
                className="h-5 w-5 items-center justify-center bg-blue-400 shadow-md shadow-black rounded-lg"
                onPress={() => pickImageAsync()}
              >
                <Entypo name="camera" size={12} color="white" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        
      </View>

      <ScrollView
        style={{ zIndex: 10 }}
        className="w-full px-10 py-5 bg-white"
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
            infoLabel="Parents"
            infoValue={
              logged?.parents?.length === "0"
                ? "Não"
                : `${logged?.parents?.length}`
            }
          />
        </View>
      </ScrollView>
      <ScrollView
        horizontal={true}
        style={{ zIndex: 2 }}
        className="w-full h-48 pb-4 mx-6"
      >
        {logged?.parents?.length === 0 ? (
          <Text className="font-default text-center self-center text-white text-xl">
            {" "}
          </Text>
        ) : (
          logged?.parents?.map((item: ParentsProps) => {
            return (
              <View key={item.id} className="mx-3">
                <MyParents
                  key={item.cpf}
                  nome={item.nome}
                  cpf={item.cpf}
                  idade={item.idade}
                  isAutist={item.isAutist}
                  isPcd={item.isPcd}
                />
              </View>
            );
          })
        )}
      </ScrollView>
      <BottomBackground
        width={width}
        style={{ zIndex: 0, position: "absolute", bottom: 0 }}
      />
    </View>
  );
};
