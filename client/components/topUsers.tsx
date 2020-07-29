import React, { FC } from 'react';
import { TopUsersDiv } from './styles';
import EachTopUser from './eachTopUser';

interface User {
  user_name: string;
  user_clicks: number;
}

interface Props {
  users: ReadonlyArray<User>;
  animateCount: (start: number, end: number, duration: number, setter: React.Dispatch<React.SetStateAction<number>>) => void;
  formatNumbers: (x: number) => (string | number);
}

const TopUsers: FC<Props> = ({ users, animateCount, formatNumbers }) => {


  return (
    <TopUsersDiv>
    <h3>Top 10 Users</h3>
      {users.map((user: User, index: number) => (
        <EachTopUser user_name={user.user_name} user_clicks={user.user_clicks} animateUserClicks={animateCount} place={index + 1} formatNumbers={formatNumbers}/>
    ))}
  </TopUsersDiv>
)};

export default TopUsers;
