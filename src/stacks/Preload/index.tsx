import React from "react";
import { View } from "react-native";
import LottieView from 'lottie-react-native'

export default function Preload() {
  return (
    <View className="flex-1 w-full h-full items-center justify-center bg-white">
      <LottieView
        autoPlay
        loop
        style={{width: '100%', height: 500}}
        duration={2000}
        source={require("../../../assets/animations/animation-pip-balls-286f.json")}
      />
    </View>
  );
}
