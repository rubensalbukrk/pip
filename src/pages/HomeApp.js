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
    <View
    className='flex-1 w-full h-96 bg-blue-700 px-4'
    >
      <View
      className='w-30 h-16 top-5 right-40'
      >
        <Image
        className='w-30 h-14'
          alt="pip-logo"
          resizeMode="cover"
          source={require("../../assets/pip-icon.png")}
        />
        <Text
        className='font-default bottom-30 left-56 text-lg text-white'
        >
          PROJETO INCLUSÃO POPULAR
        </Text>
      </View>

      <View >
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <UserAvatar x={200} y={200} />
        </TouchableOpacity>
      </View>

      <View
      className='flex-1 w-full bg-blue-600'

      >
        <View
        className='w-full mt-20'
        >
          <Text
          className='font-default text-white font-2xl'
          >
            Olá {primeiro_nome}
          </Text>
        </View>
      </View>

      <ScrollView
      className='w-full h-52 pb-20'
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
        horizontal={false}
      >
        <View
        className='flex-1 w-full py-5 bg-blue-700'
      
        >
          <Text
            className='font-default mt-3 ml-3 text-white text-2xl'
          >
            Notícias
          </Text>

            <CarouselHome />
        </View>
      </ScrollView>

      <View 
      className='flex-row w-full bg-white/20 items-center'
      >
        <TouchableOpacity
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          _focus={{ color: "white" }}
          onPress={() => setSelected(0)}
        >
          <View>
            <MaterialCommunityIcons
              name={selected === 0 ? "home" : "home-outline"}
            />

            <Text color="white" fontSize="12" fontFamily="Doppio One">
              Inicio
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(1) & navigation.navigate("Sobre")}
        >
          <View>
            <MaterialCommunityIcons name="clipboard-text-search" />
            <Text color="white" fontSize="12" fontFamily="Doppio One">
              Quem somos
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => setSelected(2) & navigation.navigate("Services")}
        >
          <View>
            <MaterialCommunityIcons
              name={selected === 2 ? "hand-heart" : "hand-heart-outline"}
            />

            <Text color="white" fontSize="12" fontFamily="Doppio One">
              Serviços
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() =>
            setSelected(3) & navigation.navigate("SolicitationUser")
          }
        >
          <View>
            <MaterialCommunityIcons name="clipboard-text-search" />

            <Text color="white" fontSize="12" fontFamily="Doppio One">
              Solicitações
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
