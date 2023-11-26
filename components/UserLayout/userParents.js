import React from "react";
import { View, Text } from "react-native";

export default function MyParents(props) {
  return (
    <View
      className=" w-full mt-4 px-2 py-3 rounded-lg bg-blue-300/40 opacity-80"
      key={props.keyId}
    >
      <Text className="font-default ml-2 text-lg text-blue-600">Nome</Text>
      <View className="h-10 justify-center opacity-90 rounded-md bg-white/20">
        <Text className="font-default px-4 text-lg text-blue-600">
          {props.nome}
        </Text>
      </View>
      <Text className="font-default ml-2 mt-2 text-lg text-blue-600">CPF</Text>
      <View className="w-80 h-10 mb-2 opacity-80 rounded-lg bg-white/20 justify-center">
        <Text className="font-default px-4 text-lg text-blue-600">
          {props.cpf}
        </Text>
      </View>
      <Text className="font-default ml-2 text-lg text-blue-600">Idade</Text>

      <View className="w-32 h-10 mb-4 opacity-80 rounded-lg justify-center">
        <Text className="font-default mr-3 px-4 text-lg text-blue-600">
          {props.idade}
        </Text>
      </View>
    </View>
  );
}
