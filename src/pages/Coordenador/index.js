import React, { useContext, useState } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";

import { UserContext } from "../../contexts/UserContext";
import { TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import BackButton from "../../../components/BackButton";
import { deleteSolicitation, deleteAprovado } from "../../requisitions/api";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../api/api";

function ListSolicitations(props) {
  const navigation = useNavigation();
  return (
    <View my="3" w="100%">
      <View className="flex-row w-full mt-4 h-160">
        <View className="w-full gap-1 px-3 py-5 rounded-xl bg-white/20">
          <Text className="font-default text-lg text-white">
            Nome: {props.nome}{" "}
          </Text>
          <Text className="font-default text-lg text-white">
            CPF: {props.cpf}{" "}
          </Text>
          <Text className="font-default text-lg text-white">
            Serviço: {props.service}{" "}
          </Text>
          <Text className="font-default text-lg text-white">
            STATUS: {props.status}{" "}
          </Text>
          <Text className="font-default text-lg text-white">
            Data: {props.date}{" "}
          </Text>
          <TouchableOpacity
            className="w-22 h-22 absolute top-5 right-1 opacity-80"
            onPress={() => deleteSolicitation(props.id)}
          >
            <FontAwesome name="remove" size={36} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-22 h-22 absolute top-5 right-5 opacity-80"
            onPress={() =>
              navigation.navigate("SolicitationInfoUser", {
                id: props.id,
                userInfo: props.userInfo,
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
      </View>
    </View>
  );
}

export default function PageCoordenador({ route }) {
  const [refreshing, setRefreshing] = useState(false);
  const {
    solicitations,
    users,
    logged,
    aprovados,
    setAprovados,
    setSolicitations,
  } = useContext(UserContext);
  const [filtred, setFiltred] = useState();
  const navigation = useNavigation();

  if (solicitations) {
    var autistSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Autistas"
    );
    var mulherSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Mulher"
    );
    var cidadaniaSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Cidadania"
    );
    var saudeSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Saúde Mental"
    );
    var protagonistaSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Protagonistas"
    );
    var alimentarSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Segurança Alimentar"
    );
    var passeSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Passe Livre"
    );
    var IsCidadania = () => {
      return (
        <View>
          {cidadaniaSolicitations.map((item) => {
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
          {autistSolicitations.map((item) => {
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
                userInfo={item.userInfo}
              />
            );
          })}
        </View>
      );
    };
    var IsMulher = () => {
      return (
        <View>
          {mulherSolicitations.map((item) => {
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
          {saudeSolicitations.map((item) => {
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
          {protagonistaSolicitations.map((item) => {
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
          {alimentarSolicitations.map((item) => {
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
          {passeSolicitations.map((item) => {
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

  const getAprovados = () => {
    axios
      .get(`${api}/aprovados`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      .then((response) => {
        const aprovados = response.data.aprovados;
        setAprovados(aprovados);
      })

      .catch((error) => console.log(error));
  };
  const getSolicitation = () => {
    axios
      .get(`${api}/solicitations`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
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
    getSolicitation();
  }

  return (
    <View className="flex-1 w-full bg-blue-600">
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
        horizontal={false}
      >
        <View className="mt-5">
          <View className="absolute top-2 left-3">
            <BackButton />
          </View>

          <Text className="font-default self-center text-xl mt-10 text-white">
            {route?.params?.title}
          </Text>

          <View className="w-96 h-400 px-4 py-3 self-center rounded-xl bg-white/20">
            <Text className="font-default text-start text-md text-white">
              SOLICITAÇÕES
            </Text>

            <ScrollView className="w-full rounded-md">
              {logged?.isCoordAutist ? <IsAutist /> : null}

              {logged?.isCoordMulher ? <IsMulher /> : null}

              {logged?.isCoordSaude ? <IsSaude /> : null}

              {logged?.isCoordCidadania ? <IsCidadania /> : null}

              {logged?.isCoordProtagonista ? <IsProtagonista /> : null}

              {logged?.isCoordPasse ? <IsPasse /> : null}

              {logged?.isCoordAlimentar ? <IsAlimentar /> : null}
            </ScrollView>
          </View>

          <View className="w-96 h-300 my-4 py-3 px-4 self-center rounded-xl bg-white/20">
            <Text className="font-default text-start text-2xl text-white">
              APROVAÇÕES
            </Text>
            <FlatList
              className="w-full h-40 my-3 rounded-lg"
              data={aprovados}
              horizontal={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                let userInfo = users.find(
                  (user) => String(user.cpf) === String(item.cpf)
                );
                return (
                  <View className="w-full my-3 justify-center items-center">
                    <View className="w-full h-120">
                      <View className="flex-row w-full py-5 px-2 rounded-xl self-center bg-white/20">
                        <Text className="font-default text-lg text-white">
                          Nome: {item.nome}{" "}
                        </Text>
                        <Text className="font-default text-lg text-white">
                          Serviço: {item.service}{" "}
                        </Text>
                        <Text className="font-default text-lg text-white">
                          STATUS: {item.status}{" "}
                        </Text>
                        <Text className="font-default text-lg text-white">
                          Data: {item.date}{" "}
                        </Text>
                        <TouchableOpacity
                          className="w-22 h-22 opacity-75 absolute right-1 top-5"
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
