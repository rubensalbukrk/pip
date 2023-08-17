import React from "react";
import { Box, Text, Button, Center, HStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

export const User = () => {
  const navigation = useNavigation()
  return (


      <Box flex="1" justifyContent="center" alignItems="center">
        <Text fontSize={"2xl"}>PAGINA USUARIO</Text>
        <Button onPress={() => navigation.goBack() }>VOLTAR</Button>
      </Box>
 


  );
};
