import React, { useContext } from "react";
import { View, Text } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { TabViewAdmin } from "../../../components/TabsView";
import BackButton from "../../../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import UserAvatar from "../../../components/UserAvatar";

export default function Admin() {
  const { users, logged } = useContext(UserContext);
  const navigation = useNavigation();

  return (
      <View
      className='flex-1 flex-col w-full h-full bg-blue-600'
      >
        <View
        className='w-full h-20 justify-center items-center'>
          <View 
          className='absolute bottom-14 left-5'> 
            <BackButton />
          </View>
        
          <Text 
          className='font-default text-2xl text-white mt-9'
          >
            PAINEL DE ADMINISTRAÇÃO
          </Text>
          <UserAvatar
            x={100}
            y={100}
          />
        </View>

        <View className='flex-1 w-full'>
          <TabViewAdmin />
        </View>
      </View>
  );
}
