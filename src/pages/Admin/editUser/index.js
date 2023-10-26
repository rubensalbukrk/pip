import React, { useState, useContext } from "react";
import axios from "axios";
import { api } from "../../../requisitions/api";
import { UserContext } from "../../../contexts/UserContext";
import * as Animatable from "react-native-animatable";
import {
  Box,
  Text,
  Input,
  Button,
  Avatar,
  Container,
  Center,
  Select,
  CheckIcon,
  VStack,
  HStack,
  Switch,
  Heading,
  Divider,
  ScrollView,
  NativeBaseProvider,
} from "native-base";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../../components/BackButton";
import InputInfoUser from "../../../../components/UserLayout/inputUser";

const hoje = new Date();
const data =
  hoje.getDate().toString().padStart(2, 0) +
  "/" +
  String(hoje.getMonth() + 1).padStart(2, "0") +
  "/" +
  hoje.getFullYear() +
  ` as ` +
  hoje.toLocaleTimeString();

export default function EditUser({ route }) {
  const { logged } = useContext(UserContext);
  const [formData, setData] = React.useState({
    date: data,
  });
  const [bairro, setBairro] = React.useState(route?.params?.bairro);
  const [voluntario, setVoluntario] = useState(route?.params?.isVolt);
  const [estagiario, setEstagiario] = useState(route?.params?.isEtg);
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
  const [dataFilho, setDataFilho] = React.useState({});
  const [filhos, setFilhos] = useState(route?.params?.filhos);
  const [phone, setPhone] = useState(route?.params?.phone);
  const [email, setEmail] = useState(route?.params?.email);
  const [member, setMember] = useState(route?.params?.question1);
  const [opnion, setOpnion] = useState(route?.params?.question2);
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
    bairro: bairro,
    cpf: cpf,
    nis: nis,
    filhos: filhos,
    phone: phone,
    email: email,
    question1: member,
    question2: opnion,
    password: pass,
  };

  function updateUser() {
    axios
      .put(`${api}/users/${route.params.id}`, UserUpdate, {
        method: "put",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69421",
        }),
      })
      .then(() => {
        setFilhos([""]);
      });
    return Alert.alert("Atualização", "O usuário foi alterado!");
  }
 let UserFilhos = () => {

    try {
      return (
        <Box>
          { filhos ? filhos.map((item) => {
                return (
                  <Box
                    bg="darkBlue.400"
                    rounded="2xl"
                    py="2"
                    my="2"
                    px="2"
                    space={2}
                  >
                    <Text>Nome: {item?.nome}</Text>
                    <Text>CPF: {item?.cpf}</Text>
                    <Text>Idade: {item?.idade}</Text>
                  </Box>
                );
              }) : <Text color="light.100" fontFamily="Doppio One">Não tem filhos</Text> }
        </Box>
      );
    } catch (error) {
      alert("Dados de usuário não encontrado!");
      navigation.goBack()
    }
    
  };

  function addFilhos() {
    try {
      filhos?.push({
        nome: dataFilho.nome,
        idade: dataFilho.idade,
        cpf: dataFilho.cpf,
      });

      alert("Adicionado");
    } catch (error) {
      alert("Dados incorretos, tente novamente");
    }
  }

  const SeletorBairro = () => {
    return (
      <Center w="100%">
        <Box
          alignSelf="left"
          rounded="lg"
          h="50"
          _text={{ color: "#fff" }}
          maxW="300"
        >
          <Select
            fontFamily="Doppio One"
            fontSize="lg"
            selectedValue={bairro}
            minWidth="250"
            h="40px"
            rounded="2xl"
            color={"light.100"}
            bg="rgba(255, 255, 255, 0.1)"
            borderColor="rgba(255, 255, 255, 0.18)"
            outlineColor={"light.100"}
            dropdownIcon={<CheckIcon size="6" color="light.100" />}
            placeholder={route?.params?.bairro}
            placeholderTextColor={"light.100"}
            _selectedItem={{
              bg: "lightBlue.400",
              colorScheme: "lightBlue",
              endIcon: <CheckIcon size="6" color="#fff" />,
              rounded: "3xl",
            }}
            mt={1}
            onValueChange={(value) => setBairro(value)}
          >
            <Select.Item label="Santa Rita" value="Santa Rita" />
            <Select.Item label="Varzea Nova" value="Varzea Nova" />
            <Select.Item label="Tibiri" value="Tibiri" />
            <Select.Item label="Marcos Moura" value="Marcos Moura" />
            <Select.Item
              label="Cruz do Espirito Santo"
              value="Cruz do Espirito Santo"
            />
          </Select>
        </Box>
      </Center>
    );
  };
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
    <NativeBaseProvider>
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

              <Text color="white">Bairro</Text>

              <SeletorBairro />

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

              <Box
                w="100%"
                mt="6%"
                bg="lightBlue.500"
                rounded="2xl"
                px="3"
                py="2"
              >
                <Box w="70px">
                  <InputInfoUser
                    infoLabel="Filhos"
                    infoValue={
                      filhos?.length === "0" ? "Não" : `${filhos?.length}`
                    }
                  />
                </Box>

                {filhos?.length === "0" ? "NÃO" : <UserFilhos />}
              </Box>
              <Container
                space={3}
                px="3"
                py="2"
                bg="rgba(255, 255, 255, 0.18)"
                w="50%"
                rounded="2xl"
              >
                <Text color="light.100">Nome</Text>
                <Input
                  bg="rgba(255, 255, 255, 0.1)"
                  clearTextOnFocus={true}
                  rounded="2xl"
                  size="2xl"
                  showSoftInputOnFocus={true}
                  focusOutlineColor="rgba(255, 255, 255, 0.50)"
                  selectionColor="rgba(255, 255, 255, 0.58)"
                  borderColor="rgba(255, 255, 255, 0.18)"
                  color={"light.100"}
                  onChangeText={(value) =>
                    setDataFilho({ ...dataFilho, nome: value })
                  }
                />
                <Text color="light.100">Idade</Text>
                <Input
                  bg="rgba(255, 255, 255, 0.1)"
                  clearTextOnFocus={true}
                  rounded="2xl"
                  size="2xl"
                  showSoftInputOnFocus={true}
                  focusOutlineColor="rgba(255, 255, 255, 0.50)"
                  selectionColor="rgba(255, 255, 255, 0.58)"
                  borderColor="rgba(255, 255, 255, 0.18)"
                  color={"light.100"}
                  onChangeText={(value) =>
                    setDataFilho({ ...dataFilho, idade: value })
                  }
                />
                <Text color="light.100">CPF</Text>
                <Input
                  bg="rgba(255, 255, 255, 0.1)"
                  clearTextOnFocus={true}
                  rounded="2xl"
                  size="2xl"
                  showSoftInputOnFocus={true}
                  focusOutlineColor="rgba(255, 255, 255, 0.50)"
                  selectionColor="rgba(255, 255, 255, 0.58)"
                  borderColor="rgba(255, 255, 255, 0.18)"
                  color={"light.100"}
                  onChangeText={(value) =>
                    setDataFilho({ ...dataFilho, cpf: value })
                  }
                />
                <Button
                  my="2"
                  size="sm"
                  bg="rgba(255, 255, 255, 0.18)"
                  onPress={() => addFilhos()}
                >
                  Adicionar
                </Button>
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

              <Text color="light.100" fontFamily="Doppio One">
                Opinião
              </Text>
              <Input
              variant="filled"
              style={{ color: "light.100" }}
              size="xl"
              value={opnion}
              placeholder={`${opnion ? opnion : ""}`}
              onChangeText={(text) => setOpnion(text)}
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
    </NativeBaseProvider>
  );
}
