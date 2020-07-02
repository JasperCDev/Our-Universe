import React, { FC } from 'react';
import { TopTenUsersDiv, TopUser } from './styles';

interface User {
  user_name: string;
  user_clicks: number;
}

interface Props {
  users: User[];
}

const TopTenUsers: FC = ({ users }: Props) => {
  return (
  <TopTenUsersDiv>
    <h3>Top Ten Players:</h3>
    {users.map((user, index) => (
      <>
        <TopUser>{`${index + 1}) ${user. user_name}: ${user.user_clicks}`}</TopUser>
        {user[index + 1] ? <hr/> : <></>}
      </>
    ))}
  </TopTenUsersDiv>
  );
}
export default TopTenUsers;