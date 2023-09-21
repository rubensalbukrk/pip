import React, { useContext, useState, useEffect} from "react";
import axios from "axios";
import {
  Pressable,
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
} from "react-native";
import {
  Box,
  Text,
  Button,
  Center,
  VStack,
  FlatList,
  HStack,
  Actionsheet,
  Avatar,
  Badge,
  ScrollView,
  Heading,
  useDisclose,
  Divider,
  Container,
  Icon,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Feather,
  Entypo,
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { UserContext } from "../../contexts/UserContext";
import InputInfoUser from "../../../components/UserLayout/inputUser";
import MyParents from "../../../components/UserLayout/userParents";
import BackButton from "../../../components/BackButton";
import { api } from "../../requisitions/api";

export const User = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { users, setUsers, logged, setLogged, solicitations, setSolicitations, setAprovados, aprovados } = useContext(UserContext);
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  var nome = logged?.nome;
  var parentsCount = logged.filhos?.length;
  var primeiro_nome = nome?.split(" ").shift();
  useEffect(() => (
    getSolicitation(),
    getAprovados()
  ),[])

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

  const openSheetIOS = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          `${logged?.isAdmin == true ? "Painel da Administração" : "Opções" 
          &&
          logged?.isCoord == true ? "Painel da Coodernação" : "Opções"
          }`,
          "Alterar dados",
          "Sair",
        ],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 2,
        userInterfaceStyle: "light",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          {
            logged?.isAdmin == true ? navigation.navigate("Admin") : null;
          }
          {
            logged?.isCoord == true ? navigation.navigate("Admin") : null;
          }
        } else if (buttonIndex === 1) {
          alert("Alterar dados");
        } else if (buttonIndex === 2) {
          navigation.navigate("Welcome");
          setAuth(false);
          setLogged(false);
        }
      }
    );

  return (
    <Box flex="1" w="100%" bg="light.100" alignItems="center">
      <Box
        w="100%"
        bg="lightBlue.400"
        h="30%"
        alignItems="center"
        justifyContent="center"
        
      >
        <Box
          top="15%"
          position="absolute"
          w="100%"
          flexDir="row"
          h="10"
          justifyContent="space-between"
          alignItems="center"
        >
          <BackButton />

          <TouchableOpacity
            style={{
              opacity: 0.8,
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => (Platform.OS === "ios" ? openSheetIOS() : onOpen())}
          >
            <Feather size={32} color="white" name="settings" />
          </TouchableOpacity>
        </Box>

        <Box flexDir="row">
          <Avatar
            mb="2"
            mt="5"
            source={{ uri: logged.avatar }}
            size="2xl"
          />
          <Badge
            style={{ position: "absolute", right: "-5%", top: "20%" }}
            colorScheme="info"
            alignSelf="center"
            variant="subtle"
          >
            {logged?.isAdmin == true
              ? "Admin"
              : "Membro" && logged?.isEtg == true
              ? "Estágiario"
              : "Membro" && logged?.isVolt == true
              ? "Voluntário"
              : "Membro" && logged?.isCoord == true
              ? "Coordenador"
              : "Membro"}
          </Badge>
        </Box>

        <Text color="light.100" fontSize="2xl">
          Olá {primeiro_nome}
        </Text>
      </Box>

      <ScrollView w="100%" horizontal={false} bg="lightBlue.400">
        <Box alignItems="center">
          <VStack
            space={3}
            w="100%"
            rounded="md"
            justifyContent="space-around"
            alignItems="center"
          >
    
            <Container w="90%" px="4" py="3" rounded="lg"  bg="lightBlue.500">
            <Box
                h="30"
                flexDir="row"
                justifyContent="center"
                alignItems="center"
              >
                <Icon
                  as={<MaterialIcons name="info-outline" size={32} color="white" />}
                  size="xl"
                  color="white"
                />
                <Heading ml="4" color="light.100">
                  Meus dados
                </Heading>
              </Box>
              <Divider />
              <InputInfoUser
                infoLabel="Data de inscrição"
                infoValue={logged.date}
              />
              <InputInfoUser infoLabel="Nome Civil" infoValue={logged.nome} />
              <InputInfoUser infoLabel="Idade" infoValue={logged.idade} />
              <InputInfoUser infoLabel="Endereço" infoValue={logged.address} />
              <InputInfoUser infoLabel="CPF" infoValue={logged.cpf} />
              <InputInfoUser infoLabel="NIS" infoValue={logged.nis} />
              <InputInfoUser infoLabel="Email" infoValue={logged.email} />
              <InputInfoUser infoLabel="Celular" infoValue={logged?.phone} />
              <InputInfoUser
                infoLabel="Membro PIP"
                infoValue={logged.question1 ? "SIM" : "NÃO"}
              />
              <Box
                w="100%"
                mt="6%"
                bg="lightBlue.500"
                rounded="2xl"
                px="3"
                py="2"
              >
                <InputInfoUser
                  infoLabel="Filhos"
                  infoValue={
                    logged.filhos?.length === "0"
                      ? "Não"
                      : `${logged.filhos?.length}`
                  }
                />
                {logged?.filhos?.length === 0 ? "NÃO" : <MyParents />}
              </Box>
            </Container>

            <Container
              w="80%"
              h="300"
            py="3"
              mb="20"
              space={4}
              bg="rgba(200, 255, 254, 0.15)"
              rounded="md"
            >
              <Box
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
                <Heading ml="3" color="light.100">
                  Meus benefícios
                </Heading>
              </Box>

              <Divider alignSelf="center" w="90%" />

              <FlatList
        data={solicitations}
        horizontal={false}
        keyExtractor={item => item.id}
        style={{
          flex: 1,
          width: "100%",
          height: "40%",
          borderRadius: 40,
        }}
        my="3"
        renderItem={({ item, index}) => {
          const userSolicitations = solicitations.find(user => String(user.cpf) === String(logged.cpf))
          return (
            <Center my="3" w="100%">
              <HStack w="100%" justifyContent="center" h="100px">
                <VStack bg="lightBlue.500" rounded="xl" py="5%" px="2" w="85%">
    
                  <Text color={"light.100"}>Serviço: {userSolicitations?.service} </Text>
                  <Text color={"light.100"}>STATUS: {userSolicitations?.status} </Text>
                  <Text color={"light.100"}>Data: {userSolicitations?.date} </Text>
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
            </Container>
          </VStack>
        </Box>
      </ScrollView>

      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose} size="100%">
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
                <Pressable
                  style={{ width: "100%" }}
                  w="100%"
                  h="100%"
                  onPress={() => navigation.navigate("Admin")}
                >
                  <Text>Painel de Administração</Text>
                </Pressable>
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
