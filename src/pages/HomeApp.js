import React, { useContext } from "react";
import { getNotices } from "../api/api";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CarouselHome } from "../../components/Carousel";
import UserAvatar from "../../components/UserAvatar";
import HeaderBackground from "../../assets/svgs/header-wave.svg";
import WaveBottomBackground from "../../assets/svgs/background-bottom.svg";
import { height, width } from "../utils/dimensions";

export const HomeApp = () => {
  const { users, logged, setNotices, refreshing, setRefreshing } =
    useContext(UserContext);
  const [selected, setSelected] = React.useState(0);
  const navigation = useNavigation();
  const nome = logged?.nome;
  const primeiro_nome = nome?.split(" ").shift();

  if (refreshing) {
    getNotices();
  }

  return (
    <View className="flex-1 w-full">
      <HeaderBackground
        style={{ zIndex: 0, position: "absolute" }}
        width={width}
        height={height}
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
          <Text className="font-default left-10 bottom-5 text-md text-white">
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
        <Text className="font-default self-end mt-2 text-blue-400 text-2xl">
          Olá {primeiro_nome}!
        </Text>
      </View>

      <ScrollView
        className="w-full h-full px-3 py-5"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full h-96">
          <Text className="font-default text-blue-400 text-2xl">
            Notícias
            </Text>
          <CarouselHome />
        </View>
      </ScrollView>


        <View
          style={{ zIndex: 20}}
          className="absolute bottom-2 flex-row w-full px-3 h-14 rounded-lg justify-between"
        >
          <TouchableOpacity
            className="w-16 h-10 items-center justify-center"
            style={{ opacity: selected === 0 ? 1 : 0.5 }}
            onPress={() => setSelected(0)}
          >
            <MaterialCommunityIcons
              color={"white"}
              size={38}
              name={selected === 0 ? "home" : "home-outline"}
            />
            <Text className="font-default text-white text-center text-xs">
              Inicio
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className=" w-16 h-10 items-center justify-center"
            style={{ opacity: selected === 1 ? 1 : 0.5 }}
            onPress={() => setSelected(1) & navigation.navigate("Sobre")}
          >
            <MaterialCommunityIcons
              color={"white"}
              size={38}
              name="clipboard-text-search"
            />
            <Text className="font-default text-white text-center text-xs">
              Nós
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-16 h-10 items-center justify-center"
            style={{ opacity: selected === 2 ? 1 : 0.6 }}
            opacity={selected === 2 ? 1 : 0.6}
            py="2"
            flex={1}
            onPress={() => setSelected(2) & navigation.navigate("Services")}
          >
            <MaterialCommunityIcons
              color={"white"}
              size={38}
              name={selected === 2 ? "hand-heart" : "hand-heart-outline"}
            />

            <Text className="font-default text-white text-center text-xs">
              Serviços
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-17 h-10 items-center justify-center"
            style={{ opacity: selected === 3 ? 1 : 0.5 }}
            onPress={() =>
              setSelected(3) & navigation.navigate("SolicitationUser")
            }
          >
            <MaterialCommunityIcons
              color={"white"}
              size={38}
              name="clipboard-text-search"
            />
            <Text className="font-default text-white text-center text-xs">
              Solicitações
            </Text>
          </TouchableOpacity>
        </View>
   
      <WaveBottomBackground />
    </View>
  );
};
