import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserDeityContainer, UserClicksSubheading, UserDeityButton, UserDeityDiv } from './userDeity.styles';
import UserEnergyBall from './userEnergyBall';
import UsernameForm from './usernameForm/usernameForm';
import { EnergyColorContext, UserContext } from '../../contexts';

interface Props {
  buttonClickHandler: () => void;
  user_star_rect: (DOMRect | undefined);
}

let sessionClicks = 0;
let lastClickTime = Date.now();

const UserDeity: React.FC<Props> = ({
  buttonClickHandler,
  user_star_rect
}) => {
  const [energy_balls_count, set_energy_balls_count] = useState<number>(0);
  const [energy_balls, set_energy_balls] = useState<Array<number>>([]);
  const [energy_ball_translate_distance, set_energy_ball_translate_distance] = useState<number>(0);
  const [energy_size, set_energy_size] = useState<number>(1);

  const UserDeityContainerRef = useRef<HTMLDivElement>(null);
  let UserDeityContainerRect: DOMRect;

  const energyColor = useContext(EnergyColorContext);
  const { set_energy_color } = energyColor;
  const [hue, saturation, lightness] = energyColor!.energy_color;

  const user = useContext(UserContext);
  const { user_name, user_id, set_user_name, user_power, set_user_power } = user;


  useEffect(() => {
    setInterval(() => {
      if (Date.now() - lastClickTime >= 2000) {
        set_energy_color([180, 100, 80]);
        sessionClicks = 0;
        set_user_power(1);
        set_energy_size(1);
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

  // useEffect(() => {
  //   if (energy_balls_count) set_energy_balls([...energy_balls, energy_balls_count]);
  // }, [energy_balls_count]);



  const handleAnimationEnd = () => {
    const copy = energy_balls.slice(0);
    copy.shift();
    set_energy_balls(copy);
    buttonClickHandler();
  }

  const assessMultipleClicks = () => {
    sessionClicks++;
    lastClickTime = Date.now();
    switch (sessionClicks) {
      case 20:
        set_energy_color([200, 80, 70]);
        set_energy_size(1.2);
        set_user_power(2);
        break;
      case 40:
        set_energy_color([250, 100, 30]);
        set_energy_size(1.4);
        set_user_power(4);
        break;
      case 60:
        set_energy_color([0, 60, 25]);
        set_energy_size(1.6);
        set_user_power(8);
        break;
      case 80:
        set_energy_color([0, 90, 40]);
        set_energy_size(1.8);
        set_user_power(16);
        break;
      case 90:
        set_energy_color([50, 100, 40]);
        set_energy_size(2);
        set_user_power(32);
        break;
      case 120:
        set_energy_color([60, 100, 50]);
        set_energy_size(2.2);
        set_user_power(64);
        break;
      case 200:
        set_energy_color([0, 0, 100]);
        set_energy_size(3);
        set_user_power(200);
        break;
      case 400:
        set_energy_size(10);
        set_user_power(1000);
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
            energy_size={energy_size}
            user_power={user_power}
          >
          </UserEnergyBall>
        ))}
      </UserDeityDiv>
      <UsernameForm user_name={user_name} user_id={user_id} set_user_name={set_user_name} />
      <UserDeityButton onClick={() => {
        set_energy_balls_count(energy_balls_count + 1);
        set_energy_balls([...energy_balls, energy_balls_count]);
        assessMultipleClicks();
      }}>
        Click Me!
      </UserDeityButton>
    </UserDeityContainer>
  );
}


export default React.memo(UserDeity);