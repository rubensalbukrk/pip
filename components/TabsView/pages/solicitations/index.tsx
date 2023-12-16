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
import BackButton from "../../../BackButton";
import { useFetchData } from "../../../../src/hooks/useFetchData";
import { TextLarge, TextMedium, TextSmall } from "../../../TextLg/Text";

export default function Solicitation() {
  const { list: aprovados, getData: getAprovados } = useFetchData(
    api.getAprovados
  );
  const { list: solicitations, getData: getSolicitations } = useFetchData(
    api.getSolicitations
  );
  const [refreshing, setRefreshing] = useState(false);
  const { users } = useContext<any>(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    getSolicitations();
    setTimeout(() => {
      getAprovados();
    }, 1300);
  }, []);

  if (refreshing) {
    getAprovados(), getSolicitations(), setRefreshing(false);
  }

  return (
    <View className="flex-1 w-full justify-around px-4 py-10 bg-zinc-500">
      <View className="flex-row w-full top-2">
        <FontAwesome5 name="user-clock" size={40} color="white" />
        <TextMedium text="Solicitações" />
        <View className="h-14 absolute right-0 bottom-1 items-center">
          <BackButton />
        </View>
      </View>
      <FlatList
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        data={solicitations}
        horizontal={false}
        className="flex-1 mt-4 py-3 w-full h-40"
        renderItem={({ item }) => {
          let userInfo = users.find(
            (user) => String(user?.cpf) === String(item?.cpf)
          );
          return (
            <View className="w-full py-2 my-2 px-2 self-center bg-zinc-400/30 rounded-xl">
              <TextSmall text={`Nome: ${item?.nome}`} />
              <TextSmall text={`CPF: ${item?.cpf}`} />
              <TextSmall text={`Serviço: ${item?.service}`} />
              <TextSmall text={`Pasta: ${item?.pasta}`} />
              <TextSmall text={`STATUS: ${item?.status}`} />
              <TextSmall text={`Data: ${item?.date}`} />
              <TouchableOpacity
                className="w-8 h-8 absolute right-1 top-2"
                onPress={() => deleteSolicitation(item?.id)}
              >
                <FontAwesome
                  name="remove"
                  size={32}
                  opacity={0.5}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-8 h-8 absolute right-1 bottom-2"
                onPress={() =>
                  navigation.navigate("SolicitationInfoUser", {
                    id: item.id,
                    nome: item.nome,
                    userInfo: userInfo,
                    cpf: item?.cpf,
                    service: item?.service,
                    pasta: item?.pasta,
                    status: item?.status,
                    date: item?.date,
                  })
                }
              >
                <FontAwesome5
                  name="info-circle"
                  size={30}
                  opacity={0.5}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <View className="flex-row top-2">
        <FontAwesome5 name="user-check" size={40} color="white" />
        <TextMedium text="Aprovações" />
      </View>
      <FlatList
        data={aprovados}
        horizontal={false}
        className="flex-1 py-3 w-full h-40"
        renderItem={({ item }) => {
          return (
            <View className="w-full py-2 my-2 px-2 self-center bg-zinc-400/30 rounded-xl">
              <TextSmall text={`Nome: ${item?.nome}`} />
              <TextSmall text={`Serviço: ${item?.service}`} />
              <TextSmall text={`STATUS: ${item?.status}`} />
              <TextSmall text={`Data: ${item?.date}`} />
              <TouchableOpacity
                className="w-8 h-8 absolute right-1 top-2"
                onPress={() => deleteAprovado(item?.id)}
              >
                <FontAwesome
                  name="remove"
                  size={32}
                  opacity={0.5}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
