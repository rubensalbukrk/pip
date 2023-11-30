import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import { UserContext } from '../../src/contexts/UserContext';

const UserAvatar = ({x,y}) => {
  const {logged} = useContext(UserContext)
  return (
    <View 
    className='rounded-full items-center justify-center border-white bg-white'
    style={{width: x + 5, height: y + 5}}>
    <Image
    className='rounded-full self-center' 
    resizeMode='cover'
    style={{width: x, height: y}} source={{uri: logged.avatar}} />
    </View>
  )
}

export default UserAvatar
  