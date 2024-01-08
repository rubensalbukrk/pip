import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import { UserContext } from '../../src/contexts/UserContext';

const UserAvatar = ({x,y}) => {
  const {avatar} = useContext<any>(UserContext)
  return (
    <View 
    className='rounded-full items-center justify-center border-white bg-slate-200'
    style={{width: x , height: y }}>
    <Image
    className='rounded-full'
    resizeMode='contain'
    style={{width: x -4 , height: y - 4}} source={avatar ? {uri: avatar} : require('../../assets/user.png') } />
    </View>
  )
}

export default UserAvatar
  