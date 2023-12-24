import React, { useState, useContext } from "react";
import axios from "axios";
import { api } from "../../../api/api";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import BackButton from "../../../../components/BackButton";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextLarge } from "../../../../components/TextLg/Text";
import { FilhosProps } from "../../../interfaces/Filhos";
import { AuthContext } from "../../../contexts/AuthContext";

export default function EditUser({ route }) {
  const {token} = useContext<any>(AuthContext)
  const [updateList, setUpdateList] = useState(false);
  const [formData, setData] = useState({});
  const [bairro, setBairro] = useState<string>(route?.params?.bairro);
  const [voluntario, setVoluntario] = useState<boolean>(route?.params?.isVolt);
  const [estagiario, setEstagiario] = useState<boolean>(route?.params?.isEtg);

  const [isCoordAutist, setIsCoordAutist] = useState<boolean>(
    route?.params?.isCoordAutist
  );
  const [isCoordMulher, setIsCoordMulher] = useState<boolean>(
    route?.params?.isCoordMulher
  );
  const [isCoordCidadania, setIsCoordCidadania] = useState<boolean>(
    route?.params?.isCoordCidadania
  );
  const [isCoordAlimentar, setIsCoordAlimentar] = useState<boolean>(
    route?.params?.isCoordAlimentar
  );
  const [isCoordSaude, setIsCoordSaude] = useState<boolean>(route?.params?.isCoordSaude);
  const [isCoordProtagonista, setIsCoordProtagonista] = useState<boolean>(route?.params?.isCoordProtagonista);
  const [isCoordPasse, setIsCoordPasse] = useState<boolean>(route?.params?.isCoordPasse);
  const [autista, setAutista] = useState<boolean>(route?.params?.isAutist);
  const [nome, setNome] = useState<string>(route?.params?.nome);
  const [avatar, setAvatar] = useState<string>(route?.params?.avatar)
  const [idade, setIdade] = useState<string>(route?.params?.idade);
  const [address, setAddress] = useState<string>(route?.params?.address);
  const [cpf, setCpf] = useState<string>(route?.params?.cpf);
  const [nis, setNis] = useState<string>(route?.params?.nis);
  const [dataFilho, setDataFilho] = useState<FilhosProps>();
  const [filhos, setFilhos] = useState<FilhosProps[]>(route?.params?.filhos);
  const [phone, setPhone] = useState<string>(route?.params?.phone);
  const [email, setEmail] = useState<string>(route?.params?.email);
  const [opnion, setOpnion] = useState<string>(route?.params?.question2);
  const [pass, setPass] = useState<string>(route?.params?.password);
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
    question1: true,
    question2: opnion,
    password: pass,
  };

  function updateUser() {
    axios
      .put(`${api.BASE_URL}/users/${route.params.id}`, UserUpdate, {
        method: "put",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        setFilhos([]);
      });
    return Alert.alert("Atualização", "O usuário foi alterado!");
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
      alert("Não tem filhos");
    }
  };

  function addFilhos() {
    try {
      filhos?.push({
        nome: dataFilho.nome,
        idade: dataFilho.idade,
        cpf: dataFilho.cpf,
        isAutist: dataFilho.isAutist
      });
      alert("Adicionado");
    } catch (error) {
      alert("Dados incorretos, tente novamente");
    }
  }
  const toggleFilhoAutista = () => {
    setDataFilho(({ isAutist: previus }) => ({
      ...dataFilho,
      isAutist: !previus,
    }));
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
    <View className="flex-1 w-full h-full items-center justify-center bg-zinc-500">
      <View className="w-full h-100 items-center justify-center rounded-lg">
        <View className="absolute top-10 right-1">
          <BackButton />
        </View>

        <Text className="w-full font-default px-3 text-start mt-14 text-2xl text-white">
          ALTERAR DADOS
        </Text>
      </View>

      <ScrollView className="flex-1 w-full">

        <View className="w-full px-2 justify-center items-center py-10">
          <View className="flex-row w-full rounded-lg items-center">
            <Text className="font-default text-start px-2 mr-3 text-white text-md">
              Selecione o tipo do usuário
            </Text>
            <View className="w-18 items-center">
              <Text className="font-default justify-start text-xs mb-2 text-white">
                Estagiário
              </Text>
              <Switch
                style={{ width: 30, height: 20, alignSelf: "center" }}
                onValueChange={() => {
                  toggleEstagio();
                }}
                value={estagiario}
              />
            </View>
            <View className="w-20 ml-1 items-center">
              <Text className="font-default text-xs mb-2 text-white">
                Voluntário
              </Text>
              <Switch
                style={{ width: 30, height: 20, alignSelf: "center" }}
                value={voluntario}
                onValueChange={() => toggleVoluntario()}
              />
            </View>
          </View>

          <Text className="font-default w-full mt-7 text-start px-4 text-white text-2xl">
            Coordenação
          </Text>
          <Text className="font-default w-full text-start px-3 text-white/50 text-sm">
            Escolha a pasta pela qual ficará responsável
          </Text>

          <View className="w-96 px-5 py-2 my-2 rounded-2xl items-start bg-zinc-700/10">
            <View className="flex-row w-full flex-wrap gap-y-3 gap-x-4">
              <View className="">
                <Text className="font-default text-white text-xs mb-2">
                  Cidadania
                </Text>
                <Switch
                  style={{ width: 30, height: 15, alignSelf: "center" }}
                  onValueChange={toggleCidadania}
                  value={isCoordCidadania}
                />
              </View>
              <View className="items-center">
                <Text className="font-default text-white text-xs mb-2">
                  Autistas
                </Text>
                <Switch
                  style={{ width: 30, height: 15, alignSelf: "center" }}
                  onValueChange={toggleAutist}
                  value={isCoordAutist}
                />
              </View>

              <View className="items-center">
                <Text className="font-default text-white text-xs mb-2">
                  Mulher
                </Text>
                <Switch
                  style={{ width: 30, height: 15, alignSelf: "center" }}
                  onValueChange={toggleMulher}
                  value={isCoordMulher}
                />
              </View>
              <View className="items-center">
                <Text className="font-default text-white text-xs mb-2">
                  Saúde
                </Text>
                <Switch
                  style={{ width: 30, height: 15, alignSelf: "center" }}
                  onValueChange={toggleSaude}
                  value={isCoordSaude}
                />
              </View>
              <View className="items-center">
                <Text className="font-default text-white text-xs mb-2">
                  Protagonista
                </Text>
                <Switch
                  style={{ width: 30, height: 15, alignSelf: "center" }}
                  onValueChange={toggleProtagonista}
                  value={isCoordProtagonista}
                />
              </View>

              <View className="items-center">
                <Text className="font-default text-white text-xs mb-2">
                  Passe Livre
                </Text>

                <Switch
                  style={{ width: 30, height: 15, alignSelf: "center" }}
                  onValueChange={togglePasse}
                  value={isCoordPasse}
                />
              </View>

              <View className="items-center">
                <Text className="font-default text-white text-xs mb-2">
                  Alimentar
                </Text>
                <Switch
                  style={{ width: 30, height: 15, alignSelf: "center" }}
                  onValueChange={toggleAlimentar}
                  value={isCoordAlimentar}
                />
              </View>
            </View>
          </View>
          <Text className="font-default w-full mt-7 text-start px-4 text-white text-2xl">
            Informações do usuário
          </Text>
          <Text className="font-default w-full px-3 text-md text-white/50">
            Altere as informações do usuário
          </Text>

          <View className="w-96 px-5 my-2 bg-zinc-700/10 rounded-xl">
            <Text className="font-default text-lg text-white/60">Nome</Text>
            <TextInput
              className="font-default text-lg px-2 mb-2 rounded-lg text-white bg-zinc-400/20"
              value={nome}
              onChangeText={(text) => setNome(text)}
              placeholder={`${nome ? nome : ""}`}
              placeholderTextColor="#fff"
            />

            <Text className="font-default text-lg text-white/60">Idade</Text>
            <TextInput
              className="font-default w-10 text-lg px-2 mb-2 rounded-lg text-white bg-zinc-400/20"
              value={idade.toString()}
              onChangeText={(text) => setIdade(text)}
              placeholder={`${idade ? idade : ""}`}
              placeholderTextColor="#fff"
            />

            <Text className="font-default text-lg text-white/60">Endereço</Text>
            <TextInput
              className="font-default w-68 text-lg px-2 mb-2 rounded-lg text-white bg-zinc-400/20"
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder={`${address ? address : ""}`}
              placeholderTextColor="#fff"
            />

            <Text className="font-default text-lg text-white/60">Bairro</Text>

            <Text className="font-default text-lg text-white/60">NIS</Text>
            <TextInput
              className="font-default w-36 text-lg px-2 mb-2 rounded-lg text-white bg-zinc-400/20"
              value={nis}
              onChangeText={(text) => setNis(text)}
              placeholder={`${nis ? nis : ""}`}
              placeholderTextColor="#fff"
            />

            <Text className="font-default text-lg text-white/60">CPF</Text>
            <TextInput
              className="font-default w-36 text-lg px-2 mb-2 rounded-lg text-white bg-zinc-400/20"
              value={cpf}
              onChangeText={(text) => setCpf(text)}
              placeholder={`${cpf ? cpf : ""}`}
              placeholderTextColor="#fff"
            />

            <Text className="font-default text-lg text-white/60">Contato</Text>
            <TextInput
              className="font-default w-36 text-lg px-2 mb-2 rounded-lg text-white bg-zinc-400/20"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder={`${phone ? phone : ""}`}
              placeholderTextColor="#fff"
            />

            <Text className="font-default text-lg text-white/60">Email</Text>
            <TextInput
              className="font-default text-lg px-2 mb-2 rounded-lg text-white bg-zinc-400/20"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder={`${email ? email : ""}`}
              placeholderTextColor="#000"
            />

            <Text className="font-default text-lg text-white/60">Senha</Text>
            <TextInput
              className="font-default w-32 text-lg px-2 mb-2 rounded-lg text-white bg-zinc-400/20"
              value={pass}
              onChangeText={(text) => setPass(text)}
              placeholder={`${pass ? pass : ""}`}
              placeholderTextColor="#000"
            />

            <Text className="font-default text-lg text-white/60">Opinião</Text>
            <TextInput
              className="font-default w-full text-lg px-2 mb-2 rounded-lg text-white bg-zinc-400/20"
              value={opnion}
              onChangeText={(text) => setOpnion(text)}
              placeholder={`${opnion ? opnion : ""}`}
              placeholderTextColor="#000"
            />

            <View className="w-full py-2">
              <View className="my-3">
                <Text className="font-default text-lg text-white/60">
                  Filhos
                </Text>
                <Text className="font-default text-white text-lg">
                  {filhos ? filhos.length : "Não tem"}
                </Text>
              </View>
              {filhos?.length === 0 ? "" : <UserFilhos />}
            </View>

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
                    value={dataFilho && dataFilho?.isAutist}
                    trackColor={{ false: "#9f9f9f", true: "#767590" }}
                    onValueChange={toggleFilhoAutista}
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

          <TouchableOpacity
            className="flex-row w-48 h-20 mx-5 my-5 justify-evenly items-center bg-zinc-700 rounded-lg"
            onPress={() => updateUser()}
          >
            <Feather name="save" size={32} color={"white"}/>
            <Text className="font-default text-white text-2xl">SALVAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
