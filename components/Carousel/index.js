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
      "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-15/367641930_1020431839135899_5161838627417598349_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=rNthgFR66_AAX90mu54&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzE3MDc3OTM3MTc4MTUzOTE5NQ%3D%3D.2-ccb7-5&oh=00_AfCWE-q-ahmdxuRLIDDt1xfQSu5C63UZ85aBxey6wsgalA&oe=64E43E95&_nc_sid=ee9879",
  },
  {
    imgUrl:
      "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-15/366436463_600722485538288_4929955213713216381_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=sbBT8TKUfVMAX8xfdCD&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzE2NTg3MjkzMDMxODcxNTUwMg%3D%3D.2-ccb7-5&oh=00_AfCzWkRuoqkKpWiX2bd5e9w9H81UeQF7-T1U9mYREJL8xQ&oe=64E2B5D5&_nc_sid=ee9879",
  },
  {
    imgUrl:
      "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-15/333379488_1223967924878893_6090750036811938454_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=FPeJ1w8wr2UAX-edXOP&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzA1NDA5MDY4MzMwNDkyOTgzNQ%3D%3D.2-ccb7-5&oh=00_AfBt4ixjM9UMTX7XmIqFPDcT4N0i9KqFzS_TfgQe-pFa7w&oe=64E3199E&_nc_sid=b41fef",
  },
  { 
    imgUrl: "https://instagram.fjpa9-1.fna.fbcdn.net/v/t51.2885-15/277977523_161860176227974_6289078290490555572_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fjpa9-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=uCFmH-sObnIAX_xlG8n&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MjgxMTM1NDExNzQ2MzIzNTYxMg%3D%3D.2-ccb7-5&oh=00_AfDAoHvq3-Obqm05jkYgyotlHjikeNagzGN9ogAFTx3MqA&oe=64E45B16&_nc_sid=b41fef"
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
