import React, { useState } from "react";
import {
  Box,
  Image,
  Input,
  Text,
  Button,
  ScrollView,
  Heading,
  FormControl,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
export const Cadastro = () => {
  const [formData, setData] = React.useState({});
  const navigation = useNavigation();

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
          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Nome
            </FormControl.Label>
            <Input
              placeholder="Maria"
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

          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              CPF
            </FormControl.Label>
            <Input
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

          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Número NIS
            </FormControl.Label>
            <Input
              placeholder="Rua Severo Rodrigues, 457"
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

          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Email
            </FormControl.Label>
            <Input
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

          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Endereço
            </FormControl.Label>
            <Input
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
              Error Name
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Celular
            </FormControl.Label>
            <Input
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

          <FormControl isRequired>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              Quantos filhos você tem?
            </FormControl.Label>
            <Input
              placeholder="1 ou 2"
              onChangeText={(value) =>
                setData({ ...formData, pergunta1: value })
              }
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
              Error Name
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            variant={"solid"}
            w="70%"
            h="65"
            mx="5"
            my="5"
            onPress={() =>
              Alert.alert(
                "Quase lá",
                "Verifique seu e-mail para concluir o seu cadastro!"
              ) & navigation.navigate("Login")
            }
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
