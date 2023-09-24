import React from 'react';
import {   Box,
    Heading,
    Input,
    Center,
    Text,
    Divider,
    Button,
    ScrollView,
    FlatList,
    VStack,
    HStack } from 'native-base';
import { TouchableOpacity, View} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { deleteSolicitation } from '../../../requisitions/api';

export default function listSolicitations(props) {
    const navigation = useNavigation()
 return (
    <Center my="3" w="100%">
    <HStack w="100%" shadow={3} mt="4%" h="160">
      <VStack
        bg="lightBlue.400"
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
          <FontAwesome5
            name="info-circle"
            size={36}
            color="white"
          />
        </TouchableOpacity>
      </VStack>
    </HStack>
  </Center>
  );
}