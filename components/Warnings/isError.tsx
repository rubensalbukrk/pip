import React from "react";
import { View } from "react-native";
import { LottieView } from "../../src/utils/LottieView";
import { Button } from "../ButtonBlue/ButtonBlue";
import { useNavigation } from "@react-navigation/native";

export const WarningError = () => {
  const { goBack } = useNavigation();
  return (
    <View
      className="w-full items-center justify-center"
      style={{ zIndex: 20, height: "100%" }}
    >
      <LottieView
        loop
        autoPlay={true}
        style={{ width: "100%" }}
        source={require("../../assets/animations/Animation - Error message.json")}
      />
      <Button title="Voltar" onPress={goBack} />
    </View>
  );
};
