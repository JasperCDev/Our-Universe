import React, { useContext, useEffect, useRef, useState } from 'react';
import { numberToCommaSeperatedString, removeTagFromString, validateNewUsername, removeSpecialCharactersFromString } from '../../helpers';
import { UserDeityContainer, UserClicksSubheading, UserDeityButton, UserDeityDiv } from './userDeity.styles';
import { UserContext } from '../userContext';
import UserEnergyBall from './userEnergyBall';
import UsernameForm from './usernameForm/usernameForm';
import axios, { AxiosError } from 'axios';
import { UserNameFormMessage } from './userDeity.styles';

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

  const userDeityDivRef = useRef<HTMLDivElement>();
  let userDeityRect: DOMRect;
  let userDeityMiddle: number;
  // useEffect(() => {
  //   userDeityRect = userDeityDivRef!.current?.getBoundingClientRect()!;
  // }, []);

  useEffect(() => {
    if (!userDeityRect) {
      userDeityRect = userDeityDivRef!.current!.getBoundingClientRect()!;
      userDeityMiddle = userDeityRect.bottom - (userDeityRect.height / 2);
    }
    if (userDeityRect && user_star_rect) {
      const userStarBottomValue = user_star_rect.bottom;
      const travelDistance = userDeityMiddle - userStarBottomValue;
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

  const usernameChangehandler = (e: any) => {
    const userInput = removeTagFromString((e.target as HTMLElement).innerHTML);
    if (validateNewUsername(userInput, set_user_name_form_valid)) {
      set_user_name_form_valid(true);
      set_user_name_form_message('that username is valid');
      set_user_name_form_color('green');
    } else {
      set_user_name_form_valid(false);
      set_user_name_form_color('red');
      if (userInput.includes(' ') || userInput.includes('&nbsp;')) {
        set_user_name_form_message('Username must not include spaces');
      } else if (userInput.length > 9) {
        set_user_name_form_message('Username must be under 11 characters');
      }else if (userInput.length < 2) {
        set_user_name_form_message('Username must be at least 2 characters');
      } else {
        set_user_name_form_message('Username cannot include special characters');
      }
    }
  }

  const usernameSubmitHandler = (e: Event) => {
    const element = e.target as HTMLElement;
    let userInput = removeTagFromString(element.innerHTML);
    if (userInput === user_name) {
      set_user_name_form_message('click username to change');
      set_user_name_form_color('grey');
      return;
    };
    userInput = removeSpecialCharactersFromString(userInput);
    if (user_name_form_valid) {
      set_user_name_form_message('saving...');
      axios.put('/username', { user_id, new_user_name: userInput })
        .then(() => {
          set_user_name_form_message('Username updated');
          set_user_name(userInput);
          setTimeout(() => {
            set_user_name_form_message('Click username to change');
            set_user_name_form_color('grey');
          }, 1500);
        })
        .catch(() => {
          set_user_name_form_valid(false);
          set_user_name_form_color('red');
          set_user_name_form_message('There has been an error');
          setTimeout(() => set_user_name_form_message(''), 1500);
        });
    } else {
      set_user_name_form_message('That userName is not valid');
      setTimeout(() => {
        element.innerHTML = user_name;
        set_user_name_form_valid(true);
      }, 1000);
      setTimeout(() => set_user_name_form_message(''), 1500);
    }
  }

  const handleUsernameFormFocus = () => {
    set_user_name_form_color('green');
    set_user_name_form_message('That username is valid');
  }

  const handleAnimationEnd = () => {
    const copy = energy_balls.slice(0);
    copy.shift();
    set_energy_balls(copy);
    buttonClickHandler();
  }


  return (
    <UserDeityContainer>

      <UserDeityDiv ref={userDeityDivRef}>
        {energy_balls.map((id) => (
          <UserEnergyBall
            animationEndHandler={handleAnimationEnd}
            translateDistance={energy_ball_translate_distance}
            key={id}
          >
          </UserEnergyBall>
        ))}
      </UserDeityDiv>

        <UsernameForm handleUsernameFormFocus={handleUsernameFormFocus} submitHandler={(e) => usernameSubmitHandler(e)} user_name={user_name} changeHandler={usernameChangehandler} />
        <UserNameFormMessage color={user_name_form_color}>
                {user_name_form_message}
      </UserNameFormMessage>
      <UserDeityButton onClick={() => {

        set_energy_balls_count(energy_balls_count + 1);
      }}>Click Me!</UserDeityButton>
    </UserDeityContainer>
  );
}


export default React.memo(UserDeity);