import React, { useState, useContext } from "react";
import axios from "axios";
import { api } from "../../../api/api";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  FlatList,
} from "react-native";
import BackButton from "../../../../components/BackButton";
import InputInfoUser from "../../../../components/UserLayout/inputUser";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../contexts/UserContext";
import { data } from "../../../utils/dateNow.";

export default function EditUser({ route }) {
  const [updateList, setUpdateList] = useState(false);
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
    return alert("Atualização", "O usuário foi alterado!");
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
    <View className="flex-1 w-full h-full items-center justify-center bg-blue-500">
      <View className="w-full h-100 items-center justify-center rounded-lg">
        <View className="absolute top-2 right-1">
          <BackButton />
        </View>

        <Text className="font-default text-start mt-14 text-2xl text-white">
          ALTERAR DADOS
        </Text>
        <Image
          className="w-24 h-24 opacity-90 rounded-full bg-blue-500"
          style={{ zIndex: 10 }}
          source={
            avatar
              ? { uri: route?.params?.avatar }
              : require("../../../../assets/user.png")
          }
        />
      </View>

      <ScrollView className="flex-1 w-full">
        <View className="justify-center items-center py-10">
          <View className="flex-row w-60 h-100 gap-2 my-1 py-5 rounded-lg justify-evenly items-center bg-white/20">
            <View className="h-full my-4 items-center gap-2">
              <Text className="font-default text-xs text-white">
                Estagiário
              </Text>
              <Switch
                onValueChange={() => {
                  toggleEstagio();
                }}
                value={estagiario}
              />
            </View>

            <View className="h-full my-4 items-center gap-2">
              <Text className="font-default text-xs text-white">
                Voluntário
              </Text>
              <Switch
                value={voluntario}
                onValueChange={() => toggleVoluntario}
              />
            </View>
          </View>

          <View className="w-80 h-200 px-4 py-2 my-3 bg-white/20 rounded-2xl items-start">
            <Text className="font-default text-white text-lg">Coordenador</Text>

            <View className="flex-row w-full gap-2 items-start justify-center">
              <View className="h-14 my-4 items-center gap-2">
                <Text className="font-default text-white text-xs">
                  Autistas
                </Text>
                <Switch onValueChange={toggleAutist} value={isCoordAutist} />
              </View>

              <View className="h-14 my-4 items-center gap-2">
                <Text className="font-default text-white text-xs">Mulher</Text>
                <Switch onValueChange={toggleMulher} value={isCoordMulher} />
              </View>

              <View className="h-14 my-4 items-center gap-2">
                <Text className="font-default text-white text-xs">
                  Protagonista
                </Text>
                <Switch
                  onValueChange={toggleProtagonista}
                  value={isCoordProtagonista}
                />
              </View>
            </View>

            <View className="flex-row w-full gap-2 items-start justify-center">
              <View className="h-14 my-4 items-center gap-2">
                <Text className="font-default text-white text-xs">
                  Passe Livre
                </Text>
                <Switch onValueChange={togglePasse} value={isCoordPasse} />
              </View>

              <View className="h-14 my-4 items-center gap-2">
                <Text className="font-default text-white text-xs">
                  Alimentar
                </Text>
                <Switch
                  onValueChange={toggleAlimentar}
                  value={isCoordAlimentar}
                />
              </View>

              <View className="h-14 my-4 items-center gap-2">
                <Text className="font-default text-white text-xs">Saúde</Text>
                <Switch onValueChange={toggleSaude} value={isCoordSaude} />
              </View>

              <View className="h-14 my-4 items-center gap-2">
                <Text className="font-default text-white text-xs">
                  Cidadenia
                </Text>
                <Switch
                  onValueChange={toggleCidadania}
                  value={isCoordCidadania}
                />
              </View>
            </View>
          </View>

          <View className="w-80 py-7 px-5 mx-5 gap-4 bg-white/20 rounded-xl">
            <Text className="font-default text-lg text-white">Nome</Text>
            <TextInput
              className="font-default text-lg rounded-xl text-white"
              value={nome}
              onChangeText={(text) => setNome(text)}
              placeholder={`${nome ? nome : ""}`}
              placeholderTextColor="#000"
            />

            <Text className="font-default text-lg text-white">Idade</Text>
            <TextInput
              className="font-default text-lg rounded-xl text-white"
              value={idade}
              onChangeText={(text) => setIdade(text)}
              placeholder={`${idade ? idade : ""}`}
              placeholderTextColor="#000"
            />

            <Text className="font-default text-lg text-white">Endereço</Text>
            <TextInput
              className="font-default text-lg rounded-xl text-white"
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder={`${address ? address : ""}`}
              placeholderTextColor="#000"
            />

            <Text color="white">Bairro</Text>

           

            <Text className="font-default text-lg text-white">NIS</Text>
            <TextInput
              className="font-default text-lg rounded-xl text-white"
              value={nis}
              onChangeText={(text) => setNis(text)}
              placeholder={`${nis ? nis : ""}`}
              placeholderTextColor="#000"
            />

            <Text className="font-default text-lg text-white">CPF</Text>
            <TextInput
              className="font-default text-lg rounded-xl text-white"
              value={cpf}
              onChangeText={(text) => setCpf(text)}
              placeholder={`${cpf ? cpf : ""}`}
              placeholderTextColor="#000"
            />

            <View className="w-full mt-6 px-3 py-2 bg-white/20 rounded-2xl">
              <View className="w-36">
                <InputInfoUser
                  infoLabel="Filhos"
                  infoValue={filhos?.length === 0 ? "Não" : `${filhos?.length}`}
                />
              </View>

              {filhos?.length === 0 ? "" : <UserFilhos />}
            </View>

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

            <View className="w-20 h-36 justify-start">
              <Text className="font-default mb-8 font-bold text-white">
                Autista
              </Text>
              <Switch value={autista} onValueChange={toggleAutista} />
            </View>

            <Text className="font-default font-bold text-white">Contato</Text>
            <TextInput
              className="rounded-2xl bg-white/10 border-white/20"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder={`${phone ? phone : ""}`}
              placeholderTextColor="#000"
            />

            <Text className="font-default font-bold text-white">Email</Text>
            <TextInput
              className="rounded-2xl bg-white/10 border-white/20"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder={`${email ? email : ""}`}
              placeholderTextColor="#000"
            />

            <Text className="font-default font-bold text-white">Senha</Text>
            <TextInput
              className="rounded-2xl bg-white/10 border-white/20"
              value={pass}
              onChangeText={(text) => setPass(text)}
              placeholder={`${pass ? pass : ""}`}
              placeholderTextColor="#000"
            />

            <Text className="font-default font-bold text-white">Opinião</Text>
            <TextInput
              className="rounded-2xl bg-white/10 border-white/20"
              value={opnion}
              onChangeText={(text) => setOpnion(text)}
              placeholder={`${opnion ? opnion : ""}`}
              placeholderTextColor="#000"
            />
          </View>

          <Button
            className="w-72 h-64 mx-5 my-5 bg-blue-700 rounded-full"
            onPress={() => {
              updateUser() && navigation.goBack();
            }}
          >
            SALVAR
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
