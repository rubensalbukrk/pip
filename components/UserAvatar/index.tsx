import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import { UserContext } from '../../src/contexts/UserContext';

const UserAvatar = ({x,y}) => {
  const {logged} = useContext<any>(UserContext)
  return (
    <View 
    className='rounded-full items-center justify-center border-white bg-zinc-400'
    style={{width: x , height: y }}>
    <Image
    resizeMode='contain'
    style={{width: x -30 , height: y - 30}} source={logged?.avatar ? {uri: logged?.avatar} : require('../../assets/user.png') } />
    </View>
  )
}

export default UserAvatar
  