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
  rect: (DOMRect | undefined);
}

const UserEnergyBall: FC<Props> = ({
  translateDistance,
  animationEndHandler,
  energy_red,
  energy_blue,
  energy_green,
  energy_size,
  user_power,
  rect
}) => {
  const [translate_distance, set_translate_distance] = useState<number>(0);
  const [red, set_red] = useState<number>(0);
  const [green, set_green] = useState<number>(0);
  const [blue, set_blue] = useState<number>(0);
  const [size, set_size] = useState<number>(energy_size);
  const [power, set_power] = useState<number>(user_power);
  const [top, set_top] = useState<number>(0);
  const [left, set_left] = useState<number>(0);

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

  useEffect(() => {
    if (rect && top === 0) {
      set_top(rect.top);
      set_left(rect.left + (rect.width / 2));
    };
  }, [rect]);

  console.log(top);
  return (
    <UserDeityEnergyBallDiv
      size={size}
      red={red}
      green={green}
      blue={blue}
      onAnimationEnd={animationEndHandler}
      translateDistance={translate_distance}
      data-color={JSON.stringify([red, green, blue])}
      top={top}
      left={left}
    >
      {power}
    </UserDeityEnergyBallDiv>
  );
}

export default UserEnergyBall;