import React from "react";
import { View, Text } from "react-native";


export default function InputInfoUser({...props}) {
  return (
    <View className='w-full h-10 mb-3'>
      <Text className='font-default text-zinc-600/60 text-lg'>
        {props.infoLabel}
      </Text>
     
      <Text {...props} className='font-default bottom-1 text-gray-800 text-lg'>
          {props.infoValue}
      </Text>
      
    </View>
  );
}
