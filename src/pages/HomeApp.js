import React, { useContext, useState } from "react";
import { api } from "../api/api";
import axios from "axios";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CarouselHome } from "../../components/Carousel";
import UserAvatar from "../../components/UserAvatar";
import Background from "../../assets/svgs/Homeapp-wave.svg";
import { height, width } from "../utils/dimensions";
import { LottieView } from "../utils/LottieView";

export const HomeApp = () => {
  const {
    users,
    logged,
    solicitations,
    setSolicitations,
    setNotices,
    refreshing,
    setRefreshing,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const nome = logged?.nome;
  const primeiro_nome = nome?.split(" ").shift();
  const countSolicitations = solicitations?.length;
  const config = {
    headers: {
      "ngrok-skip-browser-warning": "69421",
    },
  };
  const getSolicitations = async () => {
    try {
      const response = await axios.get(`${api}/solicitations`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      const solicitations = await response.data.solicitations;
      setSolicitations(solicitations);
      setRefreshing(false);
    } catch (error) {
      alert("Não ah novas solicitações!");
    }
  };
  const getNotices = async () => {
    try {
      const response = await axios.get(`${api}/notices`, config);
      const fetchNotices = await response.data.notices;
      fetchNotices && setNotices(fetchNotices);
      setRefreshing(false);
    } catch (e) {
      console.log(`Não ah novas not ${e}`);
      setRefreshing(false);
    }
  };

  return (
    <View className="flex-1 w-full">
      <Background
        style={{ zIndex: 0, position: "absolute" }}
        width={width}
        height={height + 25}
      />
      <View className="flex-row w-full h-40">
        <TouchableOpacity
          style={{ zIndex: 10 }}
          className="absolute top-20 left-5 w-32 h-32 items-center justify-center bg-blue-600 rounded-full"
          onPress={() => navigation.navigate("User")}
        >
          <UserAvatar x={140} y={140} />
        </TouchableOpacity>

        <View className="w-full h-38 justify-center">
          <Text className="font-default left-10 bottom-7 text-md text-white">
            PROJETO INCLUSÃO POPULAR
          </Text>
          <Image
            className="absolute right-0 w-40 h-40"
            alt="pip-logo"
            resizeMode="cover"
            source={require("../../assets/pip-icon.png")}
          />
        </View>
      </View>

      <View
        style={{ zIndex: 1 }}
        className="w-full h-10 px-3 mt-2 justify-center"
      >
        <Text className="font-default self-center ml-20 mt-2 text-gray-700 text-2xl">
          Olá {primeiro_nome}
        </Text>
      </View>

      <ScrollView
        className="w-full h-full px-3 py-5"
        onScrollBeginDrag={() => console.log("descendo") & setRefreshing(true)}
        refreshControl={
          <RefreshControl
            progressViewOffset={2000}
            tintColor="transparent"
            colors={["rgba(255,255,255,0)"]}
            progressBackgroundColor={"#fff0"}
            refreshing={refreshing}
            onRefresh={() =>
              setRefreshing(true) & getSolicitations() & getNotices()
            }
          />
        }
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full h-96">
          <Text className="font-default text-gray-700 text-2xl">Notícias</Text>
          <CarouselHome />
        </View>
        {refreshing ? (
            <LottieView
            autoPlay
            loop
            duration={500}
            resizeMode='contain'
            style={{ zIndex: 3, position: "absolute", width: '100%'}}
            source={require("../../assets/animations/animation-skeleton-notices.json")}
          />
        ) : null}
        {refreshing ? (
          <LottieView
            autoPlay
            loop
            style={{ zIndex: 5, position: "absolute", width: "100%" }}
            source={require("../../assets/animations/animation-pip-balls-286f.json")}
          />
        ) : null}
      </ScrollView>

      <View
        style={{ zIndex: 20 }}
        className="absolute bottom-2 flex-row w-full px-3 h-14 rounded-lg justify-between"
      >
        <TouchableOpacity
          className="w-16 h-10 items-center justify-center"
        >
          <Ionicons
            color={"#3C3C3C"}
            size={38}
            name={"home"}
          />
          <Text className="font-default text-gray-600 text-center text-xs">
            Inicio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-17 h-10 items-center justify-center"
          onPress={() => navigation.navigate("Sobre")}
        >
          <FontAwesome color={"#3C3C3C"} size={38} name="group" />
          <Text className="font-default text-gray-600 text-center text-xs">
            Nós
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-16 h-10 items-center justify-center"
          py="2"
          flex={1}
          onPress={() => navigation.navigate("Services")}
        >
          <MaterialCommunityIcons
            color={"#3C3C3C"}
            size={40}
            name={"hand-heart"}
          />

          <Text className="font-default text-gray-600 text-center text-xs">
            Serviços
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-17 h-10 right-2 items-center justify-center"
          onPress={() =>
           navigation.navigate("SolicitationUser")
          }
        >
          <View
            style={{ zIndex: 10 }}
            className="absolute w-4 h-4 items-center justify-center bottom-2 right-4 mb-2 bg-red-600/100 rounded-full"
          >
            <Text className="font-default text-center self-center text-white text-xs">
              {countSolicitations ? countSolicitations : "0"}
            </Text>
          </View>
          <LottieView
            autoPlay
            loop
            duration={3000}
            style={{ width: 45, marginBottom: 10, height: 70 }}
            source={require("../../assets/animations/notify2.json")}
          />
          <Text className="absolute top-8 font-default text-gray-600 text-center text-xs">
            Solicitações
          </Text>
        </TouchableOpacity>
      </View>
      <LottieView
        autoPlay
        loop
        duration={11999}
        style={{ position: "absolute", bottom: 0, width: width }}
        source={require("../../assets/animations/animation-waves-gray.json")}
      />
    </View>
  );
};
