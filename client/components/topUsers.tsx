import React, { FC } from 'react';
import { TopUsersDiv, TopUser } from './styles';

interface User {
  user_name: string;
  user_clicks: number;
}

interface Props {
  users: User[];
}

const TopUsers: FC<Props> = ({ users }) => (
  <TopUsersDiv>
    <h3>Top Ten Players:</h3>
    {users.map((user: User, index: number) => (
      <>
        <TopUser>{`${index + 1}) ${user. user_name}: ${user.user_clicks}`}</TopUser>
        {users[index + 1] ? <hr/> : <></>}
      </>
    ))}
  </TopUsersDiv>
);

export default TopUsers;
