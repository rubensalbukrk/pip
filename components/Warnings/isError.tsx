import React from "react";
import { View } from "react-native";
import { LottieView } from "../../src/utils/LottieView";
import { Button } from "../ButtonBlue/ButtonBlue";
import { useNavigation } from "@react-navigation/native";
import { TextExtra, TextLarge } from "../TextLg/Text";

export const WarningError = (props) => {
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
      <TextExtra text="Estamos em manutenção!" className="text-zinc-600" />
      <TextLarge text="Tente novamente mas tarde!" className="text-blue-800" />
      <Button title="Voltar" onPress={goBack || props.onPress} />
    </View>
  );
};
