import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Select,
} from "react-native";
import axios from "axios";
import {
  Select,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../requisitions/api";
import { TouchableOpacity, FlatList } from "react-native";

const dataAtual = new Date();

export const Cadastro = () => {
  const [updateList, setUpdateList] = useState(false);
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
    alert("Adicionado");
  }
  const UserFilhos = () => {
    try {
      return (
        <View className="flex-1 w-full">
          <FlatList
            refreshing={updateList}
            keyExtractor={(item) => item.cpf.toString()}
            data={filhos}
            renderItem={({ item, index }) => {
              return (
                <View className="w-full">
                  <View className="flex-1 w-80 py-3 px-3 my-2 rounded-2xl bg-white/20">
                    <Text className="font-default text-lg text-white">
                      Nome: {item?.nome}
                    </Text>
                    <Text className="font-default text-lg text-white">
                      CPF: {item?.cpf}
                    </Text>
                    <Text className="font-default text-lg text-white">
                      Idade: {item?.idade}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      filhos.splice(index, 1);
                      setUpdateList((previousState) => !previousState);
                    }}
                    className='w-20 justify-center items-center'
                  >
                    <Feather name="user-minus" size={42} color="white" />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      );
    } catch (error) {
      alert("Dados de usuário não encontrado!");
      navigation.goBack();
    }
  };
  useEffect(() => {
    bairro && setData({ ...formData, bairro: bairro });
  }, [bairro]);

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
    <View className="flex-1 justify-center pt-20 pb-3 px-5 h-full">
      <Text className="font-default text-left text-white text-4xl">
        Bem vindo,
      </Text>
      <Text className="font-default text-left text-white text-xl">
        Faça seu cadastro
      </Text>

      <Image
        className="absolute top-7 right-10 w-96 h-90"
        alt="icon-pip"
        resizeMode="cover"
        source={require("../../../assets/pip-icon.png")}
      />

      <ScrollView className="mt-9" showsVerticalScrollIndicator={false}>
        <View className="w-full h-full self-center items-center">
          <View className="mt-4">
            <Text className="font-default text-lg font-bold text-white">
              Nome completo
            </Text>
            <TextInput
              className="rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, nome: value })}
            />
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg font-bold text-white">
              Idade
            </Text>
            <TextInput
              className="rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, idade: value })}
            />
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg font-bold text-white">
              CPF
            </Text>
            <TextInput
              className="rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, cpf: value })}
            />
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg font-bold text-white">
              NIS
            </Text>
            <TextInput
              className="rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, nis: value })}
            />
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg font-bold text-white">
              Email
            </Text>
            <TextInput
              className="rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, email: value })}
            />
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg font-bold text-white">
              Endereço
            </Text>
            <TextInput
              className="rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, address: value })}
            />
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg font-bold text-white">
              Bairro
            </Text>
            
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg font-bold text-white">
              Celular
            </Text>
            <TextInput
              className="rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, phone: value })}
            />
          </View>

          <View className="mt-5">
            <Text className="font-default text-lg font-bold text-white">
              Quantos filhos você tem?
            </Text>
            <TextInput
              className="rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) =>
                setData({ ...formData, parentsCount: value })
              }
            />

            <UserFilhos />
            <View className="w-52 rounded-xl gap-3 px-3 py-2 bg-white/20">
              <Text className="font-default font-bold text-white">Nome</Text>
              <TextInput
                className="rounded-2xl bg-white/10 border-white/20"
                onChangeText={(value) =>
                  setDataFilho({ ...dataFilho, nome: value })
                }
              />
              <Text className="font-default font-bold text-white">Idade</Text>
              <TextInput
                className="rounded-2xl bg-white/10 border-white/20"
                onChangeText={(value) =>
                  setDataFilho({ ...dataFilho, idade: value })
                }
              />
              <Text className="font-default font-bold text-white">CPF</Text>
              <TextInput
                className="rounded-2xl bg-white/10 border-white/20"
                onChangeText={(value) =>
                  setDataFilho({ ...dataFilho, cpf: value })
                }
              />
              <TouchableOpacity
                my="2"
                size="sm"
                bg="rgba(255, 255, 255, 0.18)"
                onPress={() => addFilhos()}
              >
                Adicionar
              </TouchableOpacity>
            </View>
          </View>

          <Text className="font-default font-bold text-white">Senha*</Text>
          <TextInput
            className="rounded-2xl bg-white/10 border-white/20"
            onChangeText={(value) => setData({ ...formData, password: value })}
          />

          <Text className="font-default font-bold text-white">
            Confirmar senha*
          </Text>
          <TextInput
            className="rounded-2xl bg-white/10 border-white/20"
            onChangeText={(value) => setData({ ...formData, password: value })}
          />

          <TouchableOpacity
            className="w-72 h-64 mx-5 my-5 bg-blue-700 rounded-full"
            onPress={() => newUser() & navigation.navigate("Login")}
          >
            <Text className="font-default font-2xl font-bold text-white">
              ENVIAR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-72 h-64 mx-5 my-2 mb-4 opacity-40 bg-blue-600 rounded-full"
            onPress={() => navigation.goBack()}
          >
            VOLTAR
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
