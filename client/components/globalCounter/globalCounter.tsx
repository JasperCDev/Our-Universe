import React, { FC } from 'react';
import { Counter, MainDeityContainer, MainDeityDiv, UniverseName } from './globalCounter.styles';
import { numberToCommaSeperatedString } from '../helpers';

interface Props {
  user_clicks: number;
}

const GlobalCounter: FC<Props> = ({ user_clicks }) => {
  return (
    // <Header>
    <MainDeityContainer>
      <UniverseName>Your Planet</UniverseName>
      <Counter>
        {numberToCommaSeperatedString(user_clicks)} atoms
      </Counter>
      <MainDeityDiv></MainDeityDiv>


    </MainDeityContainer>

    // </Header>
  );
}

export default React.memo(GlobalCounter);
