import React, { FC, useEffect, useState } from 'react';
import { Counter, MainDeityContainer, MainDeityDiv, UniverseName } from './userStar.styles';
import { numberToCommaSeperatedString } from '../../helpers';

interface Props {
  user_clicks: number;
}

const GlobalCounter: FC<Props> = ({ user_clicks }) => {
  const [star_size, set_star_size] = useState<number>(0);

  useEffect(() => {
    set_star_size((user_clicks / 100) + 1);
  }, [user_clicks]);

  return (
    // <Header>
    <MainDeityContainer >
      <UniverseName>Your Star</UniverseName>
      <Counter>
        {numberToCommaSeperatedString(user_clicks)} atoms
      </Counter>
      <MainDeityDiv starSize={star_size} ></MainDeityDiv>
    </MainDeityContainer>

    // </Header>
  );
}

export default React.memo(GlobalCounter);
