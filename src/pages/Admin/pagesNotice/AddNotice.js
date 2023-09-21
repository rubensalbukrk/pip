import React from 'react';
import { Entypo } from '@expo/vector-icons'
import { Box, Text, Button, Container, Divider, Input } from 'native-base';

export default function AddNotice() {
 return (
   <Box flex={1} py="3" px="3" bg="lightBlue.400" w="100%"
   _text={{
    color: 'light.100',
    fontFamily: 'Doppio One'
   }}
   > 
   <Box flexDir={"row"} alignItems="center" _text={{
    color: 'light.100',
    fontFamily: 'Doppio One'
   }}>
    <Entypo name="newsletter" style={{marginRight: '2%'}} size={32} color="white" />
    Criar notícia
   </Box>
     <Divider />

     <Box 
     w="100%"
     bg="lightBlue.300"
     _text={{
      color: 'light.100',
      fontFamily: 'Doppio One'}}
     >
      Titulo
      <Input w="80%" />

      Mensagem
      <Input w="80%" />
    
     </Box>
     <Box bg="lighBlue.300" w="100%" flexDir={"row"}
     >
        Imagem
        <Feather name="image" color="white" size={32} />
      </Box>
   </Box>
  );
}