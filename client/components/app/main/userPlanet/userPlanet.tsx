import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Counter, UserPlanetContainer, UserPlanetDiv, UserPlanetDivContainer, UniverseName } from './userPlanet.styles';
import { numberToCommaSeperatedString } from '../../../helpers';
import { UserContext } from '../../contexts';
import { PlanetEnergyColorContext } from '../mainContexts';

interface Props {
  setUserPlanetRect: React.Dispatch<React.SetStateAction<DOMRect | undefined>>;
}

const UserPlanet: FC<Props> = ({ setUserPlanetRect }) => {
  const [planetSize, setPlanetSize] = useState<number>(0);
  const userPlanetDivRef = useRef<HTMLDivElement>(null);

  const { userClicks, username } = useContext(UserContext);
  const colorContext =useContext(PlanetEnergyColorContext)
  const [red, green, blue] = colorContext.planetEnergyColor ? colorContext.planetEnergyColor : [0, 0, 0];

  useEffect(() => {
    const newUserPlanetRect = userPlanetDivRef.current!.getBoundingClientRect();
    setUserPlanetRect(newUserPlanetRect);
  }, [planetSize]);


  useEffect(() => {
    setPlanetSize((userClicks / 10000) + 2);
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
