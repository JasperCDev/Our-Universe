import React from 'react';

const TopTenUsers = ({ users }) => (
  <div>
    {users.map(user => (
      <div>
        <p>{user.userName}</p>
        <p>{user.total}</p>
      </div>
    ))}
  </div>
)

export default TopTenUsers;