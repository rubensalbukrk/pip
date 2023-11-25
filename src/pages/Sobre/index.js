import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import BackButton from "../../../components/BackButton";
import { height } from "../../utils/dimensions";

export default function Sobre() {
  return (
    <ScrollView flex={1} w="100%" h={height} bg="lightBlue.400">
      <View className="flex-1 w-full h-full items-center justify-center bg-blue-600">
        <Image
          className="w-80 absolute blur-xl opacity-75"
          alt="pip-logo"
          resizeMode="cover"
          source={require("../../../assets/pip-icon.png")}
        />

        <Text className="font-default text-6xl opacity-70 font-bold text-white">
          PIP
        </Text>

        <Text className="font-default text-lg font-bold text-white">
          O que é o PROJETO INCLUSÃO SOCIAL?
        </Text>

        <View className="w-96 mt-2 py-2 px-3 bg-white/10 rounded-lg">
          <Text className="font-default text-md text-white">
            O PIP é uma associação sem fins lucrativos, inscrito no CNPJ :
            46.612.280/0001-90 e atuando no município de Santa Rita -PB. Somo
            uma equipe de voluntários que se dividem em VOLUNTÁRIOS INTEGRAIS e
            VOLUNTÁRIOS LOCAIS, atuando de forma descentralizada nos bairros
            mais vulneráveis. Nossas ações são realizadas em parcerias com poder
            público e uma rede de empresas privadas que tem como alvo minorar as
            vulnerabilidades sociais.
          </Text>
        </View>

        <Text className="font-default text-3xl mt-3 font-bold text-white">
          Coordenação
        </Text>

        <View className="w-96 mb-3 px-2 py-3 bg-white/20 rounded-lg">
          <Text className="font-default text-xl ml-3 text-center text-white">
            O PIP é composto por 04 coordenações de cunho administrativo e 10
            coordenações das pastas de atuação.
          </Text>
        </View>
        <BackButton />
        <Text className="font-default text-md mt-3 font-bold text-white">
          Todos os direitos reservados 2023.
        </Text>
      </View>
    </ScrollView>
  );
}
