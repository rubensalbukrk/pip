import React from "react";
import { View } from "react-native";
import { TabViewAdmin } from "../../../components/TabsView";
import BackButtonBlue from "../../../components/BackButtonBlue";
import UserAvatar from "../../../components/UserAvatar";
import { TextMedium } from "../../../components/TextLg/Text";

export default function Admin() {

  return (
    <View className="flex-1 w-full h-full items-center bg-slate-200">
      <View style={{zIndex: 5,backgroundColor: '#f0f0f0'}} className="w-full h-36 justify-center pt-8 items-center">
        <View className="absolute top-20 left-5">
          <BackButtonBlue />
        </View>

        <TextMedium className="text-blue-500" text="Painel da Administração" />
        <UserAvatar x={70} y={70} />
      </View>

      <View className="flex-1 w-full">
        <TabViewAdmin />
      </View>
    </View>
  );
}
