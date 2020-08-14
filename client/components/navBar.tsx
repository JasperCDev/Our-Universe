import React, { FC } from 'react';
import { Header, UserProfile } from './navBar.styles';
import { idToStringWithZeroes } from './helpers';
import UsernameForm from './usernameForm';

interface Props {
  user_name: string;
  user_clicks: (string | number);
  user_id: number;
  changeHandler: (e: any, setter: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

const NavBar: FC<Props> = ({ user_id, user_name, user_clicks, changeHandler }) => {
  return (
    <Header>
      {/* <UserProfile>
        username: <UsernameForm user_name={user_name} changeHandler={changeHandler} />
        <p style={{ fontWeight: 550, fontSize: '16px', display: 'inline-block', paddingLeft: '5px' }}>#{idToStringWithZeroes(user_id)}</p>
        <p>clicks: {user_clicks} </p>
      </UserProfile> */}
    </Header>
  );
}

export default React.memo(NavBar);
