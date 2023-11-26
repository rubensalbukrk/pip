import React, { useContext } from 'react';
import { Image } from 'react-native';
import { UserContext } from '../../src/contexts/UserContext';

const UserAvatar = ({x,y}) => {
  const {logged} = useContext(UserContext)
  return (
    <Image 
    resizeMode='cover'
    style={{width: x, height: y, borderRadius: 100 }} source={require('../../assets/eu.jpeg')} />
  )
}

export default UserAvatar
  