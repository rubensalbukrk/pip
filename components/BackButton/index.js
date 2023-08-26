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