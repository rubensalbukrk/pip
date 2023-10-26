import React, { useContext, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  ScrollView,
  Container,
  Center,
  Icon,
  Heading,
  Divider,
  FlatList,
  HStack,
  VStack,
  NativeBaseProvider,
} from "native-base";
import { Pressable, TouchableOpacity } from "react-native";
import { FontAwesome, Octicons } from "@expo/vector-icons";
import { api, deleteAprovado } from "../../requisitions/api";
import UserAvatar from "../../../components/UserAvatar";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../../contexts/UserContext";
import BackButton from "../../../components/BackButton";
import { Dimensions } from "react-native";

var height = Dimensions.get("window").height;

export default function SolicitationsUser() {
  const { logged, solicitations, setSolicitations, setAprovados, aprovados } =
    useContext(UserContext);

  useEffect(() => (getSolicitation(), getAprovados()), []);
  if (solicitations) {
    var userSolicitations = solicitations.filter(
      (item) => String(item.cpf) === String(logged.cpf)
    );
  }

  if (aprovados) {
    var userBeneficiets = aprovados.filter(
      (item) => String(item.cpf) === String(logged.cpf)
    );
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
      })

      .catch((error) => console.log(error));
  };

  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  return (
    <NativeBaseProvider config={config}>
      <ScrollView h={height} bg={"lightBlue.400"} horizontal={false} w="100%">
        <Box
          flex={1}
          py="12"
          w="100%"
          height={height + 50}
          alignItems="center"
          justifyContent="center"
          bg={{
            linearGradient: {
              colors: ["lightBlue.600", "lightBlue.400"],
              start: [0, 0],
              end: [1, 0],
            },
          }}
        >
          <Box position="absolute" top="2%" left="2%">
            <BackButton />
          </Box>
          <Box alignSelf={"center"} mb="5%">
            <UserAvatar size={"2xl"} source={{ uri: logged?.avatar }} />
          </Box>

          <Box
            alignSelf={"left"}
            pl="5"
            h="30"
            flexDir="row"
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              as={<Octicons name="checklist" size={32} color="white" />}
              size="xl"
              color="white"
            />
            <Heading ml="3" fontFamily="Doppio One" color="light.100">
              Minhas solicitações
            </Heading>
          </Box>

          <Divider alignSelf="center" w="90%" />

          <Box w="100%" minH={"300"}>
            <FlatList
              data={userSolicitations}
              horizontal={false}
              keyExtractor={(item) => item.id}
              style={{
                flex: 1,
                width: "100%",
                height: "200px",
                borderRadius: 40,
              }}
              my="3"
              renderItem={({ item }) => {
                return (
                  <Center my="3" w="100%">
                    <HStack w="100%" justifyContent="center" h="120px">
                      <VStack
                        bg="rgba(200, 255, 254, 0.15)"
                        rounded="xl"
                        py="5%"
                        px="2"
                        w="85%"
                      >
                        <Text fontFamily="Doppio One" color={"light.100"}>Serviço: {item.service}</Text>
                        <Text fontFamily="Doppio One" color={"light.100"}>STATUS: {item.status}</Text>
                        <Text fontFamily="Doppio One" color={"light.100"}>Data: {item.date}</Text>
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
                      </VStack>
                    </HStack>
                  </Center>
                );
              }}
            />
          </Box>

          <Box
            alignSelf={"left"}
            pl="5"
            h="30"
            flexDir="row"
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              as={<Octicons name="checklist" size={32} color="white" />}
              size="xl"
              color="white"
            />
            <Heading ml="3" fontFamily="Doppio One" color="light.100">
              Meus benefícios
            </Heading>
          </Box>

          <Divider alignSelf="center" w="90%" />

          <FlatList
            data={userBeneficiets}
            horizontal={false}
            keyExtractor={(item) => item.id}
            style={{
              width: "100%",
              height: "40%",
              borderRadius: 40,
            }}
            my="3"
            renderItem={({ item }) => {
              return (
                <Center my="3" w="100%">
                  <HStack w="100%" justifyContent="center" h="120px">
                    <VStack
                      bg="rgba(200, 255, 254, 0.15)"
                      rounded="xl"
                      py="5%"
                      px="2"
                      w="85%"
                    >
                      <Text fontFamily="Doppio One" color={"light.100"}>Serviço: {item.service}</Text>
                      <Text fontFamily="Doppio One" color={"light.100"}>STATUS: {item.status}</Text>
                      <Text fontFamily="Doppio One" color={"light.100"}>Data: {item.date}</Text>
                    </VStack>
                  </HStack>
                </Center>
              );
            }}
          />
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
}
