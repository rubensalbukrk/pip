import React from "react";
import { View, Text } from "react-native";
import { TextLarge } from "../TextLg/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MyParents(props) {
  return (
    <View
      style={{ elevation: 3, shadowColor: "#000" }}
      className="w-48 h-30 mt-1 px-1 py-1 rounded-lg bg-slate-200"
      key={props.cpf}
    >
      <TextLarge text="Nome" className="mt-1 text-xs text-zinc-700/70" />
      <TextLarge text={props.nome} className="text-xs text-gray-800" />

      <View className="flex-row items-center justify-between">
        <View>
          <TextLarge
            text="CPF"
            className="mt-1 text-xs text-zinc-700/70"
          />
          <TextLarge text={props.cpf} className="px-2 text-xs text-gray-800" />
        </View>

        <View className="mr-8">
          <TextLarge
            text={"Idade"}
            className="mt-1 text-xs text-zinc-700/70"
          />
          <TextLarge
            text={props.idade}
            className="px-2 text-xs text-gray-800"
          />
        </View>
      </View>
      <View className="flex-row my-1 items-center">
        <TextLarge text={"Autista"} className="px-2 text-xs text-zinc-700/70" />
        {props.isAutist ? (
          <MaterialCommunityIcons
            name="check-circle"
            size={14}
            color={"green"}
          />
        ) : (
          <MaterialCommunityIcons
            name="close-circle"
            size={14}
            color={"gray"}
          />
        )}
        <TextLarge text={"PCD"} className="px-2 text-xs text-zinc-700/70" />
        {props.isPcd ? (
          <MaterialCommunityIcons
            name="check-circle"
            size={14}
            color={"green"}
          />
        ) : (
          <MaterialCommunityIcons
            name="close-circle"
            size={14}
            color={"gray"}
          />
        )}
      </View>
    </View>
  );
}
