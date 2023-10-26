import React, { memo, useContext } from 'react';
import { Avatar } from 'native-base';
import { UserContext } from '../../src/contexts/UserContext';

const UserAvatar = memo(props => {
  const {logged} = useContext(UserContext)

  return (
      <Avatar shadow={5} size={props.size} source={{ uri: logged.avatar }} />
  )
})

export default UserAvatar
  