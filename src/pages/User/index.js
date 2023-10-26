import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  Pressable,
  TouchableOpacity
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
  NativeBaseProvider,
  Container,
  Icon,
  Circle,
  CircleIcon,
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
import { api, deleteAprovado } from "../../requisitions/api";
import * as ImagePicker from "expo-image-picker";
import UserAvatar from "../../../components/UserAvatar";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUpload = `${api}/upload`;

export const User = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclose();
  const {
    users,
    setUsers,
    logged,
    avatar,
    setAvatar,
    setLogged,
    solicitations,
    setSolicitations,
    setAprovados,
    aprovados,
  } = useContext(UserContext);
  const navigation = useNavigation();

  var nome = logged?.nome;
  var parentsCount = logged.filhos?.length;
  var primeiro_nome = nome?.split(" ").shift();

  useEffect(() => (getSolicitation(), getAprovados()), []);

  if (solicitations) {
    var userSolicitations = solicitations.filter(
      (item) => String(item.cpf) === String(logged.cpf)
    );
  }

  const pickImageAsync = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!canceled) {
      const filename = assets[0].uri.substring(
        assets[0].uri.lastIndexOf("/") + 1,
        assets[0].uri.length
      );
      const extend = filename.split(".")[1];
      const formData = new FormData();
      formData.append(
        "file",
        JSON.parse(
          JSON.stringify({
            name: filename,
            uri: assets[0].uri,
            type: "image/" + extend,
          })
        )
      );
      axios
        .post(`${api}/upload`, formData, {
          headers: new Headers({
            "ngrok-skip-browser-warning": "69421",
          }),
        })
        .then(() => {
          updateUserAvatar(filename);
        })
        .then(() => {
          getUserData();
        })
        .then(() => {
          setAvatar(logged.avatar);
        });
    } else {
      alert("Você não escolheu uma imagem!");
    }
  };
  function updateUserAvatar(fileName) {
    let userUpdate = {
      ...logged,
      avatar: `${api}/files/${fileName}`,
    };
    axios.put(`${api}/users/${logged.id}`, userUpdate, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69421",
      }),
    });
  }

  function getUserData() {
    axios
      .get(`${api}/users/${logged.id}`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      .then((response) => {
        const user = response.data;
        setLogged(user);
      })
      .catch((error) => console.error(error));
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
      <Box
        flex="1"
        w="100%"
        alignItems="center"
        bg={{
          linearGradient: {
            colors: ["lightBlue.600", "lightBlue.400"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
        <Box
          w="100%"
          bg={{
            linearGradient: {
              colors: ["lightBlue.600", "lightBlue.400"],
              start: [0, 0],
              end: [1, 0],
            },
          }}
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
            shadow={6}
            justifyContent="space-between"
            alignItems="center"
          >
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("HomeApp");
              }}
            >
              <Feather name="arrow-left-circle" color="white" size={28} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                opacity: 0.8,
                width: 70,
                height: 70,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                onOpen()
              }
            >
              <Feather size={32} color="white" name="settings" />
            </TouchableOpacity>
          </Box>

          <Box bottom="10%" flexDir="row">
            <Box position="absolute" mb="2">
              <UserAvatar size="2xl" />
            </Box>

            <Badge
              style={{
                position: "absolute",
                right: "-5%",
                top: "20%",
                fontFamily: "Doppio One",
              }}
              colorScheme="info"
              alignSelf="center"
              variant="subtle"
              shadow={3}
            >
              {logged?.isAdmin == true
                ? "Admin"
                : "Membro" && logged?.isEtg == true
                ? "Estágiario"
                : "Membro" && logged?.isVolt == true
                ? "Voluntário"
                : "Membro" && logged?.isCoordCidadania == true
                ? "Coord Cidadania"
                : "Membro" && logged?.isCoordAutist == true
                ? "Coord Autistas"
                : "Membro" && logged?.isCoordMulher == true
                ? "Coord Mulher"
                : "Membro" && logged?.isCoordSaude == true
                ? "Coord Saúde"
                : "Membro" && logged?.isCoordAlimentar == true
                ? "Coord Alimentar"
                : "Membro" && logged?.isCoordProtagonista == true
                ? "Coord Protagonista"
                : "Membro" && logged?.isCoordPasse == true
                ? "Coord Passe"
                : "Membro"}
            </Badge>
            <Box left="5%" bottom="-25%" position={"abslute"}>
              <Button
                w="60"
                h="7"
                shadow={4}
                size={"xs"}
                bg="lightBlue.500"
                variant={"solid"}
                onPress={() => pickImageAsync()}
              >
                <Text
                  fontSize="10"
                  textDecorationLine={"underline"}
                  color="light.100"
                  fontFamily="Doppio One"
                >
                  Alterar
                </Text>
              </Button>
              <Text
                color="light.100"
                mt="4%"
                shadow={6}
                fontSize="2xl"
                fontFamily="Doppio One"
              >
                Olá {primeiro_nome}
              </Text>
            </Box>
          </Box>
        </Box>

        <ScrollView w="100%" horizontal={false} bg="lightBlue.400">
          <Box
            alignItems="center"
            bg={{
              linearGradient: {
                colors: ["lightBlue.600", "lightBlue.400"],
                start: [0, 0],
                end: [1, 0],
              },
            }}
          >
         
              <Container
                w="90%"
                mb="10%"
                rounded="lg"
              >
                <Box
                  h="30"
                  flexDir="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon
                    as={
                      <MaterialIcons
                        name="info-outline"
                        size={32}
                        color="white"
                      />
                    }
                    size="xl"
                    color="white"
                  />
                  <Heading ml="2" color="light.100" fontFamily="Doppio One">
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
                <InputInfoUser
                  infoLabel="Endereço"
                  infoValue={logged.address}
                />
                <InputInfoUser infoLabel="Bairro" infoValue={logged.bairro} />

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
                  
                  rounded="2xl"
                  px="3"
                  py="2"
                >
                  <Box w="70px">
                    <InputInfoUser
                      infoLabel="Filhos"
                      infoValue={
                        logged.filhos?.length === "0"
                          ? "Não"
                          : `${logged.filhos?.length}`
                      }
                    />
                  </Box>

                  {logged?.filhos?.length === 0
                    ? "NÃO"
                    : logged?.filhos?.map((item) => {
                        return (
                          <MyParents
                            nome={item.nome}
                            cpf={item.cpf}
                            idade={item.idade}
                          />
                        );
                      })}
                </Box>
              </Container>
            
          </Box>
        </ScrollView>

        <Center>
          <Actionsheet isOpen={isOpen} onClose={onClose} size="100%">
            <Actionsheet.Content bg={"rgba(0, 173, 255, 1)"}>
              <Box w="100%" borderTopRadius={"xl"} bg={"rgba(255,255,255, 0.25)"} h={60} px={4} justifyContent="center">
                <Text
                  fontSize="2xl"
                  color="light.100"
                  _dark={{
                    color: "light.100",
                  }}
                >
                  Menu
                </Text>
              </Box>

              {logged?.isCoordAutist == true && (
                <Actionsheet.Item
                bg={"rgba(255,255,255, 0.25)"}
                  startIcon={
                    <MaterialIcons
                      size={32}
                      color="white"
                      name="admin-panel-settings"
                    />
                  }
                >
                  <Pressable
                    style={{ width: "100%" }}
                    w="100%"
                    h="100%"
                    onPress={() => navigation.navigate("PageCoordenador", { title: 'Coordenação do Autista' })}
                  >
                    <Text fontSize="xl" color="light.100">Coordenação dos Autistas</Text>
                  </Pressable>
                </Actionsheet.Item>
              )}
              {logged?.isCoordMulher == true && (
                <Actionsheet.Item
                bg={"rgba(255,255,255, 0.25)"}
                  startIcon={
                    <MaterialIcons
                      size={32}
                      color="white"
                      name="admin-panel-settings"
                    />
                  }
                >
                  <Pressable
                    style={{ width: "100%" }}
                    w="100%"
                    h="100%"
                    onPress={() => navigation.navigate("PageCoordenador", { title: 'Coordenação da Mulher' })}
                  >
                    <Text fontSize="xl" color="light.100">Coordenação da Mulher</Text>
                  </Pressable>
                </Actionsheet.Item>
              )}
              {logged?.isCoordSaude == true && (
                <Actionsheet.Item
                bg={"rgba(255,255,255, 0.25)"}
                  startIcon={
                    <MaterialIcons
                      size={32}
                      color="white"
                      name="admin-panel-settings"
                    />
                  }
                >
                  <Pressable
                    style={{ width: "100%" }}
                    w="100%"
                    h="100%"
                    onPress={() => navigation.navigate("PageCoordenador", { title: 'Coordenação da Saúde' })}
                  >
                    <Text fontSize="xl" color="light.100">Coordenação da Saúde</Text>
                  </Pressable>
                </Actionsheet.Item>
              )}
              {logged?.isCoordAlimentar == true && (
                <Actionsheet.Item
                bg={"rgba(255,255,255, 0.25)"}
                  startIcon={
                    <MaterialIcons
                      size={32}
                      color="white"
                      name="admin-panel-settings"
                    />
                  }
                >
                  <Pressable
                    style={{ width: "100%" }}
                    w="100%"
                    h="100%"
                    onPress={() => navigation.navigate("PageCoordenador", { title: 'Coordenação da Alimentação' })}
                  >
                    <Text fontSize="xl" color="light.100">Coordenação da Alimentação</Text>
                  </Pressable>
                </Actionsheet.Item>
              )}
              {logged?.isCoordCidadania == true && (
                <Actionsheet.Item
                bg={"rgba(255,255,255, 0.25)"}
                  startIcon={
                    <MaterialIcons
                      size={32}
                      color="white"
                      name="admin-panel-settings"
                    />
                  }
                >
                  <Pressable
                    style={{ width: "100%" }}
                    w="100%"
                    h="100%"
                    onPress={() => navigation.navigate("PageCoordenador", { title: 'Coordenação da Cidadania' })}
                  >
                    <Text fontSize="xl" color="light.100">Coordenação da Cidadania</Text>
                  </Pressable>
                </Actionsheet.Item>
              )}
              {logged?.isCoordProtagonista == true && (
                <Actionsheet.Item
                bg={"rgba(255,255,255, 0.25)"}
                  startIcon={
                    <MaterialIcons
                      size={32}
                      color="white"
                      name="admin-panel-settings"
                    />
                  }
                >
                  <Pressable
                    style={{ width: "100%" }}
                    w="100%"
                    h="100%"
                    onPress={() => navigation.navigate("PageCoordenador", { title: 'Coordenação Protagonistas' })}
                  >
                    <Text fontSize="xl" color="light.100">Coordenação Protagonistas</Text>
                  </Pressable>
                </Actionsheet.Item>
              )}
              {logged?.isCoordPasse == true && (
                <Actionsheet.Item
                bg={"rgba(255,255,255, 0.25)"}
                  startIcon={
                    <MaterialIcons
                      size={32}
                      color="white"
                      name="admin-panel-settings"
                    />
                  }
                >
                  <Pressable
                    style={{ width: "100%" }}
                    w="100%"
                    h="100%"
                    onPress={() => navigation.navigate("PageCoordenador", { title: 'Coordenação do Passe Livre' })}
                  >
                    <Text fontSize="xl" color="light.100">Coordenação do Passe Livre</Text>
                  </Pressable>
                </Actionsheet.Item>
              )}

              {logged.isAdmin == true && (
                <Actionsheet.Item 
                  bg={"rgba(255,255,255, 0.25)"}
                  startIcon={
                    <MaterialIcons
                      size={32}
                      color="white"
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
                    <Text fontSize="xl" color="light.100">Painel de Administração</Text>
                  </Pressable>
                </Actionsheet.Item>
              )}
              <Actionsheet.Item bg={"rgba(255,255,255, 0.25)"}
                startIcon={
                  <MaterialCommunityIcons
                    size={32}
                    color="white"
                    name="archive-edit"
                  />
                }
              >
                <Text fontSize="xl" color="light.100">Alterar dados</Text>
              </Actionsheet.Item>

              <Actionsheet.Item borderBottomRadius={"xl"} bg={"rgba(255,255,255, 0.25)"}
                startIcon={
                  <Ionicons size={32} color="white" name="md-close-circle" />
                }
              >
                <Pressable
                  style={{ width: "100%" }}
                  w="100%"
                  h="100%"
                  onPress={() =>
                    navigation.navigate("Login") &
                    setAuth(false) &
                    setLogged([]) & AsyncStorage.clear()
                    
                  }
                >
                  <Text fontSize="xl" color="light.100">Sair</Text>
                </Pressable>
              </Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
};
