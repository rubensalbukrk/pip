import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

export default function User() {
 return (
   <View style={{flex: 2, backgroundColor: 'black'}}>
    
    <Text>PAGINA DO USUARIO</Text>
    <TouchableOpacity style={{width: 70, height: 70, borderRadius: 50, backgroundColor: 'blue'}} onPress={() => alert('Deseja continuar ?')}>
    <Text>ADD</Text>
    </TouchableOpacity>
   </View>
  );
}