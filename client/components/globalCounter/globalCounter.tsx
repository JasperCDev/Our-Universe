import React, { FC } from 'react';
import { Header, Counter } from './globalCounter.styles';
import { numberToCommaSeperatedString } from '../helpers';

interface Props {
  global_clicks: number;
}

const GlobalCounter: FC<Props> = ({ global_clicks }) => {
  return (
    <Header>
      <Counter>
        {numberToCommaSeperatedString(global_clicks)}
      </Counter>
    </Header>
  );
}

export default React.memo(GlobalCounter);
