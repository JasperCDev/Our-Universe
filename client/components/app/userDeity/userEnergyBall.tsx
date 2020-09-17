import React, { FC, useEffect, useState } from 'react';
import { UserDeityEnergyBallDiv } from './userDeity.styles';

interface Props {
  translateDistance: number;
  animationEndHandler: () => void;

}

const UserEnergyBall: FC<Props> = ({ translateDistance, animationEndHandler }) => {
  const [translate_distance, set_translate_distance] = useState<number>(0);
  const [background_color, set_background_color] = useState<string>(Math.floor(Math.random() * 16777215).toString(16));

  useEffect(() => {
    if (translate_distance === 0 && translateDistance !== 0) set_translate_distance(translateDistance);
  }, [translateDistance]);

  console.log(translateDistance);
  return (
    <UserDeityEnergyBallDiv color={background_color} onAnimationEnd={animationEndHandler} translateDistance={translate_distance} />
  );
}

export default UserEnergyBall;