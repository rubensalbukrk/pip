import React from "react";
import { View, Text } from "react-native";


export default function InputInfoUser(props) {
  return (
    <View className='justify-start'>
      <Text className='font-default ml-2 text-blue-700 text-lg'>
        {props.infoLabel}
      </Text>
      <View className='w-full justify-center rounded-md bg-blue-600/10' >
        <Text className='font-default mr-3 text-blue-700 text-lg'>
          {props.infoValue}
        </Text>
      </View>
    </View>
  );
}
