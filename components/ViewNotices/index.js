import React from "react";
import { Box, Text, Heading, Image, NativeBaseProvider } from "native-base";
import BackButton from "../BackButton";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function NoticeView({ route }) {
    
  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  return (
    <NativeBaseProvider config={config}>
      <Box
        flex={1}
        w="100%"
        bg={{
          linearGradient: {
            colors: ['lightBlue.800', 'lightBlue.400'],
            start: [0, 0],
            end: [1, 1],
          },
        }}
        _text={{
          fontSize: "md",
          fontFamily: "Doppio One",
          color: "warmGray.50",
          textAlign: "center",
        }}
      >
        <Box top="0" w="100%">
          <Image
            w="100%"
            h="400"
            roundedBottom={"40"}
            alt="picture-notice"
            source={{ uri: route?.params?.img }}
          />

          <Animatable.View
            delay={800}
            duration={2000}
            animation="bounceInDown"
            iterationCount={"infinite"}
            iterationDelay={200}
            position="absolute"
            bottom={0}
            alignSelf={"center"}
          >
            <SimpleLineIcons name="arrow-down" size={24} color="white" />
          </Animatable.View>
          
        </Box>

        <Heading fontSize={"3xl"} mx="10%" my="5" shadow={4} color="#fff">
          {route?.params?.title}
        </Heading>
        <Box
          w="95%"
          bg="rgba(255,255,255, 0.2)"
          shadow={8}
          alignSelf="center"
          h="200"
          rounded="xl"
          my="5"
          py="3"
          px="2"
        >
          <Text fontSize={"2xl"} color="#fff">
            {route?.params?.mensagem}
          </Text>
        </Box>
        <Box
          mx="5"
          h="8"
          w="70%"
          bg="rgba(255,255,255, 0.2)"
          shadow={8}
          justifyContent={"center"}
          rounded="lg"
        >
          <Text alignSelf="center" fontSize={"lg"} color="#fff">
            {route?.params?.date}
          </Text>
        </Box>
        <Box alignSelf="center">
          <BackButton />
        </Box>
        
      </Box>
    </NativeBaseProvider>
  );
}
