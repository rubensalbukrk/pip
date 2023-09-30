import React, { useState, useContext } from "react";
import axios from "axios";
import { api } from "../../../requisitions/api";
import { UserContext } from "../../../contexts/UserContext";
import * as Animatable from "react-native-animatable";
import {
  Box,
  Text,
  Input,
  Icon,
  Button,
  Avatar,
  Center,
  Container,
  VStack,
  HStack,
  Switch,
  Heading,
  Divider,
  CheckIcon,
  ScrollView,
  Select,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../../components/BackButton";
import MyParents from "../../../../components/UserLayout/userParents";

const hoje = new Date()
const data = hoje.getDate().toString().padStart(2,0) + "/" + String(hoje.getMonth() + 1).padStart(2,'0') + "/" + hoje.getFullYear() + ` as ` + hoje.toLocaleTimeString()

export default function EditUser({ route }) {

  const { logged } = useContext(UserContext);
  const [formData, setData] = React.useState({
    date: data,
  });
  const [dataFilho, setDataFilho] = React.useState({});
  const [voluntario, setVoluntario] = useState(route?.params?.isVolt);
  const [estagiario, setEstagiario] = useState(route?.params?.isEtg);
  const [isCoord, setIsCoord] = React.useState("");
  const [isCoordAutist, setIsCoordAutist] = useState(
    route?.params?.isCoordAutist
  );
  const [isCoordMulher, setIsCoordMulher] = useState(
    route?.params?.isCoordMulher
  );
  const [isCoordCidadania, setIsCoordCidadania] = useState(
    route?.params?.isCoordCidadania
  );
  const [isCoordAlimentar, setIsCoordAlimentar] = useState(
    route?.params?.isCoordAlimentar
  );
  const [isCoordSaude, setIsCoordSaude] = useState(route?.params?.isCoordSaude);
  const [isCoordProtagonista, setIsCoordProtagonista] = useState(
    route?.params?.isCoordProtagonista
  );
  const [isCoordPasse, setIsCoordPasse] = useState(route?.params?.isCoordPasse);

  const [autista, setAutista] = useState(route?.params?.isAutist);
  const [nome, setNome] = useState(route?.params?.nome);
  const [avatar, setAvatar] = useState(route?.params?.avatar);
  const [idade, setIdade] = useState(route?.params?.idade);
  const [address, setAddress] = useState(route?.params?.address);
  const [cpf, setCpf] = useState(route?.params?.cpf);
  const [nis, setNis] = useState(route?.params?.nis);
  const [filho, setFilhos] = useState(route?.params?.filhos);
  const[addFilho, setAddFilhos] = useState({})
  const [phone, setPhone] = useState(route?.params?.phone);
  const [email, setEmail] = useState(route?.params?.email);
  const [member, setMember] = useState(route?.params?.question1);
  const [opnion, setQuestion] = useState(route?.params?.question1);
  const [pass, setPass] = useState(route?.params?.password);
  const navigation = useNavigation();

  let UserUpdate = {
    isVolt: voluntario,
    isEtg: estagiario,
    isCoordMulher: isCoordMulher,
    isCoordAutist: isCoordAutist,
    isCoordSaude: isCoordSaude,
    isCoordAlimentar: isCoordAlimentar,
    isCoordPasse: isCoordPasse,
    isCoordCidadania: isCoordCidadania,
    isCoordProtagonista: isCoordProtagonista,
    isAutist: autista,
    nome: nome,
    idade: idade,
    avatar: avatar,
    address: address,
    cpf: cpf,
    phone: phone,
    email: email,
    filho: filho,
    question1: member,
    question2: opnion,
    password: pass,
  };

  function updateUser() {
    axios.put(`${api}/users/${route.params.id}`, UserUpdate, {
      method: "put",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69421",
      }),
    });
    return Alert.alert("Atualização", "O usuário foi alterado!");
  }
  const UserFilhos = () => {

    return (
      <Box>
        <Text color="light.100">Filhos</Text>
        { filho?.map((item) => {
          return (
            <Box bg="darkBlue.500" rounded="2xl" py="2" my="2" px="2" space={2}>
            <Text>Nome: {item.nome}</Text>
            <Text>CPF: {item.cpf}</Text>
            <Text>Idade: {item.idade}</Text>
            </Box>
          )
        })}

      </Box>
    )
  }
  function addFilhos() {
    filho?.push({
      nome: dataFilho.nome,
      idade: dataFilho.idade,
      cpf: dataFilho.cpf,
    });
    setFilhos(filho)
    alert('Adicionado')
  }

  const toggleEstagio = () => {
    setEstagiario((previousState) => !previousState);
  };
  const toggleVoluntario = () => {
    setVoluntario((previousState) => !previousState);
  };
  const toggleAutista = () => {
    setAutista((previousState) => !previousState);
  };
  const toggleCidadania = () => {
    setIsCoordCidadania((previousState) => !previousState);
  };
  const toggleAutist = () => {
    setIsCoordAutist((previousState) => !previousState);
  };
  const toggleMulher = () => {
    setIsCoordMulher((previousState) => !previousState);
  };
  const toggleSaude = () => {
    setIsCoordSaude((previousState) => !previousState);
  };
  const toggleAlimentar = () => {
    setIsCoordAlimentar((previousState) => !previousState);
  };
  const togglePasse = () => {
    setIsCoordPasse((previousState) => !previousState);
  };
  const toggleProtagonista = () => {
    setIsCoordProtagonista((previousState) => !previousState);
  };

  return (
    <Box
      flex={1}
      flexBasis={0}
      flexGrow={"20"}
      alignItems={"center"}
      justifyContent={"center"}
      bg="darkBlue.400"
    >
      <Animatable.View
        style={{ width: "100%" }}
        animation="slideInDown"
        duration={1000}
        delay={200}
      >
        <Box
          w="100%"
          h="100px"
          bg="darkBlue.500"
          shadow={1}
          alignItems="center"
          justifyContent="center"
          roundedBottom="20"
        >
          <Box bottom="-2%" left="-1%" position="absolute">
            <BackButton />
          </Box>

          <Text fontSize="2xl" marginTop="15%" color="white">
            ALTERAR DADOS
          </Text>
          <Avatar
            size={"lg"}
            shadow={2}
            bg={"light.200"}
            source={{ uri: route?.params?.avatar }}
          />
        </Box>
      </Animatable.View>
      <ScrollView flex={1} w="100%">
        <Center py="10%">
          <HStack
            w="60%"
            h="100px"
            space={2}
            my="1%"
            rounded="xl"
            py="5"
            shadow={6}
            alignItems="center"
            justifyContent="space-evenly"
            bg="darkBlue.400"
          >
            <VStack h="100%" my="4" alignItems="center" space={2}>
              <Text color="light.100" fontSize="xs">
                Estagiário
              </Text>
              <Switch
                value={estagiario}
                onToggle={() => {
                  toggleEstagio();
                }}
                colorScheme="darkBlue"
              />
            </VStack>
            <VStack h="100%" my="4" alignItems="center" space={2}>
              <Text color="light.100" fontSize="xs">
                Voluntário
              </Text>
              <Switch
                value={voluntario}
                onToggle={toggleVoluntario}
                colorScheme="darkBlue"
              />
            </VStack>
          </HStack>
          <VStack
            py="2"
            px="4"
            h="200px"
            w="80%"
            my="3"
            bg="darkBlue.400"
            shadow={8}
            rounded="2xl"
            alignItems="left"
          >
            <Heading color="light.100">Coordenador</Heading>
            <Divider w="100%" />

            <HStack
              w="100%"
              space={3}
              alignItems="left"
              justifyContent="center"
            >
              <VStack h="14px" my="4" alignItems="center" space={2}>
                <Text color="light.100" fontSize="xs">
                  Autistas
                </Text>
                <Switch
                  size="sm"
                  value={isCoordAutist}
                  onToggle={toggleAutist}
                  colorScheme="darkBlue"
                />
              </VStack>

              <VStack h="14px" my="4" alignItems="center" space={2}>
                <Text color="light.100" fontSize="xs">
                  Mulher
                </Text>
                <Switch
                  size="sm"
                  value={isCoordMulher}
                  onToggle={toggleMulher}
                  colorScheme="darkBlue"
                />
              </VStack>

              <VStack h="14px" my="4" alignItems="center" space={2}>
                <Text color="light.100" fontSize="xs">
                  Protagonistas
                </Text>
                <Switch
                  size="sm"
                  value={isCoordProtagonista}
                  onToggle={toggleProtagonista}
                  colorScheme="darkBlue"
                />
              </VStack>
            </HStack>

            <HStack
              w="100%"
              my="5"
              space={3}
              alignItems="center"
              justifyContent="center"
            >
              <VStack h="14px" my="4" alignItems="center" space={2}>
                <Text color="light.100" fontSize="xs">
                  Passe Livre
                </Text>
                <Switch
                  size="sm"
                  value={isCoordPasse}
                  onToggle={togglePasse}
                  colorScheme="darkBlue"
                />
              </VStack>
              <VStack h="14px" my="4" alignItems="center" space={2}>
                <Text color="light.100" fontSize="xs">
                  Alimentar
                </Text>
                <Switch
                  size="sm"
                  value={isCoordAlimentar}
                  onToggle={toggleAlimentar}
                  colorScheme="darkBlue"
                />
              </VStack>
              <VStack h="14px" my="4" alignItems="center" space={2}>
                <Text color="light.100" fontSize="xs">
                  Saúde
                </Text>
                <Switch
                  size="sm"
                  value={isCoordSaude}
                  onToggle={toggleSaude}
                  colorScheme="darkBlue"
                />
              </VStack>
              <VStack h="14px" my="4" alignItems="center" space={2}>
                <Text color="light.100" fontSize="xs">
                  Cidadania
                </Text>
                <Switch
                  size="sm"
                  value={isCoordCidadania}
                  onToggle={toggleCidadania}
                  colorScheme="darkBlue"
                />
              </VStack>
            </HStack>
          </VStack>

          <VStack
            w="80%"
            space={4}
            my="5%"
            px="5"
            py="7"
            shadow={8}
            bg="darkBlue.400"
            rounded="xl"
          >
            <Text color="white">Nome</Text>
            <Input
              variant="filled"
              style={{ color: "light.100" }}
              size="xl"
              value={nome}
              onChangeText={(text) => setNome(text)}
              placeholder={`${nome ? nome : ""}`}
              placeholderTextColor="#000"
            />

            <Text color="white">Idade</Text>
            <Input
              variant="filled"
              style={{ color: "light.100" }}
              size="xl"
              value={idade}
              onChangeText={(text) => setIdade(text)}
              placeholder={`${idade ? idade : ""}`}
              placeholderTextColor="#000"
            />

            <Text color="white">Endereço</Text>
            <Input
              variant="filled"
              style={{ color: "light.100" }}
              size="xl"
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder={`${idade ? idade : ""}`}
              placeholderTextColor="000"
            />

            <Text color="white">NIS</Text>
            <Input
              variant="filled"
              style={{ color: "light.100" }}
              size="xl"
              value={nis}
              onChangeText={(text) => setNis(text)}
              placeholder={`${nis ? nis : ""}`}
              placeholderTextColor="#000"
            />

            <Text color="white">CPF</Text>
            <Input
              variant="filled"
              style={{ color: "light.100" }}
              size="xl"
              value={cpf}
              onChangeText={(text) => setCpf(text)}
              placeholder={`${idade ? idade : ""}`}
              placeholderTextColor="#000"
            />

            {route?.params?.filhos?.length === 0 ? "NÃO" : <UserFilhos />}
            <Container
              space={3}
              px="3"
              py="2"
              bg="darkBlue.500"
              w="80%"
              rounded="2xl"
            >
              <Text color="light.100">Adicionar filho</Text>
              <Text>Nome</Text>
              <Input
                onChangeText={(value) =>
                  setDataFilho({ ...dataFilho, nome: value })
                }
              />
           
              <Text>CPF</Text>
              <Input
                onChangeText={(value) =>
                  setDataFilho({ ...dataFilho, cpf: value })
                }
              />
              <HStack justifyContent="space-between" w="100%" alignItems="center">
                <VStack w="50%" mb="2">
                  <Text>Idade</Text>
                <Input
                w="30%"
                m
                  onChangeText={(value) =>
                    setDataFilho({ ...dataFilho, idade: value })
                  }
                />
                </VStack>
              <Button colorScheme="darkBlue" size="sm" alignSelf="center" onPress={() => addFilhos()}>
                Adicionar
              </Button>
              </HStack>
            </Container>
            <Box w="20%" h="50" justifyContent={"start"}>
              <Text mb="10%" color="light.100" fontSize="xs">
                Autista
              </Text>
              <Switch
                value={autista}
                onToggle={toggleAutista}
                colorScheme="darkBlue"
              />
            </Box>

            <Text color="white">Contato</Text>
            <Input
              variant="filled"
              style={{ color: "light.100" }}
              size="xl"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder={`${phone ? phone : ""}`}
              placeholderTextColor="#000"
            />

            <Text color="white">Email</Text>
            <Input
              variant="filled"
              style={{ color: "light.100" }}
              size="xl"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder={`${email ? email : ""}`}
              placeholderTextColor="#000"
            />

            <Text color="white" bold>
              Senha
            </Text>
            <Input
              variant="filled"
              style={{ color: "light.100" }}
              size="xl"
              value={pass}
              onChangeText={(text) => setPass(text)}
              placeholder={`${pass ? pass : ""}`}
              placeholderTextColor="#000"
            />
          </VStack>

          <Button
            mb="15"
            w="70%"
            shadow={5}
            rounded="2xl"
            colorScheme={"darkBlue"}
            onPress={() => {
              updateUser() && navigation.goBack();
            }}
          >
            SALVAR
          </Button>
        </Center>
      </ScrollView>
    </Box>
  );
}
