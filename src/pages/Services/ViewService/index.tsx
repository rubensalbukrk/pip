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
import {
  TextExtra,
  TextLarge,
  TextMedium,
  TextSmall,
} from "../../../../components/TextLg/Text";

interface ServicesProps {
  title: string;
  picture: any;
  descrition: any;
  requisite: string;
}

export default function ViewService({ route }) {
  const { token } = useContext(AuthContext);
  const { logged } = useContext<any>(UserContext);
  const { title, picture, descrition, requisite }: ServicesProps =
    route?.params;
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
      <View className="flex-row absolute w-full pl-3 top-0 justify-between">
        <TextMedium className="text-3xl" text={route?.params?.title} />
        <BackButton />
      </View>
      <Image
        style={{ zIndex: 1, alignSelf: "center", marginVertical: "10%" }}
        className=" w-40 h-40 mt-12 rounded-full"
        resizeMode="cover"
        alt="pip-service"
        source={picture}
      />
      <View style={{ zIndex: 2 }} className="w-full h-full px-3 bg-transparent">
        <ScrollView
          style={{flex: 3,  maxHeight: 450, width: "100%", backgroundColor: "transparent" }}
        >
          <TextLarge text={descrition} className="text-black text-base" />

          <TextLarge
            text="Serviços disponíveis"
            className="self-start text-2xl mt-6 text-black"
          />

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
