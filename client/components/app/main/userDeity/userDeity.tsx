import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserDeityContainer, UserClicksSubheading, UserDeityButton, UserDeityDiv } from './userDeity.styles';
import UserEnergyBall from './userEnergyBall';
import UsernameForm from './usernameForm/usernameForm';
import { EnergyColorContext, UserContext } from '../../contexts';
import { PlanetEnergyColorContext } from '../mainContexts';

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
  const [red, green, blue] = energyColor!.energy_color;

  const user = useContext(UserContext);
  const { user_name, user_id, set_user_name, user_power, set_user_power } = user;

  const { planet_energy_color, set_planet_energy_color } = useContext(PlanetEnergyColorContext);

  useEffect(() => {
    setInterval(() => {
      if (Date.now() - lastClickTime >= 2000) {
        set_energy_color([64, 191, 255]);
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

  const handleAnimationEnd = () => {
    const copy = energy_balls.slice(0);
    copy.shift();
    set_energy_balls(copy);
    buttonClickHandler();
    changePlanetColor();

  }

  const changePlanetColor = () => {
    const redDifference = red - planet_energy_color[0];
    const greenDifference = green - planet_energy_color[1];
    const blueDifference = blue - planet_energy_color[2];
    const newRed = planet_energy_color[0] + Math.floor(redDifference / 10);
    const newGreen = planet_energy_color[1] + Math.floor(greenDifference / 10);
    const newBlue = planet_energy_color[2] + Math.floor(blueDifference / 10);
    set_planet_energy_color([ newRed, newGreen, newBlue]);
  }

  const assessMultipleClicks = () => {
    sessionClicks++;
    lastClickTime = Date.now();
    switch (sessionClicks) {
      case 10:
        set_energy_color([127, 255, 127]);
        set_energy_size(1.2);
        set_user_power(2);
        break;
      case 20:
        set_energy_color([255, 127, 255]);
        set_energy_size(1.8);
        set_user_power(16);
        break;
      case 30:
        set_energy_color([255, 0, 255]);
        set_energy_size(2);
        set_user_power(32);
        break;
      case 40:
        set_energy_color([255, 255, 127]);
        set_energy_size(2.2);
        set_user_power(32);
        break;
      case 50:
        set_energy_color([255, 255, 0]);
        set_energy_size(2.4);
        set_user_power(64);
        break;
      case 60:
        set_energy_color([255, 0, 0]);
        set_energy_size(2.6);
        set_user_power(128);
      case 70:
        set_energy_color([127, 127, 127]);
        set_energy_size(3);
        set_user_power(500);

    }
  };



  return (
    <UserDeityContainer ref={UserDeityContainerRef} red={red} green={green} blue={blue}>
      <UserDeityDiv red={red} green={green} blue={blue}>
        {energy_balls.map((id) => (
          <UserEnergyBall
            animationEndHandler={handleAnimationEnd}
            translateDistance={energy_ball_translate_distance}
            key={id}
            energy_red={red}
            energy_green={green}
            energy_blue={blue}
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