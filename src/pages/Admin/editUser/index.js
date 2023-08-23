import React, {useState, useContext} from 'react';
import { Box, Text, Avatar, Input, Button, Container, VStack, Heading, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
export default function EditUser({route}) {
    const navigation = useNavigation()
 return (
   <Box flex={1} w="100%" h="100%" alignItems="center" justifyContent="center" bg="lightBlue.400">
    
    
    <Avatar size="2xl" source={{  uri: route.params.avatar }} />
    <Divider mx="10" my="30" />
        <Heading mb="15" color="light.100">EDITAR PERFIL</Heading>
        <VStack w="80%" space={4} px="5" py="7" bg="darkBlue.200" rounded="xl">
          <Text color="white">Nome</Text>
          <Input 
          placeholder={route.params.nome}
          placeholderTextColor="#fff"
          />
          <Text color="white">CPF</Text>
          <Input 
          placeholder={route.params.cpf}
          placeholderTextColor="#fff"
          /> 
          <Text color="white">Email</Text>
          <Input 
          placeholder={route.params.email}
          placeholderTextColor="#fff"
          />  
        </VStack>
        
    
    
    <Button bg="darkBlue.400" onPress={() => navigation.goBack()}>VOLTAR</Button>
   </Box>
  );
}