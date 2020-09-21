import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Counter, MainDeityContainer, MainDeityDiv, MainDeityDivContainer, UniverseName } from './userStar.styles';
import { numberToCommaSeperatedString } from '../../../helpers';
import { UserContext } from '../../contexts';

interface Props {
  set_user_star_rect: React.Dispatch<React.SetStateAction<DOMRect | undefined>>;
  user_star_rect: (DOMRect | undefined);
}

const UserStar: FC<Props> = ({ set_user_star_rect, user_star_rect }) => {
  const [star_size, set_star_size] = useState<number>(0);
  const MainDeityDivRef = useRef<HTMLDivElement>(null);

  const { user_clicks } = useContext(UserContext);

  useEffect(() => {
    const new_user_star_rect = MainDeityDivRef.current!.getBoundingClientRect();
    set_user_star_rect(new_user_star_rect);
  }, [star_size]);


  useEffect(() => {
    set_star_size((user_clicks / 10000) + 1);
  }, [user_clicks]);

  return (
    <MainDeityContainer >
      <UniverseName>Your Planet</UniverseName>
      <Counter>
        {numberToCommaSeperatedString(user_clicks)} atoms
      </Counter>
      <MainDeityDivContainer starSize={star_size} ref={MainDeityDivRef} >
        <MainDeityDiv starSize={star_size} ></MainDeityDiv>
      </MainDeityDivContainer>
    </MainDeityContainer>
  );
}

export default React.memo(UserStar);