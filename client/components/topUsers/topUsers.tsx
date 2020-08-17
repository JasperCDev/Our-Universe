import React, { FC } from 'react';
import { TopUsersDiv } from './ topUsers.styles';
import EachTopUser from './eachTopUser';

interface User {
  user_name: string;
  user_clicks: number;
  id: number
}

interface Props {
  users: ReadonlyArray<User>;
}

const TopUsers: FC<Props> = ({ users }) => {
  return (
    <TopUsersDiv>
      <h2 style={{ textAlign: 'center' }}>Top 25 Users</h2>
      <hr />
      {users.map((user: User, index: number) => (
        <EachTopUser user_name={user.user_name} user_clicks={user.user_clicks} place={index + 1} user_id={user.id}/>
    ))}
  </TopUsersDiv>
)};

export default TopUsers;
