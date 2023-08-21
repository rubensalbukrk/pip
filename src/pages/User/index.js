import React, { useContext, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";

import {
  Box,
  Text,
  Button,
  Center,
  VStack,
  Actionsheet,
  Avatar,
  Spacer,
  Badge,
  ScrollView,
  Heading,
  useDisclose,
  Divider,
  Container,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import Admin from "../Admin";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Feather,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { UserContext } from "../../contexts/UserContext";
import InputInfoUser from "../../../components/UserLayout/inputUser";
import MyParents from "../../../components/UserLayout/userParents";

export const User = () => {
  const { auth, setAuth, logged, setLogged } = useContext(AuthContext);
  const { users, setUsers } = useContext(UserContext);
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();

  var nome = logged?.nome;
  var primeiro_nome = nome?.split(" ").shift();

  return (
  
    <Box flex="1" w="100%" alignItems="center">
      <Box
        w="100%"
        mb="8"
        bg="darkBlue.500"
        h="30%"
        alignItems="center"
        justifyContent="center"
        roundedBottom="80"
        shadow={6}
      >
        <Box
          top="15%"
          position="absolute"
          w="90%"
          flexDir="row"
          h="10"
          justifyContent="space-between"
          alignItems="center"
        >
          <TouchableOpacity
            style={{
              opacity: 0.8,
              width: 38,
              height: 38,
            }}
            onPress={() => navigation.goBack()}
          >
            <Feather size={38} color="white" name="arrow-left-circle" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              opacity: 0.8,
              width: 38,
              height: 38,
            }}
            onPress={() => onOpen()}
          >
            <Feather size={38} color="white" name="settings" />
          </TouchableOpacity>
        </Box>

        <Box flexDir="row">
          <Avatar
            mb="2"
            mt="5"
            source={{ uri: logged.avatar }}
            size="2xl"
            shadow={6}
          />
          <Badge
            style={{ position: "absolute", right: "-5%", top: "20%" }}
            colorScheme="info"
            alignSelf="center"
            variant="subtle"
          >
            {logged?.isAdmin == true ? "Admin" : "Membro"}
          </Badge>
        </Box>

        <Text color="light.100" fontSize="2xl">
          Olá {primeiro_nome}
        </Text>
      </Box>

      <ScrollView w="100%" mb="4%" horizontal={false}>
        <Box alignItems="center">
          <VStack
            space={5}
            w="100%"
            rounded="md"
            justifyContent="space-around"
            alignItems="center"
          >
            <Text fontSize="3xl">Meu perfil</Text>

            <Divider />
            
              <Container w="90%"px="6" py="6" rounded="lg" bg="light.200">
                <InputInfoUser infoLabel="Data de inscrição" infoValue={logged.date} />
                <InputInfoUser infoLabel="Genêro" infoValue={logged.genero} />
                <InputInfoUser infoLabel="Nome Civil" infoValue={logged.nome} />
                <InputInfoUser infoLabel="Idade" infoValue={logged.idade} />
                <InputInfoUser infoLabel="Endereço" infoValue={logged.address} />
                <InputInfoUser infoLabel="CPF" infoValue={logged.cpf} />
                <InputInfoUser infoLabel="NIS" infoValue={logged.nis} />
                <InputInfoUser infoLabel="Email" infoValue={logged.email} />
                <InputInfoUser infoLabel="Celular" infoValue={logged.phone} />
                <InputInfoUser infoLabel="Membro PIP" infoValue={logged.question1 ? "SIM" : "NÃO"} />
                <InputInfoUser infoLabel="Filhos" infoValue={logged.parentsName.length}/>
                <MyParents />
              </Container>
              
           

            <Center boxSize="300" bg="indigo.500" rounded="md" shadow={3}>
              <Heading>Meus benéficios</Heading>
             
            </Center>
            <Center boxSize="300" bg="indigo.700" rounded="md" shadow={3}>
              <Heading>Histórico</Heading>
            </Center>
          </VStack>
        </Box>
      </ScrollView>

      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose} size="md">
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                fontSize="16"
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                Configurações
              </Text>
            </Box>

            {logged.isAdmin == true && (
              <Actionsheet.Item
                startIcon={
                  <MaterialIcons
                    size={32}
                    color="black"
                    name="admin-panel-settings"
                  />
                }
              >
                Painel de Administração
              </Actionsheet.Item>
            )}
            <Actionsheet.Item
              startIcon={
                <MaterialCommunityIcons
                  size={32}
                  color="black"
                  name="archive-edit"
                />
              }
            >
              Alterar dados
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={<Entypo size={32} color="black" name="remove-user" />}
            >
              Excluir minha conta
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Ionicons size={32} color="black" name="md-close-circle" />
              }
            >
              <Pressable
                style={{ width: "100%" }}
                w="100%"
                h="100%"
                onPress={() =>
                  navigation.navigate("Login") &
                  setAuth(false) &
                  setLogged(null)
                }
              >
                <Text>Sair</Text>
              </Pressable>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </Box>
  );
};
