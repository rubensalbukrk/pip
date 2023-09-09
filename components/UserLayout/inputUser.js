import React from "react";
import { Box, Text, Center, Heading, Input, Image, Avatar } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export default function InputInfoUser(props) {
  return (
    <Box justifyContent="left">
      <Text ml="2" color="light.100" mt="3%" fontSize="lg">
        {props.infoLabel}
      </Text>
      <Box opacity={0.5} h="10" bg="lightBlue.500" rounded="md" justifyContent="center">
        <Text paddingX="4" color="black" mr="3" fontSize="lg" >
          {props.infoValue}
        </Text>
      </Box>
    </Box>
  );
}
