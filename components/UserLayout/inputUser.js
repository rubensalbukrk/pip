import React from "react";
import { Box, Text } from "native-base";

export default function InputInfoUser(props) {
  return (
    <Box  justifyContent="left">
      <Text ml="2" color="light.100" mt="3%" fontSize="lg">
        {props.infoLabel}
      </Text>
      <Box h="10" w="100%" bg="rgba(255,255,255, 0.12)" rounded="md" justifyContent="center">
        <Text paddingX="4" color="white" mr="3" fontSize="lg" >
          {props.infoValue}
        </Text>
      </Box>
    </Box>
  );
}
