import React, { useContext, useEffect } from "react";
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
import { LottieView } from "../utils/LottieView";
import { TextLarge, TextMedium, TextSmall } from "../../components/TextLg/Text";
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from "react-native-reanimated";
import firestore from "@react-native-firebase/firestore";

export const HomeApp = () => {
  const { logged, solicitations, refreshing, setRefreshing } =
    useContext<any>(UserContext);
  const { navigate } = useNavigation();
  const countSolicitations = solicitations?.length;
  const firstName = (): String => {
    const { nome } = logged;
    const tmpName = nome?.split(" ");
    const myName = tmpName[0];
    return myName;
  };

  return (
    <View className="flex-1 w-full bg-slate-200">
      <Animated.View
        style={{ zIndex: 0, width: "100%" }}
        entering={FadeInUp.duration(2000)}
      >
        <LottieView
          className="w-full absolute rotate-90"
          autoPlay={true}
          loop
          style={{ zIndex: 0, width: "100%" }}
          source={require("../../assets/animations/teste/Animation - WAVE BLUE 2 TESTA HOJE.json")}
        />
        <View className="flex-row w-full my-2 h-40">
          <TextSmall
            text={`Olá ${firstName()}`}
            className="absolute top-0 left-4"
          />
          <TouchableOpacity
            style={{ zIndex: 10 }}
            className="absolute top-10 shadow-xl shadow-black left-5 w-32 h-32 items-center justify-center bg-slate-300/70 rounded-full"
            onPress={() => navigate("User")}
          >
            <UserAvatar x={124} y={124} />
          </TouchableOpacity>

          <View className="w-full bottom-3 right-2 h-38 justify-center">
            <TextMedium
              className="absolute top-1 text-3xl right-1"
              text="PIP"
            />
            <Image
              className="absolute top-6 right-3 w-24 h-24"
              alt="pip-logo"
              resizeMode="cover"
              source={require("../../assets/pip-icon.png")}
            />
          </View>
        </View>
      </Animated.View>
      <ScrollView
        style={{
          width: "100%",
          minHeight: 240,
          backgroundColor: "transparent",
        }}
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
        <TextLarge text="Notícias" className="px-6 mt-3 mb-1 text-zinc-400" />
        <CarouselHome />
      </ScrollView>

      <Animated.View
        entering={ZoomIn.delay(1400).duration(1000)}
        style={{ zIndex: 20 }}
        className="absolute bottom-2 flex-row w-full px-3 h-14 rounded-lg justify-between"
      >
        <TouchableOpacity className="w-16 h-10 items-center justify-center">
          <Ionicons color={"white"} size={38} name={"home"} />
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
          className="w-20 h-10 right-2 items-center justify-center"
          onPress={() => navigate("SolicitationUser")}
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
          <Text className="absolute top-8 font-default text-white text-center text-xs">
            Solicitações
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ zIndex: 0 }} entering={FadeInDown.duration(2000)}>
        <LottieView
          autoPlay={true}
          loop
          style={{ zIndex: 0, width: "100%" }}
          source={require("../../assets/animations/teste/Animation - WAVE BLUE 2 TESTA HOJE.json")}
        />
      </Animated.View>

      <StatusBar
        backgroundColor="#3d82ea"
        barStyle="light-content"
        translucent={false}
        animated={true}
      />
    </View>
  );
};
