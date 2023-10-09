import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Image,
  Input,
  Text,
  Button,
  Container,
  Center,
  Select,
  CheckIcon,
  ScrollView,
  Heading,
  FormControl,
  NativeBaseProvider,
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../requisitions/api";

const dataAtual = new Date();

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

export const Cadastro = () => {
  const [formData, setData] = React.useState({
    date: dataAtual,
  });
  const [bairro, setBairro] = React.useState("");
  const [dataFilho, setDataFilho] = React.useState({});
  const [autista, setAutista] = useState(false);
  const [filhos, setFilhos] = useState([]);
  const navigation = useNavigation();

  function newUser() {
    axios
      .post(`${api}/users`, formData, {
        method: "post",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69421",
        }),
      })
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => console.error(error));
  }
  function addFilhos() {
    filhos?.push({
      nome: dataFilho.nome,
      idade: dataFilho.idade,
      cpf: dataFilho.cpf,
    });
    setData({ ...formData, filhos });
    alert('Adicionado')
  }
  function removeFilhos(){
    filhos.pop()
    console.log(filhos)
    alert('Ultimo filho removido!')
  }
  useEffect(() => {
    bairro && setData({ ...formData, bairro: bairro })
  },[bairro])

  const SeletorBairro = () => {

    return <Center w="100%">
        <Box alignSelf="left" rounded="lg" h="50" _text={{color: "#fff"}} maxW="300">
          
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
          
          placeholder="Selecionar bairro"
          placeholderTextColor={"light.100"} 
          _selectedItem={{
          bg: "lightBlue.400",
          colorScheme: "lightBlue",
          endIcon: <CheckIcon size="6" color="#fff" />,
          rounded: "3xl"
        }} mt={1} onValueChange={(value) => setBairro(value)}>
            <Select.Item label="Santa Rita" value="Santa Rita" />
            <Select.Item label="Varzea Nova" value="Varzea Nova" />
            <Select.Item label="Tibiri" value="Tibiri" />
            <Select.Item label="Marcos Moura" value="Marcos Moura" />
            <Select.Item label="Cruz do Espirito Santo" value="Cruz do Espirito Santo" />
          </Select>
        </Box>
      </Center>;
  };

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
    <NativeBaseProvider config={config}>
    <Box flex="1" justifyContent={"center"} 
    pt="20" 
    pb="3" 
    px="5" 
    h="100%"
    bg={{
      linearGradient: {
        colors: ["lightBlue.400", "lightBlue.600"],
        start: [1, 1],
        end: [0, 1],
      },
    }}
    >
      <Heading  fontFamily="Doppio One" textAlign={"left"} color="light.100" shadow={6} fontSize={"4xl"}>
        Bem vindo,
      </Heading>
      <Heading color="light.100" fontFamily="Doppio One" shadow={6} textAlign={"left"}>Faça seu cadastro</Heading>

      <Image
        position={"absolute"}
        top="7%"
        right="10%"
        w="90"
        h="90"
        alt="icon-pip"
        resizeMode="cover"
        source={require("../../../assets/pip-icon.png")}
      />

      <ScrollView showsVerticalScrollIndicator={false} marginTop="12%">
        <Box alignItems={"center"} alignSelf={"center"} h="100%" w="100%"
        >

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                color:'light.100',
                fontSize: 22,
                fontFamily: "Doppio One",
                bold: true,
                color:'light.100',
                fontSize: 22,
                fontFamily: "Doppio One"

              }}
              shadow={6}
            >
              Nome completo
            </FormControl.Label>
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
              onChangeText={(value) => setData({ ...formData, nome: value })}
            />
            
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              Insira um nome válido
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                color:'light.100',
                fontSize: 22,
                fontFamily: "Doppio One",
                bold: true,
              }}
            >
              Idade
            </FormControl.Label>
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
              w="20%"
              onChangeText={(value) => setData({ ...formData, idade: value })}
            />
          </FormControl>

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                color:'light.100',
                fontSize: 22,
                fontFamily: "Doppio One",
                bold: true,
              }}
            >
              CPF
            </FormControl.Label>
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
              w="50%"
              placeholder="000.000.000-00"
              placeholderTextColor="light.100"
              onChangeText={(value) => setData({ ...formData, cpf: value })}
            />

          </FormControl>

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                color:'light.100',
                fontSize: 22,
                fontFamily: "Doppio One",
                bold: true,
              }}
            >
              Número NIS
            </FormControl.Label>
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
              w="50%"
              onChangeText={(value) => setData({ ...formData, nis: value })}
            />
            <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            ></FormControl.HelperText>
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              NIS inválido!
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mt="5">
            <FormControl.Label
              _text={{
                color:'light.100',
                fontSize: 22,
                fontFamily: "Doppio One",
                bold: true,
              }}
            >
              Email
            </FormControl.Label>
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
              w="80%"
              placeholder="Ex: meu-email@gmail.com"
              placeholderTextColor="light.100"
              onChangeText={(value) => setData({ ...formData, email: value })}
            />
            <FormControl.HelperText
              shadow={4}
              _text={{
                fontSize: "xs",
                color: "light.100"
              }}
            >
              Insira um e-mail válido!
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              Este e-mail não é válido!
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                color:'light.100',
                fontSize: 22,
                fontFamily: "Doppio One",
                bold: true,
              }}
            >
              Endereço
            </FormControl.Label>
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
              w="80%"
              placeholder="Rua Severo Rodrigues, 457"
              placeholderTextColor="light.100"
              onChangeText={(value) => setData({ ...formData, address: value })}
            />
            <FormControl.HelperText
              _text={{
                fontSize: "xs",
                color: "light.100"
              }}
            ></FormControl.HelperText>

          </FormControl>
          <FormControl.Label
          alignSelf="left"
              _text={{
                color:'light.100',
                fontSize: 22,
                fontFamily: "Doppio One",
                bold: true,
              }}
            >
              Bairro
            </FormControl.Label>
          <SeletorBairro />

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                color:'light.100',
                fontSize: 22,
                fontFamily: "Doppio One",
                bold: true,
              }}
            >
              Celular
            </FormControl.Label>
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
              w="60%"
              placeholder="(083) xxxx-xxxx"
              placeholderTextColor="light.100"
              onChangeText={(value) => setData({ ...formData, phone: value })}
            />
            <FormControl.HelperText
            shadow={4}
              _text={{
                fontSize: "xs",
                color: "light.100"
              }}
            >
              Seu contato atual
            </FormControl.HelperText>
          </FormControl>

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                color:'light.100',
                fontSize: 22,
                fontFamily: "Doppio One",
                bold: true,
              }}
            >
              Quantos filhos você tem?
            </FormControl.Label>
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
              w="20%"
              mb="4"
              onChangeText={(value) =>
                setData({ ...formData, parentsCount: value })
              }
            />
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
              <Button my="2" size="sm" bg="rgba(255, 255, 255, 0.18)" onPress={() => addFilhos()}>
                Adicionar
              </Button>
              <Button my="2" size="sm" bg="rgba(255, 255, 255, 0.18)" onPress={() => removeFilhos()}>
                Remover Ultimo
              </Button>
            </Container>
            <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            ></FormControl.HelperText>
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              Inválido
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                color:'light.100',
                fontSize: 22,
                fontFamily: "Doppio One",
                bold: true,
              }}
            >
              Senha
            </FormControl.Label>
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
              w="60%"
              placeholder="*******"
              placeholderTextColor="light.100"
              onChangeText={(value) =>
                setData({ ...formData, password: value })
              }
            />
            <FormControl.HelperText
            shadow={4}
              _text={{
                fontSize: "xs",
                color: "light.100"
              }}
            >
              Deve conter letras e números
            </FormControl.HelperText>

          </FormControl>

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                color:'light.100',
                fontSize: 22,
                fontFamily: "Doppio One",
                bold: true,
              }}
            >
              Confirmar
            </FormControl.Label>
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
              w="60%"
              placeholder="*******"
              placeholderTextColor="light.100"
              onChangeText={(value) =>
                setData({ ...formData, password: value })
              }
            />
            <FormControl.HelperText
            shadow={4}
              _text={{
                fontSize: "xs",
                color: "light.100"
              }}
            >
              Deve conter letras e números
            </FormControl.HelperText>
      
          </FormControl>

          <Button
          shadow={6}
            variant={"solid"}
            w="70%"
            h="65"
            mx="5"
            my="5"
            bg="blue.700"
            rounded="full"
            onPress={() => newUser() & navigation.navigate("Login")}
          >
           <Text color="light.100" shadow={3} fontSize="2xl" bold>ENVIAR</Text> 
          </Button>
          <Button
          opacity={0.6}
          mb="5"
            variant={"solid"}
            w="70%"
            h="50"
            mx="5"
            my="2"
            bg="blue.600"
            rounded="full"
            onPress={() => navigation.goBack()}
          >
            VOLTAR
          </Button>
        </Box>
      </ScrollView>
    </Box>
    </NativeBaseProvider>
  );
};
