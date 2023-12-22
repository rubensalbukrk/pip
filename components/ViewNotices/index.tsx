import React from "react";
import { View, Image } from "react-native";
import BackButton from "../BackButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TextLarge } from "../TextLg/Text";

interface NoticesProps {
  date: string
  title: string
  mensagem: string
  img: string
}
export default function NoticeView({ route }) {
  const {date, title, mensagem, img}: NoticesProps = route?.params
  return (
    <View className="flex-1 w-full h-full bg-slate-200">
      <View className="w-full h-64 top-0">
        <Image
          className="w-full h-full rounded-b-xl"
          alt="picture-notice"
          source={{ uri: img }}
        />
        <View className="w-16 h-16 absolute right-0 bottom-0">
          <BackButton />
        </View>
      </View>

      <TextLarge text={title} className="text-black my-2 px-3 text-3xl" />
      <View className="w-full h-72 mb-5 py-7 self-center rounded-xl bg-slate-200">
        <TextLarge text={mensagem} className="text-black px-3 text-xl" />
      </View>

      <View className="w-72 px-3 h-8 align-self my-5 justify-center rounded-lg bg-zinc-400/20">
        <TextLarge text={date} className="text-black" />
      </View>
    </View>
  );
}
