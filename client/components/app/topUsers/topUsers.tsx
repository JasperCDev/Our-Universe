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
        <EachTopUser username={user.user_name} userClicks={user.user_clicks} place={index + 1} userid={user.id} isOnline={user.is_online} key={user.id}/>
    ))}
  </TopUsersDiv>
)};

export default TopUsers;
