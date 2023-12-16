import React from "react";
import { View } from "react-native";
import { LottieView } from "../../utils/LottieView";

export default function Preload() {
  return (
    <View className="flex-1 w-full h-full items-center justify-center bg-white">
      <LottieView
        autoPlay
        loop
        duration={2000}
        source={require("../../../assets/animations/animation-pip-balls-286f.json")}
      />
    </View>
  );
}
