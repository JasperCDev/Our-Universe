import { light } from '@material-ui/core/styles/createPalette';
import React, { FC, useEffect, useState } from 'react';
import { UserDeityEnergyBallDiv } from './userDeity.styles';

interface Props {
  translateDistance: number;
  animationEndHandler: () => void;
  energy_hue: number;
  energy_saturation: number;
  energy_lightness: number;
}

const UserEnergyBall: FC<Props> = ({
  translateDistance,
  animationEndHandler,
  energy_hue,
  energy_lightness,
  energy_saturation
}) => {
  const [translate_distance, set_translate_distance] = useState<number>(0);
  const [hue, set_hue] = useState<number>(0);
  const [saturation, set_saturation] = useState<number>(0);
  const [lightness, set_lightness] = useState<number>(0);

  useEffect(() => {
    if (hue === 0) {
      set_hue(energy_hue);
      set_saturation(energy_saturation);
      set_lightness(energy_lightness);
    }
  }, [hue, saturation, lightness]);


  useEffect(() => {
    if (translate_distance === 0 && translateDistance !== 0) set_translate_distance(translateDistance);

  }, [translateDistance]);

  return (
    <UserDeityEnergyBallDiv hue={hue} saturation={saturation} lightness={lightness} onAnimationEnd={animationEndHandler} translateDistance={translate_distance} />
  );
}

export default UserEnergyBall;