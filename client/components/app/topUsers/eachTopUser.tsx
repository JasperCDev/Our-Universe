import React, { useRef, useEffect, useState } from 'react';
import { Place, TopUser, TopUserContainer, UserClicks, UserId, UsernameContainer, UserOnlineTag } from './topUsers.styles';
import { idToStringWithZeroes } from '../../helpers';
import { useCountUp } from 'use-count-up';

interface Props {
  username: string;
  userClicks: number;
  place: number;
  userid: number;
  isOnline: boolean;
}

const EachTopUser: React.FC<Props> = ({ username, userClicks, place, userid, isOnline }) => {
  const [userClicksState, setUserClicksState] = useState<number>(0);
  const [hovered, setHovered] = useState<boolean>(false);
  const previousUserClicksRef = useRef(0);

  useEffect(() => {
    previousUserClicksRef.current = userClicksState;
    setUserClicksState(userClicks);
  }, [userClicks]);

  const previous_userClicks = previousUserClicksRef.current;

  const { value } = useCountUp({
    start: previous_userClicks,
    end: userClicks,
    duration: 3,
    isCounting: true,
    autoResetKey: previous_userClicks,
    thousandsSeparator: ',',
    easing: 'linear'
  });


  return (
    <>
      <TopUserContainer onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Place>{place}{')'}</Place>
        <TopUser>
          <UsernameContainer hovered={hovered}>
            {username}
            <UserId>#{idToStringWithZeroes(userid)}</UserId>
            <UserOnlineTag online={isOnline}> {isOnline ? 'online' : 'offline'} </UserOnlineTag>
          </UsernameContainer>
          <UserClicks>ATOMS: {value}</UserClicks>
          </TopUser>
      </TopUserContainer>
    </>
  )
}

export default React.memo(EachTopUser);