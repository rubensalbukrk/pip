import React from "react";
import { View, ActivityIndicator, Image } from "react-native";

export default function Preload() {
  return (
      <View className="flex-1 w-full bg-white">
        <Image
          className='w-full h-40 mb-48'
          source={require("../../../assets/imgs/pip-logo.jpg")}
        />
        <ActivityIndicator size={"large"} color={"black"} />
      </View>
  );
}
