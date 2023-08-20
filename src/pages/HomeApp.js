import React, { useContext, useState } from "react";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "react-native";
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import {
  Box,
  Text,
  VStack,
  HStack,
  Center,
  FormControl,
  Modal,
  Input,
  Icon,
  Avatar,
  Pressable,
  Button,
  ScrollView,
  Image,
  Divider,
} from "native-base";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CarouselHome } from "../../components/Carousel";
import CardView from "../../components/CardsView";
import { AuthContext } from "../contexts/AuthContext";


export const HomeApp = () => {
  const { users } = useContext(UserContext);
  const { logged } = useContext(AuthContext)
  const [selected, setSelected] = React.useState(1);
  const navigation = useNavigation();
  const nome = logged?.nome;
  const primeiro_nome = nome?.split(" ").shift();

  return (
    <>
      <Box
        w="100%"
        t="0"
        h="15%"
        flexDir={"row"}
        bg="darkBlue.500"
        roundedBottom="md"
        shadow={5}
      >
        <Box flexDir={"row"} alignItems="center" paddingTop="3">

          <Animatable.View delay={200} duration={2000} animation="bounceInDown">
            <Avatar ml="3" size={"lg"} shadow={2} bg={"light.200"} source={{uri : logged?.avatar }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("User")}
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <AntDesign name="user" size={42} color="black" />
              </TouchableOpacity>
            </Avatar>
          </Animatable.View>

          <Animatable.Text
            style={{
              fontFamily: "Doppio One", fontSize: 28, color: "white", marginLeft: "5%"
            }}
            
            delay={800}
            duration={2000}
            animation="bounceInLeft"
          >
            Olá {primeiro_nome}
          </Animatable.Text>
        </Box>

        <Animatable.View delay={800} duration={2000} animation="bounceInDown">
          <Box
            h="100%"
            w="100%"
            right="-80%"
            justifyContent="center"
            alignItems="center"
            flexDir={"column"}
          > 
            <Animatable.Image
              alt="pip-icon"
              w="16"
              animation="tada"
              iterationCount="infinite"
              h="16"
              resizeMode="center"
              source={require("../../assets/pip-icon-small.png")}
            />
          </Box>
        </Animatable.View>
      </Box>

      <ScrollView w="100%" pb="20" h="50%" t="0" horizontal={false}>
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
      
          <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={9}>
            <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0)}>
              <Center>
                <Icon mb="1" as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="white" size="sm" />
                <Text color="white" fontSize="12">
                  Inicio
                </Text>
              </Center>
            </Pressable>
            <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1)}>
              <Center>
                <Icon mb="1" as={<MaterialCommunityIcons name="clipboard-text-search" />} color="white" size="sm" />
                <Text color="white" fontSize="12">
                  Pesquisar
                </Text>
              </Center>
            </Pressable>
            <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
              <Center>
                <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? 'cart' : 'cart-outline'} />} color="white" size="sm" />
                <Text color="white" fontSize="12">
                  Serviços
                </Text>
              </Center>
            </Pressable>
            <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(3) & navigation.navigate('User')}>
              <Center>
                <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} color="white" size="sm" />
                <Text color="white" fontSize="12">
                  Eu
                </Text>
              </Center>
            </Pressable>
          </HStack>

    
    </>
    
  );
};
