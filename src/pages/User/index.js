import React, { useContext, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { UserContext } from "../../contexts/UserContext";
import InputInfoUser from "../../../components/UserLayout/inputUser";
import MyParents from "../../../components/UserLayout/userParents";
import {
  api
} from "../../requisitions/api";
import * as ImagePicker from "expo-image-picker";
import UserAvatar from "../../../components/UserAvatar";

const apiUpload = `${api}/upload`;

export const User = () => {
  const {
    users,
    setUsers,
    logged,
    avatar,
    setAvatar,
    setLogged,
    solicitations,
    setSolicitations,
    setAprovados,
    aprovados,
  } = useContext(UserContext);
  const { auth, setAuth } = useContext(AuthContext);
  const navigation = useNavigation();

  var nome = logged?.nome;
  var parentsCount = logged?.filhos?.length;
  var primeiro_nome = nome?.split(" ").shift();

  useEffect(() => {
    getSolicitations(), getAprovados();
  }, []);

  if (solicitations) {
    var userSolicitations = solicitations.filter(
      (item) => String(item.cpf) === String(logged.cpf)
    );
  }
  const getSolicitations = async () => {
    try {
      const response = await axios.get(`${api}/solicitations`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      const solicitations = await response.data.solicitations;
      setSolicitations(solicitations);
    } catch (error) {
      alert("Houve um problema com o servidor, aguarde um momento!");
    }
  };
  const getAprovados = async () => {
    const { setAprovados } = useContext(UserContext);
    try {
      const response2 = await axios.get(`${api}/aprovados`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      const aprovados = await response2.data.aprovados;
      setAprovados(aprovados);
    } catch (error) {
      alert("Houve um problema com o serviço, aguarde um momento!") &
        navigate("HomeApp");
    }
  };
  const pickImageAsync = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!canceled) {
      const filename = assets[0].uri.substring(
        assets[0].uri.lastIndexOf("/") + 1,
        assets[0].uri.length
      );
      const extend = filename.split(".")[1];
      const formData = new FormData();
      formData.append(
        "file",
        JSON.parse(
          JSON.stringify({
            name: filename,
            uri: assets[0].uri,
            type: "image/" + extend,
          })
        )
      );
      axios
        .post(`${api}/upload`, formData, {
          headers: new Headers({
            "ngrok-skip-browser-warning": "69421",
          }),
        })
        .then(() => {
          updateUserAvatar(filename);
        })
        .then(() => {
          getUserData();
        })
        .then(() => {
          setAvatar(logged.avatar);
        });
    } else {
      alert("Você não escolheu uma imagem!");
    }
  };
  function updateUserAvatar(fileName) {
    let userUpdate = {
      ...logged,
      avatar: `${api}/files/${fileName}`,
    };
    axios.put(`${api}/users/${logged.id}`, userUpdate, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69421",
      }),
    });
  }

  function getUserData() {
    axios
      .get(`${api}/users/${logged.id}`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      .then((response) => {
        const user = response.data;
        setLogged(user);
      })
      .catch((error) => console.error(error));
  }

  return (
    <View className="flex-1 w-full items-center bg-blue-600">
      <View className="w-full bg-blue-800 h-32 items-center justify-center">
        <View className="flex-row absolute w-full h-10 top-14 items-center justify-between">
          <TouchableOpacity
            className="w-30 h-14 items-center justify-center"
            onPress={() => {
              navigation.navigate("HomeApp");
            }}
          >
            <Feather name="arrow-left-circle" color="white" size={28} />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-20 h-20 items-center justify-center opacity-80"
            onPress={() => alert("abrindo menu de opçoes")}
          >
            <Feather size={32} color="white" name="settings" />
          </TouchableOpacity>
        </View>

        <View className="flex-row bottom-10">
          <View className="absolute mb-2">
            <UserAvatar x={100} y={100} />
          </View>

          <View className="w-14 h-7 absolute top-20 left-5 bg-blue-800 rounded-md">
            {logged?.isAdmin == true
              ? "Admin"
              : "Membro" && logged?.isEtg == true
              ? "Estágiario"
              : "Membro" && logged?.isVolt == true
              ? "Voluntário"
              : "Membro" && logged?.isCoordCidadania == true
              ? "Coord Cidadania"
              : "Membro" && logged?.isCoordAutist == true
              ? "Coord Autistas"
              : "Membro" && logged?.isCoordMulher == true
              ? "Coord Mulher"
              : "Membro" && logged?.isCoordSaude == true
              ? "Coord Saúde"
              : "Membro" && logged?.isCoordAlimentar == true
              ? "Coord Alimentar"
              : "Membro" && logged?.isCoordProtagonista == true
              ? "Coord Protagonista"
              : "Membro" && logged?.isCoordPasse == true
              ? "Coord Passe"
              : "Membro"}
          </View>
          <View className="left-5 top-24 absolute">
            <TouchableOpacity
              className="w-60 h-7 bg-blue-400 rounded-lg"
              onPress={() => pickImageAsync()}
            >
              <Text className="font-default underline text-lg text-white">
                Alterar
              </Text>
            </TouchableOpacity>
            <Text className="font-default mt-4 text-lg text-white">
              Olá {primeiro_nome}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="w-full bg-blue-600" horizontal={true}>
        <View>
          <View className="w-96 mb-10 rounded-lg">
            <View className="flex-row h-30 justify-center items-center">
              <MaterialIcons name="info-outline" size={32} color="white" />

              <Text className="font-default ml-2 text-lg text-white">
                Meus dados
              </Text>
            </View>

            <InputInfoUser
              infoLabel="Data de inscrição"
              infoValue={logged.date}
            />
            <InputInfoUser infoLabel="Nome Civil" infoValue={logged.nome} />
            <InputInfoUser infoLabel="Idade" infoValue={logged.idade} />
            <InputInfoUser infoLabel="Endereço" infoValue={logged.address} />
            <InputInfoUser infoLabel="Bairro" infoValue={logged.bairro} />

            <InputInfoUser infoLabel="CPF" infoValue={logged.cpf} />
            <InputInfoUser infoLabel="NIS" infoValue={logged.nis} />
            <InputInfoUser infoLabel="Email" infoValue={logged.email} />
            <InputInfoUser infoLabel="Celular" infoValue={logged?.phone} />
            <InputInfoUser
              infoLabel="Membro PIP"
              infoValue={logged.question1 ? "SIM" : "NÃO"}
            />
            <View className="w-full mt-6 px-3 py-2 rounded-2xl">
              <View className="w-44">
                <InputInfoUser
                  infoLabel="Filhos"
                  infoValue={
                    logged.filhos?.length === "0"
                      ? "Não"
                      : `${logged.filhos?.length}`
                  }
                />
              </View>

              {logged?.filhos?.length === 0
                ? "NÃO"
                : logged?.filhos?.map((item) => {
                    return (
                      <View className="w-full" key={`id-${item.cpf}`}>
                        <MyParents
                          nome={item.nome}
                          cpf={item.cpf}
                          idade={item.idade}
                        />
                      </View>
                    );
                  })}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Menu de opções de usuário */}
      {
        // <Center>
        // <Actionsheet isOpen={isOpen} onClose={onClose} size="100%">
        //   <Actionsheet.Content bg={"rgba(0, 173, 255, 0.40)"}>
        //     <View
        //       w="100%"
        //       borderTopRadius={"xl"}
        //       bg={"lightBlue.500"}
        //       h={60}
        //       px={4}
        //       justifyContent="center"
        //     >
        //       <Text style={[GlobalStyles.fontSystem]}>Menu</Text>
        //     </View>
        //     {logged?.isCoordAutist == true && (
        //       <Actionsheet.Item
        //         bg={"lightBlue.500"}
        //         startIcon={
        //           <MaterialIcons
        //             size={32}
        //             color="white"
        //             name="admin-panel-settings"
        //           />
        //         }
        //       >
        //         <Pressable
        //           style={{ width: "100%" }}
        //           w="100%"
        //           h="100%"
        //           onPress={() =>
        //             navigation.navigate("PageCoordenador", {
        //               title: "Coordenação do Autista",
        //             })
        //           }
        //         >
        //           <Text style={[GlobalStyles.fontSystem]}>
        //             Coordenação dos Autistas
        //           </Text>
        //         </Pressable>
        //       </Actionsheet.Item>
        //     )}
        //     {logged?.isCoordMulher == true && (
        //       <Actionsheet.Item
        //         bg={"lightBlue.500"}
        //         startIcon={
        //           <MaterialIcons
        //             size={32}
        //             color="white"
        //             name="admin-panel-settings"
        //           />
        //         }
        //       >
        //         <Pressable
        //           style={{ width: "100%" }}
        //           w="100%"
        //           h="100%"
        //           onPress={() =>
        //             navigation.navigate("PageCoordenador", {
        //               title: "Coordenação da Mulher",
        //             })
        //           }
        //         >
        //           <Text style={[GlobalStyles.fontSystem]}>
        //             Coordenação da Mulher
        //           </Text>
        //         </Pressable>
        //       </Actionsheet.Item>
        //     )}
        //     {logged?.isCoordSaude == true && (
        //       <Actionsheet.Item
        //         bg={"lightBlue.400"}
        //         startIcon={
        //           <MaterialIcons
        //             size={32}
        //             color="white"
        //             name="admin-panel-settings"
        //           />
        //         }
        //       >
        //         <Pressable
        //           style={{ width: "100%" }}
        //           w="100%"
        //           h="100%"
        //           onPress={() =>
        //             navigation.navigate("PageCoordenador", {
        //               title: "Coordenação da Saúde",
        //             })
        //           }
        //         >
        //           <Text style={[GlobalStyles.fontSystem]}>
        //             Coordenação da Saúde
        //           </Text>
        //         </Pressable>
        //       </Actionsheet.Item>
        //     )}
        //     {logged?.isCoordAlimentar == true && (
        //       <Actionsheet.Item
        //         bg={"lightBlue.400"}
        //         startIcon={
        //           <MaterialIcons
        //             size={32}
        //             color="white"
        //             name="admin-panel-settings"
        //           />
        //         }
        //       >
        //         <Pressable
        //           style={{ width: "100%" }}
        //           w="100%"
        //           h="100%"
        //           onPress={() =>
        //             navigation.navigate("PageCoordenador", {
        //               title: "Coordenação da Alimentação",
        //             })
        //           }
        //         >
        //           <Text style={[GlobalStyles.fontSystem]}>
        //             Coordenação da Alimentação
        //           </Text>
        //         </Pressable>
        //       </Actionsheet.Item>
        //     )}
        //     {logged?.isCoordCidadania == true && (
        //       <Actionsheet.Item
        //         bg={"lightBlue.400"}
        //         startIcon={
        //           <MaterialIcons
        //             size={32}
        //             color="white"
        //             name="admin-panel-settings"
        //           />
        //         }
        //       >
        //         <Pressable
        //           style={{ width: "100%" }}
        //           w="100%"
        //           h="100%"
        //           onPress={() =>
        //             navigation.navigate("PageCoordenador", {
        //               title: "Coordenação da Cidadania",
        //             })
        //           }
        //         >
        //           <Text style={[GlobalStyles.fontSystem]}>
        //             Coordenação da Cidadania
        //           </Text>
        //         </Pressable>
        //       </Actionsheet.Item>
        //     )}
        //     {logged?.isCoordProtagonista == true && (
        //       <Actionsheet.Item
        //         bg={"lightBlue.400"}
        //         startIcon={
        //           <MaterialIcons
        //             size={32}
        //             color="white"
        //             name="admin-panel-settings"
        //           />
        //         }
        //       >
        //         <Pressable
        //           style={{ width: "100%" }}
        //           w="100%"
        //           h="100%"
        //           onPress={() =>
        //             navigation.navigate("PageCoordenador", {
        //               title: "Coordenação Protagonistas",
        //             })
        //           }
        //         >
        //           <Text style={[GlobalStyles.fontSystem]}>
        //             Coordenação Protagonistas
        //           </Text>
        //         </Pressable>
        //       </Actionsheet.Item>
        //     )}
        //     {logged?.isCoordPasse == true && (
        //       <Actionsheet.Item
        //         bg={"lightBlue.400"}
        //         startIcon={
        //           <MaterialIcons
        //             size={32}
        //             color="white"
        //             name="admin-panel-settings"
        //           />
        //         }
        //       >
        //         <Pressable
        //           style={{ width: "100%" }}
        //           w="100%"
        //           h="100%"
        //           onPress={() =>
        //             navigation.navigate("PageCoordenador", {
        //               title: "Coordenação do Passe Livre",
        //             })
        //           }
        //         >
        //           <Text style={[GlobalStyles.fontSystem]}>
        //             Coordenação do Passe Livre
        //           </Text>
        //         </Pressable>
        //       </Actionsheet.Item>
        //     )}
        //     {logged.isAdmin == true && (
        //       <Actionsheet.Item
        //         bg={"lightBlue.400"}
        //         startIcon={
        //           <MaterialIcons
        //             size={32}
        //             color="white"
        //             name="admin-panel-settings"
        //           />
        //         }
        //       >
        //         <Pressable
        //           style={{ width: "100%" }}
        //           w="100%"
        //           h="100%"
        //           onPress={() => navigation.navigate("Admin")}
        //         >
        //           <Text style={[GlobalStyles.fontSystem]}>
        //             Painel de Administração
        //           </Text>
        //         </Pressable>
        //       </Actionsheet.Item>
        //     )}
        //     <Actionsheet.Item
        //       bg={"lightBlue.500"}
        //       startIcon={
        //         <MaterialCommunityIcons
        //           size={32}
        //           color="white"
        //           name="archive-edit"
        //         />
        //       }
        //     >
        //       <Text style={[GlobalStyles.fontSystem]}>Alterar dados</Text>
        //     </Actionsheet.Item>
        //     <Actionsheet.Item
        //       borderBottomRadius={"xl"}
        //       bg={"lightBlue.500"}
        //       startIcon={
        //         <Ionicons size={32} color="white" name="md-close-circle" />
        //       }
        //     >
        //       <Pressable
        //         style={{ width: "100%" }}
        //         w="100%"
        //         h="100%"
        //         onPress={() =>
        //           navigation.navigate("Login") &
        //           setAuth(false) &
        //           setLogged([]) &
        //           AsyncStorage.clear()
        //         }
        //       >
        //         <Text style={[GlobalStyles.fontSystem]}>Sair</Text>
        //       </Pressable>
        //     </Actionsheet.Item>
        //   </Actionsheet.Content>
        // </Actionsheet>
        //</View> </Center>
      }
    </View>
  );
};
