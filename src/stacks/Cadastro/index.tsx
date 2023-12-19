import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import SelectDrop from 'react-native-select-dropdown'
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../api/api";
import { FilhosProps } from "../../interfaces/Filhos";
import { TextLarge } from "../../../components/TextLg/Text";

const citys = ["Santa Rita", "Varzea Nova", "Tibiri", "Marcos Moura", "Cruz Espirito Santo"]

export const Cadastro = () => {
  const [updateList, setUpdateList] = useState(false);
  const [formData, setData] = useState(null);
  const [bairro, setBairro] = useState("");
  const [dataFilho, setDataFilho] = useState<FilhosProps>({
    nome: undefined,
    idade: undefined,
    cpf: undefined,
    isAutist: false,
  });

  const [filhos, setFilhos] = useState<FilhosProps[]>([]);
  const { navigate, goBack } = useNavigation();

  const newUser = async () => {
    try {
      const response = await axios.post(`${api.BASE_URL}/users`, formData, {
        method: "POST",
      });
      return alert(response.data);
    } catch (e) {
      alert(`Houve um problema com o servidor: ${e}`);
    }
  };

  function addFilhos() {
    try {
      const lastId = filhos[filhos.length - 1]?.id;
      filhos?.push({
        nome: dataFilho.nome,
        idade: dataFilho.idade,
        cpf: dataFilho.cpf,
        isAutist: dataFilho.isAutist,
      });
      setData({ ...formData, filhos });
    } catch (error) {
      alert("Tente novamente!");
    }
  }

  const UserFilhos = () => {
    try {
      return (
        <View className="w-full">
          {filhos &&
            filhos.map((item, index) => {
              return (
                <View
                  key={index}
                  className="w-80 py-3 px-3 my-2 rounded-2xl bg-white/20"
                >
                  <TextLarge text={`Nome: ${item.nome}`} />
                  <TextLarge text={`CPF: ${item.cpf}`} />
                  <TextLarge text={`Idade: ${item.idade}`} />
                  <View className="w-full flex-row gap-x-2 items-center">
                    <TextLarge text={"Autista"} />
                    {item.isAutist ? (
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={16}
                        color={"green"}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="close-circle"
                        size={16}
                        color={"white"}
                      />
                    )}
                  </View>

                  <TouchableOpacity
                    className="w-10 h-10 opacity-60 absolute bottom-0 right-0"
                    onPress={() => {
                      filhos.splice(index, 1);
                      setUpdateList((previousState) => !previousState);
                    }}
                  >
                    <Feather name="user-minus" size={32} color="white" />
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      );
    } catch (error) {
      alert("sem filhos");
      goBack();
    }
  };

  useEffect(() => {
    bairro && setData({ ...formData, bairro: bairro });
  }, [bairro]);

  const toggleAutista = () => {
    setDataFilho(({ isAutist: previus }) => ({
      ...dataFilho,
      isAutist: !previus,
    }));
  };

  return (
    <View className="flex-1 w-full h-full bg-zinc-400">
      <View className="flex-row w-full mt-16 h-36">
        <TextLarge
          text="Faça seu cadastro"
          className="left-2 text-left text-5xl"
        />
        <Image
          className=" w-52 h-52 right-6 self-end"
          alt="icon-pip"
          resizeMode="contain"
          source={require("../../../assets/pip-icon.png")}
        />
      </View>

      <ScrollView className="w-full px-3" showsVerticalScrollIndicator={false}>
        <View className="w-full h-full">
          <View className="w-full mt-4">
            <TextLarge text="Nome completo" />
            <TextInput
              className="h-10 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, nome: value })}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="Idade" />
            <TextInput
              className="w-14 h-10 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, idade: value })}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="CPF" />
            <TextInput
              className="w-56 h-10 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, cpf: value })}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="NIS" />
            <TextInput
              className="w-40 h-10 px-2 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, nis: value })}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="E-mail" />
            <TextInput
              className="w-64 h-10 px-2 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, email: value })}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="Endereço" />
            <TextInput
              className="w-80 h-10 px-2 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, address: value })}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="Bairro" />
            <SelectDrop
            
            data={citys}
            onSelect={(selectedItem, index) => {
              setBairro(selectedItem)
              console.log(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="Celular" />
            <TextInput
              className="w-44 h-10 px-2 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) => setData({ ...formData, phone: value })}
            />
          </View>

          <View className="mt-5">
            <TextLarge text="Quantos filhos ?" />
            <TextInput
              className="w-16 h-10 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
              onChangeText={(value) =>
                setData({ ...formData, parentsCount: value })
              }
            />

            <UserFilhos />

            <View className="w-64 rounded-xl my-5 py-3 px-2 bg-white/20">
              <TextLarge text="Nome" />
              <TextInput
                className="w-full h-10 px-2 mb-1 font-default text-start text-white text-lg rounded-2xl bg-white/10 border-white/20"
                onChangeText={(value) =>
                  setDataFilho({ ...dataFilho, nome: value })
                }
              />

              <TextLarge text="CPF" />
              <TextInput
                className="w-full h-10 px-2 mb-1 font-default text-start text-white text-lg rounded-2xl bg-white/10 border-white/9ss0"
                onChangeText={(value) =>
                  setDataFilho({ ...dataFilho, cpf: value })
                }
              />

              <View className="flex-row w-full items-center justify-between">
                <View className="mb-3">
                  <TextLarge text="Idade" />
                  <TextInput
                    className="w-14 h-10 px-2 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
                    keyboardType="number-pad"
                    onChangeText={(value) =>
                      setDataFilho({ ...dataFilho, idade: value })
                    }
                  />
                </View>
                <View className="items-center px-2">
                  <TextLarge text="Autista" />
                  <Switch
                    value={dataFilho.isAutist}
                    trackColor={{ false: "#9f9f9f", true: "#767590" }}
                    onValueChange={toggleAutista}
                  />
                </View>
              </View>
              <TouchableOpacity
                className="w-28 h-11 top-1 justify-center items-center rounded-lg bg-white/30"
                onPress={() => addFilhos()}
              >
                <TextLarge text="Adicionar" />
              </TouchableOpacity>
            </View>
          </View>

          <TextLarge text="Digite uma senha" />
          <TextInput
            className="w-52 h-10 font-default text-lg text-white px-3 rounded-2xl bg-white/10 border-white/20"
            onChangeText={(value) => setData({ ...formData, password: value })}
          />

          <TextLarge text="Confirmar senha" />
          <TextInput
            className="w-52 h-10 font-default text-lg text-white px-3 rounded-2xl bg-white/10 border-white/20"
            onChangeText={(value) => setData({ ...formData, password: value })}
          />

          <TouchableOpacity
            className="w-72 h-12 my-3 mt-8 self-center justify-center items-center bg-zinc-700 rounded-lg"
            onPress={() => [newUser(), navigate("Welcome")]}
          >
            <Text className="font-default text-2xl text-white">ENVIAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-72 h-12 my-3 self-center justify-center items-center bg-zinc-700/40 rounded-lg"
            onPress={() => goBack()}
          >
            <TextLarge text="Voltar" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
