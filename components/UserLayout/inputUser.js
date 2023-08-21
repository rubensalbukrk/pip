import React from "react";
import { Box, Text, Center, Heading, Input, Image, Avatar } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export default function InputInfoUser(props) {
  return (
    <Box justifyContent="left" mb="3%">
      <Text ml="2" color="light.500" fontSize="lg">
        {props.infoLabel}
      </Text>
      <Box h="10" bg="light.300" rounded="md" justifyContent="center">
        <Text paddingX="4" mr="3" fontSize="lg" >
          {props.infoValue}
        </Text>
      </Box>
    </Box>
  );
}
