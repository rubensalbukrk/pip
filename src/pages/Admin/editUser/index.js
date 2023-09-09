<<<<<<< HEAD
import React, { useState, useContext, useEffect } from "react";
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
import axios from "axios";
import BackButton from "../../../../components/BackButton";
import { api } from "../../../requisitions/api";
import { UserContext } from "../../../contexts/UserContext";

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
  const [parents, setParents] = useState([
    { id: 1, nome: String },
    { id: 2, nome: String },
  ]);
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
    parentsName: parents,
    question1: member,
    question2: opnion,
    password: pass,
  };

  function updateUser() {
    axios.put(`${api}/${route.params.id}`, UserUpdate, {
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
          shadow={3}
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
            source={{ uri: avatar }}
          >
            <AntDesign name="user" size={42} color="black" />
          </Avatar>
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
                onValueChange={toggleEstagio}
                colorScheme="darkBlue"
              />
            </VStack>
            <VStack h="100%" my="4" alignItems="center" space={2}>
              <Text color="light.100" fontSize="xs">
                Voluntário
              </Text>
              <Switch
                value={voluntario}
                onValueChange={toggleVoluntario}
                colorScheme="darkBlue"
              />
            </VStack>
            <VStack h="100%" my="4" alignItems="center" space={2}>
              <Text color="light.100" fontSize="xs">
                Coordenador
              </Text>
              <Switch
                value={coordena}
                onValueChange={toggleCoordenador}
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
              value={parents.length}
              onChangeText={(text) => setParents(text)}
              placeholder={`${parents ? parents.length : ""}`}
              placeholderTextColor="#000"
            />
            <Box w="20%" h="50" justifyContent={"start"}>
              <Text mb="10%" color="light.100" fontSize="xs">
                Autista
              </Text>
              <Switch
                value={autista}
                onValueChange={toggleAutista}
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
=======
import React, {useState, useContext} from 'react';
import { Box, Text, Avatar, Input, Button, Container, VStack, Heading, Divider, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../../../components/BackButton';

export default function EditUser({route}) {
    const navigation = useNavigation()

 return (
  <ScrollView style={{flex: 1, width: '100%', height: '100%'}}>
    <Box flex={1} w="100%" h="100%" alignItems="center" justifyContent="center" bg="lightBlue.400">
    <Box
      w="100%"
      h="60px"
      mt="12"
      ml="5"
      justifyContent="end"
       >
        <BackButton />
      </Box>
          <Heading mb="15" color="light.100">EDITAR PERFIL</Heading>
          <Avatar mb="10" size="2xl" source={{ uri: route.params.avatar }}/>
          
          <VStack w="80%" space={4} px="5" py="7" bg="darkBlue.200" rounded="xl">

            <Text color="white">Nome</Text>
            <Input 
            placeholder={route.params.nome}
            placeholderTextColor="#fff"
            />
            <Text color="white">Idade</Text>
            <Input 
            placeholder={route.params.idade}
            placeholderTextColor="#fff"
            />
            <Text color="white">Endereço</Text>
            <Input 
            placeholder={route.params.address}
            placeholderTextColor="#fff"
            />  
            <Text color="white">CPF</Text>
            <Input 
            placeholder={route.params.cpf}
            placeholderTextColor="#fff"
            />
            <Text color="white">NIS</Text>
            <Input 
            placeholder={route.params.nis}
            placeholderTextColor="#fff"
            />
            <Text color="white">Telefone</Text>
            <Input 
            placeholder={route.params.phone}
            placeholderTextColor="#fff"
            />  
            <Text color="white">Email</Text>
            <Input 
            placeholder={route.params.email}
            placeholderTextColor="#fff"
            />   
            <Text color="white">Pergunta primaria</Text>
            <Input 
            placeholder={route.params.question1}
            placeholderTextColor="#fff"
            /> 
            <Text color="white">Pergunta secundária</Text>
            <Input 
            placeholder={route.params.question2}
            placeholderTextColor="#fff"
            /> 
            <Text color="white">Senha</Text>
            <Input 
            placeholder={route.params.password}
            placeholderTextColor="#fff"
            />   
          </VStack>
          <Button my="10" w="70%" size="lg" colorScheme={'darkBlue'}>Salvar</Button>
      
    
    </Box>
  </ScrollView>
>>>>>>> 869decbc3ff84259de59ca5c9b7c8f4dc337303d
  );
}
