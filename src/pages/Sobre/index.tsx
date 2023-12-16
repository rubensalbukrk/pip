import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import BackButton from "../../../components/BackButton";
import { width, height } from "../../utils/dimensions";
import BackgroundSobre from '../../../assets/svgs/nos-wave.svg'

export default function Sobre() {
  return (
      <View 
      className="w-full h-full items-center justify-center">
        <BackgroundSobre style={{position: 'absolute'}} width={width} height={height + 100} />
        <Text className="font-default text-6xl mt-20 mb-10 opacity-70 text-white">
          PIP
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} style={{width: width, height: height, paddingHorizontal: 20}}>
        
        <Image
          className="w-full absolute opacity-20"
          alt="pip-logo"
          resizeMode="contain"
          source={require("../../../assets/pip-icon.png")}
        />
        <Text className="font-default text-lg text-white">
          O que é o PROJETO INCLUSÃO SOCIAL?
        </Text>

        <View className="w-80 mt-2 py-2 px-3 bg-white/20 rounded-lg">
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

        <Text className="font-default text-3xl mt-3 text-white">
          Coordenação
        </Text>

        <View className="w-80 mt-2 py-2 px-2 bg-white/20 rounded-lg">
          <Text className="font-default text-md text-center text-white">
            O PIP é composto por 04 coordenações de cunho administrativo e 10
            coordenações das pastas de atuação.
          </Text>
        </View>
        <View className='self-center mt-0'>
          <BackButton />
        </View>
        
        <Text className="font-default text-center text-md mt-3 text-white">
          Todos os direitos reservados 2023.
        </Text>
      </ScrollView>
      </View>
  )
}
