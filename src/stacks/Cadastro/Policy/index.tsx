import React from "react";
import { TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import { TextLarge } from "../../../../components/TextLg/Text";
import { useNavigation } from "@react-navigation/native";

const urlPolicy =
  "https://doc-hosting.flycricket.io/pip-projeto-inclusao-popular-privacy-policy/6f2369ae-4b77-4593-93e3-ef58640c409a/privacy";

export const Policys = () => {
  const { goBack } = useNavigation();
  return (
    <View className="w-full flex-1 bg-black/20 items-center justify-center">
      <View className="flex-1 w-80 h-72 bg-white rounded-md">
       
        <WebView source={{ uri: urlPolicy }} className="w-full h-80" />
        <TouchableOpacity
          onPress={() => goBack()}
          className="w-60 h-12 my-2 self-center items-center justify-center bg-blue-600 rounded-lg"
        >
          <TextLarge text="Concordo" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => goBack()}
          className="w-60 h-12 my-2 self-center items-center justify-center bg-blue-600 rounded-lg"
        >
          <TextLarge text="Não concordo" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
