import React, { useRef, useEffect, useState } from 'react';
import { Place, TopUser, TopUserContainer, UserClicks, UserId, UsernameContainer, UserOnlineTag } from './topUsers.styles';
import { idToStringWithZeroes } from '../../helpers';
import { useCountUp } from 'use-count-up';

interface Props {
  user_name: string;
  user_clicks: number;
  place: number;
  user_id: number;
  is_online: boolean;
}

const EachTopUser: React.FC<Props> = ({ user_name, user_clicks, place, user_id, is_online }) => {
  const [user_clicks_state, set_user_clicks_state] = useState<number>(0);
  const [hovered, set_hovered] = useState<boolean>(false);
  const previous_user_clicks_ref = useRef(0);

  useEffect(() => {
    previous_user_clicks_ref.current = user_clicks_state;
    set_user_clicks_state(user_clicks);
  }, [user_clicks]);

  const previous_user_clicks = previous_user_clicks_ref.current;

  const { value } = useCountUp({
    start: previous_user_clicks,
    end: user_clicks,
    duration: 3,
    isCounting: true,
    autoResetKey: previous_user_clicks,
    thousandsSeparator: ',',
    easing: 'linear'
  });


  return (
    <>
      <TopUserContainer onMouseOver={() => set_hovered(true)} onMouseLeave={() => set_hovered(false)}>
      <Place>{place}{')'}</Place>
        <TopUser>
          <UsernameContainer hovered={hovered}>
            {user_name}
            <UserId>#{idToStringWithZeroes(user_id)}</UserId>
            <UserOnlineTag online={is_online}> {is_online ? 'online' : 'offline'} </UserOnlineTag>
          </UsernameContainer>
          <UserClicks>atoms: {value}</UserClicks>
          </TopUser>
      </TopUserContainer>
    </>
  )
}

export default React.memo(EachTopUser);