import 'react-native-gesture-handler'
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native'

import Preload from './src/stacks/Preload';
import MainStack from './src/stacks/mainStack';
import AuthProvider from './src/contexts/AuthContext';
import UserProvider from './src/contexts/UserContext';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();//Ignore all log notifications

const theme = extendTheme({
  fontConfig: {
    DoppioOne: {
      100: {
        normal: "Doppio One",
      },
      200: {
        normal: "Doppio One",
      },
      300: {
        normal: "Doppio One",
      }
    },
  },

  fonts: {
    heading: "Doppio One",
    body: "Doppio One",
    mono: "Doppio One",
  },
});

export default function App() {


  const [fontsLoaded] = useFonts({
    'Doppio One': require('./assets/fonts/DoppioOne.ttf'),
  });

  if(!fontsLoaded) {
    return <Preload />;
  }
 
  const auth = false;

  return (
    <NativeBaseProvider theme={theme}>
    <UserProvider>
    <AuthProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </AuthProvider>
    </UserProvider>
    </NativeBaseProvider>
  );
}