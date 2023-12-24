import React, { useContext, useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { width } from "../../src/utils/dimensions";
import { useFetchData } from "../../src/hooks/useFetchData";
import { api } from "../../src/api/api";
import { UserContext } from "../../src/contexts/UserContext";

export const CarouselHome = () => {
  const {refreshing,setRefreshing} = useContext<any>(UserContext)
  const {list, getData} = useFetchData(api.getNotices)
  const navigation = useNavigation();

  useEffect(() => {
    getData()
    setRefreshing(false)
  },[refreshing])
  
  return (
    <View style={{zIndex: 99}} className='w-full items-center'>
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay={true}
        data={list}
        overscrollEnabled={true}
        scrollAnimationDuration={1400}
        renderItem={({ index, item }) => (
          <View className='w-80 h-48 self-center'>
              <TouchableOpacity
              className='w-80 items-center justify-center shadow-md shadow-black bg-blue-600 rounded-lg'
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
        
                <View className='absolute px-3 py-1 bottom-0 justify-center items-center rounded-lg bg-blue-900'
                >
                  <Text className='font-default text-md text-white'>
                  {item.title}
                  </Text>
                </View>
              </View>
              </TouchableOpacity> 
            </View>
          
        )}
      />
    </View>
  );
};
