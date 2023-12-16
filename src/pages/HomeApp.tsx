import React, { useContext, useEffect } from "react";
import { api } from "../api/api";
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
  Feather,
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
    logged,
    solicitations,
    refreshing,
    setRefreshing,
  } = useContext<any>(UserContext);
  const { navigate } = useNavigation();
  const countSolicitations = solicitations?.length;

  return (
    <View className="flex-1 w-full">
      <Background
        style={{ zIndex: 0, position: "absolute", alignSelf: 'center' }}
        width={width + 30}
        height={height + 40}
      />

      <View className="flex-row w-full my-2 h-40">
        <TouchableOpacity
          style={{ zIndex: 10 }}
          className="absolute top-10 shadow-xl shadow-black left-5 w-32 h-32 items-center justify-center bg-zinc-500/60 rounded-full"
          onPress={() => navigate("User")}
        >
          <UserAvatar x={124} y={124} />
        </TouchableOpacity>

        <View className="w-full h-38 justify-center">
  
          <Image
            className="absolute top-1 right-0 w-32 h-32"
            alt="pip-logo"
            resizeMode="contain"
            source={require("../../assets/pip-icon.png")}
          />
        </View>
      </View>

      <ScrollView
        className="w-full h-full px-3 py-5"
        onScrollBeginDrag={() => setRefreshing(true)}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
          refreshing={refreshing} />
        }
      >
        <View className="w-full h-96">
          <View
          className='flex-row w-full  justify-between items-center'
          >
             <Text className="font-default text-gray-700 text-2xl">Notícias</Text>
             <Feather name="info" size={24} color="black" />
          </View>
         
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
          <Text className="font-default text-gray-700 text-center text-xs">
            Inicio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-17 h-10 items-center justify-center"
          onPress={() => navigate("Sobre")}
        >
          <FontAwesome color={"#3C3C3C"} size={38} name="group" />
          <Text className="font-default text-gray-700 text-center text-xs">
            Nós
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-16 h-10 items-center justify-center"
          onPress={() => navigate("Services")}
        >
          <MaterialCommunityIcons
            color={"#3C3C3C"}
            size={40}
            name={"hand-heart"}
          />

          <Text className="font-default text-gray-700 text-center text-xs">
            Serviços
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-17 h-10 right-2 items-center justify-center"
          onPress={() =>
           navigate("SolicitationUser")
          }
        >
          <View
            style={{ zIndex: 10 }}
            className="absolute w-4 h-4 items-center justify-center bottom-2 right-4 mb-2 bg-red-600/100 rounded-full"
          >
            <Text className="font-default text-center self-center text-white text-xs">
              {countSolicitations ? countSolicitations - 1 : "0"}
            </Text>
          </View>
          <LottieView
            autoPlay
            loop
            duration={3000}
            style={{ width: 45, marginBottom: 10, height: 70 }}
            source={require("../../assets/animations/notify2.json")}
          />
          <Text className="absolute top-8 font-default text-gray-700 text-center text-xs">
            Solicitações
          </Text>
        </TouchableOpacity>
      </View>
      <LottieView
        autoPlay
        loop
        duration={11999}
        style={{ position: "absolute", bottom: 0, width: width , opacity: 0.7}}
        source={require("../../assets/animations/animation-waves-gray.json")}
      />
    </View>
  );
};
