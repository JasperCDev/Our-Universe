import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import UserStar from './userStar/userStar';
import UserDeity from './userDeity/userDeity';
import MainEnergyBall from './mainEnergyBall';

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  user-select: none;
`;

let count = 0;

interface Props {
  user_star_rect: (DOMRect | undefined);
  set_user_star_rect: React.Dispatch<React.SetStateAction<DOMRect | undefined>>;
  buttonClickHandler: () => void;
}

const Main: React.FC<Props> = ({ user_star_rect, set_user_star_rect, buttonClickHandler }) => {
  const [energy_balls, set_energy_balls] = useState<Array<[number, number, number]>>([]);
  const [user_star_position, set_user_star_position] = useState<[number, number]>([0, 0]);
  const [energy_balls_count, set_energy_balls_count] = useState<number>(0);

  useEffect(() => {
    if (user_star_rect && user_star_rect.height) {
      const middleX = user_star_rect.left + (user_star_rect.width / 2);
      const middleY = user_star_rect.top + (user_star_rect.height / 2);
      set_user_star_position([middleX, middleY]);
    }
  }, [user_star_rect]);

  const mainClickHandler = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    set_energy_balls_count(energy_balls_count + 1);
    const htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const copy = energy_balls.slice(0);
    copy.push([e.pageX - htmlFontSize, e.pageY - htmlFontSize, energy_balls_count]);
    set_energy_balls(copy);
  }

  const animationEndHandler = () => {
    const copy = energy_balls.slice(0);
    copy.shift();
    set_energy_balls(copy);
    buttonClickHandler();
  }


  return (
    <MainDiv onClick={mainClickHandler}>
      {energy_balls.map((ball) => (
        <MainEnergyBall
          x={ball[0]}
          y={ball[1]}
          distanceX={user_star_position[0] - ball[0]}
          distanceY={user_star_position[1] - ball[1]}
          animationEndHandler={animationEndHandler}
          key={ball[2]}
        >

        </MainEnergyBall>
      ))}
      <UserStar user_star_rect={user_star_rect} set_user_star_rect={set_user_star_rect}/>
      <UserDeity user_star_rect={user_star_rect} buttonClickHandler={buttonClickHandler} />
    </MainDiv>
  );
}

export default Main;