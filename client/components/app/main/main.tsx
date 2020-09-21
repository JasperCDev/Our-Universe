import React from 'react';
import styled from 'styled-components';
import UserStar from './userStar/userStar';
import UserDeity from './userDeity/userDeity';

export const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

interface Props {
  user_star_rect: (DOMRect | undefined);
  set_user_star_rect: React.Dispatch<React.SetStateAction<DOMRect | undefined>>;
  buttonClickHandler: () => void;
}

const Main: React.FC<Props> = ({ user_star_rect, set_user_star_rect, buttonClickHandler }) => {
  return (
    <MainDiv>
      <UserStar user_star_rect={user_star_rect} set_user_star_rect={set_user_star_rect}/>
      <UserDeity user_star_rect={user_star_rect} buttonClickHandler={buttonClickHandler} />
    </MainDiv>
  );
}

export default Main;