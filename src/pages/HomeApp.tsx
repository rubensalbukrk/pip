import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StatusBar,
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
import Background from "../../assets/svgs/Solicitation-waves.svg";
import { height, width } from "../utils/dimensions";
import { LottieView } from "../utils/LottieView";
import { TextMedium } from "../../components/TextLg/Text";

export const HomeApp = () => {
  const {
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
          className="absolute top-10 shadow-xl shadow-black left-5 w-32 h-32 items-center justify-center bg-slate-300/70 rounded-full"
          onPress={() => navigate("User")}
        >
          <UserAvatar x={124} y={124} />
        </TouchableOpacity>

        <View className="w-full bottom-3 h-38 justify-center">
          <TextMedium className="absolute top-1 text-3xl right-1" text="PIP" />
          <Image
            className="absolute top-6 right-3 w-24 h-24"
            alt="pip-logo"
            resizeMode="cover"
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
          refreshing={refreshing} 
          onRefresh={() => setRefreshing(true)}
          />
        }
      >
        <View className="w-full h-96">
          <View
          className='flex-row w-full  justify-between items-center'
          >
             <Text className="font-default text-gray-700 text-2xl">Notícias</Text>
          </View>
          <CarouselHome />
        </View>
        
      </ScrollView>

      <View
        style={{ zIndex: 20 }}
        className="absolute bottom-2 flex-row w-full px-3 h-14 rounded-lg justify-between"
      >
        <TouchableOpacity
          className="w-16 h-10 items-center justify-center"
        >
          <Ionicons
            color={"white"}
            size={38}
            name={"home"}
          />
          <Text className="font-default text-white text-center text-xs">
            Inicio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-17 h-10 items-center justify-center"
          onPress={() => navigate("Sobre")}
        >
          <FontAwesome color={"white"} size={38} name="group" />
          <Text className="font-default text-white text-center text-xs">
            Nós
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-16 h-10 items-center justify-center"
          onPress={() => navigate("Services")}
        >
          <MaterialCommunityIcons
            color={"white"}
            size={40}
            name={"hand-heart"}
          />

          <Text className="font-default text-white text-center text-xs">
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
          <Text className="absolute top-8 font-default text-white text-center text-xs">
            Solicitações
          </Text>
        </TouchableOpacity>
      </View>
      <LottieView
        autoPlay
        loop
        duration={11999}
        style={{zIndex:0, position: "absolute", bottom: 0, width: width , opacity: 1}}
        source={require("../../assets/animations/teste/Animation - WAVE BLUE 2 TESTA HOJE.json")}
      />
      <StatusBar backgroundColor='#3d82ea' />
    </View>
  );
};
