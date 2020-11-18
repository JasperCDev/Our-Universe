import { light } from '@material-ui/core/styles/createPalette';
import React, { FC, useEffect, useState } from 'react';
import { UserDeityEnergyBallDiv } from './userDeity.styles';

interface Props {
  translateDistance: number;
  animationEndHandler: (e: React.AnimationEvent<HTMLDivElement>) => void;
  energyRed: number;
  energyGreen: number;
  energyBlue: number;
  energySize: number;
  userPower: number;
  rect: (DOMRect | undefined);
  children: never[];
}

const UserEnergyBall: FC<Props> = ({
  translateDistance,
  animationEndHandler,
  energyRed,
  energyBlue,
  energyGreen,
  energySize,
  userPower,
  rect
}) => {
  const [translateDistanceState, setTranslateDistanceState] = useState<number>(0);
  const [red, setRed] = useState<number>(0);
  const [green, setGreen] = useState<number>(0);
  const [blue, setBlue] = useState<number>(0);
  const [size, setSize] = useState<number>(energySize);
  const [power, setPower] = useState<number>(userPower);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  useEffect(() => {
    if (red === 0) {
      setRed(energyRed);
      setGreen(energyGreen);
      setBlue(energyBlue);
    }
  }, [red, green, blue]);

  useEffect(() => {
    if (translateDistanceState === 0 && translateDistance !== 0) setTranslateDistanceState(translateDistance);
  }, [translateDistance]);

  useEffect(() => {
    if (rect && top === 0) {
      setTop(rect.top);
      setLeft(rect.left + (rect.width / 2));
    };
  }, [rect]);


  return (
    <UserDeityEnergyBallDiv
      size={size}
      red={red}
      green={green}
      blue={blue}
      onAnimationEnd={animationEndHandler}
      translateDistance={translateDistanceState}
      data-color={JSON.stringify([red, green, blue])}
      top={top}
      left={left}
    >
      {power}
    </UserDeityEnergyBallDiv>
  );
}


export default UserEnergyBall;