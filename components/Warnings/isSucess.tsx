import { View } from "react-native";
import { LottieView } from "../../src/utils/LottieView";
import React from "react";
import { Button } from "../ButtonBlue/ButtonBlue";
import { useNavigation } from "@react-navigation/native";
import { TextExtra, TextLarge } from "../TextLg/Text";

export const WarningSucess = () => {
  const { goBack } = useNavigation();
  return (
    <View
      className="w-full items-center justify-center"
      style={{ zIndex: 20, height: "100%" }}
    >
      <TextExtra text="Parabéns!" className="text-blue-800" />
      <TextLarge text="Agora você pode acompanhar o andamento na aba 'Solicitações'" className="text-blue-800" />
      <LottieView
        loop
        autoPlay={true}
        style={{ width: "100%" }}
        source={require("../../assets/animations/Animation - sucesso-ok.json")}
      />

      <Button title="Voltar" onPress={goBack} />
    </View>
  );
};
