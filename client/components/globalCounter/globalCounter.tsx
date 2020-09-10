import React, { FC } from 'react';
import { Counter, MainDeityContainer, MainDeityDiv, UniverseName } from './globalCounter.styles';
import { numberToCommaSeperatedString } from '../helpers';

interface Props {
  global_clicks: number;
}

const GlobalCounter: FC<Props> = ({ global_clicks }) => {
  return (
    // <Header>
    <MainDeityContainer>
      <UniverseName>The Universe</UniverseName>
      <Counter>
        {numberToCommaSeperatedString(global_clicks)}
      </Counter>
      <MainDeityDiv></MainDeityDiv>


    </MainDeityContainer>

    // </Header>
  );
}

export default React.memo(GlobalCounter);
