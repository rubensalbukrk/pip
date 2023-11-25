import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../api/api";
import { data } from "../../utils/dateNow.";

export const Cadastro = () => {
  const [updateList, setUpdateList] = useState(false);
  const [formData, setData] = React.useState({
    date: data,
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
  }

  const UserFilhos = () => {
    try {
      return (
        <View className="w-full">
          <FlatList
            refreshing={updateList}
            keyExtractor={(item) => item.cpf.toString()}
            data={filhos}
            renderItem={({ item, index }) => {
              return (
                  <View className="w-80 py-3 px-3 my-2 rounded-2xl bg-white/20">
                    <Text className="font-default text-lg text-white">
                      Nome: {item?.nome}
                    </Text>
                    <Text className="font-default text-lg text-white">
                      CPF: {item?.cpf}
                    </Text>
                    <Text className="font-default text-lg text-white">
                      Idade: {item?.idade}
                    </Text>

                    <TouchableOpacity className='w-10 h-10 opacity-60 absolute bottom-0 right-0'
                    onPress={() => {
                      filhos.splice(index, 1);
                      setUpdateList((previousState) => !previousState);
                    }}
                  >
                    <Feather name="user-minus" size={32} color="white" />
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
    <View className="flex-1 w-full h-full bg-blue-600">
      <View className="flex-row w-full mt-16 h-36">
        <Text className="abslute left-2 font-default text-left text-white text-5xl">
          Faça seu cadastro
        </Text>
        <Image
          className=" w-52 h-52 right-6 self-end"
          alt="icon-pip"
          resizeMode="contain"
          source={require("../../../assets/pip-icon.png")}
        />
      </View>

      <ScrollView className='w-full px-3' showsVerticalScrollIndicator={false}>
        <View className='w-full h-full'>
          <View className="w-full mt-4">
            <Text className="font-default text-lg font-bold text-white">
              Nome completo
            </Text>
            <TextInput
              className="h-10 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, nome: value })}
            />
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg font-bold text-white">
              Idade
            </Text>
            <TextInput
              className="w-14 h-10 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, idade: value })}
            />
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg font-bold text-white">
              CPF
            </Text>
            <TextInput
              className="w-56 h-10 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, cpf: value })}
            />
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg text-white">
              NIS
              </Text>
            <TextInput
              className="w-40 h-10 px-2 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, nis: value })}
            />
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg text-white">
              Email
              </Text>
            <TextInput
              className="w-64 h-10 px-2 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, email: value })}
            />
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg text-white">
              Endereço
              </Text>
            <TextInput
              className="w-80 h-10 px-2 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, address: value })}
            />
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg text-white">
              Bairro
              </Text>
          </View>

          <View className="mt-4">
            <Text className="font-default text-lg text-white">
              Celular
              </Text>
            <TextInput
              className="w-44 h-10 px-2 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, phone: value })}
            />
          </View>

          <View className="mt-5">
            <Text className="font-default text-lg text-white">
              Quantos filhos você tem?
            </Text>
            <TextInput
              className="w-16 h-10 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) =>
                setData({ ...formData, parentsCount: value })
              }
            />
            
            <UserFilhos />

            <View className="w-64 rounded-xl my-5 py-3 px-2 bg-white/20">
              <Text className="font-default left-2 text-white">Nome</Text>
              <TextInput
                className="w-full h-10 px-2 mb-1 font-default text-start text-white text-lg rounded-2xl bg-white/10 border-white/20"
                onChangeText={(value) =>
                  setDataFilho({ ...dataFilho, nome: value })
                }
              />

              <Text className="font-default left-2 text-white">CPF</Text>
              <TextInput
                className="w-full h-10 px-2 mb-1 font-default text-start text-white text-lg rounded-2xl bg-white/10 border-white/9ss0"
                onChangeText={(value) =>
                  setDataFilho({ ...dataFilho, cpf: value })
                }
              />

              <View className="flex-row w-full items-center justify-around">
                <View className="right-3">
                  <Text className="font-default left-2 text-white">Idade</Text>
                  <TextInput
                    className="w-14 h-10 px-2 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
                    onChangeText={(value) =>
                      setDataFilho({ ...dataFilho, idade: value })
                    }
                  />
                </View>

                <TouchableOpacity
                  className="w-28 h-11 top-1 left-3 justify-center items-center rounded-lg bg-white/30"
                  onPress={() => addFilhos()}
                >
                  <Text className="font-default self-center text-lg text-white">
                    Adicionar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text className="font-default text-2xl text-white">Senha*</Text>
          <TextInput
            className="w-52 h-10 font-default text-lg text-white px-3 rounded-2xl bg-white/10 border-white/20"
            onChangeText={(value) => setData({ ...formData, password: value })}
          />

          <Text className="font-default text-2xl text-white">Confirmar senha*</Text>
          <TextInput
            className="w-52 h-10 font-default text-lg text-white px-3 rounded-2xl bg-white/10 border-white/20"
            onChangeText={(value) => setData({ ...formData, password: value })}
          />

          <TouchableOpacity
            className="w-72 h-12 my-3 mt-8 self-center justify-center items-center bg-blue-800 rounded-lg"
            onPress={() => newUser() & navigation.navigate("Login")}
          >
            <Text className="font-default text-2xl text-white">ENVIAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-72 h-12 my-3 self-center justify-center items-center bg-blue-800/40 rounded-lg"
            onPress={() => navigation.goBack()}
          >
            <Text className='font-default text-lg text-white'>VOLTAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
