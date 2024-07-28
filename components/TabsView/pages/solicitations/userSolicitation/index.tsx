import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import WebView from "react-native-webview";
import BackButton from "../../../../BackButton";
import InputInfoUser from "../../../../UserLayout/inputUser";
import MyParents from "../../../../UserLayout/userParents";
import { FontAwesome } from "@expo/vector-icons";
import { TextLarge, TextSmall } from "../../../../TextLg/Text";
import { AuthContext } from "../../../../../src/contexts/AuthContext";
import firestore from "@react-native-firebase/firestore";
import { Button } from "../../../../ButtonBlue/ButtonBlue";
import colors from "tailwindcss/colors";

export default function SolicitationInfoUser({ route }) {
  const { token } = useContext(AuthContext);
  const [status, setStatus] = useState<string>("Em analise...");
  const parents = route?.params?.userInfo?.parents;
  const userInfo = route?.params?.userInfo;
  const docs = route?.params?.docs;
  const [showWebView, setShowWebView] = useState<boolean>(false);
  const [docUrl, setDocUrl] = useState<string>(route?.params?.docs[0]);

  const handleConfirmSolicitation = () => {
    let userApproved = {
      cpf: route?.params?.cpf,
      nome: route?.params?.nome,
      service: route?.params?.service,
      date: route?.params?.date,
      status: status,
    };
    const task = firestore()
      .collection("Aprovados")
      .add(userApproved)
      .then(() => alert("Aprovado com sucesso!"));
    const task2 = firestore()
      .collection("Solicitations")
      .doc(route?.params?.id)
      .delete();
  };
  const handleCancelSolicitation = (id) => {
    const task = firestore()
      .collection("Aprovados")
      .doc(id)
      .delete()
      .then(() => alert("A Solicitação foi cancelada!"));
  };
  const openWebView = (url) => {
    setDocUrl(url);
    setShowWebView(true);
  };
  const closeWebView = () => {
    setShowWebView(false);
  };

  const WebPage = () => {
    return (
      <View
        style={{ zIndex: 2, width: "100%", height: "100%" }}
        className="absolute bg-black/60"
      >
        <WebView
          style={{ flex: 1, width: "95%", height: "80%", alignSelf: "center" }}
          source={{ uri: docUrl }}
        />
        <Button
          title="Voltar"
          onPress={() => closeWebView()}
          className="my-2 self-center"
        />
      </View>
    );
  };

  async function handleUpdateStatus() {
    try {
      let updateStatus = {
        status: status,
      };
      const solicitation = firestore()
        .collection("Solicitations")
        .doc(route?.params?.id)
        .update(updateStatus);
      Alert.alert("Solicitação", "O status foi alterado!");
    } catch (error) {
      alert(`Houve um problema: ${error}`);
    }
  }

  return (
    <View className="w-full h-full bg-slate-50">
      {showWebView && <WebPage />}
      <View className="flex-row bg-blue-500 px-2 rounded-bl-lg rounded-br-lg shadow-xl shadow-black justify-between items-center">
        <TextLarge text="Informações de Solicitação" />
        <BackButton />
      </View>

      <ScrollView className="flex-1 w-full rounded-lg bg-zinc-300/30">
        <View className="w-full mx-3 my-2">
          <InputInfoUser
            infoLabel="Serviço"
            infoValue={route?.params?.service}
            numberOfLines={1}
            className="w-80"
          />
          <InputInfoUser infoLabel="Nome" infoValue={userInfo?.nome ? userInfo?.nome : ''} />
          <InputInfoUser infoLabel="CPF" infoValue={userInfo?.cpf} />
          <InputInfoUser
            infoLabel="WhatsApp"
            infoValue={route?.params?.phone}
          />

          <InputInfoUser
            infoLabel="Data de entrada"
            infoValue={route?.params?.date}
          />
          <TextLarge text="Status" className="text-gray-700" />
          <View className="flex-row w-full gap-3 justify-center items-center">
            <TextInput
              className="w-72 px-2 bg-gray-50/40 rounded-lg"
              value={status}
              onChangeText={(text) => setStatus(text)}
              placeholderTextColor={"#fff"}
              placeholder={route?.params?.status}
            />
            <TouchableOpacity onPress={() => handleUpdateStatus()}>
              <FontAwesome name="edit" size={28} color={colors.blue[500]} />
            </TouchableOpacity>
          </View>

          <TextLarge text="Anexos" className="text-gray-700 mt-2" />
          <View className="flex-row items-center w-full h-22 mt-1">
            {docs > 0 ? docs?.map((item, index) => {
              return (
                <Button
                  key={index}
                  title={`${index + 1}`}
                  onPress={() => openWebView(item)}
                  className="w-12 mx-1 bg-blue-800 rounded-lg"
                />
              );
            })
          :
            <TextSmall title="Não ah anexos" className="text-gray-500" />
          }
          </View>

          <InputInfoUser
            infoLabel="Parentes"
            infoValue={parents?.length ? `${parents.length}` : "Não" }
          />
          <ScrollView
            className="w-full right-3"
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            {parents ? (
              parents?.map((item) => {
                return (
                  <View key={item.cpf} className="mx-2 mb-2">
                    <MyParents
                      id={item.id}
                      nome={item?.nome}
                      cpf={item?.cpf}
                      idade={item?.idade}
                      isAutist={item?.isAutist}
                    />
                  </View>
                );
              })
            ) : (
              <TextLarge text="" />
            )}
          </ScrollView>
        </View>
        <View className="flex-row w-full self-center gap-x-12 mt-3 my-4 items-center justify-center">
          <TouchableOpacity 
          className="items-center justify-center rounded-full shadow-lg shadow-green-400"
          onPress={() => handleConfirmSolicitation()}>
            <FontAwesome name="check-circle" size={72} color={colors.green[400]} />
          </TouchableOpacity>
          <TouchableOpacity
          className="items-center justify-center rounded-full shadow-lg shadow-red-400"
            onPress={() => handleCancelSolicitation(route?.params?.id)}
          >
            <FontAwesome name="times-circle" size={72} color={colors.red[500]} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
