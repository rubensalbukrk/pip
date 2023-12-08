import React, { useContext, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { FontAwesome, Octicons } from "@expo/vector-icons";
import { api, deleteSolicitation } from "../../api/api";
import UserAvatar from "../../../components/UserAvatar";
import { UserContext } from "../../contexts/UserContext";
import BackButton from "../../../components/BackButton";
import BackgroundSolicitationUser from "../../../assets/svgs/Homeapp-wave.svg";
import { height, width } from "../../utils/dimensions";

export default function SolicitationsUser() {
  const {
    refreshing,
    setRefreshing,
    logged,
    solicitations,
    setSolicitations,
    aprovados,
    setAprovados,
  } = useContext(UserContext);

const config = {
  method: 'get'
}

  const getSolicitations = async () => {
    try {
      const response = await axios.get(`${api}/solicitations`, config);
      const solicitations = await response.data.solicitations;
      setSolicitations(solicitations);
      setRefreshing(false);
    } catch (error) {
      alert("Houve um problema com o servidor, aguarde um momento!");
    }
  };
  const getAprovados = async () => {
    try {
      const response = await axios.get(`${api}/aprovados`, config);
      const aprovados = await response.data.aprovados;
      setAprovados(aprovados);
    } catch (error) {
      alert("Houve um problema com o serviço, aguarde um momento!") &
        navigate("HomeApp");
    }
  };
  if (refreshing) {
    getAprovados()
    getSolicitations()
  }
  useEffect(() => (
    getSolicitations(),
    getAprovados()
  ),[])

  if (solicitations) {
    var userSolicitations = solicitations.filter(
      (item) => String(item.cpf) === String(logged.cpf)
    );
  }
  if (aprovados) {
      var userBeneficiets = aprovados.filter(
    (item) => String(item.cpf) === String(logged.cpf)
  )
  }


  return (
    <View className="w-full h-full items-center justify-center">
      <BackgroundSolicitationUser
        width={width}
        height={height + 100}
        style={{ zIndex: 0, position: "absolute", top: 0 }}
      />
      <View className="absolute top-2 left-2">
        <BackButton />
      </View>
      <View className="self-center my-8">
        <UserAvatar x={100} y={100} />
      </View>

      <View className="flex-row w-full px-4 h-12 justify-start items-start">
        <Octicons name="checklist" size={32} color="#3C3C3C" />
        <Text className="font-default text-xl ml-3 text-gray-900">
          Suas solicitações
        </Text>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
          />
        }
        className="w-80 h-28"
        data={userSolicitations}
        horizontal={false}
        keyExtractor={(item) => item.id}
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
                onPress={() => deleteSolicitation(item.id)}
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View className="w-72 my-4 px-2 self-center items-start justify-start py-5 rounded-xl shadow-md shadow-black bg-gray-600">
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
