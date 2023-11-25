import React from "react";
import {View, Text, Image} from 'react-native'
import BackButton from "../BackButton";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function NoticeView({ route }) {
  return (

      <View className='flex-1 w-full h-full bg-blue-700'
      >
        <View className='w-full h-40 top-0'>
          <Image className='w-full h-full rounded-b-xl'
            alt="picture-notice"
            source={{ uri: route?.params?.img }}
          />

          <View
          className='absolute bottom-0 self-center'
          >
            <SimpleLineIcons name="arrow-down" size={24} color="white" />
          </View>
          
        </View>

        <Text className="font-default text-3xl mx-10 my-5 text-white">
          {route?.params?.title}
        </Text>
        <View className='w-96 h-40 mb-5 top-0 my-5 py-7 px-4 self-center rounded-xl bg-white/20'
        >
          <Text fontSize={"2xl"} color="#fff">
            {route?.params?.mensagem}
          </Text>
        </View>

        <View className='w-72 h-8 my-5 justify-center rounded-lg bg-white/20'
        >
          <Text className="font-default text-lg text-white">
            {route?.params?.date}
          </Text>
        </View >
        <View className='w-full self-center h-40 top-0' alignSelf="center">
          <BackButton />
        </View>
        
      </View>

  );
}
