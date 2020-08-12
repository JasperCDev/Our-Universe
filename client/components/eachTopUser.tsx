import React, { useRef, useEffect, useState } from 'react';
import { TopUser, UserClicks } from './styles';
import { animateCounter, numberToCommaSeperatedString } from './helpers';

interface Props {
  user_name: string;
  user_clicks: number;
  place: number;
}

const EachTopUser: React.FC<Props> = ({ user_name, user_clicks, place }) => {
  const [user_clicks_state, set_user_clicks_state] = useState<number>(user_clicks);
  const prev_user_clicks_ref = useRef<number>(0);

  useEffect(() => {
    prev_user_clicks_ref.current = user_clicks;
    const start = prev_user_clicks;
    const end = user_clicks;
    animateCounter(start, end, 3000, set_user_clicks_state);
  }, [ user_clicks ]);

  const prev_user_clicks = prev_user_clicks_ref.current;

  return (
    <>
      <TopUser>
        {place}{')'} {user_name}
        <br />
        <UserClicks>clicks: {numberToCommaSeperatedString(user_clicks_state)}</UserClicks>
      </TopUser>
      <hr />
    </>
  )
}

export default EachTopUser;