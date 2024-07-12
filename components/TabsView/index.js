import * as React from 'react';
import { View, useWindowDimensions, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import TabCadastros from './pages/cadastros';
import TabSearch from './pages/pesquisar';
import TabManager from './pages/manager';


const FirstRoute = () => <View className='flex-1 h-full w-full'>
    <TabCadastros />
  </View>;

const SecondRoute = () => <View className='flex-1 h-full w-full my-4'>
    <TabSearch />
    
  </View>;

const ThirdRoute = () => <View className='flex-1 h-full w-full my-4'>
   <TabManager />
  </View>;


const initialLayout = {
  width: Dimensions.get('window').width
};
export const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

export function TabViewAdmin() {
  const layout = useWindowDimensions();
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
  }]);

  const renderTabBar = props => (
    <TabBar {...props} activeColor="#1f86ff" inactiveColor='#c2c2c2' indicatorStyle={{backgroundColor: '#1f96ff'}} style={{backgroundColor: '#f0f0f0'}} />
  )

  return (
    <TabView
    renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}