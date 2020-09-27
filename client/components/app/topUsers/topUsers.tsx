import React, { FC } from 'react';
import { TopUsersDiv, TopUsersTitle } from './topUsers.styles';
import EachTopUser from './eachTopUser';

interface User {
  user_name: string;
  user_clicks: number;
  id: number;
  is_online: boolean;
}

interface Props {
  users: ReadonlyArray<User>;
}

const TopUsers: FC<Props> = ({ users }) => {
  return (
    <TopUsersDiv>
      <TopUsersTitle style={{ textAlign: 'center' }}>TOP 25 USERS</TopUsersTitle>
      {users.map((user: User, index: number) => (
        <EachTopUser user_name={user.user_name} user_clicks={user.user_clicks} place={index + 1} user_id={user.id} is_online={user.is_online} />
    ))}
  </TopUsersDiv>
)};

export default TopUsers;
