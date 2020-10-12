import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserDeityContainer, UserClicksSubheading, UserDeityButton, UserDeityDiv, EnergyBar, EnergyProgress } from './userDeity.styles';
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
  const [energyOpacity, setEnergyOpacity] = useState<number>(0.2);
  const [energyProgress, setEnergyProgress] = useState<number>(0);

  const UserDeityContainerRef = useRef<HTMLDivElement>(null);

  const energyColor = useContext(EnergyColorContext);
  const { setEnergyColor } = energyColor;
  const [red, green, blue] = energyColor!.energyColor;

  const user = useContext(UserContext);
  const { username, userId, setUsername, userPower, setUserPower } = user;
  const { planetEnergyColor, setPlanetEnergyColor } = useContext(PlanetEnergyColorContext);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastClickTime >= 1000) {
        if (sessionClicks < 10) {
          sessionClicks = 0;
        } else {
          sessionClicks -= 10;
        }
        assignEnergyPower();
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    }
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
    setPlanetEnergyColor([ newRed, newGreen, newBlue]);
  }

  const assessMultipleClicks = () => {
    sessionClicks++;
    lastClickTime = Date.now();
    assignEnergyPower();
  };

  const assignEnergyPower = () => {
    if (sessionClicks <= 100) {
      if (sessionClicks < 10) {
        setEnergyOpacity(.2);
      } else {
        setEnergyOpacity(sessionClicks / 100);
      }
      setEnergyColor([64, 191, 255]);
      setEnergySize(1);
      setUserPower(1);
      setEnergyProgress((sessionClicks / 100) * 100);
    } else if (sessionClicks <= 200) {
      setEnergyColor([127, 255, 127]);
      setEnergySize(1.2);
      setUserPower(2);
      setEnergyProgress(((sessionClicks - 100) / 100) * 100);
    } else if (sessionClicks <= 300) {
      setEnergyColor([255, 127, 255]);
      setEnergySize(1.4);
      setUserPower(4);
      setEnergyProgress(((sessionClicks - 200) / 100) * 100);
    } else if (sessionClicks <= 400) {
      setEnergyColor([255, 0, 255]);
      setEnergySize(2);
      setUserPower(8);
      setEnergyProgress(((sessionClicks - 300) / 100) * 100);
    } else if (sessionClicks <= 500) {
      setEnergyColor([255, 255, 127]);
      setEnergySize(2.2);
      setUserPower(16);
      setEnergyProgress(((sessionClicks - 400) / 100) * 100);
    } else if (sessionClicks <= 600) {
      setEnergyColor([255, 255, 0]);
      setEnergySize(2.4);
      setUserPower(32);
      setEnergyProgress(((sessionClicks - 500) / 100) * 100);
    } else if (sessionClicks <= 700) {
      setEnergyColor([255, 0, 0]);
      setEnergySize(2.6);
      setUserPower(64);
      setEnergyProgress(((sessionClicks - 600) / 100) * 100);
    } else {
      setEnergyColor([127, 127, 127]);
      setEnergySize(3);
      setUserPower(128);
      setEnergyProgress(100);
    }
  }


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
      <UserDeityContainer ref={UserDeityContainerRef} red={red} green={green} blue={blue} opacity={energyOpacity}>
        <UserDeityDiv red={red} green={green} blue={blue}></UserDeityDiv>
        <EnergyBar red={red} green={green} blue={blue}>
          <EnergyProgress red={red} green={green} blue={blue} progress={energyProgress}></EnergyProgress>
        </EnergyBar>
        <UsernameForm username={username} userId={userId} setUsername={setUsername} />
        <UserDeityButton onClick={() => {
          setEnergyBallCount(energyBallCount + 1);
          setEnergyBalls([...energyBalls, energyBallCount]);
          assessMultipleClicks();
        }}>
          HYDRATE
        </UserDeityButton>
      </UserDeityContainer>
    </>
  );
}


export default React.memo(UserDeity);