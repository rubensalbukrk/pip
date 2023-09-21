import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Image,
  Input,
  Text,
  Button,
  Container,
  ScrollView,
  Heading,
  FormControl,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../requisitions/api";

const dataAtual = new Date();

export const Cadastro = () => {
  const [formData, setData] = React.useState({
    date: dataAtual,
  });
  const [dataFilho, setDataFilho] = React.useState({});
  const [autista, setAutista] = useState(false);
  const [filho, setFilhos] = useState([]);
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
    filho.push({
      nome: dataFilho.nome,
      idade: dataFilho.idade,
      cpf: dataFilho.cpf,
    });
    setData({ ...formData, filho });
    console.log(formData);
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
    <Box flex="1" justifyContent={"center"} pt="20" pb="3" px="5" h="100%">
      <Heading textAlign={"left"} fontSize={"4xl"}>
        Bem vindo,
      </Heading>
      <Heading textAlign={"left"}>Faça seu cadastro</Heading>

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
        <Box alignItems={"center"} alignSelf={"center"} h="100%" w="100%">
          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Nome completo
            </FormControl.Label>
            <Input
              onChangeText={(value) => setData({ ...formData, nome: value })}
            />
            <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            >
              O nome deve conter pelo menos 3 caracteres.
            </FormControl.HelperText>
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
                bold: true,
              }}
            >
              Idade
            </FormControl.Label>
            <Input
              w="20%"
              onChangeText={(value) => setData({ ...formData, idade: value })}
            />
          </FormControl>

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              CPF
            </FormControl.Label>
            <Input
              w="50%"
              placeholder="000.000.000-00"
              onChangeText={(value) => setData({ ...formData, cpf: value })}
            />
            <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            >
              Números com pontuação
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              Insira um número válido
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Número NIS
            </FormControl.Label>
            <Input
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
                bold: true,
              }}
            >
              Email
            </FormControl.Label>
            <Input
              w="80%"
              placeholder="Ex: meu-email@gmail.com"
              onChangeText={(value) => setData({ ...formData, email: value })}
            />
            <FormControl.HelperText
              _text={{
                fontSize: "xs",
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
                bold: true,
              }}
            >
              Endereço
            </FormControl.Label>
            <Input
              w="80%"
              placeholder="Rua Severo Rodrigues, 457"
              onChangeText={(value) => setData({ ...formData, address: value })}
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
              Endereço inválido
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Celular
            </FormControl.Label>
            <Input
              w="60%"
              placeholder="(083) xxxx-xxxx"
              onChangeText={(value) => setData({ ...formData, phone: value })}
            />
            <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            >
              Seu contato atual
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              Número inválido
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Quantos filhos você tem?
            </FormControl.Label>
            <Input
              w="20%"
              placeholder="1 ou 2"
              onChangeText={(value) =>
                setData({ ...formData, parentsCount: value })
              }
            />
            <Container
              space={3}
              px="3"
              py="2"
              bg="lightBlue.300"
              w="50%"
              rounded="2xl"
            >
              <Text>Nome</Text>
              <Input
                onChangeText={(value) =>
                  setDataFilho({ ...dataFilho, nome: value })
                }
              />
              <Text>Idade</Text>
              <Input
                onChangeText={(value) =>
                  setDataFilho({ ...dataFilho, idade: value })
                }
              />
              <Text>CPF</Text>
              <Input
                onChangeText={(value) =>
                  setDataFilho({ ...dataFilho, cpf: value })
                }
              />
              <Button size="sm" onPress={() => addFilhos()}>
                Adicionar
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
                bold: true,
              }}
            >
              Senha
            </FormControl.Label>
            <Input
              w="60%"
              placeholder="*******"
              onChangeText={(value) =>
                setData({ ...formData, password: value })
              }
            />
            <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            >
              Deve conter letras e números
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              Insira uma senha válida!
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mt="5" isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Confirmar
            </FormControl.Label>
            <Input
              w="60%"
              placeholder="*******"
              onChangeText={(value) =>
                setData({ ...formData, password: value })
              }
            />
            <FormControl.HelperText
              _text={{
                fontSize: "xs",
              }}
            >
              Deve conter letras e números
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              _text={{
                fontSize: "xs",
              }}
            >
              Senha diferente
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            variant={"solid"}
            w="70%"
            h="65"
            mx="5"
            my="5"
            onPress={() => newUser() & navigation.navigate("Login")}
          >
            CADASTRAR
          </Button>
          <Button
            variant={"outline"}
            w="70%"
            h="50"
            mx="5"
            my="2"
            onPress={() => navigation.goBack()}
          >
            VOLTAR
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
};
