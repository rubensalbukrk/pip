import React, {useContext, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles} from '../../../components/GlobalStyles'
import { Box, Image, Text, Input, Button, Pressable, Icon } from 'native-base';
import { UserContext } from '../../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';

export const Login = () => {
    const [show, setShow] = React.useState(false);
    const navigation = useNavigation()
    const { ObterDados } = useContext(UserContext)
    return (
        <Box style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center'
        }}>
	    <Image 
            style={{
	        resizeMode: 'cover',
	        top: 10,
            width: '70%',
            height: '30%'
            }}
            alt="pip-logo"
            source={require('../../../assets/imgs/pip-logo.jpg')} />

	   <Box w="80%" h="50%" py="3" justifyContent={'center'} alignItems="center" px="3" bgColor={'light.100'} rounded="xl" overflow="hidden">
		
        <Text fontSize={'3xl'} >ÁREA DE ACESSO</Text>

	    <Text style={{width: '100%', textAlign: 'left', marginTop: 20, marginLeft: '12%'}}>CPF</Text>
            <Input fontSize={'2xl'} w="90%" textAlign={'center'}
		    placeholder="000.000.000-00"	
		/>

	    <Text style={{width: '100%', textAlign: 'left', marginTop: 20, marginLeft: '12%'}}>SENHA</Text>
            <Input fontSize="2xl" w="90%" textAlign={'center'} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<Ionicons name={show ? "eye-outline" : "eye-off-outline"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password"  />
            <Button
            size={'lg'} w="150" mt="10"
            onPress={() => navigation.navigate('HomeApp')}>ENTRAR</Button>

	</Box>
            <Text
            color={'darkBlue.600'}
            style={{
                fontSize: 20,
                width: '100%',
                height: 30,
        	    marginTop: '7%',
                textAlign: 'center',
		        textDecorationLine: 'underline'
            }}
            onPress={() => navigation.navigate('Cadastrar')}>Fazer meu cadastro</Text>
        </Box>
    )
}