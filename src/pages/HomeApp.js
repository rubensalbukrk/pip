import React, { useContext, useRef, useState, useEffect } from "react";
import { getNotices } from "../requisitions/api";
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
  HStack,
  Text,
  Center,
  Icon,
  Pressable,
  Image,
  Divider,
  NativeBaseProvider,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CarouselHome } from "../../components/Carousel";
import UserAvatar from "../../components/UserAvatar";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../components/GlobalStyles";

export const HomeApp = () => {
  const { users, logged, setNotices, refreshing, setRefreshing } =
    useContext(UserContext);
  const [selected, setSelected] = React.useState(0);
  const navigation = useNavigation();
  const nome = logged?.nome;
  const primeiro_nome = nome?.split(" ").shift();

  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  if (refreshing) {
    getNotices();
  }

  return (
    <>
      <NativeBaseProvider config={config}>
        <Box
          w="100%"
          h="180px"
          flexDir={"row"}
          px="4"
          justifyContent={"space-between"}
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
            style={{ width: 180, height: 150, top: "5%", left: "-20%" }}
            delay={800}
            duration={2000}
            animation="bounceInLeft"
          >
            <Image
              alt="pip-logo"
              w="200"
              h="150"
              resizeMode="cover"
              source={require("../../assets/pip-icon.png")}
            />
            <Text
              color="light.100"
              style={{
                bottom: "30%",
                left: "55%",
                fontSize: 14,
                width: 200,
                fontFamily: "Doppio One",
              }}
            >
              PROJETO INCLUSÃO POPULAR
            </Text>
          </Animatable.View>

          <Box top={0.5}>
            <TouchableOpacity onPress={() => navigation.navigate("User")}>
              <UserAvatar size={"xl"} />
            </TouchableOpacity>
          </Box>
        </Box>

        <Box
          flex={1}
          w="100%"
          bg={{
            linearGradient: {
              colors: ["lightBlue.600", "lightBlue.400"],
              start: [0, 0],
              end: [1, 0],
            },
          }}
        >
          <Animatable.View
            style={{
              width: "100%",
              marginTop: 20,
            }}
            delay={800}
            duration={2000}
            animation="bounceInLeft"
          >
            <Text
              fontSize={"2xl"}
              style={[GlobalStyles.fontSystem, { left: 20, fontSize: 30 }]}
            >
              Olá {primeiro_nome}
            </Text>
            <Divider w="50%" opacity={0.4} />
          </Animatable.View>
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
          <HStack bg="rgba(255,255,255, 0.15)" alignItems="center">
            <Pressable
              cursor="pointer"
              opacity={selected === 0 ? 1 : 0.5}
              py="3"
              flex={1}
              _focus={{color: 'white'}}
              onPress={() =>
                setSelected(0)
              }
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
                <Text color="white" fontSize="12" fontFamily="Doppio One">
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
                <Text color="white" fontSize="12" fontFamily="Doppio One">
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
                      name={
                        selected === 2 ? "hand-heart" : "hand-heart-outline"
                      }
                    />
                  }
                  color="white"
                  size="xl"
                />
                <Text color="white" fontSize="12" fontFamily="Doppio One">
                  Serviços
                </Text>
              </Center>
            </Pressable>
            <Pressable
              cursor="pointer"
              opacity={selected === 3 ? 1 : 0.5}
              py="2"
              flex={1}
              onPress={() =>
                setSelected(3) & navigation.navigate("SolicitationUser")
              }
            >
              <Center>
                <Icon
                  mb="1"
                  as={<MaterialCommunityIcons name="clipboard-text-search" />}
                  color="white"
                  size="xl"
                />
                <Text color="white" fontSize="12" fontFamily="Doppio One">
                  Solicitações
                </Text>
              </Center>
            </Pressable>
          </HStack>
        </Box>
      </NativeBaseProvider>
    </>
  );
};
