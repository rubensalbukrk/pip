import React from 'react';
import { Box, Text, Button, Heading, VStack } from 'native-base';
import BackButton from '../../../../BackButton';

export default function SolicitationInfoUser({route}) {
 return (
   <Box
   flex={1}
   w="100%"
   bg="lightBlue.400"
   >
    <Heading color={"light.100"}>
        Informações de Solicitação
    </Heading>
    
    <VStack
    w="100%"
    bg="lightBlue.300"
    rounded="lg"
    h="300"
    >
        <Heading>
            {route?.params?.userInfo.nome}
        </Heading>
    </VStack>

   </Box>
  );
}