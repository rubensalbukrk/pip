import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BackButton(props) {
  const navigation = useNavigation();
  return (
    
      <TouchableOpacity
        style={{
          width: 70,
          height: 70,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Feather  name="arrow-left-circle" color={"white" || props.color} size={32} />
      </TouchableOpacity>
    
  );
}
