import React, { useContext, useState } from "react";

import {
  Box,
  Heading,
  Input,
  Center,
  Text,
  Divider,
  Button,
  ScrollView,
  FlatList,
  VStack,
  HStack,
} from "native-base";
import { UserContext } from "../../contexts/UserContext";
import { TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import BackButton from "../../../components/BackButton";
import { deleteSolicitation, deleteAprovado } from "../../requisitions/api";
import { useNavigation } from "@react-navigation/native";


function ListSolicitations(props) {
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
        onPress={() => deleteSolicitation(props.item.id)}
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

export default function PageCoordenador() {
  const { solicitations, users, logged, aprovados } = useContext(UserContext);
  const [filtred, setFiltred] = useState()
  const navigation = useNavigation();
  if (solicitations) {
    const autistSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Autistas"
    );
    const mulherSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Mulher"
    );
    const cidadaniaSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Cidadania"
    );
    const saudeSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Saúde Mental"
    );
    const protagonistaSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Protagonistas"
    );
    const alimentarSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Seguro Alimentação"
    );
    const passeSolicitations = solicitations.filter(
      (item) => String(item.pasta) === "Passe Livre"
    );
  var IsCidadania = () => {
  return (
    <Box>
      {
      cidadaniaSolicitations.map(item => {
        const {service, nome, status, date} = item
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
        )
      })
      }
    </Box>
  )
}
var IsAutist = () => {
  return (
    <Box>
      {
      autistSolicitations.map(item => {
        const {service, nome, status, date} = item
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
      })
      }
    </Box>
  )
}
var IsMulher = () => {
  return (
    <Box>
      {
      mulherSolicitations.map(item => {
        const {service, nome, status, date} = item
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
        )
      })
      }
    </Box>
  )
}
var IsSaude = () => {
  return (
    <Box>
      {
      saudeSolicitations.map(item => {
        const {service, nome, status, date} = item
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
        )
      })
      }
    </Box>
  )
}
var IsProtagonista = () => {
  return (
    <Box>
      {
      protagonistaSolicitations.map(item => {
        const {service, nome, status, date} = item
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
        )
      })
      }
    </Box>
  )
}
var IsAlimentar = () => {
  return (
    <Box>
      {
      alimentarSolicitations.map(item => {
        const {service, nome, status, date} = item
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
        )
      })
      }
    </Box>
  )
}
var IsPasse = () => {
  return (
    <Box>
      {
      passeSolicitations.map(item => {
        const {service, nome, status, date} = item
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
        )
      })
      }
    </Box>
  )
}
}


  return (
    <ScrollView flex={1} horizontal={false} px="3" py="3" w="100%" bg="lightBlue.400">
      <Center w="100%">
        <Box position="absolute" top="2.5%" left="-3%">
          <BackButton />
        </Box>

        <Heading mt="9%" color="light.100" alignSelf="center">
          Coordenação
        </Heading>
        <Divider mx="3" my="3" alignSelf="center" w="80%" />
        <Box
          w="97%"
          h="400px"
          rounded="xl"
          shadow={2}
          py="3"
          px="4"
          bg="darkBlue.400"
        >
          <Heading alignSelf="left" color="light.100">
            SOLICITAÇÕES
          </Heading>
          <Divider w="100%" />
        <ScrollView w="100%" horizontal={false} rounded="xl" bg="darkBlue.400">
        {logged.isCoordAutist ? <IsAutist /> : null }
        {logged.isCoordMulher ? <IsMulher /> : null }
        {logged.isCoordSaude ? <IsSaude /> : null }
        {logged.isCoordAlimentar ? <IsAlimentar /> : null }
        {logged.isCoordCidadania ? <IsCidadania /> : null }
        {logged.isCoordProtagonista ? <IsProtagonista /> : null }
        {logged.isCoordPasse ? <IsPasse /> : null }
        </ScrollView>
        </Box>

        <Box
          w="95%"
          h="300px"
          bg="lightBlue.300"
          my="4"
          rounded="xl"
          shadow={5}
          py="3"
          px="4"
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
        renderItem={({ item, index}) => {
          let userInfo = users.find(user => String(user.cpf) === String(item.cpf))
          return (
            <Center my="3" w="100%">
              <HStack w="100%" h="120px">
                <VStack bg="lightBlue.400" alignSelf="center" rounded="xl" py="5%" px="2" w="100%">
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
      </Center>
    </ScrollView>
  );
}
