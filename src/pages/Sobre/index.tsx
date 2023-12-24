import React from "react";
import { View, Image, ScrollView, Touchable, TouchableOpacity } from "react-native";
import { width, height } from "../../utils/dimensions";
import { LottieView } from "../../utils/LottieView";
import { TextExtra, TextLarge } from "../../../components/TextLg/Text";
import { useNavigation } from "@react-navigation/native";

export default function Sobre() {
  const {goBack} = useNavigation()
  return (
    <View className="w-full h-full bg-slate-200 items-center justify-center">
      <LottieView
        autoPlay={true}
        loop
        style={{ width: "100%" }}
        source={require("../../../assets/animations/Animation - About.json")}
      />
      <TextExtra text="PIP" className="text-black" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: width, height: height, paddingHorizontal: 20 }}
      >
        <Image
          className="w-full absolute opacity-20"
          alt="pip-logo"
          resizeMode="contain"
          source={require("../../../assets/pip-icon.png")}
        />
        <TextLarge
          text="O que é o PROJETO INCLUSÃO SOCIAL?"
          className="text-black text-base"
        />

        <View className="w-80 mt-2 py-2 px-3">
          <TextLarge
            text="O PIP é uma associação sem fins lucrativos, inscrito no CNPJ :
            46.612.280/0001-90 e atuando no município de Santa Rita -PB. Somo
            uma equipe de voluntários que se dividem em VOLUNTÁRIOS INTEGRAIS e
            VOLUNTÁRIOS LOCAIS, atuando de forma descentralizada nos bairros
            mais vulneráveis. Nossas ações são realizadas em parcerias com poder
            público e uma rede de empresas privadas que tem como alvo minorar as
            vulnerabilidades sociais."
            className="text-zinc-800"
          />
        </View>

        <TextLarge
          text="Nossa Coordenação"
          className="text-black text-2xl mt-4"
        />

        <View className="w-80 mt-2 py-2 px-3 rounded-lg">
          <TextLarge
            className="text-black text-base"
            text=" O PIP é composto por 04 coordenações de cunho administrativo e 10
            coordenações das pastas de atuação."
          />
        </View>
        <TouchableOpacity className="w-48 h-11 items-center justify-center self-center my-4 bg-blue-500 rounded-lg"
        onPress={goBack}
        >
          <TextLarge text="Voltar" />
        </TouchableOpacity>

        <TextLarge
          text="Todos os direitos reservados 2023."
          className="text-black self-center text-base my-2"
        />
      </ScrollView>
    </View>
  );
}
