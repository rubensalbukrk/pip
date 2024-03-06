import axios, { formToJSON } from "axios";
import { api } from "../../api/api";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  StatusBar,
} from "react-native";
import SelectDrop from "react-native-select-dropdown";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";
import { ParentsProps } from "../../interfaces/Parents";
import { TextLarge, TextSmall } from "../../../components/TextLg/Text";
import { LottieView } from "../../utils/LottieView";
import colors from "tailwindcss/colors";
import { WarningError } from "../../../components/Warnings/isError";
import { WarningSucess } from "../../../components/Warnings/isSucess";
import firebase from '@react-native-firebase/app'

export const citys = [
  "MIRIRI",
  "LEROLÂNDIA",
  "FORTE VELHO",
  "RIBEIRA",
  "LIVRAMENTO",
  "BEBELÂNDIA",
  "USINA SÃO JOÃO",
  "CENTRO",
  "SANTA CRUZ",
  "VIDAL DE NEGREIROS",
  "POPULAR",
  "AÇUDE",
  "TIBIRI II",
  "VÁRZEA NOVA",
  "HEITEL",
  "MARCOS MOURA",
  "CICEROLÂNDIA",
  "ODILÂNDIA",
];
export const grauParents = [
  "Pai",
  "Mãe",
  "Filho(a)",
  "Sobrinho(a)",
  "Esposo(a)",
  "Companheiro(a)",
  "Avó",
  "Avô",
  "Primo(a)",
  "Genro",
  "Nora",
  "Cunhado(a)",
  "Neto(a)",
  "Tio(a)",
  "Amigo(a) da família",
];

export const Cadastro = () => {
  const [isOk, setIsOk] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAutistEnabled, setAutistEnabled] = useState(false);
  const [isPcdEnabled, setPcdEnabled] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [formData, setData] = useState(null);
  const [bairro, setBairro] = useState("");
  const [dataParents, setDataParents] = useState<ParentsProps>({
    parentesco: undefined,
    nome: undefined,
    idade: undefined,
    cpf: undefined,
    isAutist: false,
    isPcd: false,
  });

  const [parents, setParents] = useState<ParentsProps[]>([]);
  const { navigate, goBack } = useNavigation();

  const createUser = () => {
    try {
      console.log(formData)
      const task = firebase.firestore()
      .collection("usuarios")
      .add(formData)
      .then(() => alert('Usuário criado!'))
      
    } catch (error) {
      alert(`error: ${error}`)
    }
  };

  function addParents() {
    try {
      const lastId = parents[parents.length - 1]?.id
      parents?.push({
        parentesco: dataParents.parentesco,
        nome: dataParents.nome,
        idade: dataParents.idade,
        cpf: dataParents.cpf,
        isAutist: dataParents.isAutist,
        isPcd: dataParents.isPcd,
      });
      setData({ ...formData, parents });
    } catch (error) {
      alert("Tente novamente!");
    }
  }

  const UserParents = () => {
    try {
      return (
        <View className="w-full">
          {parents &&
            parents.map((item, index) => {
              return (
                <View
                  key={index}
                  className="w-80 self-center py-3 px-3 my-2 rounded-2xl shadow-md shadow-black bg-slate-300"
                >
                  <TextLarge
                    text={`Grau Parentesco: ${item.parentesco}`}
                    className="text-black text-base"
                  />
                  <TextLarge
                    text={`Nome: ${item.nome}`}
                    className="text-black text-base"
                  />
                  <TextLarge
                    text={`CPF: ${item.cpf}`}
                    className="text-black text-base"
                  />
                  <TextLarge
                    text={`Idade: ${item.idade}`}
                    className="text-black text-base"
                  />
                  <View className="w-full flex-row gap-x-2 items-center">
                    <TextLarge
                      text={"Autista"}
                      className="text-black text-base"
                    />
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
                     <TextLarge
                      text={"PCD"}
                      className="text-black text-base"
                    />
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
                    <Feather name="user-minus" size={32} color="black" />
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      );
    } catch (error) {
      alert("sem parents");
      goBack();
    }
  };

  const togglePcd = () => {
    setDataParents(({ isPcd: previus }) => ({
      ...dataParents,
      isPcd: !previus,
    }));
    setPcdEnabled((previus) => !previus)
  };
  const toggleAutista = () => {
    setDataParents(({ isAutist: previus }) => ({
      ...dataParents,
      isAutist: !previus,
    }));
    setAutistEnabled((previus) => !previus);
  };
  const togglePolicy = (): void => {
    setPolicy((previus) => !previus);
    navigate("Policys");
  };

  return (
    <View className="flex-1 w-full h-full bg-slate-200">
      {isOk && (
        <View
          style={{ zIndex: 20, height: "100%" }}
          className="w-full absolute self-center bg-white"
        >
          <WarningSucess title="Seja bem vindo, agora você tem acesso ao nosso aplicativo!" />
        </View>
      )}
      {isError && (
        <View
          style={{ zIndex: 20, height: "100%" }}
          className="w-full absolute self-center bg-white"
        >
          <WarningError />
        </View>
      )}
      <View className="w-full">
        <LottieView
          autoPlay={true}
          loop
          style={{ width: "70%", alignSelf: "center" }}
          source={require("../../../assets/animations/Animation - Cadastro.json")}
        />
        <TextLarge
          text="Informe seus dados corretamente!"
          className="text-black"
        />
      </View>

      <ScrollView className="w-full px-3">
        <View className="w-full h-full">
          <View className="w-full mt-4">
            <TextLarge text="Nome completo" className="text-black" />
            <TextInput
              className="h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
              onChangeText={(value) => setData({ ...formData, nome: value })}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="Idade" className="text-black" />
            <TextInput
              className="w-14 h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
              onChangeText={(value) => setData({ ...formData, idade: value })}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="CPF" className="text-black" />
            <TextInputMask
              className="w-56 h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
              type="cpf"
              selectionColor={"#9f9f9f"}
              placeholderTextColor={"#bdbdbd"}
              placeholder="000.000.000-00"
              onChangeText={(value) => setData({ ...formData, cpf: value })}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="NIS" className="text-black" />
            <TextInput
              className="w-40 h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
              onChangeText={(value) => setData({ ...formData, nis: value })}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="E-mail" className="text-black" />
            <TextInput
              className="w-64 h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
              onChangeText={(value) => setData({ ...formData, email: value })}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="Endereço" className="text-black" />
            <TextInput
              className="w-80 h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
              onChangeText={(value) => setData({ ...formData, address: value })}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="Bairro" className="text-black" />
            <SelectDrop
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
              onSelect={(selectedItem, index) => {
                setData({ ...formData, bairro: selectedItem})
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>

          <View className="mt-4">
            <TextLarge text="Celular" className="text-black" />
            <TextInput
              className="w-44 h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
              onChangeText={(value) => setData({ ...formData, phone: value })}
            />
          </View>

          <View className="mt-5">
            <TextLarge text="Quantos parentes ?" className="text-black" />
            <TextInput
              className="w-16 h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
              
            />

            <UserParents />

            <View className="w-64 rounded-xl my-5 ml-3 py-3 px-2 bg-slate-100 shadow-md shadow-black">
            <TextLarge text="Grau parentesco" className="text-black text-base" />
              <SelectDrop
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

              <TextLarge text="Nome" className="text-black text-base" />
              <TextInput
                className="w-full h-10 px-2 mb-1 font-default text-start text-black text-lg rounded-2xl bg-slate-200"
                onChangeText={(value) =>
                  setDataParents({ ...dataParents, nome: value })
                }
              />

              <TextLarge text="CPF" className="text-black text-base" />
              <TextInputMask
                className="w-56 h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
                type="cpf"
                selectionColor={"#9f9f9f"}
                placeholderTextColor={"#bdbdbd"}
                value={dataParents.cpf}
                placeholder="000.000.000-00"
                onChangeText={(value) =>
                  setDataParents({ ...dataParents, cpf: value })
                }
              />

              <View className="flex-row w-full items-center justify-between">
                <View className="mb-3">
                  <TextLarge text="Idade" className="text-black text-base" />
                  <TextInput
                    className="w-14 h-10 px-2 mb-1 font-default text-start text-black text-lg rounded-2xl bg-slate-200"
                    keyboardType="number-pad"
                    onChangeText={(value) =>
                      setDataParents({ ...dataParents, idade: value })
                    }
                  />
                </View>
                <View className="flex-row items-center px-2">
                  <View>
                  <TextLarge text="Autista" className="text-black text-base" />
                  <Switch
                    value={dataParents?.isAutist}
                    trackColor={{ false: "#cfcfcf", true: "#bebebe" }}
                    thumbColor={isAutistEnabled ? "#217aff" : "#cecece"}
                    onValueChange={toggleAutista}
                  />
                  </View>
                  <View>
                  <TextLarge text="PCD" className="text-black" />
                  <Switch
                    value={dataParents?.isPcd}
                    trackColor={{ false: "#cfcfcf", true: "#bebebe" }}
                    thumbColor={isPcdEnabled ? "#217aff" : "#cecece"}
                    onValueChange={togglePcd}
                  />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                className="w-11 h-11 top-1 justify-center items-center rounded-lg bg-blue-400"
                onPress={() => addParents()}
              >
                <TextLarge text=" + " />
              </TouchableOpacity>
            </View>
          </View>
          <TextSmall
            className="text-zinc-400"
            text="Cuidado, você precisa dessa senha para acessar, caso esqueça será necessário entrar em contato com nossa coordenação."
          />
          <TextLarge text="Digite uma senha" className="text-black" />
          <TextInput
            className="w-52 h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
            onChangeText={(value) => setData({ ...formData, password: value })}
          />

          <TextLarge text="Confirmar senha" className="text-black" />
          <TextInput
            className="w-52 h-10 px-2 font-default text-start text-lg rounded-2xl bg-blue-500/10"
            onChangeText={(value) => setData({ ...formData, password: value })}
          />
          <TextLarge
            className="mt-4 underline text-blue-700 text-base"
            text="Concordo e aceito com os termos de políticas"
          />
          <Switch
            value={policy}
            className="self-start ml-3"
            trackColor={{ false: "#cfcfcf", true: "#bebebe" }}
            thumbColor={policy ? "#217aff" : "#cecece"}
            onValueChange={togglePolicy}
          />
          <TouchableOpacity
            disabled={!policy}
            className="w-72 h-12 my-3 mt-8 shadow-lg shadow-black self-center justify-center items-center bg-blue-600 rounded-lg"
            onPress={() => createUser()}
          >
            <TextLarge text="Enviar" className="text-white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-72 h-12 my-3 self-center shadow-lg shadow-black justify-center items-center bg-blue-400 rounded-lg"
            onPress={() => goBack()}
          >
            <TextLarge text="Voltar" className="text-black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor={"#e2e8f0"}
        barStyle="dark-content"
        translucent={true}
      />
    </View>
  );
};
