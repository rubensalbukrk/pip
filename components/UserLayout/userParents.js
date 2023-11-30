import React from "react";
import { View, Text } from "react-native";

export default function MyParents(props) {
  return (
    <View
      className="w-48 h-30 mt-1 px-1 py-3 rounded-lg shadow-md shadow-black bg-gray-400"
      key={props.keyId}
    >
      <Text className="font-default ml-2 text-md text-gray-600">Nome</Text>
      <Text className="font-default px-4 text-md text-gray-700">
        {props.nome}
      </Text>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="font-default ml-2 mt-1 text-md text-gray-600">
            CPF
          </Text>
          <Text className="font-default px-4 text-md text-gray-700">
            {props.cpf}
          </Text>
        </View>
        <View className="mr-8">
          <Text className="font-default ml-2 mt-1 text-md text-gray-600">Idade</Text>
          <Text className="font-default mr-3 px-4 text-md text-gray-700">
            {props.idade}
          </Text>
        </View>
      </View>
      <Text className="font-default ml-2 mt-2 text-md text-gray-600">Autista</Text>
    </View>
  );
}
