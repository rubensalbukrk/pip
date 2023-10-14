import React, {useContext, useEffect} from "react";
import axios from "axios";
import Carousel from "react-native-reanimated-carousel";
import { View, Dimensions } from "react-native";
import {
  Box,
  Text,
  Image,
  Center,
  HStack,
  Stack,
  Heading,
  Pressable,
  AspectRatio,
} from "native-base";
import { UserContext } from "../../src/contexts/UserContext";
import { apiNotice } from "../../src/requisitions/api";
import { useNavigation } from "@react-navigation/native";
const ITEM_WIDTH = Dimensions.get("window").width;

export const CarouselHome = () => {
  const { setNotices, notices } = useContext(UserContext)
  const navigation = useNavigation()
  useEffect(() => {
    axios
      .get(apiNotice, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      })
      .then((response) => {
        const notices = response.data.notices;
        setNotices(notices)
      })
      .catch((error) => console.log(error));
  }, [notices]);
  return (
    <View style={{ flex: 1, marginTop: '3%'}}>
      <Carousel
        loop
        width={ITEM_WIDTH}
        height={200}
        autoPlay={true}
        data={notices}
        overscrollEnabled={true}
        scrollAnimationDuration={1400}
        renderItem={({ index, item }) => (
          <Box shadow={7} alignItems="center">
            <Box
              w="90%"
              h="180px"
              rounded="lg"
            >
              <Pressable 
              onPress={() => navigation.navigate('ViewNotice', {
                title: item.title,
                mensagem: item.mensagem,
                img: item.img,
                date: item.date
              })}
              >
                
              <Box rounded={"lg"} h="100%" w="100%">
             
                  <Image
                  w="100%"
                  h="100%"
                  rounded="lg"
                  resizeMode="cover"
                    source={{
                      uri: item.img }}
                    alt={`${item.mensagem}`}
                  />
               
               
                <Box position={"relative"} alignSelf="center">
                
                </Box>
                <Center
                  bg="darkBlue.400"
                  rounded="lg"
                  _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs",
                  }}
                  position="absolute"
                  bottom="0"
                  px="3"
                  py="1.5"
                >
                  {item.title}
                </Center>
              </Box>
              </Pressable> 
            </Box>
          </Box>
        )}
      />
    </View>
  );
};
