import React from "react";
import { View, Text } from "react-native";


export default function InputInfoUser(props) {
  return (
    <View className='justify-start'>
      <Text className='font-default ml-2 mt-3 text-white text-lg'>
        {props.infoLabel}
      </Text>
      <View className='w-full h-12 justify-center rounded-md bg-white/20' >
        <Text className='font-default py-4 mr-3 text-white text-lg'>
          {props.infoValue}
        </Text>
      </View>
    </View>
  );
}
