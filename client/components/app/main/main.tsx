import React, { useContext, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import UserPlanet from './userPlanet/userPlanet';
import UserDeity from './userDeity/userDeity';
import MainEnergyBall from './mainEnergyBall';
import { PlanetEnergyColorContext } from '../contexts';

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
  userPlanetRect: (DOMRect | undefined);
  setUserPlanetRect: React.Dispatch<React.SetStateAction<DOMRect | undefined>>;
  incrementClicks: () => void;
}

const Main: React.FC<Props> = ({ userPlanetRect, setUserPlanetRect, incrementClicks }) => {
  const [energyBalls, setEnergyBalls] = useState<Array<[number, number, number]>>([]);
  const [userPlanetPosition, setUserPlanetPosition] = useState<[number, number]>([0, 0]);
  const [energyBallCount, setEnergyBallCount] = useState<number>(0);
  const { planetEnergyColor, setPlanetEnergyColor } = useContext(PlanetEnergyColorContext);

  const planetEnergyColorRef = useRef([64, 191, 255]);
  planetEnergyColorRef.current = planetEnergyColor;


  useEffect(() => {
    let localStoragePlanetEnergyColor = localStorage.getItem('planetEnergyColor');
    if (!localStoragePlanetEnergyColor || localStoragePlanetEnergyColor === 'null') {
      localStorage.setItem('planetEnergyColor', JSON.stringify(planetEnergyColor));
      localStoragePlanetEnergyColor = localStorage.getItem('planetEnergyColor');
    }
    setPlanetEnergyColor(JSON.parse(localStoragePlanetEnergyColor!));
    setInterval(() => {
      localStorage.setItem('planetEnergyColor', JSON.stringify(planetEnergyColorRef.current));
    }, 3000);

  }, []);

  useEffect(() => {
    if (userPlanetRect && userPlanetRect.height) {
      const middleX = userPlanetRect.left + (userPlanetRect.width / 2);
      const middleY = userPlanetRect.top + (userPlanetRect.height / 2);
      setUserPlanetPosition([middleX, middleY]);
    }
  }, [userPlanetRect]);

  const mainClickHandler = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    setEnergyBallCount(energyBallCount + 1);
    const htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const copy = energyBalls.slice(0);
    copy.push([e.pageX - htmlFontSize, e.pageY - htmlFontSize, energyBallCount]);
    setEnergyBalls(copy);
  }

  const animationEndHandler = (e: React.AnimationEvent<HTMLDivElement>) => {
    const copy = energyBalls.slice(0);
    copy.shift();
    setEnergyBalls(copy);
    incrementClicks();
    changePlanetColor(JSON.parse((e.target as HTMLDivElement).getAttribute('data-color')!));
  }

  const changePlanetColor = (energyBallColor: [number, number, number]) => {
    const redDifference = energyBallColor[0] - planetEnergyColor[0];
    const greenDifference = energyBallColor[1] - planetEnergyColor[1];
    const blueDifference = energyBallColor[2] - planetEnergyColor[2];
    const newRed = planetEnergyColor[0] + Math.floor(redDifference / 20);
    const newGreen = planetEnergyColor[1] + Math.floor(greenDifference / 20);
    const newBlue = planetEnergyColor[2] + Math.floor(blueDifference / 20);
    setPlanetEnergyColor([ newRed, newGreen, newBlue ]);
  }


  return (
    <MainDiv onClick={mainClickHandler}>
      {energyBalls.map((ball) => (
        <MainEnergyBall
          x={ball[0]}
          y={ball[1]}
          distanceX={userPlanetPosition[0] - ball[0]}
          distanceY={userPlanetPosition[1] - ball[1]}
          animationEndHandler={animationEndHandler}
          key={ball[2]}
        >
        </MainEnergyBall>
      ))}
      <UserPlanet setUserPlanetRect={setUserPlanetRect}/>
      <UserDeity userPlanetRect={userPlanetRect} incrementClicks={incrementClicks} />
    </MainDiv>
  );
}

export default Main;