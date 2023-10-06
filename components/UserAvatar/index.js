import React, { useContext } from 'react';
import { Avatar } from 'native-base';
import { UserContext } from '../../src/contexts/UserContext';

export default function UserAvatar(props) {
  const {logged} = useContext(UserContext)
 return (
    <Avatar shadow={5} size={props.size} source={props.source} />
  );
}