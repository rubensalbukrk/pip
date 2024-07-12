import React, { useContext, useEffect } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome, FontAwesome5, Octicons } from "@expo/vector-icons";
import BackButton from "../../../components/BackButton";
import { api, deleteSolicitation, deleteAprovado } from "../../api/api";
import { useNavigation } from "@react-navigation/native";
import { SolicitationsProps } from "../../interfaces/Solicitations";
import { AuthContext } from "../../contexts/AuthContext";
import { TextLarge, TextXl } from "../../../components/TextLg/Text";
import { AprovadosProps } from "../../interfaces/Aprovados";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PageCoordenador({ route }) {
  const { token } = useContext(AuthContext);
  const { solicitations, logged, aprovados, setAprovados, setSolicitations } =
    useContext<any>(UserContext);
  const {navigate} = useNavigation()

  const config = {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const getSolicitations = async (): Promise<SolicitationsProps[]> => {
    try {
      const response = await axios.get<SolicitationsProps>(
        `${api.BASE_URL}/solicitations`,
        config
      );
      setSolicitations(response.data.results);
      return;
    } catch (error) {
      Alert.alert("Atenção", "Tente novamente mais tarde!");
    }
  };

  const getAprovados = async (): Promise<AprovadosProps[]> => {
    try {
      const response = await axios.get<AprovadosProps>(
        `${api.BASE_URL}/aprovados`,
        config
      );
      setAprovados(response.data.results);
      return;
    } catch (error) {
      Alert.alert("Atenção", "Tente novamente mais tarde!");
    }
  };
  useEffect(() => {
    try {
      getSolicitations();
      setTimeout(() => {
        getAprovados();
      }, 1500);
    } catch (error) {
      if (error.response.status === 401) {
        Alert.alert("Sessão expirada!", "Faça login novamente!");
        AsyncStorage.removeItem("token");
        navigate("Login");
      }
    }
  }, []);

  function ItemSolicitation(props: SolicitationsProps) {
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
              userInfo: props.userInfo,
              cpf: props.cpf,
              pasta: props.pasta,
              service: props.service,
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
    var cursoSolicitations = solicitations?.filter(
      (item) => String(item.pasta) === "Cursos"
    );
    var optometriaSolicitations = solicitations?.filter(
      (item) => String(item.pasta) === "Optometria"
    );
    var IsCidadania = () => {
      return (
        <View>
          {cidadaniaSolicitations?.map((item: SolicitationsProps) => {
            const { service, pasta, nome, status, date, cpf, id, userInfo } =
              item;
            return (
              <ItemSolicitation
                key={id}
                id={id}
                nome={nome}
                cpf={cpf}
                service={service}
                status={status}
                date={date}
                userInfo={userInfo}
                pasta={pasta}
              />
            );
          })}
        </View>
      );
    };
    var IsAutist = () => {
      return (
        <View>
          {autistSolicitations?.map((item: SolicitationsProps) => {
            const { id, date, cpf, nome, pasta, service, status, userInfo } =
              item;
            return (
              <ItemSolicitation
                key={id}
                id={id}
                nome={nome}
                cpf={cpf}
                service={service}
                status={status}
                date={date}
                userInfo={userInfo}
                pasta={pasta}
              />
            );
          })}
        </View>
      );
    };
    var IsMulher = () => {
      return (
        <View>
          {mulherSolicitations?.map((item: SolicitationsProps) => {
            const { service, pasta, nome, status, date, cpf, id, userInfo } =
              item;
            return (
              <ItemSolicitation
                key={id}
                id={id}
                nome={nome}
                cpf={cpf}
                service={service}
                status={status}
                date={date}
                userInfo={userInfo}
                pasta={pasta}
              />
            );
          })}
        </View>
      );
    };
    var IsSaude = () => {
      return (
        <View>
          {saudeSolicitations?.map((item: SolicitationsProps) => {
            const { service, pasta, nome, status, date, cpf, id, userInfo } =
              item;
            return (
              <ItemSolicitation
                key={id}
                id={id}
                nome={nome}
                cpf={cpf}
                service={service}
                status={status}
                date={date}
                userInfo={userInfo}
                pasta={pasta}
              />
            );
          })}
        </View>
      );
    };
    var IsProtagonista = () => {
      return (
        <View>
          {protagonistaSolicitations?.map((item: SolicitationsProps) => {
            const { service, pasta, nome, status, date, cpf, id, userInfo } =
              item;
            return (
              <ItemSolicitation
                key={id}
                id={id}
                nome={nome}
                cpf={cpf}
                service={service}
                status={status}
                date={date}
                userInfo={userInfo}
                pasta={pasta}
              />
            );
          })}
        </View>
      );
    };
    var IsAlimentar = () => {
      return (
        <View>
          {alimentarSolicitations?.map((item: SolicitationsProps) => {
            const { service, pasta, nome, status, date, cpf, id, userInfo } =
              item;
            return (
              <ItemSolicitation
                key={id}
                id={id}
                nome={nome}
                cpf={cpf}
                service={service}
                status={status}
                date={date}
                userInfo={userInfo}
                pasta={pasta}
              />
            );
          })}
        </View>
      );
    };
    var IsPasse = () => {
      return (
        <View>
          {passeSolicitations?.map((item: SolicitationsProps) => {
            const { service, pasta, nome, status, date, cpf, id, userInfo } =
              item;
            return (
              <ItemSolicitation
                key={id}
                id={id}
                nome={nome}
                cpf={cpf}
                service={service}
                status={status}
                date={date}
                userInfo={userInfo}
                pasta={pasta}
              />
            );
          })}
        </View>
      );
    };
    var IsCursos = () => {
      return (
        <View>
          {cursoSolicitations?.map((item: SolicitationsProps) => {
            const { service, pasta, nome, status, date, cpf, id, userInfo } =
              item;
            return (
              <ItemSolicitation
                key={id}
                id={id}
                nome={nome}
                cpf={cpf}
                service={service}
                status={status}
                date={date}
                userInfo={userInfo}
                pasta={pasta}
              />
            );
          })}
        </View>
      );
    };
    var IsOptometria = () => {
      return (
        <View>
          {optometriaSolicitations?.map((item: SolicitationsProps) => {
            const { service, pasta, nome, status, date, cpf, id, userInfo } =
              item;
            return (
              <ItemSolicitation
                key={id}
                id={id}
                nome={nome}
                cpf={cpf}
                service={service}
                status={status}
                date={date}
                userInfo={userInfo}
                pasta={pasta}
              />
            );
          })}
        </View>
      );
    };
  }

  return (
    <View className="flex-1 w-full bg-zinc-500">
      <View className="w-full pl-2 flex-row mt-6 items-center justify-between">
        <TextXl text={route?.params?.title} />
        <BackButton />
      </View>

      <View className="w-96 h-400 px-4 py-3 self-center">
        <View className="flex-row w-full px-4 h-8 justify-start items-start">
          <Octicons name="checklist" size={32} color="#3C3C3C" />
          <Text className="font-default text-xl ml-3 text-gray-900">
            Solicitações
          </Text>
        </View>

        <ScrollView className="w-full h-60 px-2 rounded-md">
          {logged?.isCoordAutist ? <IsAutist /> : null}

          {logged?.isCoordMulher ? <IsMulher /> : null}

          {logged?.isCoordSaude ? <IsSaude /> : null}

          {logged?.isCoordCidadania ? <IsCidadania /> : null}

          {logged?.isCoordProtagonista ? <IsProtagonista /> : null}

          {logged?.isCoordPasse ? <IsPasse /> : null}

          {logged?.isCoordAlimentar ? <IsAlimentar /> : null}

          {logged?.isCoordCursos ? <IsCursos /> : null}

          {logged?.isCoordOptometria ? <IsOptometria /> : null}
        </ScrollView>
      </View>

      <View className="w-96 my-2 py-3 px-4 self-center">
        <View className="flex-row w-full mb-2 px-4 h-8 justify-start items-start">
          <Octicons name="checklist" size={32} color="#3C3C3C" />
          <Text className="font-default text-xl ml-3 text-gray-900">
            Aprovações
          </Text>
        </View>
        <FlatList
          className="w-full px-2 mt-4 h-80 my-1 rounded-lg"
          data={aprovados}
          horizontal={false}
          renderItem={({ item }) => {
            return (
              <View className="w-full py-3 px-2 mx-2 self-center bg-white/10 rounded-xl">
                <TextLarge text={`Nome: ${item.nome}`} />
                <TextLarge text={`Serviço: ${item.service}`} />
                <TextLarge text={`Status: ${item.status}`} />
                <TextLarge text={`Emissão: ${item.date}`} />
                <TouchableOpacity
                  className="absolute w-8 h-8 opacity-40 top-2 right-1"
                  onPress={() => deleteAprovado(item.id)}
                >
                  <FontAwesome name="remove" size={36} color="white" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
