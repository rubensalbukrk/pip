import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  Feather,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export default function TabManager() {
  const navigation = useNavigation();

  return (
    <ScrollView  flex={1} w="100%">
      <View className='flex-1 w-full px-5'>
        <View className='w-full max-h-44 mt-4 justify-center items-center gap-2 rounded-lg bg-white/20'
        >
          <View className='absolute left-5 top-5'>
            <FontAwesome name="newspaper-o" size={40} color="white" />
          </View>
          <Text className="font-default text-lg text-white">Notícias</Text>

          

          <Text fontSize="xl" className="font-default text-lg text-white">
            Gerêncie todas as notícias!
          </Text>

          <TouchableOpacity
          className='w-64 h-14 my-2 mb-4 rouded-xl'
            onPress={() => navigation.navigate("NewNotices")}
          >
            <Feather name="arrow-right-circle" size={28} color="white" />
          </TouchableOpacity>
        </View>



        <View className='w-full px-4 justify-center items-center rounded-lg gap-2 bg-white/20'
        >
          <View 
          className='absolute top-5 left-5' position={"absolute"}>
            <AntDesign name="exception1" size={40} color="white" />
          </View>

          <Text className="font-default text-lg text-white">Solicitações</Text>
         
          <Text className="font-default text-lg text-white">
            Gerêncie todos os pedidos de serviços!
          </Text>
          <TouchableOpacity
          className='w-64 h-14 my-2 mb-4 rouded-xl bg-blue-700'
            onPress={() => navigation.navigate("Solicitation")}
          >
            <Feather name="arrow-right-circle" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
