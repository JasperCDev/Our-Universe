import React, { useRef, useEffect, useState } from 'react';
import { TopUser, UserClicks, UserId, UsernameContainer } from './topUsers.styles';
import { idToStringWithZeroes } from '../../helpers';
import { useCountUp } from 'use-count-up';
import { INSPECT_MAX_BYTES } from 'buffer';

interface Props {
  user_name: string;
  user_clicks: number;
  place: number;
  user_id: number;
  is_online: boolean;
}

let start = 0;

const EachTopUser: React.FC<Props> = ({ user_name, user_clicks, place, user_id, is_online }) => {
  const [user_clicks_state, set_user_clicks_state] = useState<number>(0);
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
      <TopUser>
        <UsernameContainer online={is_online}>
          {place}{')'} {user_name}
          <UserId>#{idToStringWithZeroes(user_id)}</UserId>
        </UsernameContainer>
        <UserClicks>clicks: {value}</UserClicks>
      </TopUser>
      <hr />
    </>
  )
}

export default React.memo(EachTopUser);