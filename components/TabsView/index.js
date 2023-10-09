import * as React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Box, Text, Center, Presable, useColorModeValue } from 'native-base';
import TabCadastros from './pages/cadastros';
import TabSearch from './pages/pesquisar';
import TabManager from './pages/manager';

const FirstRoute = () => <Center flex={1} h="100%" mx="2" my="4">
    <TabCadastros />
  </Center>;

const SecondRoute = () => <Center flex={1} h="100%" mx="2" my="4">
    <TabSearch />
    
  </Center>;

const ThirdRoute = () => <Center flex={1} h="100%" mx="2" my="4">
   <TabManager />
  </Center>;

const FourthRoute = () => <Center flex={1} my="2">
 
    
  </Center>;

const initialLayout = {
  width: Dimensions.get('window').width
};
export const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute
});

export function TabViewAdmin() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{
    key: 'first',
    title: 'Cadastros'
  }, {
    key: 'second',
    title: 'Pesquisar'
  }, {
    key: 'third',
    title: 'Gerênciar'
  }, {
    key: 'fourth',
    title: 'Outros'
  }]);


  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
        });
        const color = index === i ? useColorModeValue('#38b6ff', '#e5e5e5') : useColorModeValue('#71cbff', '#a1a1aa');
        const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
        return <Box mt="10" borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
              <Pressable onPress={() => {
            setIndex(i);
          }}>
                <Animated.Text style={{
              color
            }}>{route.title}</Animated.Text>
              </Pressable>
            </Box>;
      })}
      </Box>;
  };

  return <TabView navigationState={{
    index,
    routes
  }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
    
  }} />;
}