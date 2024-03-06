import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { UserContext } from "../../../../src/contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../BackButton";
import { TextMedium, TextSmall } from "../../../TextLg/Text";
import firebase from "@react-native-firebase/app";


export default function Solicitation() {
  const { users, setAprovados, setSolicitations, solicitations, aprovados } = useContext<any>(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    const getSolicitations = firebase
      .firestore()
      .collection("Solicitations")
      .onSnapshot((snapshot) => {
        const dataSolicitations = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setSolicitations(dataSolicitations);
      });

      const getAprovados = firebase
      .firestore()
      .collection("Aprovados")
      .onSnapshot((snapshot) => {
        const dataAprovados = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAprovados(dataAprovados);
      });

    return () => {
      getSolicitations();
      getAprovados();
    };
  }, []);

  const removeItem = (collect, id) => {
    firebase
      .firestore()
      .collection(collect)
      .doc(id)
      .delete()
      .then(() => alert("Operação concluída!"));
  };

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
                onPress={() => removeItem("Solicitations",item?.id)}
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
                    docs: item.docs,
                    nome: item.nome,
                    phone: item.phone,
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
                onPress={() =>  removeItem("Aprovados",item?.id)}
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
