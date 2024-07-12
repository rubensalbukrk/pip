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
import { TextLarge, TextSmall } from "../../../../components/TextLg/Text";
import { ParentsProps } from "../../../interfaces/Parents";
import { AuthContext } from "../../../contexts/AuthContext";
import { citys, grauParents } from "../../../stacks/Cadastro";
import colors from "tailwindcss/colors";
import SelectDropdown from "react-native-select-dropdown";
import { TextInputMask } from "react-native-masked-text";
import firestore from "@react-native-firebase/firestore";

export default function EditUser({ route }) {
  const { token } = useContext<any>(AuthContext);
  const [updateList, setUpdateList] = useState(false);
  const [formData, setData] = useState({});
  const [bairro, setBairro] = useState<string>(route?.params?.bairro);
  const [voluntario, setVoluntario] = useState<boolean>(route?.params?.isVolt);
  const [estagiario, setEstagiario] = useState<boolean>(route?.params?.isEtg);
  const [isBusiness, setBusiness] = useState<boolean>(
    route?.params?.isBusiness || false
  );

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
  const [isCoordSaude, setIsCoordSaude] = useState<boolean>(
    route?.params?.isCoordSaude
  );
  const [isCoordProtagonista, setIsCoordProtagonista] = useState<boolean>(
    route?.params?.isCoordProtagonista
  );
  const [isCoordPasse, setIsCoordPasse] = useState<boolean>(
    route?.params?.isCoordPasse
  );
  const [isCoordCursos, setIsCoordCursos] = useState<boolean>(
    route?.params?.isCoordCursos || null
  );
  const [isCoordOptometria, setIsCoordOptometria] = useState<boolean>(
    route?.params?.isCoordOptometria || null
  );
  const [nome, setNome] = useState<string>(route?.params?.nome);
  const [avatar, setAvatar] = useState<string>(route?.params?.avatar);
  const [idade, setIdade] = useState<string>(route?.params?.idade);
  const [address, setAddress] = useState<string>(route?.params?.address);
  const [cpf, setCpf] = useState<string>(route?.params?.cpf);
  const [nis, setNis] = useState<string>(route?.params?.nis);
  const [dataParents, setDataParents] = useState<ParentsProps>();
  const [parents, setParents] = useState<ParentsProps[]>(
    route?.params?.parents
  );
  const [phone, setPhone] = useState<string>(route?.params?.phone);
  const [email, setEmail] = useState<string>(route?.params?.email);
  const [opnion, setOpnion] = useState<string>(route?.params?.question2);
  const [pass, setPass] = useState<string>(route?.params?.password);
  const navigation = useNavigation();


  const atualizarUsuarioPorCPF = async (cpf: string) => {
    try {

    const usuariosCollection = firestore().collection('usuarios');

    const querySnapshot = await usuariosCollection.where('cpf', '==', cpf).get();
    if (querySnapshot.size > 0) {
      // Obtém o primeiro documento (assumindo que o CPF é único)
      const usuarioDoc = querySnapshot.docs[0];

      var idDoc = usuarioDoc.id.toString();
      const usuarioRef = firestore().collection('usuarios').doc(idDoc);

      await usuarioRef.update({
        isVolt: voluntario || false,
        isEtg: estagiario || false,
        isCoordMulher: isCoordMulher || false,
        isCoordAutist: isCoordAutist || false,
        isCoordSaude: isCoordSaude || false,
        isCoordAlimentar: isCoordAlimentar || false,
        isCoordPasse: isCoordPasse || false,
        isCoordCidadania: isCoordCidadania || false,
        isCoordProtagonista: isCoordProtagonista || false,
        isCoordOptometria: isCoordOptometria || false,
        isCoordCursos: isCoordCursos || false,
        isBusiness: isBusiness || false,
        nome: nome,
        idade: idade,
        avatar: avatar,
        address: address,
        bairro: bairro,
        cpf: cpf,
        nis: nis,
        parents: parents,
        phone: phone,
        email: email,
    
        password: pass,
      });
      alert(`Usuário de CPF: ${cpf} ATUALIZADO COM SUCESSO!`);
    } 

    } catch (error) {
      
      console.error(`Erro ao atualizar usuário por CPF:`, error );
    }
  };

  const UserParents = () => {
    try {
      return (
        <View className="w-full">
          {parents &&
            parents.map((item, index) => {
              return (
                <View
                  key={index}
                  className="w-80 py-3 px-3 my-2 rounded-2xl bg-white/20"
                >
                  <TextLarge text={`Parentesco: ${item.parentesco}`} />
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
                  <View className="w-full flex-row gap-x-2 items-center">
                    <TextLarge text={"PCD"} />
                    {item.isPcd ? (
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
                      parents.splice(index, 1);
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
      alert("Não tem parents");
    }
  };

  function addParents() {
    try {
      parents?.push({
        parentesco: dataParents.parentesco,
        nome: dataParents.nome,
        idade: dataParents.idade,
        cpf: dataParents.cpf,
        isAutist: dataParents.isAutist,
        isPcd: dataParents.isPcd,
      });
      alert("Adicionado");
    } catch (error) {
      alert("Dados incorretos, tente novamente");
    }
  }
  const toggleParentsPcd = () => {
    setDataParents(({ isPcd: previus }) => ({
      ...dataParents,
      isPcd: !previus,
    }));
  };
  const toggleParentAutist = () => {
    setDataParents(({ isAutist: previus }) => ({
      ...dataParents,
      isAutist: !previus,
    }));
  };
  const toggleBusiness = () => {
    setBusiness((previous) => !previous);
  };
  const toggleEstagio = () => {
    setEstagiario((previousState) => !previousState);
  };
  const toggleVoluntario = () => {
    setVoluntario((previousState) => !previousState);
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
  const toggleOptometria = () => {
    setIsCoordOptometria((previousState) => !previousState);
  };
  const toggleCursos = () => {
    setIsCoordCursos((previousState) => !previousState);
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
              <TextSmall text="Estagiário" className="text-xs mb-2" /> 
              <Switch
                style={{ width: 30, height: 20, alignSelf: "center" }}
                onValueChange={() => {
                  toggleEstagio();
                }}
                value={estagiario}
              />
              <TextSmall text="Voluntário" className="text-xs mb-2" />
              <Switch
                style={{ width: 30, height: 20, alignSelf: "center" }}
                value={voluntario}
                onValueChange={() => toggleVoluntario()}
              />
              <TextSmall text="Empresa" className="text-xs mb-2" />
              <Switch
                style={{ width: 30, height: 20, alignSelf: "center" }}
                value={isBusiness}
                onValueChange={() => toggleBusiness()}
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

              <View className="items-center">
                <Text className="font-default text-white text-xs mb-2">
                  Optometria
                </Text>
                <Switch
                  style={{ width: 30, height: 15, alignSelf: "center" }}
                  onValueChange={toggleOptometria}
                  value={isCoordOptometria}
                />
              </View>
              <View className="items-center">
                <Text className="font-default text-white text-xs mb-2">
                  Cursos
                </Text>
                <Switch
                  style={{ width: 30, height: 15, alignSelf: "center" }}
                  onValueChange={toggleCursos}
                  value={isCoordCursos}
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
            <SelectDropdown
              defaultButtonText="Selecionar"
              dropdownIconPosition="right"
              renderDropdownIcon={() => (
                <Feather name="arrow-down" size={28} color="black"></Feather>
              )}
              buttonStyle={{
                borderRadius: 30,
                backgroundColor: `${colors.blue[200]}`,
              }}
              data={citys}
              defaultValue={bairro}
              onSelect={(selectedItem, index) => {
                setBairro(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            <Text className="font-default text-lg text-white/60">NIS</Text>
            <TextInput
              className="font-default w-36 text-lg px-2 mb-2 rounded-lg text-white bg-zinc-400/20"
              value={nis}
              onChangeText={(text) => setNis(text)}
              placeholder={`${nis ? nis : ""}`}
              placeholderTextColor="#fff"
            />

            <Text className="font-default text-lg text-white/60">CPF</Text>
            <TextInputMask
              className="w-56 h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
              type="cpf"
              selectionColor={"#9f9f9f"}
              placeholderTextColor={"#bdbdbd"}
              placeholder={`${cpf ? cpf : "000.000.000-00"}`}
              onChangeText={(text) => setCpf(text)}
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
                  Parentes
                </Text>
                <Text className="font-default text-white text-lg">
                  {setParents ? setParents.length : "Não tem"}
                </Text>
              </View>
              {setParents?.length === 0 ? "" : <UserParents />}
            </View>

            <View className="w-64 rounded-xl my-5 py-3 px-2 bg-white/20">
              <TextLarge text="Parentesco" />
              <SelectDropdown
                defaultButtonText="Selecionar"
                dropdownIconPosition="right"
                renderDropdownIcon={() => (
                  <Feather name="arrow-down" size={28} color="black" />
                )}
                buttonStyle={{
                  borderRadius: 30,
                  backgroundColor: `${colors.blue[200]}`,
                }}
                data={grauParents}
                onSelect={(selectedItem, index) => {
                  setDataParents({ ...dataParents, parentesco: selectedItem });
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
              <TextLarge text="Nome" />
              <TextInput
                className="w-full h-10 px-2 mb-1 font-default text-start text-white text-lg rounded-2xl bg-white/10 border-white/20"
                onChangeText={(value) =>
                  setDataParents({ ...dataParents, nome: value })
                }
              />

              <TextLarge text="CPF" />
              <TextInputMask
                className="w-56 h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
                type="cpf"
                selectionColor={"#9f9f9f"}
                placeholderTextColor={"#bdbdbd"}
                placeholder="000.000.000-00"
                onChangeText={(value) =>
                  setDataParents({ ...dataParents, cpf: value })
                }
              />

              <View className="flex-row w-full items-center justify-between">
                <View className="mb-3">
                  <TextLarge text="Idade" />
                  <TextInput
                    className="w-14 h-10 px-2 font-default text-center text-white text-lg rounded-2xl bg-white/10 border-white/20"
                    keyboardType="number-pad"
                    onChangeText={(value) =>
                      setDataParents({ ...dataParents, idade: value })
                    }
                  />
                </View>
                <View className="items-center px-2">
                  <TextLarge text="Autista" />
                  <Switch
                    value={dataParents?.isAutist}
                    trackColor={{ false: "#9f9f9f", true: "#767590" }}
                    onValueChange={toggleParentAutist}
                  />
                  <TextLarge text="PCD" />
                  <Switch
                    value={dataParents?.isPcd}
                    trackColor={{ false: "#9f9f9f", true: "#767590" }}
                    onValueChange={toggleParentsPcd}
                  />
                </View>
              </View>
              <TouchableOpacity
                className="w-11 h-11 top-1 justify-center items-center rounded-lg bg-white/30"
                onPress={() => addParents()}
              >
                <TextLarge text="+" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="flex-row w-48 h-20 mx-5 my-5 justify-evenly items-center bg-zinc-700 rounded-lg"
            onPress={() => atualizarUsuarioPorCPF(cpf)}
          >
            <Feather name="save" size={32} color={"white"} />
            <Text className="font-default text-white text-2xl">SALVAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
