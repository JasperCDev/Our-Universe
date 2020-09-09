import React, { useContext } from 'react';
import { numberToCommaSeperatedString } from '../helpers';
import { UserDeityContainer, UserClicksSubheading, UserDeityButton, UserDeityDiv } from './userDeityCarousel.styles';
import { UserContext } from '../app/userContext';

interface Props {
  buttonClickHandler: () => void;
  user_clicks: number;
  user_name: string;
}

const UserDeity: React.FC<Props> = ({ buttonClickHandler, user_clicks, user_name }) => {
  // const msg = useContext(UserContext);
  // console.log('CONTEXT', msg)
  return (
    <UserDeityContainer>
      <UserDeityDiv></UserDeityDiv>
      <UserClicksSubheading>
        <h1>{user_name}(you)</h1>
        <h1>{numberToCommaSeperatedString(user_clicks)}</h1>
      </UserClicksSubheading>
      <UserDeityButton onClick={buttonClickHandler}>Click Me!</UserDeityButton>
    </UserDeityContainer>
  );
}


export default React.memo(UserDeity);