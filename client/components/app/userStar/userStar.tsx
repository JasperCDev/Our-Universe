import React, { FC, useEffect, useRef, useState } from 'react';
import { Counter, MainDeityContainer, MainDeityDiv, UniverseName } from './userStar.styles';
import { numberToCommaSeperatedString } from '../../helpers';

interface Props {
  user_clicks: number;
  set_user_star_rect: React.Dispatch<React.SetStateAction<DOMRect | undefined>>;
  user_star_rect: (DOMRect | undefined);
}

const UserStar: FC<Props> = ({ user_clicks, set_user_star_rect, user_star_rect }) => {
  const [star_size, set_star_size] = useState<number>(0);
  const MainDeityDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const new_user_star_rect = MainDeityDivRef.current!.getBoundingClientRect();
    // console.log('new_user_star_rect.height: ', new_user_star_rect.height);
    set_user_star_rect(new_user_star_rect);
  }, [star_size]);


  useEffect(() => {
    set_star_size((user_clicks / 100) + 1);
  }, [user_clicks]);

  return (
    // <Header>
    <MainDeityContainer >
      <UniverseName>Your Planet</UniverseName>
      <Counter>
        {numberToCommaSeperatedString(user_clicks)} atoms
      </Counter>
      <MainDeityDiv ref={MainDeityDivRef} starSize={star_size} ></MainDeityDiv>
    </MainDeityContainer>

    // </Header>
  );
}

export default React.memo(UserStar);
