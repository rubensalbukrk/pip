import React, { useContext } from "react";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import { Box, Text, Avatar, NativeBaseProvider } from "native-base";
import { UserContext } from "../../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { TabViewAdmin } from "../../../components/TabsView";
import BackButton from "../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

export default function Admin() {
  const { users, logged } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <NativeBaseProvider config={config}>
      <Box
        flex={1}
        bg={{
          linearGradient: {
            colors: ['lightBlue.600', "lightBlue.400"],
            start: [0, 1],
            end: [0, 0],
          },
        }}
        flexDir="column"
      >
        <Box w="100%" h="20%" justifyContent="center" alignItems="center">
          
          <Box position="absolute" bottom="15%" left="5%" > 
            <BackButton />
          </Box>
          

          <Text fontSize="2xl" mt="9%" color="light.100" fontFamily="Doppio One">
            PAINEL DE ADMINISTRAÇÃO
          </Text>
          <Avatar
            size="xl"
            mt="3"
            shadow={6}
            source={{ uri: logged?.avatar }}
          />
        </Box>

        <Box flex={1} w="100%">
          <TabViewAdmin />
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}
