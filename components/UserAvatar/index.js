import React, { useContext } from 'react';
import { Avatar } from 'native-base';
import { UserContext } from '../../src/contexts/UserContext';

export default function UserAvatar(props) {
  const {logged} = useContext(UserContext)
 return (
    <Avatar size={props.size} source={{uri: logged?.avatar}} />
  );
}