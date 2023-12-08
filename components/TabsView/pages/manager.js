import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TabManager() {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 w-full items-center px-4 py-5">
      <View className="w-full my-6 justify-center items-center rounded-lg shadow-lg shadow-black bg-gray-400">
        <View className="flex-row w-full relative top-3 left-4 items-start">
          <FontAwesome name="newspaper-o" size={32} color="white" />
          <Text className="font-default ml-2 text-lg text-white">Notícias</Text>
        </View>

        <Text className="font-default mt-5 text-lg text-zinc-600">
          Adicione novas notícias, remova e monitore!
        </Text>

        <TouchableOpacity
          className="w-14 h-14 my-5 rounded-xl justify-center items-center shadow-lg shadow-black bg-gray-500"
          onPress={() => navigate("NewNotices")}
        >
          <Feather name="arrow-right-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View className="w-full mt-3 justify-center items-center rounded-lg shadow-lg shadow-black bg-gray-400">
        <View className="flex-row w-full relative top-3 left-4 items-start">
          <AntDesign name="exception1" size={32} color="white" />
          <Text className="font-default ml-2 text-lg text-white">
            Solicitações
          </Text>
        </View>

        <Text className="font-default mt-5 text-lg text-zinc-600">
          Analise todas as solicitações e aprovações dos serviços!
        </Text>
        <TouchableOpacity
          className="w-14 h-14 my-5 rounded-xl justify-center items-center shadow-lg shadow-black bg-gray-500"
          onPress={() => navigate("Solicitation")}
        >
          <Feather name="arrow-right-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
