import React from "react";
import { View, Text, Image } from "react-native";
import BackButton from "../BackButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TextLarge } from "../TextLg/Text";

export default function NoticeView({ route }) {
  return (
    <View className="flex-1 w-full h-full bg-zinc-400">
      <View className="w-full h-40 top-0">
        <Image
          className="w-full h-full rounded-b-xl"
          alt="picture-notice"
          source={{ uri: route?.params?.img }}
        />

        <View className="absolute bottom-0 self-center">
          <SimpleLineIcons name="arrow-down" size={24} color="white" />
        </View>
        <View className="w-16 h-16 absolute right-0 bottom-0">
            <BackButton />
          </View>
      </View>

      <TextLarge text={route?.params?.title} className="my-2 px-3 text-3xl" />
      <View className="w-full h-72 mb-5 py-7 self-center rounded-xl bg-white/20">
        <TextLarge text={route?.params?.mensagem} className="px-3 text-xl" />
      </View>

      <View className="w-72 px-3 h-8 align-self my-5 justify-center rounded-lg bg-white/20">
        <TextLarge text={route?.params?.date} />
      </View>
    </View>
  );
}
