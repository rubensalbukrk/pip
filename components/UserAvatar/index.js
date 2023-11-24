import React, { useContext } from 'react';
import { Image } from 'react-native';
import { UserContext } from '../../src/contexts/UserContext';

const UserAvatar = ({x,y}) => {
  const {logged} = useContext(UserContext)
  return (
    <Image style={{width: x, height: y }} source={{ uri: logged?.avatar }} />
  )
}

export default UserAvatar
  