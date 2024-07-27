import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../../../../src/contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../BackButton";
import { TextMedium, TextSmall } from "../../../TextLg/Text";
import firebase from "@react-native-firebase/app";
import colors from "tailwindcss/colors";

export default function Solicitation() {
  const { users, setAprovados, setSolicitations, solicitations, aprovados } =
    useContext<any>(UserContext);
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
    <View className="flex-1 w-full justify-around px-4 py-5 bg-slate-200">
      <View className="flex-row w-full top-1">
        <FontAwesome5 name="user-clock" size={40} color={colors["blue"][500]} />
        <TextMedium className="text-blue-500" text="Solicitações" />
        <View className="h-14 absolute right-0 bottom-1 items-center">
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
            <View className="w-full py-2 my-2 px-2 self-center bg-white shadow-blue-800 shadow-lg rounded-xl">
              <View className="w-full flex-row gap-x-2">
              <TextSmall
                className="text-blue-400"
                text='Nome:'
              /> 
              <TextSmall
                className="text-gray-600"
                text={`${item?.nome}`}
              /> 
              </View>
              <View className="w-full flex-row gap-x-2">
              <TextSmall
                className="text-blue-400"
                text='CPF:'
              /> 
              <TextSmall
                className="text-gray-600"
                text={`${item?.cpf}`}
              /> 
              </View>
              <View className="w-full flex-row gap-x-2">
              <TextSmall
                className="text-blue-400"
                text='Serviço:'
              /> 
              <TextSmall
                className="text-gray-600"
                text={`${item?.service}`}
              /> 
              </View>
              <View className="w-full flex-row gap-x-2">
              <TextSmall
                className="text-blue-400"
                text='Pasta:'
              /> 
              <TextSmall
                className="text-gray-600"
                text={`${item?.pasta}`}
              /> 
              </View>
              <View className="w-full flex-row gap-x-2">
              <TextSmall
                className="text-blue-400"
                text='Status:'
              /> 
              <TextSmall
                className="text-gray-600"
                text={`${item?.status}`}
              /> 
              </View>
              <View className="w-full flex-row gap-x-2">
              <TextSmall
                className="text-blue-400"
                text='Data:'
              /> 
              <TextSmall
                className="text-gray-600"
                text={`${item?.date}`}
              /> 
              </View>
              <TouchableOpacity
                className="w-8 h-8 absolute right-0 top-3 bg-white shadow-blue-500 shadow-lg"
                onPress={() => removeItem("Solicitations", item?.id)}
              >
                <FontAwesome
                  name="trash-o"
                  size={20}
                  opacity={0.7}
                  color={colors["red"][600]}
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
                <MaterialCommunityIcons
                  name="account-arrow-right"
                  size={30}
                  color={colors["blue"][500]}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <View className="flex-row mt-4">
        <FontAwesome5 name="user-check" size={40} color={colors["blue"][500]} />
        <TextMedium className="text-blue-500" text="Aprovações" />
      </View>
      <FlatList
        data={aprovados}
        horizontal={false}
        className="flex-1 mt-4 py-1 px-2 w-full h-56"
        renderItem={({ item }) => {
          return (
            <View className="w-full h-24 my-2 flex-row justify-between pl-2 self-center bg-white shadow-blue-800 shadow-lg rounded-xl">
              <View className="mt-2 pl-2">
              <View className="w-full flex-row gap-x-2">
              <TextSmall
                className="text-blue-400"
                text='Nome:'
              /> 
              <TextSmall
                className="text-gray-600"
                text={`${item?.nome}`}
              /> 
              </View>
              <View className="w-full flex-row gap-x-2">
              <TextSmall
                className="text-blue-400"
                text='Serviço:'
              /> 
              <TextSmall
                className="text-gray-600"
                text={`${item?.service}`}
              /> 
              </View>
              <View className="w-full flex-row gap-x-2">
              <TextSmall
                className="text-blue-400"
                text='Status:'
              /> 
              <TextSmall
                className="text-gray-700"
                text={`${item?.status}`}
              /> 
              </View>
              <View className="w-full flex-row gap-x-2">
              <TextSmall
                className="text-blue-400"
                text='Data:'
              /> 
              <TextSmall
                className="text-gray-600"
                text={`${item?.date}`}
              /> 
              </View>
              </View>
              <TouchableOpacity
                className="w-12 h-full justify-center items-center bg-red-500 rounded-br-lg rounded-tr-lg"
                onPress={() => removeItem("Aprovados", item?.id)}
              >
                <FontAwesome
                  name="trash-o"
                  size={22}
                  opacity={0.7}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
