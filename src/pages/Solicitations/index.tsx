import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import UserAvatar from "../../../components/UserAvatar";
import { UserContext } from "../../contexts/UserContext";
import BackButton from "../../../components/BackButton";
import BackgroundSolicitation from "../../../assets/svgs/Home-waves.svg";
import { height, width } from "../../utils/dimensions";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import { TextSmall } from "../../../components/TextLg/Text";
import firebase from "@react-native-firebase/app";
import { Button } from "../../../components/ButtonBlue/ButtonBlue";

export default function SolicitationsUser() {
  const { token } = useContext(AuthContext);
  const { logged, solicitations, aprovados, setAprovados, setSolicitations } =
    useContext<any>(UserContext);
  const { navigate } = useNavigation();

  useEffect(() => {
    const getSolicitations = firebase
      .firestore()
      .collection("Solicitations")
      .where("cpf", "==", logged.cpf)
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
      .where("cpf", "==", logged.cpf)
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

  const showAlert = (collect, id) => {
    Alert.alert(
      "Aviso",
      "Você deseja cancelar a sua solicitação? você poderá refazer novamente!",
      [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => removeItem(collect, id),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const removeItem = (collect, id) => {
    firebase
      .firestore()
      .collection(collect)
      .doc(id)
      .delete()
      .then(() => Alert.alert("Aviso", "A sua solicitação foi cancelada!"));
  };

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
        <UserAvatar x={120} y={120} />
      </View>

      <View className="flex-row w-full px-4 h-12 justify-start items-start">
        <Octicons name="log" size={32} color="#3C3C3C" />
        <Text className="font-default text-xl ml-3 text-gray-900">
          Suas solicitações
        </Text>
      </View>

      <FlatList
        className="w-full h-28"
        data={solicitations}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <View className="w-80 h-24 flex-row my-2 pl-3 bg-gray-200 self-center items-center justify-between rounded-xl shadow-md shadow-black">
              <View className=" flex-col gap-y-1">
                <View className="w-full flex-row gap-x-2">
                  <TextSmall className="text-blue-400" text="Serviço:" />
                  <TextSmall
                    className="text-gray-700"
                    text={`${item?.service}`}
                  />
                </View>
                <View className="w-full flex-row gap-x-2">
                  <TextSmall className="text-blue-400" text="Status:" />
                  <TextSmall
                    className="text-gray-700"
                    text={`${item?.status}`}
                  />
                </View>
                <View className="w-full flex-row gap-x-2">
                  <TextSmall className="text-blue-400" text="Data:" />
                  <TextSmall className="text-gray-700" text={`${item?.date}`} />
                </View>
              </View>

              <TouchableOpacity
                className="w-12 h-full justify-center items-center bg-red-500 rounded-md"
                onPress={() => showAlert("Solicitations", item.id)}
              >
                <MaterialIcons name="delete-forever" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <View className="flex-row w-full mt-8 px-4 h-10 justify-start items-start">
        <Octicons name="checklist" size={32} color="#3C3C3C" />
        <Text className="font-default text-xl ml-3 text-gray-900">
          Seus benefícios
        </Text>
      </View>

      <FlatList
        className="w-screen h-28 "
        data={aprovados}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <View className="w-80 my-4 px-4 bg-gray-200 self-center items-start justify-start py-5 rounded-xl shadow-md shadow-black ">
              <View className="w-full flex-row gap-x-2">
                  <TextSmall className="text-blue-400" text="Serviço:" />
                  <TextSmall
                    className="text-gray-700"
                    text={`${item?.service}`}
                  />
                </View>
                <View className="w-full flex-row gap-x-2">
                  <TextSmall className="text-blue-400" text="Status:" />
                  <TextSmall
                    className="text-gray-700"
                    text={`${item?.status}`}
                  />
                </View>
                <View className="w-full flex-row gap-x-2">
                  <TextSmall className="text-blue-400" text="Data:" />
                  <TextSmall className="text-gray-700" text={`${item?.date}`} />
                </View>
            </View>
          );
        }}
      />
    </View>
  );
}
