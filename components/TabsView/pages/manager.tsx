import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextLarge, TextMedium } from "../../TextLg/Text";

export default function TabManager() {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 w-full items-center px-4 py-5">
      <View className="w-full my-6 justify-center items-center rounded-lg shadow-lg shadow-black bg-blue-400">
        
        <View className="flex-row w-full relative top-3 left-4 items-center">
          <FontAwesome name="newspaper-o" size={36} color="white" />
          <TextMedium text="Notícias" />
        </View>

        <TextLarge
        className="text-slate-100 mt-8"
        text="Adicione novas notícias, remova e monitore!" />

        <TouchableOpacity
          className="w-14 h-14 my-5 rounded-xl justify-center items-center shadow-lg shadow-black bg-blue-400"
          onPress={() => navigate("NewNotices")}
        >
          <Feather name="arrow-right-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View className="w-full mt-3 justify-center items-center rounded-lg shadow-lg shadow-black bg-blue-400">
        <View className="flex-row w-full relative top-3 left-4 items-center">
          <AntDesign name="exception1" size={36} color="white" />
          <TextMedium text="Solicitações" />
        </View>

        <Text className="font-default mt-5 text-lg text-slate-100">
          Analise todas as solicitações e aprovações dos serviços!
        </Text>
        <TouchableOpacity
          className="w-14 h-14 my-5 rounded-xl justify-center items-center shadow-lg shadow-black bg-blue-400"
          onPress={() => navigate("Solicitation")}
        >
          <Feather name="arrow-right-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
