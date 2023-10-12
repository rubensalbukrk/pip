import React, { useContext, useState } from "react";
import axios from "axios";
import { api } from "../requisitions/api";
import * as Animatable from "react-native-animatable";

import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
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
  Image,
  NativeBaseProvider,
} from "native-base";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CarouselHome } from "../../components/Carousel";
import CardView from "../../components/CardsView";
import UserAvatar from "../../components/UserAvatar";
import { LinearGradient } from "expo-linear-gradient";

export const HomeApp = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { users, logged, setNotices } = useContext(UserContext);
  const [selected, setSelected] = React.useState(0);
  const navigation = useNavigation();
  const nome = logged?.nome;
  const primeiro_nome = nome?.split(" ").shift();

  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  function getNotices() {
    axios
      .get(`${api}/notices`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      .then((response) => {
        const notices = response.data.notices;
        setNotices(notices);
        setRefreshing(false);
      })
      .catch((error) => console.log(error));
  }

  if (refreshing) {
    getNotices();
  }

  return (
    <NativeBaseProvider config={config}>
      <Box
        w="100%"
        t="0"
        h="20%"
        flexDir={"row"}
        justifyContent="space-between"
        px="4"
        pt="10%"
        alignItems="center"
        bg={{
          linearGradient: {
            colors: ["lightBlue.600", "lightBlue.400"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
        <Animatable.View
          style={{ width: 60, height: 60 }}
          delay={800}
          duration={2000}
          animation="bounceInLeft"
        >
          <Image
            alt="pip-logo"
            w="60"
            h="60"
            shadow={4}
            resizeMode="contain"
            source={require("../../assets/pip-icon.png")}
          />
          <Text
            color="light.100"
            style={{ bottom: "20%", left: "50%", fontSize: 12, width: 200 }}
          >
            PROJETO INCLUSÃO POPULAR
          </Text>
        </Animatable.View>
        <Box flexDir={"row"} alignItems="center" paddingTop="3">
          <Animatable.Text
            style={{
              height: 40,
              fontFamily: "Doppio One",
              fontSize: 20,
              marginBottom: "30%",
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
          <TouchableOpacity onPress={() => navigation.navigate("User")}>
            <UserAvatar source={{ uri: logged?.avatar }} size={"lg"} />
          </TouchableOpacity>
        </Animatable.View>
      </Box>
      <Box flex={1} w="100%" bg={{
              linearGradient: {
                colors: ["lightBlue.600", "lightBlue.400"],
                start: [0, 0],
                end: [1, 0],
              },
            }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
          
          w="100%"
          pb="20"
          h="50%"
          t="0"
          horizontal={false}
        >
          <Box
            flex={1}
            w="100%"
            py="5"
            bg={{
              linearGradient: {
                colors: ["lightBlue.600", "lightBlue.400"],
                start: [0, 0],
                end: [1, 0],
              },
            }}
          >
            <Animatable.Text
              duration={1000}
              delay={1000}
              animation="fadeIn"
              style={{
                fontSize: 25,
                marginLeft: "3%",
                marginTop: "3%",
                color: "#f8f8f8",
                fontFamily: "Doppio One",
              }}
            >
              Notícias
            </Animatable.Text>

            <Animatable.View duration={1000} delay={1000} animation="fadeIn">
              <CarouselHome />
            </Animatable.View>

          </Box>
        </ScrollView>
      </Box>
      <HStack
        bg={"lightBlue.500"}
        alignItems="center"
        safeAreaBottom
        shadow={9}
      >
        <Pressable
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={({ focused }) => setSelected(0) & focused && setSelected(0)}
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
          onPress={() => setSelected(1) & navigation.navigate("Sobre")}
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
          onPress={() => setSelected(3) & navigation.navigate("SolicitationUser")}
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
    </NativeBaseProvider>
  );
};
