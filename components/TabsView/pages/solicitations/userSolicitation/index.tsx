import React, { useContext, useState } from "react";
import {
  View,
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
import { TextLarge, TextMedium } from "../../../../TextLg/Text";
import { AuthContext } from "../../../../../src/contexts/AuthContext";

export default function SolicitationInfoUser({ route }) {
  const {token} = useContext(AuthContext)
  const [status, setStatus] = useState<string>();
  const filhos = route?.params?.userInfo?.filhos;

  const handleConfirmSolicitation = () => {
    let userApproved = {
      cpf: route?.params?.cpf,
      nome: route?.params?.nome,
      service: route?.params?.service,
      date: route?.params?.date,
      status: status,
    };
    axios
      .post(`${api.BASE_URL}/aprovados`, userApproved, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => alert(`${response.data}`))
      .then(response => handleCancelSolicitation(route?.params?.id))
      .catch((error) => console.error(error));
  };
  const handleCancelSolicitation = (id: number) => {
    axios.delete(`${api.BASE_URL}/solicitations/${id}`,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  };

  async function handleUpdateStatus() {
    try {
      let updateStatus = {
        status: status,
      };
      const response = await axios.put(
        `${api.BASE_URL}/solicitations/${route?.params?.id}`,
        updateStatus,
        {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const message = await response.data;
      return alert(`${message}`);
    } catch (error) {
      alert(`Houve um problema: ${error}`);
    }
  }
  return (
    <View className="flex-1 w-full h-full bg-zinc-500">
      <View className="flex-row bg-zinc-500 mt-8 px-2 pt-4 my-5 justify-between items-center">
        <TextLarge text="Informações de Solicitação" />
        <BackButton />
      </View>


      <ScrollView className="flex-1 w-full rounded-lg bg-zinc-300/30">
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
          <TextLarge text="Status" />
          <View className="flex-row w-full gap-3 items-center">
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

          <InputInfoUser
            infoLabel="Filhos"
            infoValue={
              route?.params?.userInfo?.filhos?.length === 0
                ? "Não"
                : `${route?.params?.userInfo?.filhos?.length}`
            }
          />
          <ScrollView className='w-full right-3' showsHorizontalScrollIndicator={false} horizontal={true}>
          {route?.params?.userInfo?.filhos?.length === 0
            ? "NÃO"
            : route?.params?.userInfo?.filhos?.map((item) => {
                return (
                  <View key={item.id} className="mx-2">
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
            onPress={() => deleteSolicitation(route?.params?.id)}
          >
            <FontAwesome name="times-circle" size={72} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
