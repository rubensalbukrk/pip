import React from "react";
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
  AspectRatio,
} from "native-base";
const ITEM_WIDTH = Dimensions.get("window").width;

let Notices = [
  {
    imgUrl:
      "https://scontent.cdninstagram.com/v/t51.2885-15/355415102_1719524825145688_1632320109549556703_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&_nc_ohc=lSS3exFIfmQAX_zFPDJ&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzEzMTA1NDMxMzQ5MzYzNDIwMg%3D%3D.2-ccb7-5&oh=00_AfBgRT-96ngTDEo2qyQY_LrTIxY2xtoI_158K9RTOWKiNw&oe=64F78739&_nc_sid=10d13b",
  },
  {
    imgUrl:
      "https://scontent.cdninstagram.com/v/t51.2885-15/355673618_1132893641433511_7223163916792734888_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=2zsesaqHxGYAX_RHA88&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MzEzMTA1NDMxMzQ5MzYwMTg4NA%3D%3D.2-ccb7-5&oh=00_AfCEdrBGdTtj9MbftTdbpbUJSM5-qARUkxOD7krtVhr_Hg&oe=64F6BD04&_nc_sid=10d13b",
  },
  {
    imgUrl:
      "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-15/371738967_522421303409569_3772221396390568555_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=2EpXqftSLngAX-AzHio&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzE4MTEwNDc1MjM5MjkxOTQ3NA%3D%3D.2-ccb7-5&oh=00_AfAkEnwLkplhunPY3i33eX3pPFOipdh8Fo9dnT7mpPLXIA&oe=64F7D514&_nc_sid=ee9879",
  },
  { 
    imgUrl: "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-15/367641930_1020431839135899_5161838627417598349_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=BwgUPDj71NsAX9Zd6O2&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzE3MDc3OTM3MTc4MTUzOTE5NQ%3D%3D.2-ccb7-5&oh=00_AfAzqfloePxFOSU8JU21PAEwgo8_8fZac7K71pq1JgvMqg&oe=64F80515&_nc_sid=ee9879"
}
];



export const CarouselHome = () => {
  return (
    <View style={{ flex: 1, marginTop: '5%'}}>
      <Carousel
        loop
        width={ITEM_WIDTH}
        height={180}
        autoPlay={true}
        data={Notices}
        overscrollEnabled={true}
        scrollAnimationDuration={1400}
        renderItem={({ index, item }) => (
          <Box alignItems="center">
            <Box
              maxW="80"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
            >
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: item.imgUrl,
                    }}
                    alt="image"
                  />
                </AspectRatio>
                <Center
                  bg="violet.500"
                  _dark={{
                    bg: "violet.400",
                  }}
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
                  NOVIDADE
                </Center>
              </Box>
            </Box>
          </Box>
        )}
      />
    </View>
  );
};
