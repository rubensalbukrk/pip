import React from 'react';
import { Box, Text, Heading, Button, Image, Container } from 'native-base';
import BackButton from '../BackButton';

export default function NoticesView({route}) {
 return (
   <Box
   flex={1}
   w="100%"
   bg="lightBlue.400"
   >
    <Box
    top="0"
    w="100%"
    >
        <Image 
        w="100%"
        h="200"
        alt="picture-notice"
        source={route?.params?.picture} 
        />
    </Box>
    <Heading
        color="#fff"
        >
            {route?.params?.titulo}
        </Heading>
    <Container 
    w="80%"
    bg="lightBlue.300"
    alignSelf="center"
    h="200"
        rounded="xl"
        my="2"
        py="3"
        px="2"
    >
   
            <Text
            color="#fff"
            >
                {route?.params?.mensagem}
            </Text>
        
    </Container>
    <Box h="40" bg="lightBlue.300" rounded="lg"> 
    <Text
            color="#fff"
            >
                {route?.params?.date}
            </Text>
    </Box>

   </Box>
  );
}