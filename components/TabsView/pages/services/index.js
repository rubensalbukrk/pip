import React, { useContext } from "react";
import { View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import {
  Box,
  Circle,
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
  const { solicitations } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <ScrollView flex={1} w="100%" bg="darkBlue.400" py="10" px="5">
      <Box flexDir="row" top="2%">
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
          return (
            <Center my="3" w="100%">
              <HStack>
                <VStack bg="lightBlue.400" rounded="xl" py="5%" px="2" w="88%">
                  <Text>Nome: {item.nome} </Text>
                  <Text>CPF: {item.cpf} </Text>
                  <Text>Serviço: {item.service} </Text>
                  <Text>Pasta: {item.pasta} </Text>
                  <Text>STATUS: {item.status} </Text>
                  <Text>Data: {item.date} </Text>
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
                      userInfo: item.userInfo,
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
      <HStack
      my="4"
       w="100%"
       bg="lightBlue.400"
       h="300"
       rounded="lg"
       >
        
      </HStack>  

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
