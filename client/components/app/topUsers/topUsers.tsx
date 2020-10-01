import React, { FC } from 'react';
import { TopUsersDiv, TopUsersTitle } from './topUsers.styles';
import EachTopUser from './eachTopUser';

interface User {
  username: string;
  userClicks: number;
  id: number;
  isOnline: boolean;
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
