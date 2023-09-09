<<<<<<< HEAD
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left-circle" color="white" size={28} />
      </TouchableOpacity>
    </View>
  );
}
=======
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function BackButton() {
    const navigation = useNavigation()
 return (
   <TouchableOpacity onPress={() => navigation.goBack()}
   style={{
    width: 70,
    height: 70,
    borderRadius: 50,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center'
   }}
   >
    <Feather name="arrow-left-circle" size={32} color="white" />
   </TouchableOpacity>
  );
}
>>>>>>> 869decbc3ff84259de59ca5c9b7c8f4dc337303d
