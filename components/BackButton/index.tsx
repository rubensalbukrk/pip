import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BackButton(props: any) {
  const navigation = useNavigation();
  return (
    <View style={{width: 70, height: 70}}>
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Feather  name="arrow-left-circle" color={"white" || props.color} size={28} />
      </TouchableOpacity>
    </View>
  );
}
