import React, { useContext, useEffect, useRef, useState } from 'react';
import { numberToCommaSeperatedString, removeTagFromString, validateNewUsername, removeSpecialCharactersFromString } from '../../helpers';
import { UserDeityContainer, UserClicksSubheading, UserDeityButton, UserDeityDiv } from './userDeity.styles';
import { UserContext } from '../userContext';
import UserEnergyBall from './userEnergyBall';
import UsernameForm from './usernameForm/usernameForm';
import axios, { AxiosError } from 'axios';
import { UserNameFormMessage } from './userDeity.styles';
import { StyledComponent } from 'styled-components';

interface Props {
  buttonClickHandler: () => void;
  user_name: string;
  user_id: number;
  set_user_name: React.Dispatch<React.SetStateAction<string>>;
  user_star_rect: (DOMRect | undefined);
}

const UserDeity: React.FC<Props> = ({
  buttonClickHandler,
  user_name,
  user_id,
  set_user_name,
  user_star_rect
}) => {
  const [user_name_form_message, set_user_name_form_message] = useState<string>('click username to change');
  const [user_name_form_valid, set_user_name_form_valid] = useState<boolean>(true);
  const [user_name_form_color, set_user_name_form_color] = useState<'grey' | 'green' | 'red'>('grey');
  const [energy_balls_count, set_energy_balls_count] = useState<number>(0);
  const [energy_balls, set_energy_balls] = useState<Array<number>>([]);
  const [energy_ball_translate_distance, set_energy_ball_translate_distance] = useState<number>(0);

  const userDeityDivRef = useRef<HTMLDivElement>(null);
  let userDeityRect: DOMRect;
  // let userDeityMiddle: number;

  useEffect(() => {
    if (!userDeityRect) {
      userDeityRect = userDeityDivRef!.current!.getBoundingClientRect();
      // userDeityMiddle = userDeityRect. - (userDeityRect.height / 2);
    }
    if (userDeityRect && user_star_rect) {
      const userStarBottomValue = user_star_rect.bottom;
      const travelDistance = userDeityRect.top - userStarBottomValue;
      set_energy_ball_translate_distance(-travelDistance);
    }
  }, [user_star_rect]);


  useEffect(() => {
    if (energy_balls[0] > energy_balls[1]) {
      const copy = energy_balls.slice(0);
      copy.shift();
      set_energy_balls(copy);
    }
    if (energy_balls_count) set_energy_balls([...energy_balls, energy_balls_count]);
  }, [energy_balls_count]);


  const handleAnimationEnd = () => {
    const copy = energy_balls.slice(0);
    copy.shift();
    set_energy_balls(copy);
    buttonClickHandler();
  }


  return (
    <UserDeityContainer>
      <UserDeityDiv ref={userDeityDivRef!}>
        {energy_balls.map((id) => (
          <UserEnergyBall
            animationEndHandler={handleAnimationEnd}
            translateDistance={energy_ball_translate_distance}
            key={id}
          >
          </UserEnergyBall>
        ))}
      </UserDeityDiv>
      <UsernameForm user_name={user_name} user_id={user_id} set_user_name={set_user_name} />
      <UserDeityButton onClick={() => set_energy_balls_count(energy_balls_count + 1) }>
        Click Me!
      </UserDeityButton>
    </UserDeityContainer>
  );
}


export default React.memo(UserDeity);