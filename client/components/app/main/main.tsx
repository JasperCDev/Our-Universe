import React, { useContext, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import UserStar from './userStar/userStar';
import UserDeity from './userDeity/userDeity';
import MainEnergyBall from './mainEnergyBall';
import { PlanetEnergyColorContext } from './mainContexts';
import { EnergyColorContext } from '../contexts';

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  user-select: none;
`;

interface Props {
  user_star_rect: (DOMRect | undefined);
  set_user_star_rect: React.Dispatch<React.SetStateAction<DOMRect | undefined>>;
  buttonClickHandler: () => void;
}

const Main: React.FC<Props> = ({ user_star_rect, set_user_star_rect, buttonClickHandler }) => {
  const [energy_balls, set_energy_balls] = useState<Array<[number, number, number]>>([]);
  const [user_star_position, set_user_star_position] = useState<[number, number]>([0, 0]);
  const [energy_balls_count, set_energy_balls_count] = useState<number>(0);
  const [planet_energy_color, set_planet_energy_color] = useState<[number, number, number]>([64, 191, 255]);

  const planet_energy_color_ref = useRef([64, 191, 255]);
  planet_energy_color_ref.current = planet_energy_color;


  useEffect(() => {
    const localStoragePlanetEnergyColor = localStorage.getItem('planet_energy_color');
    if (!localStoragePlanetEnergyColor) {
      localStorage.setItem('planet_energy_color', JSON.stringify(planet_energy_color));
    }
    set_planet_energy_color(JSON.parse(localStoragePlanetEnergyColor!));

    setInterval(() => {
      localStorage.setItem('planet_energy_color', JSON.stringify(planet_energy_color_ref.current));
    }, 3000);
  }, []);

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

  const animationEndHandler = (e: React.AnimationEvent<HTMLDivElement>) => {
    const copy = energy_balls.slice(0);
    copy.shift();
    set_energy_balls(copy);
    buttonClickHandler();
    changePlanetColor(JSON.parse((e.target as HTMLDivElement).getAttribute('data-color')!));
  }

  const changePlanetColor = (energyBallColor: [number, number, number]) => {
    const redDifference = energyBallColor[0] - planet_energy_color[0];
    const greenDifference = energyBallColor[1] - planet_energy_color[1];
    const blueDifference = energyBallColor[2] - planet_energy_color[2];
    const newRed = planet_energy_color[0] + Math.floor(redDifference / 20);
    const newGreen = planet_energy_color[1] + Math.floor(greenDifference / 20);
    const newBlue = planet_energy_color[2] + Math.floor(blueDifference / 20);
    set_planet_energy_color([ newRed, newGreen, newBlue]);
  }


  return (
    <PlanetEnergyColorContext.Provider value={{planet_energy_color, set_planet_energy_color}}>
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
    </PlanetEnergyColorContext.Provider>

  );
}

export default Main;