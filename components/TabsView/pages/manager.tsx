import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextLarge, TextMedium } from "../../TextLg/Text";
import colors from "tailwindcss/colors";

export default function TabManager() {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 w-full items-center px-4 py-5">
      <View className="w-full my-2 items-center rounded-lg shadow-lg shadow-black bg-slate-100">
        <View className="flex-row w-full relative top-3 left-4 items-center">
          <FontAwesome name="newspaper-o" size={36} color={colors.blue[500]} />
          <TextMedium text="Notícias" className="text-blue-500" />
        </View>

        <TextLarge
        className="text-gray-700 mt-4"
        text="Adicione novas notícias, remova e monitore!" />

        <TouchableOpacity
          className="w-14 h-14 ml-60 mb-4 rounded-xl justify-center items-center shadow-lg shadow-black bg-green-400"
          onPress={() => navigate("NewNotices")}
        >
          <Feather name="arrow-right-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View className="w-full my-2 justify-center items-center rounded-lg shadow-lg shadow-black bg-slate-100">
        <View className="flex-row w-full relative top-3 left-4 items-center">
          <AntDesign name="exception1" size={36} color={colors.blue[500]} />
          <TextMedium text="Solicitações" className="text-blue-500" />
        </View>

        <TextLarge className="text-gray-700 mt-4"
        text="Analise todas as solicitações e aprovações dos serviços!"
        />
          
     
        <TouchableOpacity
          className="w-14 h-14 ml-60 mb-4 rounded-xl justify-center items-center shadow-lg shadow-black bg-green-400"
          onPress={() => navigate("Solicitation")}
        >
          <Feather name="arrow-right-circle" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
