import React, { useContext } from "react";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";
import { Box, Button, Text, Image } from "native-base";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const Welcome = () => {
  const navigation = useNavigation();
  const { users, ObterDados } = useContext(UserContext);

  return (
    <Box flex="1" bg={"white"} alignItems="center">
        <Animatable.View style={{width: '100%', height: '50%'}} delay={800} animation="bounceInDown">  
        <Image
            resizeMode="contain"
            w="100%"
            height="90%"
            alt="piplogo"
            source={require("../../../assets/imgs/pip-logo.jpg")}
        />
        </Animatable.View>
      <Animatable.View animation="fadeInRight" delay={1000}> 
        <Text my="1" mx="2" fontFamily="Doppio One" fontSize="2xl">
        Aqui você tem acesso a todos os nossos serviços sociais!
      </Text>
      </Animatable.View>  
      

        <Animatable.View style={{width: 80, height: 80, marginTop: 30}} animation="rubberBand" iterationDelay={2} iterationCount="infinite" >
            <TouchableOpacity
                style={{
                marginTop: "21%",
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#26B7FF",
                borderRadius: 50,
                }}
                onPress={() => navigation.navigate("Login") & ObterDados()}
            >
                <AntDesign name="arrowright" size={32} color="white" />
            </TouchableOpacity>
        </Animatable.View>
    </Box>
  );
};
