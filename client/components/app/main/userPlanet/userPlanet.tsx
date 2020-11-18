import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Counter, UserPlanetContainer, UserPlanetDiv, UserPlanetDivContainer, UniverseName } from './userPlanet.styles';
import { numberToCommaSeperatedString } from '../../../helpers';
import { UserContext } from '../../contexts';
import { PlanetEnergyColorContext } from '../../contexts';

interface Props {
  setUserPlanetRect: React.Dispatch<React.SetStateAction<DOMRect | undefined>>;
}

const UserPlanet: FC<Props> = ({ setUserPlanetRect }) => {
  const [planetSize, setPlanetSize] = useState<number>(0);
  const userPlanetDivRef = useRef<HTMLDivElement>(null);

  // CONTEXTS
  const { userClicks, username } = useContext(UserContext);
  const colorContext = useContext(PlanetEnergyColorContext)
  const [red, green, blue] = colorContext.planetEnergyColor ? colorContext.planetEnergyColor : [0, 0, 0];


  useEffect(() => {
    window.addEventListener('resize', () => {
      const newUserPlanetRect = userPlanetDivRef.current!.getBoundingClientRect();
      setUserPlanetRect(newUserPlanetRect);
    });
  }, []);

  useEffect(() => {
    const newUserPlanetRect = userPlanetDivRef.current!.getBoundingClientRect();
    setUserPlanetRect(newUserPlanetRect);
  }, [planetSize]);


  useEffect(() => {
    if (userClicks <= 100) {
      setPlanetSize((userClicks / 100) + 2);
    } else if (userClicks <= 1000) {
      setPlanetSize(planetSize + (userClicks / 100000));
    } else if (userClicks <= 10000) {
      setPlanetSize(userClicks / 10000000);
    }

  }, [userClicks]);

  return (
    <UserPlanetContainer >
      <UniverseName>{username.toUpperCase()}'S PLANET</UniverseName>
      <Counter>
        {numberToCommaSeperatedString(userClicks)} ATOMS
      </Counter>
      <UserPlanetDivContainer planetSize={planetSize} ref={userPlanetDivRef} >
        <UserPlanetDiv
          planetSize={planetSize}
          red={red}
          green={green}
          blue={blue}
        >
        </UserPlanetDiv>
      </UserPlanetDivContainer>
    </UserPlanetContainer>
  );
}

export default React.memo(UserPlanet);
