import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";

import BackButton from "../../../../BackButton";
import InputInfoUser from "../../../../UserLayout/inputUser";
import MyParents from "../../../../UserLayout/userParents";
import { FontAwesome } from "@expo/vector-icons";
import { api, deleteSolicitation } from "../../../../../src/api/api";

export default function SolicitationInfoUser({ route }) {
  const [status, setStatus] = useState();
  const filhos = route?.params?.userInfo?.filhos;

  const handleConfirmSolicitation = () => {
    let userApproved = {
      cpf: route?.params?.cpf,
      nome: route?.params?.userInfo?.nome,
      service: route?.params?.service,
      date: route?.params?.date,
      status: status,
    };
    axios
      .post(`${api.BASE_URL}/aprovados`, userApproved, {
        method: 'POST'
      })
      .then(deleteSolicitation(route?.params?.id))
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => console.error(error));
  };
  const handleCancelSolicitation = (id) => {
    axios.delete(`${api.BASE_URL}/solicitations/${id}`);
  };
  
  async function handleUpdateStatus() {
    try {
      let updateStatus = {
        status: status,
      };
      const response = await axios.put(`${api.BASE_URL}/solicitations/${route?.params?.id}`, updateStatus, {
        method:  'PUT'
      });
      const message = await response.data
      return alert(`${message}`)
    } catch (error) {
      alert(`Houve um problema: ${error}`)
    }
  }
  return (
    <ScrollView className="flex-1 w-full h-full bg-zinc-600">
      <View className="flex-row">
        <BackButton />
        <Text className="font-default my-3 text-lg text-white">
          Informações de Solicitação
        </Text>
      </View>

      <View className="w-full h-full rounded-lg bg-blue-600">
        <View className="w-full mx-3 my-2">
          <InputInfoUser
            infoLabel="Serviço"
            infoValue={route?.params?.service}
          />
          <InputInfoUser
            infoLabel="Nome"
            infoValue={route?.params?.userInfo?.nome}
          />
          <InputInfoUser
            infoLabel="CPF"
            infoValue={route?.params?.userInfo?.cpf}
          />
          <InputInfoUser
            infoLabel="NIS"
            infoValue={route?.params?.userInfo?.nis}
          />

          <InputInfoUser
            infoLabel="Data de entrada"
            infoValue={route?.params?.date}
          />
          <Text className="font-default text-lg top-3 ml-2 text-white">
            Status
          </Text>
          <View className="flex-row w-full gap-3 items-center">
            <TextInput
              className="w-72 bg-blue-400"
              value={status}
              onChangeText={(text) => setStatus(text)}
              placeholderTextColor={"#fff"}
              placeholder={route?.params?.status}
            />
            <TouchableOpacity onPress={() => handleUpdateStatus()}>
              <FontAwesome name="edit" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <View className="w-full px-3 py-2 mt-6 rounded-2xl bg-white/10">
            <InputInfoUser
              infoLabel="Filhos"
              infoValue={
                route?.params?.userInfo?.filhos?.length === 0
                  ? "Não"
                  : `${route?.params?.userInfo?.filhos?.length}`
              }
            />
            {route?.params?.userInfo?.filhos?.length === 0
              ? "NÃO"
              : route?.params?.userInfo?.filhos?.map((item) => {
                  return (
                    <MyParents
                      nome={item?.nome}
                      cpf={item?.cpf}
                      idade={item?.idade}
                    />
                  );
                })}
          </View>
        </View>
        <View className="flex-row w-full my-4 mb-10 gap-5 items-center justify-center">
          <TouchableOpacity onPress={() => handleConfirmSolicitation()}>
            <FontAwesome name="check-circle" size={72} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteSolicitation(route?.params?.id)}
          >
            <FontAwesome name="times-circle" size={72} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
