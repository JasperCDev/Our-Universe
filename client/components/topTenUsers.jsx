import React from 'react';
import { TopTenUsersDiv, TopUser } from './styles';

const TopTenUsers = ({ users }) => (
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

export default TopTenUsers;