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
      <MainDeityDiv></MainDeityDiv>

      <Counter>
        {numberToCommaSeperatedString(global_clicks)}
      </Counter>
    </MainDeityContainer>

    // </Header>
  );
}

export default React.memo(GlobalCounter);
