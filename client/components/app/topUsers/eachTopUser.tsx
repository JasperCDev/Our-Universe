import React, { useRef, useEffect, useState } from 'react';
import { Place, TopUser, TopUserContainer, UserClicks, UserId, UsernameContainer, UserOnlineTag, UserPlanetIcon, UserPlanetIconContainer } from './topUsers.styles';
import { idToStringWithZeroes } from '../../helpers';
import { useCountUp } from 'use-count-up';

interface Props {
  username: string;
  userClicks: number;
  place: number;
  userid: number;
  isOnline: boolean;
  planetColor: [number, number, number];
}

const EachTopUser: React.FC<Props> = ({ username, userClicks, place, userid, isOnline, planetColor: [red, green, blue] }) => {
  const [userClicksState, setUserClicksState] = useState<number>(0);
  const [hovered, setHovered] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(true);
  const previousUserClicksRef = useRef(0);

  useEffect(() => {
    if (previousUserClicksRef.current !== 0) setIsActive(true);
    previousUserClicksRef.current = userClicksState;
    setUserClicksState(userClicks);
  }, [userClicks]);

  const previousUserClicks = previousUserClicksRef.current;

  const { value } = useCountUp({
    isCounting: shouldAnimate,
    start: previousUserClicks,
    end: userClicks,
    duration: 3,
    autoResetKey: previousUserClicks,
    thousandsSeparator: ',',
    easing: 'linear',
    onComplete: () => {
      if (previousUserClicks === userClicks) {
        setShouldAnimate(false);
        setIsActive(false);
      };
    }
  });


  return (
    <>
      <TopUserContainer
        active={isActive}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Place>{place}{')'}</Place>
        <TopUser>
          <UsernameContainer hovered={hovered}>
            {username}
            <UserId>#{idToStringWithZeroes(userid)}</UserId>
            <UserOnlineTag online={isOnline}> {isOnline ? 'online' : 'offline'} </UserOnlineTag>
          </UsernameContainer>
          <UserClicks>ATOMS: {value}</UserClicks>
          <UserPlanetIconContainer>
            <UserPlanetIcon red={red} green={green} blue={blue} />
          </UserPlanetIconContainer>

          </TopUser>
      </TopUserContainer>
    </>
  )
}

export default React.memo(EachTopUser);