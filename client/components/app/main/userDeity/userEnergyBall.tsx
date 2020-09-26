import { light } from '@material-ui/core/styles/createPalette';
import React, { FC, useEffect, useState } from 'react';
import { UserDeityEnergyBallDiv } from './userDeity.styles';

interface Props {
  translateDistance: number;
  animationEndHandler: (e: React.AnimationEvent<HTMLDivElement>) => void;
  energy_red: number;
  energy_green: number;
  energy_blue: number;
  energy_size: number;
  user_power: number;
}

const UserEnergyBall: FC<Props> = ({
  translateDistance,
  animationEndHandler,
  energy_red,
  energy_blue,
  energy_green,
  energy_size,
  user_power
}) => {
  const [translate_distance, set_translate_distance] = useState<number>(0);
  const [red, set_red] = useState<number>(0);
  const [green, set_green] = useState<number>(0);
  const [blue, set_blue] = useState<number>(0);
  const [size, set_size] = useState<number>(energy_size);
  const [power, set_power] = useState<number>(user_power);

  useEffect(() => {
    if (red === 0) {
      set_red(energy_red);
      set_green(energy_green);
      set_blue(energy_blue);
    }
  }, [red, green, blue]);

  useEffect(() => {
    if (translate_distance === 0 && translateDistance !== 0) set_translate_distance(translateDistance);

  }, [translateDistance]);

  return (
    <UserDeityEnergyBallDiv
      size={size}
      red={red}
      green={green}
      blue={blue}
      onAnimationEnd={animationEndHandler}
      translateDistance={translate_distance}
      data-color={JSON.stringify([red, green, blue])}
    >
      {power}
    </UserDeityEnergyBallDiv>
  );
}

export default UserEnergyBall;