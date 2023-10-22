import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Input,
  Center,
  Text,
  Divider,
  Button,
  FlatList,
  VStack,
  NativeBaseProvider,
  HStack,
} from "native-base";
import { UserContext } from "../../contexts/UserContext";
import { TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import BackButton from "../../../components/BackButton";
import { deleteSolicitation, deleteAprovado } from "../../requisitions/api";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../requisitions/api";
import { LinearGradient } from "expo-linear-gradient";

function ListSolicitations(props) {
  const navigation = useNavigation();
  return (
    <Center my="3" w="100%">
      <HStack w="100%" shadow={3} mt="4%" h="160">
        <VStack
          bg="rgba(255,255,255, 0.16)"
          rounded="xl"
          py="5%"
          px="3"
          w="100%"
        >
          <Text color={"light.100"}>Nome: {props.nome} </Text>
          <Text color={"light.100"}>CPF: {props.cpf} </Text>
          <Text color={"light.100"}>Serviço: {props.service} </Text>
          <Text color={"light.100"}>STATUS: {props.status} </Text>
          <Text color={"light.100"}>Data: {props.date} </Text>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 1,
              top: 5,
              width: 40,
              height: 40,
              opacity: 0.8,
            }}
            onPress={() => deleteSolicitation(props.id)}
          >
            <FontAwesome name="remove" size={36} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 5,
              bottom: 5,
              width: 40,
              height: 40,
              opacity: 0.8,
            }}
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
        </VStack>
      </HStack>
    </Center>
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
        <Box>
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
        </Box>
      );
    };
    var IsAutist = () => {
      return (
        <Box>
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
        </Box>
      );
    };
    var IsMulher = () => {
      return (
        <Box>
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
        </Box>
      );
    };
    var IsSaude = () => {
      return (
        <Box>
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
        </Box>
      );
    };
    var IsProtagonista = () => {
      return (
        <Box>
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
        </Box>
      );
    };
    var IsAlimentar = () => {
      return (
        <Box>
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
        </Box>
      );
    };
    var IsPasse = () => {
      return (
        <Box>
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
        </Box>
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

  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };
  return (
    <NativeBaseProvider config={config}>
      <Box
        flex={1}
        w="100%"
        bg={{
          linearGradient: {
            colors: ["lightBlue.600", "lightBlue.400"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
          horizontal={false}
        >
          <Box mt="5%">
            <Box position="absolute" top="2%" left="3%">
              <BackButton />
            </Box>

            <Heading
              fontSize="lg"
              mt="10%"
              color="light.100"
              alignSelf="center"
            >
              {route?.params?.title}
            </Heading>
            <Divider mx="3" my="3" alignSelf="center" w="80%" />
            <Box
              w="97%"
              h="400px"
              rounded="xl"
              shadow={2}
              alignSelf={"center"}
              py="3"
              px="4"
              bg="rgba(255,255,255, 0.16)"
            >
              <Heading alignSelf="left" color="light.100">
                SOLICITAÇÕES
              </Heading>
              <Divider w="100%" mb="5%" />
              <ScrollView 
                w="100%" 
                horizontal={false} 
                rounded="xl"
                style={{borderRadius: 40}}
                >
                {logged?.isCoordAutist ? <IsAutist /> : null}

                {logged?.isCoordMulher ? <IsMulher /> : null}

                {logged?.isCoordSaude ? <IsSaude /> : null}

                {logged?.isCoordCidadania ? <IsCidadania /> : null}

                {logged?.isCoordProtagonista ? <IsProtagonista /> : null}

                {logged?.isCoordPasse ? <IsPasse /> : null}

                {logged?.isCoordAlimentar ? <IsAlimentar /> : null}
              </ScrollView>
            </Box>

            <Box
              w="95%"
              h="300px"
              bg="rgba(255,255,255, 0.16)"
              my="4"
              rounded="xl"
              shadow={5}
              py="3"
              px="4"
              alignSelf={"center"}
            >
              <Heading color="light.100">APROVAÇÕES</Heading>
              <Divider w="90%" />
              <FlatList
                data={aprovados}
                horizontal={false}
                keyExtractor={(item) => item.id}
                style={{
                  flex: 1,
                  width: "100%",
                  height: "40%",
                  borderRadius: 40,
                }}
                my="3"
                renderItem={({ item, index }) => {
                  let userInfo = users.find(
                    (user) => String(user.cpf) === String(item.cpf)
                  );
                  return (
                    <Center my="3" w="100%">
                      <HStack w="100%" h="120px">
                        <VStack
                          bg="rgba(255,255,255, 0.16)"
                          alignSelf="center"
                          rounded="xl"
                          py="5%"
                          px="2"
                          w="100%"
                        >
                          <Text color={"light.100"}>Nome: {item.nome} </Text>
                          <Text color={"light.100"}>
                            Serviço: {item.service}{" "}
                          </Text>
                          <Text color={"light.100"}>
                            STATUS: {item.status}{" "}
                          </Text>
                          <Text color={"light.100"}>Data: {item.date} </Text>
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
                            <FontAwesome
                              name="remove"
                              size={36}
                              color="white"
                            />
                          </TouchableOpacity>
                        </VStack>
                      </HStack>
                    </Center>
                  );
                }}
              />
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}
