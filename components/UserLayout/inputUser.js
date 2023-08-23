import React from "react";
import { Box, Text, Center, Heading, Input, Image, Avatar } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export default function InputInfoUser(props) {
  return (
    <Box justifyContent="left" mb="3%">
      <Text ml="2" color="light.100" fontSize="lg">
        {props.infoLabel}
      </Text>
      <Box h="10" bg="indigo.400" rounded="md" justifyContent="center">
        <Text paddingX="4" color="light.50" mr="3" fontSize="lg" >
          {props.infoValue}
        </Text>
      </Box>
    </Box>
  );
}
