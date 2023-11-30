import React from "react";
import { View, Text } from "react-native";


export default function InputInfoUser(props) {
  return (
    <View className='w-full h-10 mb-1 '>
      <Text className='font-default text-gray-500 text-md'>
        {props.infoLabel}
      </Text>
     
      <Text className='font-default bottom-1 text-gray-900 text-lg'>
          {props.infoValue}
      </Text>
      
    </View>
  );
}
