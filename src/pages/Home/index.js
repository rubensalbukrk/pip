import React from 'react';
import { Box, Text, Button, Avatar, Image, HStack } from 'native-base';


export default function Home() {
 return (
   <Box style={{flex: 2, backgroundColor: 'red', justifyContent: 'center'}}> 
    <Text>CONTEUDO PAGINA HOME</Text>
    <TouchableOpacity style={{width: 70, height: 70, borderRadius: 50, backgroundColor: 'blue'}} onPress={() => alert('Deseja continuar ?')}>
    <Text>CONFIRMAR</Text>
    </TouchableOpacity>
    </Box>
  );
}