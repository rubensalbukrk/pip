import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Button,
  Heading,
  VStack,
  Input,
  Container,
  ScrollView,
  Divider,
  HStack,
} from "native-base";
import BackButton from "../../../../BackButton";
import InputInfoUser from "../../../../UserLayout/inputUser";
import MyParents from "../../../../UserLayout/userParents";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { api, apiSolicitations, apiAprovados } from "../../../../../src/requisitions/api";
export default function SolicitationInfoUser({ route }) {
  const [status, setStatus] = useState()


const handleConfirmSolicitation = () => {
    let userApproved = {
        nome: route?.params?.userInfo.nome,
        service: route?.params?.service,
        date: route?.params?.date,
        status: route?.params?.status
    }
    axios.post(apiAprovados, userApproved, {
        method: 'post',
        headers: new Headers({
            "ngrok-skip-browser-warning" : "69421"
        })
    })
    .then(response => {
      alert(JSON.stringify(response.data.aprovados))
    })
    .catch(error => console.error(error));
}
const handleUpdateStatus = () => {
  let updateStatus = {
    status: status,
  }
    axios.put(`${apiSolicitations}/${route.params.id}`, updateStatus, {
      method: "put",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69421",
      }),
    });
    return Alert.alert("Usuário", "Atualizado com sucesso!");
}
  return (
    <ScrollView flex={1} w="100%" h="100%" bg="lightBlue.400">
      <Heading w="100%" my="3" color={"light.100"} textAlign={"center"}>
        Informações de Solicitação
      </Heading>
    <Divider  />
      <VStack w="100%" bg="lightBlue.400" rounded="lg" h="100%">
        <Container
          my="2"
          mx="3"
          w="100%"
          _text={{
            color: "light.100",
          }}
        >
          <InputInfoUser
            infoLabel="Serviço"
            infoValue={route?.params?.service}
          />
          <InputInfoUser
            infoLabel="Nome"
            infoValue={route?.params?.userInfo.nome}
          />
          <InputInfoUser
            infoLabel="CPF"
            infoValue={route?.params?.userInfo.cpf}
          />
          <InputInfoUser
            infoLabel="NIS"
            infoValue={route?.params?.userInfo.nis}
          />

          <InputInfoUser
            infoLabel="Data de entrada"
            infoValue={route?.params?.date}
          />
          <Text mt="3" ml="2" fontSize={"lg"} color="#fff">Status</Text>
          <HStack space={3} alignItems="center" w="100%">
          <Input
          value={status}
          onChangeText={(text) => setStatus(text)}
          w="70%"
          bg="lightBlue.500"
          placeholderTextColor={"#fff"}
          borderColor={"lightBlue.500"}
          placeholder={route?.params?.status}
          />
         <TouchableOpacity
         onPress={() => handleUpdateStatus(route.params.id)}
         >
         <FontAwesome name="edit" size={28} color="white" />
         </TouchableOpacity>
          </HStack>
            
         

          <Box w="100%" mt="6%" bg="lightBlue.400" rounded="2xl" px="3" py="2">
            <InputInfoUser
              infoLabel="Filhos"
              infoValue={
                route?.params?.userInfo.filhos?.length === "0"
                  ? "Não"
                  : `${route?.params?.userInfo.filhos?.length}`
              }
            />
            {route?.params?.userInfo.filhos?.length === 0 ? (
              "NÃO"
            ) : (
              <MyParents />
            )}
          </Box>
        </Container>
        <HStack my="4" mb="10%" space={9} alignItems="center" justifyContent={"center"} w="100%">
          <TouchableOpacity
          onPress={() => handleConfirmSolicitation()}
          >
            <FontAwesome name="check-circle" size={72} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => alert('Solicitação reprovada!')}>
            <FontAwesome name="times-circle" size={72} color="white" />
          </TouchableOpacity>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
