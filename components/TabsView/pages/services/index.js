import React, { useContext } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import {
  Box,
  Circle,
  FlatList,
  ScrollView,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  Center,
  Divider,
  Button,
} from "native-base";
import {
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import BackButton from "../../../BackButton";
import { UserContext } from "../../../../src/contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import {
  apiSolicitations,
  deleteSolicitation,
} from "../../../../src/requisitions/api";

export default function Solicitation() {
  const { users, logged, solicitations, aprovados } = useContext(UserContext);
  const navigation = useNavigation();

  console.log(solicitations);
  return (
    <ScrollView flex={1} w="100%" bg="darkBlue.400" py="10" px="5">
      <Box flexDir="row" w="100%" top="2%">
      <FontAwesome5 name="user-clock" size={40} color="white" />
        <Heading mx="3" fontSize="4xl" color="light.100">
          Solicitações
        </Heading>
      </Box>

      <Divider my="4" />

      <FlatList
        data={solicitations}
        horizontal={false}
        keyExtractor={(item) => item.id}
        style={{
          flex: 1,
          width: "100%",
          height: 400,
          borderRadius: 40,
        }}
        renderItem={({ item, index }) => {
          let userInfo = users.find(user => String(user.cpf) === String(item.cpf))
          return (
            <Center my="3" w="100%">
              <HStack w="100%" mt="4%" h="200">
                <VStack bg="lightBlue.400" rounded="xl" py="5%" px="2" w="100%%">
                  <Text color={"light.100"}>Nome: {item.nome} </Text>
                  <Text color={"light.100"}>CPF: {item.cpf} </Text>
                  <Text color={"light.100"}>Serviço: {item.service} </Text>
                  <Text color={"light.100"}>Pasta: {item.pasta} </Text>
                  <Text color={"light.100"}>STATUS: {item.status} </Text>
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
                    onPress={() => deleteSolicitation(item.id)}
                  >
                    <FontAwesome
                      name="remove"
                      size={36}
                      color="white"
                    />
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
                    onPress={() => navigation.navigate("SolicitationInfoUser", {
                      userInfo: userInfo,
                      cpf: item.cpf,
                      service: item.service,
                      pasta: item.pasta,
                      status: item.status,
                      date: item.date
                    })}
                  >
                    <FontAwesome5 name="info-circle" size={36} color="white" />
                  </TouchableOpacity>
                </VStack>
              </HStack>
            </Center>
          );
        }}
      />
      <Divider mt="3%" mx="2" w="40%" alignSelf={"center"} />

      <Box flexDir="row" top="2%">
        <FontAwesome5 name="user-check" size={40} color="white" />
        <Heading mx="3" fontSize="4xl" color="light.100">
          Aprovações
        </Heading>
      </Box>
      <FlatList
        data={aprovados}
        horizontal={false}
        keyExtractor={(item) => item.id}
        style={{
          flex: 1,
          width: "100%",
          height: 400,
          borderRadius: 40,
        }}
        renderItem={({ item }) => {
          let userInfo = users.find(user => String(user.cpf) === String(item.cpf))
          return (
            <Center my="3" w="100%">
              <HStack w="100%" h="100px">
                <VStack bg="lightBlue.400" rounded="xl" py="5%" px="2" w="88%">
                  <Text color={"light.100"}>Nome: {item.nome} </Text>
                  <Text color={"light.100"}>Serviço: {item.service} </Text>
                  <Text color={"light.100"}>STATUS: {item.status} </Text>
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
                    onPress={() => deleteSolicitation(item.id)}
                  >
                    <FontAwesome
                      name="remove"
                      size={36}
                      color="white"
                    />
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
                    onPress={() => navigation.navigate("SolicitationInfoUser", {
                      userInfo: userInfo,
                      cpf: item.cpf,
                      service: item.service,
                      pasta: item.pasta,
                      status: item.status,
                      date: item.date
                    })}
                  >
                    <FontAwesome5 name="info-circle" size={36} color="white" />
                  </TouchableOpacity>
                </VStack>
              </HStack>
            </Center>
          );
        }}
      /> 

      <TouchableOpacity
        style={{
          width: 70,
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          marginBottom: "9%",
        }}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left-circle" size={40} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
}
