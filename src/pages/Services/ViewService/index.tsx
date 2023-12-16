import React, { useContext } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import BackButton from "../../../../components/BackButton";
import { UserContext } from "../../../contexts/UserContext";
import { api } from "../../../api/api";
import BackgroundTop from "../../../../assets/svgs/User-top-waves.svg";
import BackgroundBottom from ".../../../assets/svgs/User-bottom-wave.svg";
import { width } from "../../../utils/dimensions";

export default function ViewService({ route }) {
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
        method: 'post',
      })
      .then((response) => {
        alert(JSON.stringify(response.data));
      })
      .catch((error) => console.error(error));
  }

  return (
    <View className="flex-1 w-full h-full items-center bg-gray-50">
      <BackgroundTop
        style={{ zIndex: 0, position: "absolute", top: -10 }}
        width={width}
      />
      <View style={{ zIndex: 3 }} className="absolute top-9 left-4">
        <BackButton />
      </View>
      <Image
        style={{ zIndex: 2, alignSelf: "center", marginVertical: '10%' }}
        className=" w-40 h-40 my- rounded-full"
        resizeMode="cover"
        alt="pip-service"
        source={route?.params?.picture}
      />
      <View className="w-full px-3">
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
          style={{ zIndex: 3, width: width, height: 300 }}
        >
          <View style={{ zIndex: 3 }} className="px-2 py-2 w-full h-full">
            {route?.params?.requisite[0] ? (
              <TouchableOpacity
                className="w-80 h-10 shadow-lg shadow-black my-1 rounded-lg justify-center px-3 bg-white"
                onPress={() => handleSolicitation(route?.params?.requisite[0])}
              >
                <Text className="font-default text-md text-gray-800">
                  {route?.params?.requisite[0]}
                </Text>
              </TouchableOpacity>
            ) : null}
            {route?.params?.requisite[1] ? (
              <TouchableOpacity
                className="w-80 h-10 shadow-md shadow-black my-3 rounded-md justify-center px-3 bg-white"
                onPress={() => handleSolicitation(route?.params?.requisite[1])}
              >
                <Text className="font-default text-md text-gray-800">
                  {route?.params?.requisite[1]}
                </Text>
              </TouchableOpacity>
            ) : null}
            {route?.params?.requisite[2] ? (
              <TouchableOpacity
                className="w-80 h-10 shadow-md shadow-black my-3 rounded-md justify-center px-3 bg-white"
                onPress={() => handleSolicitation(route?.params?.requisite[2])}
              >
                <Text className="font-default text-md text-gray-800">
                  {route?.params?.requisite[2]}
                </Text>
              </TouchableOpacity>
            ) : null}
            {route?.params?.requisite[3] ? (
              <TouchableOpacity
                className="w-80 h-10 shadow-md shadow-black my-3 rounded-md justify-center px-3 bg-white"
                onPress={() => handleSolicitation(route?.params?.requisite[3])}
              >
                <Text className="font-default text-md text-gray-800">
                  {route?.params?.requisite[3]}
                </Text>
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
