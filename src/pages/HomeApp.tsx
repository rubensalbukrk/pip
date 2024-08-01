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
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CarouselHome } from "../../components/Carousel";
import UserAvatar from "../../components/UserAvatar";
import LottieView from "lottie-react-native";
import { TextLarge, TextMedium, TextSmall } from "../../components/TextLg/Text";
import Animated, { FadeInUp, ZoomIn } from "react-native-reanimated";
import colors from "tailwindcss/colors";

export const HomeApp = () => {
  const { solicitations, refreshing, setRefreshing } =
    useContext<any>(UserContext);
  const { navigate } = useNavigation();
  const countSolicitations = solicitations?.length;

  return (
    <View className="flex-1 w-full bg-slate-200">
      <View className="w-screen absolute z-0 h-44">
        <LottieView
          autoPlay={true}
          loop
          style={{
            minHeight: 360,
            width: "100%",
            transform: [{ rotate: "180deg" }],
          }}
          source={require("../../assets/animations/teste/AnimationHomeApp.json")}
        />
      </View>
      <View className="flex-row w-full h-40">
        <TouchableOpacity
          style={{ zIndex: 10 }}
          className="absolute top-6 shadow-xl shadow-black left-5 w-32 h-32 items-center justify-center bg-slate-300/70 rounded-full"
          onPress={() => navigate("User")}
        >
          <UserAvatar x={124} y={124} />
        </TouchableOpacity>

        <View className="w-full bottom-3 right-2 h-38 justify-center">
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
        style={{
          width: "100%",
          minHeight: 270,
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
        <View className="left-4 my-5 flex-row items-center">
          <Feather name="info" color={colors.blue[500]} size={32} />
          <TextLarge text="Notícias" className="text-2xl text-blue-500" />
        </View>
        <CarouselHome />
      </ScrollView>

      <Animated.View
        entering={ZoomIn.delay(1400).duration(1000)}
        style={{ zIndex: 20 }}
        className="absolute bottom-0 flex-row w-full px-3 h-20 items-center justify-around
        bg-blue-400 rounded-tl-lg rounded-tr-lg border-t-2 border-slate-400/20 
        "
      >
        <TouchableOpacity
          className="w-24 h-10 items-center justify-center"
          onPress={() => navigate("Sobre")}
        >
          <FontAwesome color={colors.slate[100]} size={38} name="group" />
          <Text className="font-default text-slate-200 text-center text-xs">
            Nós
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-24 h-10  items-center justify-center"
          onPress={() => navigate("Services")}
        >
          <MaterialCommunityIcons
            color={colors.slate[100]}
            size={40}
            name={"hand-heart"}
          />

          <Text className="font-default text-slate-200 text-center text-xs">
            Serviços
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-20 h-10 items-center justify-center  "
          onPress={() => navigate("User")}
        >
          <FontAwesome color={colors.slate[100]} size={38} name={"user"} />
          <Text className="font-default text-slate-200 text-center text-xs">
            Você
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-24 h-10 items-center justify-center "
          onPress={() => navigate("SolicitationUser")}
        >
          <View
            style={{ zIndex: 10 }}
            className="absolute w-4 h-4 items-center justify-center bottom-2 right-4 mb-2 bg-red-600/100 rounded-full"
          >
            <Text className="font-default text-center self-center text-slate-200 text-xs">
              {countSolicitations ? countSolicitations : "0"}
            </Text>
          </View>
          <LottieView
            autoPlay
            loop
            duration={3000}
            style={{ width: 50, marginBottom: 10, height: 70 }}
            source={require("../../assets/animations/notify2.json")}
          />
          <Text className="absolute top-8 font-default text-slate-200 text-center text-xs">
            Solicitações
          </Text>
        </TouchableOpacity>
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
