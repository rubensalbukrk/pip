import React, { PureComponent, useContext } from 'react';
import { Avatar } from 'native-base';
import { UserContext } from '../../src/contexts/UserContext';

export default class UserAvatar extends PureComponent {

  render() {
    const {logged} = this.context
    return (
      <Avatar shadow={5} size={this.props.size} source={{ uri: logged.avatar }} />
    )
}}
UserAvatar.contextType = UserContext

