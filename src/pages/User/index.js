import React, { useContext, useState } from "react";
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
  Ionicons,
} from "@expo/vector-icons";
import { UserContext } from "../../contexts/UserContext";
import InputInfoUser from "../../../components/UserLayout/inputUser";
import MyParents from "../../../components/UserLayout/userParents";
import BackButton from "../../../components/BackButton";

export const User = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { users, setUsers, logged, setLogged } = useContext(UserContext);
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  var nome = logged?.nome;
  var parentsCount = logged.filhos?.length;
  var primeiro_nome = nome?.split(" ").shift();

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
        mb="3"
        bg="lightBlue.500"
        h="30%"
        alignItems="center"
        justifyContent="center"
        roundedBottom="90"
        
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

      <ScrollView w="100%" mb="4%" horizontal={false}>
        <Box alignItems="center">
          <VStack
            space={3}
            w="100%"
            rounded="md"
            justifyContent="space-around"
            alignItems="center"
          >
            <Text color="lightBlue.400" fontSize="3xl">Meu perfil</Text>

            <Container w="90%" px="6" py="6" rounded="lg"  bg="darkBlue.300">
             
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
                bg="darkBlue.300"
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
              my="7   "
              space={4}
              bg="darkBlue.300"
              rounded="md"
            >
              <Box
                pl="5"
                h="15%"
                flexDir="row"
                justifyContent="center"
                alignItems="center"
              >
                <Icon
                  as={<Octicons name="checklist" size={32} color="white" />}
                  size="xl"
                  color="white"
                />
                <Heading ml="4" color="light.100">
                  Meus benefícios
                </Heading>
              </Box>

              <Divider />
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
