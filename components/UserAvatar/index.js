import React, { useContext } from 'react';
import { Avatar } from 'native-base';
import { UserContext } from '../../src/contexts/UserContext';

const UserAvatar = (props) => {
  const {logged} = useContext(UserContext)
  return (
    <Avatar size={props.size} source={{ uri: logged?.avatar }} />
  )
}

export default UserAvatar
  