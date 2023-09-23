import React, { useState, useContext} from "react";
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
  VStack,
  HStack,
  Switch,
  Heading,
  Divider,
  ScrollView,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../../components/BackButton";
import MyParents from "../../../../components/UserLayout/userParents";

export default function EditUser({ route }) {
  const { logged } = useContext(UserContext);
  const [autista, setAutista] = useState(route?.params?.isAutist);
  const [voluntario, setVoluntario] = useState(route?.params?.isVolt);
  const [estagiario, setEstagiario] = useState(route?.params?.isEtg);
  const [coordena, setCoordenar] = useState(route?.params?.isCoord);
  const [nome, setNome] = useState(route?.params?.nome);
  const [avatar, setAvatar] = useState(route?.params?.avatar);
  const [idade, setIdade] = useState(route?.params?.idade);
  const [address, setAddress] = useState(route?.params?.address);
  const [cpf, setCpf] = useState(route?.params?.cpf);
  const [nis, setNis] = useState(route?.params?.nis);
  const [parents, setParents] = useState(route?.params?.filhos);
  const [phone, setPhone] = useState(route?.params?.phone);
  const [email, setEmail] = useState(route?.params?.email);
  const [member, setMember] = useState(route?.params?.question1);
  const [opnion, setQuestion] = useState(route?.params?.question1);
  const [pass, setPass] = useState(route?.params?.password);
  const navigation = useNavigation();


  
  let UserUpdate = {
    isVolt: voluntario,
    isEtg: estagiario,
    isCoord: coordena,
    isAutist: autista,
    nome: nome,
    idade: idade,
    avatar: avatar,
    address: address,
    cpf: cpf,
    phone: phone,
    email: email,
    filhos: parents,
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
    return Alert.alert("Usuário", "Atualizado com sucesso!");
  }

  const toggleEstagio = () => {
    setEstagiario((previousState) => !previousState);
  };
  const toggleVoluntario = () => {
    setVoluntario((previousState) => !previousState);
  };
  const toggleCoordenador = () => {
    setCoordenar((previousState) => !previousState);
  };
  const toggleAutista = () => {
    setAutista((previousState) => !previousState);
  };
  return (
    <Box
      flex={1}
      flexBasis={0}
      flexGrow={"20"}
      alignItems={"center"}
      justifyContent={"center"}
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
          bg="lightBlue.500"
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
            w="90%"
            h="100px"
            space={2}
            my="1%"
            rounded="xl"
            py="5"
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
                onToggle={() => {toggleEstagio()}}
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
            <VStack h="100%" my="4" alignItems="center" space={2}>
              <Text color="light.100" fontSize="xs">
                Coordenador
              </Text>
              <Switch
                value={coordena}
                onToggle={toggleCoordenador}
                colorScheme="danger"
              />
            </VStack>
          </HStack>
          <VStack
            w="80%"
            space={4}
            my="5%"
            px="5"
            py="7"
            bg="darkBlue.300"
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

            <Text color="white">Filhos: </Text>
            <Input
              variant="filled"
              style={{ color: "light.100" }}
              size="xl"
              value={parents}
              onChangeText={(text) => setParents(text)}
              placeholder={`${parents ? parents.length : ""}`}
              placeholderTextColor="#000"
            />
            {parents ? <MyParents /> : null }
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
            bg="darkBlue.400"
            onPress={() => {
              updateUser() && navigation.goBack()
            }}
          >
            SALVAR
          </Button>
        </Center>
      </ScrollView>
    </Box>
  );
}
