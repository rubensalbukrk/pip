import React, { useContext } from "react";
import { View, Text } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { TabViewAdmin } from "../../../components/TabsView";
import BackButton from "../../../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import UserAvatar from "../../../components/UserAvatar";
import { TextExtra } from "../../../components/TextLg/Text";

export default function Admin() {
  const { users, logged } = useContext<any>(UserContext);
  const navigation = useNavigation();

  return (
    <View className="flex-1 w-full h-full items-center bg-zinc-400">
      <View className="w-full h-32 justify-center items-center">
        <View className="absolute top-20 left-5">
          <BackButton />
        </View>

        <TextExtra text="Painel da Administração" />
        <UserAvatar x={70} y={70} />
      </View>

      <View className="flex-1 w-full mt-6">
        <TabViewAdmin />
      </View>
    </View>
  );
}
