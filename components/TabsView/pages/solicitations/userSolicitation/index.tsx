import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import WebView from "react-native-webview";
import BackButton from "../../../../BackButton";
import InputInfoUser from "../../../../UserLayout/inputUser";
import MyParents from "../../../../UserLayout/userParents";
import { FontAwesome } from "@expo/vector-icons";
import { TextLarge } from "../../../../TextLg/Text";
import { AuthContext } from "../../../../../src/contexts/AuthContext";
import firestore from "@react-native-firebase/firestore";
import { Button } from "../../../../ButtonBlue/ButtonBlue";


export default function SolicitationInfoUser({ route }) {
  const {token} = useContext(AuthContext)
  const [status, setStatus] = useState<string>('Em analise...');
  const parents = route?.params?.userInfo?.parents;
  const userInfo = route?.params?.userInfo;
  const docs = route?.params?.docs;
  const [showWebView, setShowWebView] = useState<boolean>(false)
  const [docUrl, setDocUrl] = useState<string>(route?.params?.docs[0])


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
    .then(() => alert('Aprovado com sucesso!'))
    const task2 = firestore()
    .collection("Solicitations")
    .doc(route?.params?.id)
    .delete()
  };
  const handleCancelSolicitation = (id) => {
    const task = firestore()
    .collection("Aprovados")
    .doc(id)
    .delete()
    .then(() => alert('A Solicitação foi cancelada!'))
  };
  const openWebView = (url) => {
    setDocUrl(url);
    setShowWebView(true);
  }
  const closeWebView = () => {
    setShowWebView(false);
  };

  const WebPage = () => {
    return (
      <View style={{zIndex: 2, width: '100%', height: '100%'}} className="absolute bg-black/60">
        <WebView style={{flex: 1, width: '95%', height: '80%', alignSelf: 'center'}}  source={{ uri: docUrl }} />
        <Button title="Voltar" onPress={() => closeWebView()} className="my-2 self-center" />
      </View>
    )
  }

  async function handleUpdateStatus() {
    try {
      let updateStatus = {
        status: status,
      };
      const solicitation = firestore().collection('Solicitations')
      .doc(route?.params?.id)
      .update(updateStatus)
      Alert.alert('Solicitação', 'O status foi alterado!')
    } catch (error) {
      alert(`Houve um problema: ${error}`);
    }
  }
  return (
    <View className="w-full h-full bg-zinc-500">
      {showWebView && <WebPage />}
      <View className="flex-row bg-zinc-500 mt-8 px-2 pt-4 my-5 justify-between items-center">
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
          <InputInfoUser
            infoLabel="Nome"
            infoValue={userInfo.nome}
          />
          <InputInfoUser
            infoLabel="CPF"
            infoValue={userInfo.cpf}
          />
          <InputInfoUser
            infoLabel="WhatsApp"
            infoValue={route?.params?.phone}
          />
        
          <InputInfoUser
            infoLabel="Data de entrada"
            infoValue={route?.params?.date}
          />
          <TextLarge text="Status" />
          <View className="flex-row w-full gap-3 justify-center items-center">
            <TextInput
              className="w-72 px-2 bg-zinc-500 rounded-lg"
              value={status}
              onChangeText={(text) => setStatus(text)}
              placeholderTextColor={"#fff"}
              placeholder={route?.params?.status}
            />
            <TouchableOpacity onPress={() => handleUpdateStatus()}>
              <FontAwesome name="edit" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <TextLarge text="Anexos" />
          <View className="flex-row items-center w-full h-22">
            {docs?.map((item, index) => {
              return <Button key={index} title={`${index + 1}`} onPress={() => openWebView(item)} className="w-12 mx-1" />
            })}
          </View>
          
          <InputInfoUser
            infoLabel="Parentes"
            infoValue={
              parents.length === 0
                ? "Não"
                : `${parents.length}`
            }
          />
          <ScrollView className='w-full right-3' showsHorizontalScrollIndicator={false} horizontal={true}>
          {parents?.length === 0
            ? <TextLarge text="Não tem" />
            : parents?.map((item) => {
                return (
                  <View key={item.cpf} className="mx-2">
                  <MyParents
                    
                    id={item.id}
                    nome={item?.nome}
                    cpf={item?.cpf}
                    idade={item?.idade}
                    isAutist={item?.isAutist}
                  />
                  </View>
                );
              })}
          </ScrollView>
        </View>
        <View className="flex-row w-full self-center gap-x-12 mt-3 my-4 items-center justify-center">
          <TouchableOpacity onPress={() => handleConfirmSolicitation()}>
            <FontAwesome name="check-circle" size={72} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>  handleCancelSolicitation(route?.params?.id)}
          >
            <FontAwesome name="times-circle" size={72} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
