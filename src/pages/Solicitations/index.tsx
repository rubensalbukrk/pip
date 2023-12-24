import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import { FontAwesome, Octicons } from "@expo/vector-icons";
import { api } from "../../api/api";
import UserAvatar from "../../../components/UserAvatar";
import { UserContext } from "../../contexts/UserContext";
import BackButton from "../../../components/BackButton";
import BackgroundSolicitation from "../../../assets/svgs/Home-waves.svg";
import { height, width } from "../../utils/dimensions";
import { useFetchData } from "../../hooks/useFetchData";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SolicitationsUser() {
  const {list: solicitations, getData: getSolicitations} = useFetchData(api.getSolicitations)
  const {list: aprovados, getData: getAprovados} = useFetchData(api.getAprovados)
  const {logged, setSolicitations} = useContext<any>(UserContext)
  const {navigate} = useNavigation()
  
  useEffect(() => {
    try {
      getSolicitations(),
    setTimeout(() => {
      getAprovados()
    },1500)
    } catch (error) {
      Alert.alert("Sessão expirada", "Faça login novamente!")
      AsyncStorage.removeItem("token");
      navigate('Login');
    }
  },[])

  useEffect(() => {
    if (solicitations) {
      setSolicitations(solicitations)
    }
  },[solicitations])
  
  var userSolicitations = solicitations?.filter((item) => String(item.cpf) === String(logged.cpf));
  var userBeneficiets = aprovados?.filter((item) => String(item.cpf) === String(logged.cpf))

  return (
    <View className="w-full h-full items-center justify-center bg-slate-200">
      <BackgroundSolicitation
        width={width}
        height={height + 100}
        style={{ zIndex: 0, position: "absolute", top: 0 }}
      />
      <View className="absolute top-4 left-2">
        <BackButton />
      </View>
      <View className="self-center my-8">
        <UserAvatar x={180} y={180} />
      </View>

      <View className="flex-row w-full px-4 h-12 justify-start items-start">
        <Octicons name="log" size={32} color="#3C3C3C" />
        <Text className="font-default text-xl ml-3 text-gray-900">
          Suas solicitações
        </Text>
      </View>

      <FlatList
        className="w-80 h-28"
        data={userSolicitations}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <View className="w-72 px-3 my-2 self-center items-start justify-start py-5 rounded-xl shadow-md shadow-black bg-gray-600">
              <Text className="font-default text-md text-gray-800">
                Serviço: {item.service}
              </Text>
              <Text className="font-default text-md text-gray-800">
                STATUS: {item.status}
              </Text>
              <Text className="font-default text-md text-gray-800">
                Data: {item.date}
              </Text>
              <TouchableOpacity
                className="w-8 h-8 items-center justify-center opacity-80 absolute right-1 top-0"
                onPress={() => api.deleteSolicitation(item.id)}
              >
                <FontAwesome name="remove" size={32} color="white" />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <View className="flex-row w-full mt-3 px-4 h-12 justify-start items-start">
        <Octicons name="checklist" size={32} color="#3C3C3C" />
        <Text className="font-default text-xl ml-3 text-gray-900">
          Meus benefícios
        </Text>
      </View>
      
        <FlatList
        className="w-80 h-28 "
        data={userBeneficiets}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <View  className="w-72 my-4 px-2 self-center items-start justify-start py-5 rounded-xl shadow-md shadow-black bg-gray-600">
              <Text className="font-default text-md text-gray-800">
                Serviço: {item.service}
              </Text>
              <Text className="font-default text-md text-gray-800">
                STATUS: {item.status}
              </Text>
              <Text className="font-default text-md text-gray-800">
                Data: {item.date}
              </Text>
            </View>
          );
        }}
      /> 
      
    </View>
  );
}
