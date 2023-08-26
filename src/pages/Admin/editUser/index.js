import React, {useState, useContext} from 'react';
import { Box, Text, Avatar, Input, Button, Container, VStack, Heading, Divider, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../../../components/BackButton';

export default function EditUser({route}) {
    const navigation = useNavigation()

 return (
  <ScrollView style={{flex: 1, width: '100%', height: '100%'}}>
    <Box flex={1} w="100%" h="100%" alignItems="center" justifyContent="center" bg="lightBlue.400">
    <Box
      w="100%"
      h="60px"
      mt="12"
      ml="5"
      justifyContent="end"
       >
        <BackButton />
      </Box>
          <Heading mb="15" color="light.100">EDITAR PERFIL</Heading>
          <Avatar mb="10" size="2xl" source={{ uri: route.params.avatar }}/>
          
          <VStack w="80%" space={4} px="5" py="7" bg="darkBlue.200" rounded="xl">

            <Text color="white">Nome</Text>
            <Input 
            placeholder={route.params.nome}
            placeholderTextColor="#fff"
            />
            <Text color="white">Idade</Text>
            <Input 
            placeholder={route.params.idade}
            placeholderTextColor="#fff"
            />
            <Text color="white">Endereço</Text>
            <Input 
            placeholder={route.params.address}
            placeholderTextColor="#fff"
            />  
            <Text color="white">CPF</Text>
            <Input 
            placeholder={route.params.cpf}
            placeholderTextColor="#fff"
            />
            <Text color="white">NIS</Text>
            <Input 
            placeholder={route.params.nis}
            placeholderTextColor="#fff"
            />
            <Text color="white">Telefone</Text>
            <Input 
            placeholder={route.params.phone}
            placeholderTextColor="#fff"
            />  
            <Text color="white">Email</Text>
            <Input 
            placeholder={route.params.email}
            placeholderTextColor="#fff"
            />   
            <Text color="white">Pergunta primaria</Text>
            <Input 
            placeholder={route.params.question1}
            placeholderTextColor="#fff"
            /> 
            <Text color="white">Pergunta secundária</Text>
            <Input 
            placeholder={route.params.question2}
            placeholderTextColor="#fff"
            /> 
            <Text color="white">Senha</Text>
            <Input 
            placeholder={route.params.password}
            placeholderTextColor="#fff"
            />   
          </VStack>
          <Button my="10" w="70%" size="lg" colorScheme={'darkBlue'}>Salvar</Button>
      
    
    </Box>
  </ScrollView>
  );
}