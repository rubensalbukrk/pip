import React, {useContext, useEffect} from "react";
import axios from "axios";
import Carousel from "react-native-reanimated-carousel";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";

import { UserContext } from "../../src/contexts/UserContext";
import { apiNotice } from "../../src/api/api";
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
          <View className='items-center shadow-lg shadow-black'>
            <View className='w-96 h-28 rounded-lg'
            >
              <TouchableOpacity
              onPress={() => navigation.navigate('ViewNotice', {
                title: item.title,
                mensagem: item.mensagem,
                img: item.img,
                date: item.date
              })}
              >
                
              <View className='w-full h-full rounded-lg'>
                  <Image className='w-full h-full rounded-lg'

                  resizeMode="cover"
                    source={{
                      uri: item.img }}
                    alt={`${item.mensagem}`}
                  />
        
                <View className='relative self-center'>
              
                </View>
                <View className='absolute px-3 py-1 bottom-0 justify-center items-center rounded-lg bg-blue-900'
                >
                  {item.title}
                </View>
              </View>
              </TouchableOpacity> 
            </View>
          </View>
        )}
      />
    </View>
  );
};
