import React from "react";
import { View } from "react-native";
import { TabViewAdmin } from "../../../components/TabsView";
import BackButton from "../../../components/BackButton";
import UserAvatar from "../../../components/UserAvatar";
import { TextMedium } from "../../../components/TextLg/Text";

export default function Admin() {

  return (
    <View className="flex-1 w-full h-full items-center bg-zinc-400">
      <View className="w-full h-32 justify-center pt-12 items-center">
        <View className="absolute top-20 left-5">
          <BackButton />
        </View>

        <TextMedium text="Painel da Administração" />
        <UserAvatar x={70} y={70} />
      </View>

      <View className="flex-1 w-full mt-6">
        <TabViewAdmin />
      </View>
    </View>
  );
}
