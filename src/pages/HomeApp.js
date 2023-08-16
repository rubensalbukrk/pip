import React, { useContext } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Pressable,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import {
  Box,
  Text,
  VStack,
  Center,
  Avatar,
  ScrollView,
  Image,
} from "native-base";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export const HomeApp = () => {
  const { users } = useContext(UserContext);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Box w="100%" t="0" h="25%" bg="darkBlue.500" rounded="md" shadow={3}>
        <Box flexDir={"row"} justifyContent={"space-between"}>
          <Image
            alt="user-profile"
            ml="3"
            mt="8"
            w="20"
            h="20"
            source={require("../../assets/pip-icon.png")}
          />
          <Box top="30" right="5">
            <Pressable>
              <Ionicons name="options" size={24} color="black" />
            </Pressable>
          </Box>
        </Box>

        <Box mx="5" flexDir={"row"} justifyContent={"space-between"}>
          <Text ml="5" color="light.100" fontSize="2xl">
            Olá usuário
          </Text>

          <Avatar size={"lg"} shadow={2} bg={"light.200"}>
            <AntDesign name="user" size={24} color="black" />
          </Avatar>
        </Box>
      </Box>
      <Box w="100%" t="0" h="50%" mt="10" rounded="md"></Box>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        py="2"
        px="5"
        horizontal={true}
        w="100%"
        t="0"
        h="30%"
      >
        <Avatar
          mx="1"
          size="2xl"
          shadow={3}
          source={require("../../assets/imgs/cord-administrativa.jpg")}
        />
        <Avatar
          mx="1"
          size="2xl"
          shadow={3}
          source={require("../../assets/imgs/cord-voluntarios.jpg")}
        />
        <Avatar
          mx="1"
          size="2xl"
          shadow={3}
          source={require("../../assets/imgs/pip-cidadania.jpg")}
        />
        <Avatar
          mx="1"
          size="2xl"
          shadow={3}
          source={require("../../assets/imgs/pip-mulher.jpg")}
        />
        <Avatar
          mx="1"
          size="2xl"
          shadow={3}
          source={require("../../assets/imgs/pip-reforcoescolar.jpg")}
        />
        <Avatar
          mx="1"
          size="2xl"
          shadow={3}
          source={require("../../assets/imgs/pip-autistas.jpg")}
        />
        <Avatar
          mx="1"
          size="2xl"
          shadow={3}
          source={require("../../assets/imgs/pip-cursos.jpg")}
        />
        <Avatar
          mx="1"
          size="2xl"
          shadow={3}
          source={require("../../assets/imgs/pip-enem.jpg")}
        />
        <Avatar
          mx="1"
          size="2xl"
          shadow={3}
          source={require("../../assets/imgs/pip-optometria.jpg")}
        />
        <Avatar
          mx="1"
          size="2xl"
          shadow={3}
          source={require("../../assets/imgs/pip-saudemental.jpg")}
        />
        <Avatar
          mx="1"
          size="2xl"
          shadow={3}
          source={require("../../assets/imgs/pip-sgralimentar.jpg")}
        />
        <Avatar
          mx="1"
          size="2xl"
          shadow={3}
          source={require("../../assets/imgs/pip-protagonista.jpg")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
