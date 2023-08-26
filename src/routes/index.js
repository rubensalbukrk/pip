import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import cord_administrativo from '../pages/Services/cord-administrativo'
import cord_voluntarios from '../pages/Services/cord-voluntarios'
import pip_autistas from '../pages/Services/pip-autistas'
import pip_cidadania from '../pages/Services/pip-cidadania'
import pip_cursos from '../pages/Services/pip-cursos'
import pip_enem from '../pages/Services/pip-enem'
import pip_mulher from '../pages/Services/pip-mulher'
import pip_optometria from '../pages/Services/pip-optometria'
import pip_protagonismo from '../pages/Services/pip-protagonismo'
import pip_reforcoescolar from '../pages/Services/pip-reforcoescolar'
import pip_saudemental from '../pages/Services/pip-saudemental'
import pip_sgralimentar from '../pages/Services/pip-sgralimentar';

const Stack = createNativeStackNavigator()

export default function Routes() {
 return (
   <NavigationContainer 
   >
        <Stack.Navigator initialRouteName='HomeApp' >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen name="HomeApp" component={HomeApp} />
        </Stack.Navigator>
        <Stack.Group screenOptions={{
          presentation: 'fullScreenModal'
        }}>
            <Stack.Screen name="cord-adminstrativo" component={cord_administrativo} />
            <Stack.Screen name="cord-voluntarios" component={cord_voluntarios} />
            <Stack.Screen name="pip-autistas" component={pip_autistas} />
            <Stack.Screen name="pip-cidadania" component={pip_cidadania} />
            <Stack.Screen name="pip-cursos" component={pip_cursos} />
            <Stack.Screen name="pip-enem" component={pip_enem} />
            <Stack.Screen name="pip-mulher" component={pip_mulher} />
            <Stack.Screen name="pip-optometria" component={pip_optometria} />
            <Stack.Screen name="pip-protagonismo" component={pip_protagonismo} />
            <Stack.Screen name="pip-reforco-escolar" component={pip_reforcoescolar} />
            <Stack.Screen name="pip-saude-mental" component={pip_saudemental} />
            <Stack.Screen name="pip-seguro-alimentar" component={pip_sgralimentar} />
        </Stack.Group>
   </NavigationContainer>
  );
}