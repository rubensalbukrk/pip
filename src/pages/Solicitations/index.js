import React, { useContext, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import { FontAwesome, Octicons } from "@expo/vector-icons";
import { api, deleteAprovado } from "../../api/api";
import UserAvatar from "../../../components/UserAvatar";
import { UserContext } from "../../contexts/UserContext";
import BackButton from "../../../components/BackButton";


export default function SolicitationsUser() {
  const {
    refreshing,
    setRefreshing,
    logged,
    solicitations,
    setSolicitations,
    aprovados,
  } = useContext(UserContext);

  const getSolicitations = async () => {
    try {
      const response = await axios.get(`${api}/solicitations`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      const solicitations = await response.data.solicitations;
      setSolicitations(solicitations);
      setRefreshing(false);
    } catch (error) {
      alert("Houve um problema com o servidor, aguarde um momento!");
    }
  };
  const getAprovados = async () => {
    const { setAprovados } = useContext(UserContext);
    try {
      const response2 = await axios.get(`${api}/aprovados`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      const aprovados = await response2.data.aprovados;
      setAprovados(aprovados);
    } catch (error) {
      alert("Houve um problema com o serviço, aguarde um momento!") &
        navigate("HomeApp");
    }
  };

  useEffect(() => {
    getSolicitations();
    getAprovados();
  }, []);

  if (solicitations) {
    var userSolicitations = solicitations.filter(
      (item) => String(item.cpf) === String(logged.cpf)
    );
  }

  if (aprovados) {
    var userBeneficiets = aprovados.filter(
      (item) => String(item.cpf) === String(logged.cpf)
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => getSolicitations() && setRefreshing(true)}
        />
      }
      className="w-full h-full bg-blue-500"
      horizontal={false}
    >
      <View className="flex-1 w-full h-full py-12 items-center justify-center bg-blue-600">
        <View className="absolute top-2 left-2">
          <BackButton />
        </View>
        <View className="self-center mb-5">
          <UserAvatar x={100} y={100} />
        </View>

        <View className="flex-row w-full h-32 pl-5 justify-start items-start">
          <Octicons name="checklist" size={32} color="white" />
          <Text className="font-default text-2xl ml-3 text-white">
            Suas solicitações
          </Text>
        </View>

        <View className="w-full min-h-300">
          <FlatList
            data={userSolicitations}
            horizontal={false}
            keyExtractor={(item) => item.id}
            style={{
              flex: 1,
              width: "100%",
              height: 200,
              borderRadius: 40,
            }}
            renderItem={({ item }) => {
              return (
                <View className="my-3 w-full">
                  <View className="w-full h-36 justify-center">
                    <View className="w-80 py-5 px-2 rounded-xl bg-white/20">
                      <Text className="font-default text-2xl text-white">
                        Serviço: {item.service}
                      </Text>
                      <Text className="font-default text-xl text-white">
                        STATUS: {item.status}
                      </Text>
                      <Text className="font-default text-xl text-white">
                        Data: {item.date}
                      </Text>
                      <TouchableOpacity className="w-20 h-20 opacity-80 absolute right-1 top-5"
                        onPress={() => deleteAprovado(item.id)}
                      >
                        <FontAwesome name="remove" size={36} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <View className="flex-row w- h-30 pl-5 self-start items-center justify-center">
          <Octicons name="checklist" size={32} color="white" />

          <Text className="font-default text-2xl ml-3 font-bold text-white">
            Meus benefícios
          </Text>
        </View>

        <FlatList
          data={userBeneficiets}
          horizontal={false}
          keyExtractor={(item) => item.id}
          style={{
            width: "100%",
            height: "40%",
            borderRadius: 40,
            marginVertical: 6,
          }}
          renderItem={({ item }) => {
            return (
              <View className="w-full my-3">
                <View className="flex-row w-full h-120 justify-center">
                  <View className="w-80 px-2 py-5 rounded-xl bg-white/20">
                    <Text className="font-default text-2xl ml-3 font-bold text-white">
                      Serviço: {item.service}
                    </Text>
                    <Text className="font-default text-2xl ml-3 font-bold text-white">
                      STATUS: {item.status}
                    </Text>
                    <Text className="font-default text-2xl ml-3 font-bold text-white">
                      Data: {item.date}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}
