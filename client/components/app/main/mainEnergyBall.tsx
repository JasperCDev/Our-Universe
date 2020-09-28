import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';


const animateUp = (distanceX: number, distanceY: number) => keyframes`
  100% {
    transform: translate(${distanceX}px, ${distanceY}px);
  }
`;

const EnergyBall = styled.div <{ x: number; y: number, distanceX: number; distanceY: number; }>`
  position: absolute;
  top: ${({ y }) => `calc(${y}px - 5rem - 0.5rem)`};
  left: ${({ x }) => `calc(${x}px - 0.5rem)`};
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: red;
  opacity: 0.5;
  z-index: -1;
  animation: ${({ distanceX, distanceY}) => animateUp(distanceX, distanceY)} 5s linear;
`;

interface Props {
  x: number;
  y: number;
  distanceX: number;
  distanceY: number;
  animationEndHandler: (e: React.AnimationEvent<HTMLDivElement>) => void;
}


const MainEnergyBall: React.FC<Props> = ({
  x,
  y,
  distanceX,
  distanceY,
  animationEndHandler
}) => {
  const [x_state, set_x_state] = useState<number>(0);
  const [y_state, set_y_state] = useState<number>(0);
  const [distance_x, set_distance_x] = useState<number>(0);
  const [distance_y, set_distance_y] = useState<number>(0);

  useEffect(() => {
    if (x_state === 0) {
      set_x_state(x);
      set_y_state(y);
    }
  }, [x, y]);

  useEffect(() => {
    if (distance_x === 0 && distanceX !== 0) {
      set_distance_x(distanceX);
      set_distance_y(distanceY);
    }
  }, [distanceX, distanceY]);

  return (
    <EnergyBall
      x={x_state}
      y={y_state}
      distanceX={distance_x}
      distanceY={distance_y}
      onAnimationEnd={animationEndHandler}
      data-color={'[255, 0, 0]'}
    >
    </EnergyBall>
  );
}


export default MainEnergyBall;