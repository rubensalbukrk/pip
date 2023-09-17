import React, { useContext, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import { Box, Text, Image, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export const Welcome = () => {
  const navigation = useNavigation();


  return (
    <Box flex="1" bg={"white"} alignItems="center">
      <Animatable.View
        style={{ width: "100%", height: "50%" }}
        delay={800}
        animation="bounceInDown"
      >
        <Image
          alt="pip-logo"
          w="100%"
          h="100%"
          resizeMode="contain"
          source={require("../../../assets/imgs/pip-logo.jpg")}
        />
      </Animatable.View>
      <Animatable.View animation="fadeInRight" delay={1000}>
        <Text my="1" mx="2" fontFamily="Doppio One" fontSize="2xl">
          Aqui você tem acesso a todos os nossos serviços!
        </Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={1200}
      style={{width: '100%'}}
      >
        <Box
          h="300"
          w="100%"
          shadow={3}
          mt="20%"
          borderTopRadius="2xl"
          bg="darkBlue.400"
          alignItems="center"
        >
          <Animatable.View
            style={{
              flexDirection: 'row',
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
            variant="ghost" rounded="2xl"
            onPress={() => navigation.navigate('Login')}
            >
            <Box w="100%" flexDirection="row">
            <Text color="#fff" fontSize="2xl">Começar</Text>
             <AntDesign name="arrowright" size={40} color="white" />
            </Box>
            </Button>
          </Animatable.View>
        </Box>
      </Animatable.View>
    </Box>
  );
};
