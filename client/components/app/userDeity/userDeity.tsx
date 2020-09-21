import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserDeityContainer, UserClicksSubheading, UserDeityButton, UserDeityDiv } from './userDeity.styles';
import UserEnergyBall from './userEnergyBall';
import UsernameForm from './usernameForm/usernameForm';
import { EnergyColorContext, UserContext } from '../contexts';

interface Props {
  buttonClickHandler: () => void;
  user_star_rect: (DOMRect | undefined);
}

let handleClicks: () => void;
let sessionClicks = 0;

const UserDeity: React.FC<Props> = ({
  buttonClickHandler,
  user_star_rect
}) => {
  const [energy_balls_count, set_energy_balls_count] = useState<number>(0);
  const [energy_balls, set_energy_balls] = useState<Array<number>>([]);
  const [energy_ball_translate_distance, set_energy_ball_translate_distance] = useState<number>(0);
  const [last_click_time, set_last_click_time] = useState<number>(0);

  const UserDeityContainerRef = useRef<HTMLDivElement>(null);
  let UserDeityContainerRect: DOMRect;

  const energyColor = useContext(EnergyColorContext);
  const { set_energy_color } = energyColor;
  const [hue, saturation, lightness] = energyColor!.energy_color;

  const user = useContext(UserContext);
  const { user_name, user_id, set_user_name } = user;

  const last_click_time_ref = useRef(0);
  last_click_time_ref.current = last_click_time;

  useEffect(() => {
    setInterval(() => {
      if (Date.now() - last_click_time_ref.current >= 2000) {
        set_energy_color([180, 100, 80]);
      }
    }, 1000)
  }, []);

  useEffect(() => {
    if (!UserDeityContainerRect) {
      UserDeityContainerRect = UserDeityContainerRef!.current!.getBoundingClientRect();
    }
    if (UserDeityContainerRect && user_star_rect) {
      const travelDistance = UserDeityContainerRect.top - user_star_rect.bottom;
      set_energy_ball_translate_distance(-travelDistance);
    }
  }, [user_star_rect]);

  useEffect(() => {
    if (energy_balls_count) set_energy_balls([...energy_balls, energy_balls_count]);
  }, [energy_balls_count]);



  const handleAnimationEnd = () => {
    const copy = energy_balls.slice(0);
    copy.shift();
    set_energy_balls(copy);
    buttonClickHandler();
  }

  const assessMultipleClicks = () => {
    sessionClicks++;
    set_last_click_time(Date.now());
    switch (sessionClicks) {
      case 10:
        set_energy_color([200, 80, 70]);
        break;
      case 20:
        set_energy_color([220, 90, 60]);
      case 30:
        set_energy_color([240, 100, 40]);
        break;
      case 40:
        set_energy_color([250, 100, 30]);
        break;
      case 50:
        set_energy_color([0, 60, 25]);
        break;
      case 60:
        set_energy_color([0, 75, 35]);
        break;
      case 70:
        set_energy_color([0, 90, 40]);
        break;
      case 80:
        set_energy_color([0, 100, 50]);
        break;
      case 90:
        set_energy_color([50, 100, 40]);
        break;
      case 100:
        set_energy_color([60, 100, 50]);
        break;
    }
  };



  return (
    <UserDeityContainer ref={UserDeityContainerRef} hue={hue} saturation={saturation} lightness={lightness}>
      <UserDeityDiv hue={hue} saturation={saturation} lightness={lightness}>
        {energy_balls.map((id) => (
          <UserEnergyBall
            animationEndHandler={handleAnimationEnd}
            translateDistance={energy_ball_translate_distance}
            key={id}
            energy_hue={hue}
            energy_saturation={saturation}
            energy_lightness={lightness}
          >
          </UserEnergyBall>
        ))}
      </UserDeityDiv>
      <UsernameForm user_name={user_name} user_id={user_id} set_user_name={set_user_name} />
      <UserDeityButton onClick={() => {
        set_energy_balls_count(energy_balls_count + 1);
        assessMultipleClicks();
      }}>
        Click Me!
      </UserDeityButton>
    </UserDeityContainer>
  );
}


export default React.memo(UserDeity);