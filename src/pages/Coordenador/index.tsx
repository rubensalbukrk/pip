import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";

import { UserContext } from "../../contexts/UserContext";
import { TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { FontAwesome, FontAwesome5, Octicons } from "@expo/vector-icons";
import BackButton from "../../../components/BackButton";
import { api, deleteSolicitation, deleteAprovado } from "../../api/api";
import { useNavigation } from "@react-navigation/native";

function ListSolicitations(props) {
  const navigation = useNavigation();
  return (
      <View className="w-full self-center my-3 px-3 py-2 rounded-xl bg-white/20">
        <Text className="font-default text-lg text-white">
          Nome: {props.nome}
        </Text>
        <Text className="font-default text-lg text-white">
          CPF: {props.cpf}
        </Text>
        <Text className="font-default text-lg text-white">
          Serviço: {props.service}
        </Text>
        <Text className="font-default text-lg text-white">
          STATUS: {props.status}
        </Text>
        <Text className="font-default text-lg text-white">
          Data: {props.date}
        </Text>
        <TouchableOpacity
          className="w-22 h-22 absolute top-3 right-3 opacity-80"
          onPress={() => deleteSolicitation(props.id)}
        >
          <FontAwesome name="remove" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-22 h-22 absolute bottom-3 right-3 opacity-80"
          onPress={() =>
            navigation.navigate("SolicitationInfoUser", {
              id: props.id,
              nome: props.nome,
              userInfo: props?.userInfo,
              cpf: props.cpf,
              service: props.service,
              pasta: props.pasta,
              status: props.status,
              date: props.date,
            })
          }
        >
          <FontAwesome5 name="info-circle" size={36} color="white" />
        </TouchableOpacity>
      </View>

  );
}

export default function PageCoordenador({ route }) {
  const {
    solicitations,
    users,
    logged,
    aprovados,
    setAprovados,
    setSolicitations,
  } = useContext<any>(UserContext);

  const config = {
    method: "get",
  };


  const getAprovados = () => {
    axios
      .get(`${api.BASE_URL}/aprovados`, {
        method: "get",
      })
      .then((response) => {
        const aprovados = response.data.results.aprovados;
        setAprovados(aprovados);
      })

      .catch((error) => console.log(error));
  };
  const getSolicitations = () => {
    axios
      .get(`${api.BASE_URL}/solicitations`, {
        method: "get",
      })
      .then((response) => {
        const solicitations = response.data.results.solicitations;
        setSolicitations(solicitations)

      })
      .catch((error) => console.log(error));
  }; 
  
  useEffect(() => (
    getSolicitations(),
    getAprovados()
    ), []);

  if (solicitations) {
    var autistSolicitations = solicitations?.filter(
      (item) => String(item.pasta) === "Autistas"
    );
    var mulherSolicitations = solicitations?.filter(
      (item) => String(item.pasta) === "Mulher"
    );
    var cidadaniaSolicitations = solicitations?.filter(
      (item) => String(item.pasta) === "Cidadania"
    );
    var saudeSolicitations = solicitations?.filter(
      (item) => String(item.pasta) === "Saúde Mental"
    );
    var protagonistaSolicitations = solicitations?.filter(
      (item) => String(item.pasta) === "Protagonistas"
    );
    var alimentarSolicitations = solicitations?.filter(
      (item) => String(item.pasta) === "Segurança Alimentar"
    );
    var passeSolicitations = solicitations?.filter(
      (item) => String(item.pasta) === "Passe Livre"
    );
    var IsCidadania = () => {
      return (
        <View>
          {cidadaniaSolicitations?.map((item) => {
            const { service, nome, status, date } = item;
            return (
              <ListSolicitations
                id={item.id}
                nome={item.nome}
                cpf={item.cpf}
                service={item.service}
                status={item.status}
                date={item.date}
                userInfo={item.userInfo}
              />
            );
          })}
        </View>
      );
    };
    var IsAutist = () => {
      return (
        <View>
          {autistSolicitations?.map((item) => {
            const { service, nome, status, date, cpf, id } = item;
            let userInfo = users.find(
              (user) => String(user.cpf) === String(item.cpf)
            );
            return (
              <ListSolicitations
                id={item.id}
                nome={item.nome}
                cpf={item.cpf}
                service={item.service}
                status={item.status}
                date={item.date}
                userInfo={userInfo}
                pasta={item.pasta}
              />
            );
          })}
        </View>
      );
    };
    var IsMulher = () => {
      return (
        <View>
          {mulherSolicitations?.map((item) => {
            const { service, nome, status, date } = item;
            return (
              <ListSolicitations
                id={item.id}
                nome={item.nome}
                cpf={item.cpf}
                service={item.service}
                status={item.status}
                date={item.date}
                userInfo={item.userInfo}
              />
            );
          })}
        </View>
      );
    };
    var IsSaude = () => {
      return (
        <View>
          {saudeSolicitations?.map((item) => {
            const { service, nome, status, date } = item;
            return (
              <ListSolicitations
                id={item.id}
                nome={item.nome}
                cpf={item.cpf}
                service={item.service}
                status={item.status}
                date={item.date}
                userInfo={item.userInfo}
              />
            );
          })}
        </View>
      );
    };
    var IsProtagonista = () => {
      return (
        <View>
          {protagonistaSolicitations?.map((item) => {
            const { service, nome, status, date } = item;
            return (
              <ListSolicitations
                id={item.id}
                nome={item.nome}
                cpf={item.cpf}
                service={item.service}
                status={item.status}
                date={item.date}
                userInfo={item.userInfo}
              />
            );
          })}
        </View>
      );
    };
    var IsAlimentar = () => {
      return (
        <View>
          {alimentarSolicitations?.map((item) => {
            const { service, nome, status, date, cpf, id } = item;
            return (
              <ListSolicitations
                id={item.id}
                nome={item.nome}
                cpf={item.cpf}
                service={item.service}
                status={item.status}
                date={item.date}
                userInfo={item.userInfo}
              />
            );
          })}
        </View>
      );
    };
    var IsPasse = () => {
      return (
        <View>
          {passeSolicitations?.map((item) => {
            const { service, nome, status, date } = item;
            return (
              <ListSolicitations
                id={item.id}
                nome={item.nome}
                cpf={item.cpf}
                service={item.service}
                status={item.status}
                date={item.date}
                userInfo={item.userInfo}
              />
            );
          })}
        </View>
      );
    };
  }

  return (
    <View className="flex-1 w-full bg-zinc-500">
      <ScrollView
        horizontal={false}
      >
        <View className="mt-5">
          <View className="absolute top-2 left-3">
            <BackButton />
          </View>

          <Text className="font-default self-center text-xl mt-10 text-white">
            {route?.params?.title}
          </Text>

          <View className="w-96 h-400 px-4 py-3 self-center">
            <View className="flex-row w-full px-4 h-8 justify-start items-start">
              <Octicons name="checklist" size={32} color="#3C3C3C" />
              <Text className="font-default text-xl ml-3 text-gray-900">
                Solicitações
              </Text>
            </View>

            <ScrollView className="w-full h-60 rounded-md">
              {logged?.isCoordAutist ? <IsAutist /> : null}

              {logged?.isCoordMulher ? <IsMulher /> : null}

              {logged?.isCoordSaude ? <IsSaude /> : null}

              {logged?.isCoordCidadania ? <IsCidadania /> : null}

              {logged?.isCoordProtagonista ? <IsProtagonista /> : null}

              {logged?.isCoordPasse ? <IsPasse /> : null}

              {logged?.isCoordAlimentar ? <IsAlimentar /> : null}
            </ScrollView>
          </View>

          <View className="w-96 my-2 py-3 px-4 self-center">
            <View className="flex-row w-full mt-1 px-4 h-8 justify-start items-start">
              <Octicons name="checklist" size={32} color="#3C3C3C" />
              <Text className="font-default text-xl ml-3 text-gray-900">
                Aprovações
              </Text>
            </View>
            <FlatList
              className="w-full h-80 my-1 rounded-lg"
              data={aprovados}
              horizontal={false}
              renderItem={({ item, index }) => {
                let userInfo = users.find(
                  (user) => String(user?.cpf) === String(item?.cpf)
                );
                return (
                  <View
                    className="w-full h-20 my-1 items-center justify-center"
                  >
                    <View className="flex-row w-full h-20">
                      <View className="w-full py-3 px-2 self-center bg-white/10 rounded-xl">
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
}