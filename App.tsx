import 'expo-dev-client';
import 'react-native-gesture-handler'
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native'
import Preload from './src/stacks/Preload';
import MainStack from './src/stacks/mainStack';
import AuthProvider from './src/contexts/AuthContext';
import UserProvider from './src/contexts/UserContext';
import { LogBox } from 'react-native';


export default function App() {
  const [fontsLoaded] = useFonts({
    'Doppio One': require('./assets/fonts/DoppioOne.ttf'),
  });

  if(!fontsLoaded) {
    return <Preload />;
  }
 
  return (
    <UserProvider>
    <AuthProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </AuthProvider>
    </UserProvider>
  );
}