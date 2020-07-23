import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { Header, UserProfile, Links } from './styles';

interface Props {
  user_name: string;
  user_clicks: (string | number);
}

const NavBar: FC<Props> = ({ user_name, user_clicks }) => {
  return (
    <Header>
      <UserProfile>
        <p>Username: {user_name}</p>
        <p>level: 0</p>
        <p>clicks: {user_clicks} </p>
      </UserProfile>
      <Links>
        <Link to="/login" ><p>Login</p></Link>
        <Link to="/signup" >Signup</Link>
      </Links>
    </Header>
  )
}

export default NavBar;
