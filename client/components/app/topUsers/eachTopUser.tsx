import React, { useRef, useEffect, useState } from 'react';
import { TopUser, UserClicks } from './topUsers.styles';
import { animateCounter, numberToCommaSeperatedString, idToStringWithZeroes } from '../../helpers';

interface Props {
  user_name: string;
  user_clicks: number;
  place: number;
  user_id: number;
}

const EachTopUser: React.FC<Props> = ({ user_name, user_clicks, place, user_id }) => {
  const [user_clicks_state, set_user_clicks_state] = useState<number>(user_clicks);
  const prev_user_clicks_ref = useRef<number>(0);

  useEffect(() => {
    prev_user_clicks_ref.current = user_clicks;
    const start = prev_user_clicks;
    const end = user_clicks;

    // animateCounter(start, end, 3000, user_clicks, set_user_clicks_state);
  }, [ user_clicks ]);

  const prev_user_clicks = prev_user_clicks_ref.current;

  return (
    <>
      <TopUser>
        <div>
          {place}{')'} {user_name}
          <span style={{ fontWeight: "normal", fontSize: '0.75rem', paddingLeft: '5px' }}>#{idToStringWithZeroes(user_id)}</span>
        </div>
        <UserClicks>clicks: {numberToCommaSeperatedString(user_clicks_state)}</UserClicks>
      </TopUser>
      {/* <hr /> */}
    </>
  )
}

export default EachTopUser;