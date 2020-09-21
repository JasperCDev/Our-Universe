import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserDeityContainer, UserClicksSubheading, UserDeityButton, UserDeityDiv } from './userDeity.styles';
import UserEnergyBall from './userEnergyBall';
import UsernameForm from './usernameForm/usernameForm';
import { EnergyColorContext, UserContext } from '../contexts';

interface Props {
  buttonClickHandler: () => void;
  user_star_rect: (DOMRect | undefined);
}

const UserDeity: React.FC<Props> = ({
  buttonClickHandler,
  user_star_rect
}) => {
  const [energy_balls_count, set_energy_balls_count] = useState<number>(0);
  const [energy_balls, set_energy_balls] = useState<Array<number>>([]);
  const [energy_ball_translate_distance, set_energy_ball_translate_distance] = useState<number>(0);

  const UserDeityContainerRef = useRef<HTMLDivElement>(null);
  let UserDeityContainerRect: DOMRect;

  const energyColor = useContext(EnergyColorContext);
  const { set_energy_color } = energyColor;
  const [hue, saturation, lightness] = energyColor!.energy_color;


  const user = useContext(UserContext);
  const { user_name, user_id, set_user_name } = user;

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
      }}>
        Click Me!
      </UserDeityButton>
    </UserDeityContainer>
  );
}


export default React.memo(UserDeity);