import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { UserContext } from "../../../../src/contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import {
  api,
  deleteSolicitation,
  deleteAprovado,
} from "../../../../src/api/api";

export default function Solicitation() {
  const [refreshing, setRefreshing] = useState(false);
  const {
    users,
    solicitations,
    setSolicitations,
    aprovados,
    setAprovados,
  } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => (getSolicitations(), getAprovados()), []);

  const getAprovados = () => {
    axios
      .get(`${api}/aprovados`, {
        method: "get",
      })
      .then((response) => {
        const aprovados = response.data.aprovados;
        setAprovados(aprovados);
      })

      .catch((error) => console.log(error));
  };
  const getSolicitations = () => {
    axios
      .get(`${api}/solicitations`, {
        method: "get",
      })
      .then((response) => {
        const solicitations = response.data.solicitations;
        setSolicitations(solicitations);
        setRefreshing(false);
      })

      .catch((error) => console.log(error));
  };

  if (refreshing) {
    getAprovados();
    getSolicitations();
  }
  return (
    <View className="flex-1 w-full justify-around px-4 py-10 bg-zinc-500">
      
        <View className="flex-row w-full top-2">
          <FontAwesome5 name="user-clock" size={40} color="white" />
          <Text className="font-default mx-3 text-2xl text-white">
            Solicitações
          </Text>
        </View>

        <FlatList
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
          data={solicitations}
          horizontal={false}
          keyExtractor={(item) => item?.id}
          style={{
            flex: 1,
            width: "100%",
            height: 400,
            borderRadius: 40,
          }}
          renderItem={({ item, index }) => {
            let userInfo = users.find(
              (user) => String(user?.cpf) === String(item?.cpf)
            );
            return (
              <View
                className="w-80 h-22 my-3 justify-center items-center"
                key={item?.id}
              >
                <View className="w-full px-3 py-5 bg-white/10">
                  <Text className="font-default text-md text-white">
                    Nome: {item?.nome}
                  </Text>
                  <Text className="font-default text-md text-white">
                    CPF: {item?.cpf}
                  </Text>
                  <Text className="font-default text-md text-white">
                    Serviço: {item?.service}
                  </Text>
                  <Text className="font-default text-md text-white">
                    Pasta: {item?.pasta}
                  </Text>
                  <Text className="font-default text-md text-white">
                    STATUS: {item?.status}
                  </Text>
                  <Text className="font-default text-md text-white">
                    Data: {item?.date}
                  </Text>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 1,
                      top: 5,
                      width: 40,
                      height: 40,
                      opacity: 0.8,
                    }}
                    onPress={() => deleteSolicitation(item?.id)}
                  >
                    <FontAwesome name="remove" size={36} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 5,
                      bottom: 5,
                      width: 40,
                      height: 40,
                      opacity: 0.8,
                    }}
                    onPress={() =>
                      navigation.navigate("SolicitationInfoUser", {
                        id: item.id,
                        userInfo: userInfo,
                        cpf: item?.cpf,
                        service: item?.service,
                        pasta: item?.pasta,
                        status: item?.status,
                        date: item?.date,
                      })
                    }
                  >
                    <FontAwesome5 name="info-circle" size={36} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />

        <View className="flex-row top-2">
          <FontAwesome5 name="user-check" size={40} color="white" />
          <Text className="font-default mx-3 text-4xl text-white">
            Aprovações
          </Text>
        </View>
        <FlatList
          data={aprovados}
          horizontal={false}
          keyExtractor={(item) => item?.id}
          style={{
            flex: 1,
            width: "100%",
            height: "40%",
            borderRadius: 40,
          }}
          my="3"
          renderItem={({ item, index }) => {
            let userInfo = users.find(
              (user) => String(user?.cpf) === String(item?.cpf)
            );
            return (
              <View key={`id-${index}`} className="w-full my-3 items-center justify-center">
                <View className="flex-row w-full h-20">
                  <View className="w-full py-5 px-2 self-center bg-white/10 rounded-xl">
                    <Text className="font-default text-lg text-white">
                      Nome: {item?.nome}
                    </Text>
                    <Text className="font-default text-lg text-white">
                      Serviço: {item?.service}
                    </Text>
                    <Text className="font-default text-lg text-white">
                      STATUS: {item?.status}
                    </Text>
                    <Text className="font-default text-lg text-white">
                      Data: {item?.date}
                    </Text>
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        right: 1,
                        top: 5,
                        width: 40,
                        height: 40,
                        opacity: 0.8,
                      }}
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

        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
          }}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left-circle" size={40} color="white" />
        </TouchableOpacity>
    </View>
  );
}
