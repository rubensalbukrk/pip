import React, { useContext } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import BackButton from "../../../../components/BackButton";
import { UserContext } from "../../../contexts/UserContext";
import { api } from "../../../api/api";
import BackgroundTop from "../../../../assets/svgs/User-top-waves.svg";
import BackgroundBottom from ".../../../assets/svgs/User-bottom-wave.svg";
import { width } from "../../../utils/dimensions";
import { AuthContext } from "../../../contexts/AuthContext";
import { TextLarge, TextSmall } from "../../../../components/TextLg/Text";

export default function ViewService({ route }) {
  const { token } = useContext(AuthContext);
  const { logged } = useContext<any>(UserContext);

  function handleSolicitation(service) {
    let newSolicitation = {
      userInfo: logged,
      nome: logged?.nome,
      cpf: logged?.cpf,
      service: service,
      pasta: `${route?.params?.pasta}`,
      status: "Aguardando analise...",
    };
    axios
      .post(`${api.BASE_URL}/solicitations`, newSolicitation, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => console.error(error));
  }

  return (
    <View className="flex-1 w-full h-full items-center bg-white">
      <BackgroundTop
        style={{ zIndex: 0, position: "absolute", top: -10 }}
        width={width}
      />
      <View style={{ zIndex: 3 }} className="absolute top-9 left-4">
        <BackButton />
      </View>
      <Image
        style={{ zIndex: 2, alignSelf: "center", marginVertical: "10%" }}
        className=" w-40 h-40 my- rounded-full"
        resizeMode="cover"
        alt="pip-service"
        source={route?.params?.picture}
      />
      <View style={{zIndex: 4}} className="w-full px-3 bg-transparent">
        <Text className="font-default self-start text-2xl text-gray-800">
          {route?.params?.title}
        </Text>

        <Text className="font-default text-md text-gray-800">
          {route?.params?.descrition}
        </Text>

        <Text className="font-default self-start text-2xl mt-6 text-gray-800">
          Serviços disponíveis
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%', backgroundColor: 'transparent' }}
        >
          
            <View className="w-full h-full items-center">
            {route?.params?.requisite[0] ? (
              <TouchableOpacity
                className="w-80 h-10 shadow-lg shadow-black my-2 rounded-lg justify-center px-3 bg-blue-400"
                onPress={() => handleSolicitation(route?.params?.requisite[0])}
              >
                <TextSmall text={route?.params?.requisite[0]} />
              </TouchableOpacity>
            ) : null}
            {route?.params?.requisite[1] ? (
              <TouchableOpacity
                className="w-80 h-10 shadow-md shadow-black my-3 rounded-md justify-center px-3 bg-blue-500"
                onPress={() => handleSolicitation(route?.params?.requisite[1])}
              >
                <TextSmall text={route?.params?.requisite[1]} />
              </TouchableOpacity>
            ) : null}
            {route?.params?.requisite[2] ? (
              <TouchableOpacity
                className="w-80 h-10 shadow-md shadow-black my-3 rounded-md justify-center px-3 bg-blue-400"
                onPress={() => handleSolicitation(route?.params?.requisite[2])}
              >
                <TextSmall text={route?.params?.requisite[2]} />
              </TouchableOpacity>
            ) : null}
            {route?.params?.requisite[3] ? (
              <TouchableOpacity
                className="w-80 h-10 shadow-md shadow-black my-3 rounded-md justify-center px-3 bg-blue-500"
                onPress={() => handleSolicitation(route?.params?.requisite[3])}
              >
                <TextSmall text={route?.params?.requisite[3]} />
              </TouchableOpacity>
            ) : null}
            </View>
          
        </ScrollView>
      </View>
      <BackgroundBottom
        style={{ zIndex: 0, position: "absolute", bottom: 0 }}
        width={width}
      />
    </View>
  );
}
