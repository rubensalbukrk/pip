import React, { useContext, useReducer } from "react";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import { FlatList, View, ScrollView, TouchableOpacity } from "react-native";
import {
  Box,
  Button,
  Pressable,
  Center,
  Text,
  Container,
  Avatar,
  VStack,
} from "native-base";
import { UserContext } from "../../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { TabViewAdmin } from "../../../components/TabsView";
import BackButton from "../../../components/BackButton";


export default function Admin() {
  const { users, logged } = useContext(UserContext);
  const navigation = useNavigation()

  return (

    <Box w="100%" flex={1} flexDir="column" justifyContent="center">
      <Animatable.View
        animation="slideInDown"
        duration={1000}
      >
        <Box w="100%" h="130" bg="lightBlue.500" alignItems="center" justifyContent="center" roundedBottom="20">
          <Box  bottom="-2%" left="-1%" position="absolute">
            <BackButton />
          </Box>
          
          <Text fontSize="2xl" marginTop="20%" color="white">PAINEL DE ADMINISTRAÇÃO</Text>
          <Avatar size="lg" mt="3" shadow={6} source={{ uri: logged?.avatar }} />
        </Box>
      </Animatable.View>
      
      <Box w="100%" h="600" maxH="900" >
        <TabViewAdmin />
      </Box>
    
    </Box>

  );
}
