import React, { useContext, useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "react-native";
import {
  View,
  TouchableOpacity
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import {
  Box,
  Text,
  HStack,
  Center,
  Avatar,
  Icon,
  Pressable,
  ScrollView,
  Image
} from "native-base";
import {
  AntDesign,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CarouselHome } from "../../components/Carousel";
import CardView from "../../components/CardsView";
import { AuthContext } from "../contexts/AuthContext";
import UserAvatar from "../../components/UserAvatar";

export const HomeApp = () => {
  const { users, logged } = useContext(UserContext);
  const [selected, setSelected] = React.useState(0);
  const navigation = useNavigation();
  const nome = logged?.nome;
  const primeiro_nome = nome?.split(" ").shift();

  return (
    <>
      <Box
        w="100%"
        t="0"
        h="20%"
        flexDir={"row"}
        justifyContent="space-between"
        px="4"
        alignItems="center"
        bg={"lightBlue.500"}
        roundedBottom="50"
        shadow={5}
      >
        <Animatable.View
        style={{width: 60, height: 60}}
         delay={800}
         duration={2000}
         animation="bounceInLeft"
        >
        <Image 
          alt="pip-logo"
          w="60"
          h="60"

          resizeMode="contain"
          source={require("../../assets/pip-icon.png")}
        />
        <Text style={{ bottom: '20%', left: '50%', fontSize: 12, width:200}}>
          PROJETO INCLUSÃO POPULAR
        </Text>
        </Animatable.View>
        <Box flexDir={"row"} alignItems="center" paddingTop="3">
          <Animatable.Text
            style={{
              height: 40,
              fontFamily: "Doppio One",
              fontSize: 20,
              marginBottom: '30%',
              color: "white",
            }}
            delay={800}
            duration={2000}
            animation="bounceInDown"
          >
            Olá {primeiro_nome}
          </Animatable.Text>
        </Box>
        <Animatable.View delay={200} duration={2000} animation="bounceInDown">
          <TouchableOpacity
          onPress={() => navigation.navigate('User')}
          >
            <UserAvatar
            size={"lg"}
          />
          </TouchableOpacity>
          
        </Animatable.View>
      </Box>

      <ScrollView mt="4%" mb="2%" w="100%" pb="20" h="50%" t="0" horizontal={false}>
        <Animatable.Text
          duration={1000}
          delay={1000}
          animation="fadeIn"
          style={{
            fontSize: 25,
            marginLeft: "3%",
            marginTop: "3%",
            fontFamily: "Doppio One",
          }}
        >
          Nóticias
        </Animatable.Text>

        <Animatable.View duration={1000} delay={1000} animation="fadeIn">
          <CarouselHome />
        </Animatable.View>

        <Center>
          <CardView />
          <CardView />
        </Center>
      </ScrollView>

      <HStack bg={'lightBlue.500'} alignItems="center" safeAreaBottom shadow={9}>
        <Pressable
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={({focused}) => setSelected(0) & focused && setSelected(0)}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 0 ? "home" : "home-outline"}
                />
              }
              color="white"
              size="xl"
            />
            <Text color="white" fontSize="12">
              Inicio
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(1) & navigation.navigate('Sobre')}
        >
          <Center>
            <Icon
              mb="1"
              as={<MaterialCommunityIcons name="clipboard-text-search" />}
              color="white"
              size="xl"
            />
            <Text color="white" fontSize="12">
              Quem somos
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => setSelected(2) & navigation.navigate("Services")}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 2 ? "hand-heart" : "hand-heart-outline"}
                />
              }
              color="white"
              size="xl"
            />
            <Text color="white" fontSize="12">
              Serviços
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(3) & navigation.navigate("User")}
        >
          <Center>
            <Icon
              mb="1"
              as={<MaterialCommunityIcons name="clipboard-text-search" />}
              color="white"
              size="xl"
            />
            <Text color="white" fontSize="12">
              Solicitações
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </>
  );
};
