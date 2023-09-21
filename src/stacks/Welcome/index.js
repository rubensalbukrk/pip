import React, { useContext, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import { Box, Container, Text, Image, Button, Heading } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export const Welcome = () => {
  const navigation = useNavigation();

  return (
    <Box flex="1" bg={"lightBlue.500"} alignItems="center">
      <Animatable.View
        style={{ width: "100%", height: "50%" }}
        delay={800}
        animation="bounceInDown"
      >
        <Image
          position="absolute"
          alt="pip-logo"
          w="60%"
          h="40%"
          right="7%"
          top="2%"
          mt="20%"
          resizeMode="contain"
          source={require("../../../assets/pip-icon.png")}
        />
      </Animatable.View>
      <Container position="absolute" top="30%" left="4%" w="80%" h="100" space={3}>
        <Animatable.View
          animation="fadeInRight"
          delay={1000}
        >
          <Heading my="1" mx="2" color="light.100" fontSize="5xl">
            Olá,
          </Heading>
        </Animatable.View>

        <Animatable.View
          animation="fadeInRight"
          delay={1000}
        >
          <Heading my="1" mx="2" color="light.100" fontSize="4xl">
            Bem vindo(a)!
          </Heading>
        </Animatable.View>
      </Container>
      <Box w="100%" h="20%" justifyContent="center" bgColor="rgba(148, 240, 255, 0.42)">
        <Animatable.View animation="fadeInLeft" delay={1000}>
          <Text mx="4" alignSelf="center" color="light.100" fontSize="2xl">
            Somos o projeto inclusão popular e aqui você vai encontrar serviços,
            notícias e muito mais...
          </Text>
        </Animatable.View>
      </Box>
      <Animatable.View
        animation="fadeInUp"
        delay={1200}
        style={{ width: "100%" }}
      >
        <Animatable.View
          style={{
            flexDirection: "row",
            width: 400,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          animation="rubberBand"
          iterationDelay={2}
          iterationCount="infinite"
        >
          <Button
            w="50%"
            variant="solid"
            rounded="2xl"
            bgColor="rgba(148, 240, 255, 0.42)"
            mt="30"
            onPress={() => navigation.navigate("Login")}
          >
            <Box w="100%" flexDirection="row">
              <Text color="#fff" fontSize="2xl">
                Começar
              </Text>
              <AntDesign name="arrowright" size={40} color="white" />
            </Box>
          </Button>
        </Animatable.View>
      </Animatable.View>
    </Box>
  );
};
