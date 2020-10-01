import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserDeityContainer, UserClicksSubheading, UserDeityButton, UserDeityDiv } from './userDeity.styles';
import UserEnergyBall from './userEnergyBall';
import UsernameForm from './usernameForm/usernameForm';
import { EnergyColorContext, UserContext } from '../../contexts';
import { PlanetEnergyColorContext } from '../mainContexts';
import { UserPlanetContainer } from '../userPlanet/userPlanet.styles';

interface Props {
  incrementClicks: () => void;
  userPlanetRect: (DOMRect | undefined);
}

let sessionClicks = 0;
let lastClickTime = Date.now();

const UserDeity: React.FC<Props> = ({
  incrementClicks,
  userPlanetRect
}) => {
  const [energyBallCount, setEnergyBallCount] = useState<number>(0);
  const [energyBalls, setEnergyBalls] = useState<Array<number>>([]);
  const [energyBallTranslateDistance, setEnergyBallTranslateDistance] = useState<number>(0);
  const [energySize, setEnergySize] = useState<number>(1);
  const [UserPlanetContainerRect, setUserPlanetContainerRect] = useState<DOMRect>();
  const [borderOpacity, setBorderOpacity] = useState<number>(0);

  const UserDeityContainerRef = useRef<HTMLDivElement>(null);

  const energyColor = useContext(EnergyColorContext);
  const { setEnergyColor } = energyColor;
  const [red, green, blue] = energyColor!.energyColor;

  const user = useContext(UserContext);
  const { username, userId, setUsername, userPower, setUserPower } = user;
  const { planetEnergyColor, setPlanetEnergyColor } = useContext(PlanetEnergyColorContext);

  useEffect(() => {
    setInterval(() => {
      if (Date.now() - lastClickTime >= 2000) {
        setEnergyColor([64, 191, 255]);
        sessionClicks = 0;
        setUserPower(1);
        setEnergySize(1);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (!UserPlanetContainerRect) {
      setUserPlanetContainerRect(UserDeityContainerRef!.current!.getBoundingClientRect());
    }
    if (UserPlanetContainerRect && userPlanetRect) {
      const travelDistance = UserPlanetContainerRect.top - userPlanetRect.bottom;
      setEnergyBallTranslateDistance(-travelDistance);
    }
  }, [userPlanetRect]);

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
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
    console.log(newRed, newGreen, newBlue);
    setPlanetEnergyColor([ newRed, newGreen, newBlue]);
  }

  const assessMultipleClicks = () => {
    sessionClicks++;
    lastClickTime = Date.now();
    if (sessionClicks < 10) {

    }
    switch (sessionClicks) {
      case 10:
        setUserPower(2);
      break;
      case 50:
        setEnergyColor([127, 255, 127]);
        setEnergySize(1.2);
        setUserPower(2);
        break;
      case 200:
        setEnergyColor([255, 127, 255]);
        setEnergySize(1.8);
        setUserPower(16);
        break;
      case 300:
        setEnergyColor([255, 0, 255]);
        setEnergySize(2);
        setUserPower(32);
        break;
      case 400:
        setEnergyColor([255, 255, 127]);
        setEnergySize(2.2);
        setUserPower(32);
        break;
      case 500:
        setEnergyColor([255, 255, 0]);
        setEnergySize(2.4);
        setUserPower(64);
        break;
      case 600:
        setEnergyColor([255, 0, 0]);
        setEnergySize(2.6);
        setUserPower(128);
      case 700:
        setEnergyColor([127, 127, 127]);
        setEnergySize(3);
        setUserPower(500);

    }
  };


  return (
    <>
      {energyBalls.map((id) => (
        <UserEnergyBall
          animationEndHandler={handleAnimationEnd}
          translateDistance={energyBallTranslateDistance}
          key={id}
          energyRed={red}
          energyGreen={green}
          energyBlue={blue}
          energySize={energySize}
          userPower={userPower}
          rect={UserPlanetContainerRect}
        >
        </UserEnergyBall>
      ))}
      <UserDeityContainer ref={UserDeityContainerRef} red={red} green={green} blue={blue}>
        <UserDeityDiv red={red} green={green} blue={blue}>
        </UserDeityDiv>
        <UsernameForm username={username} userId={userId} setUsername={setUsername} />
        <UserDeityButton onClick={() => {
          setEnergyBallCount(energyBallCount + 1);
          setEnergyBalls([...energyBalls, energyBallCount]);
          assessMultipleClicks();
        }}>
          Click Me!
        </UserDeityButton>
      </UserDeityContainer>
    </>
  );
}


export default React.memo(UserDeity);