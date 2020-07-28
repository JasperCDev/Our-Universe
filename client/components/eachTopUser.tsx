import React, { useRef, useEffect, useState } from 'react';
import { TopUser, UserClicks } from './styles';

interface Props {
  user_name: string;
  user_clicks: number;
  place: number;
  animateUserClicks: (start: number, end: number, duration: number, setter: React.Dispatch<React.SetStateAction<number>>) => void;
  formatNumbers: (x: number) => (string | number);
}

const EachTopUser: React.FC<Props> = ({ user_name, user_clicks, place, animateUserClicks, formatNumbers}) => {
  const [user_clicks_state, set_user_clicks_state] = useState<number>(user_clicks);
  const prev_user_clicks_ref = useRef<number>(0);

  useEffect(() => {
    prev_user_clicks_ref.current = user_clicks;
    const start = prev_user_clicks;
    const end = user_clicks;
    animateUserClicks(start, end, 3000, set_user_clicks_state);
  }, [user_clicks]);

  const prev_user_clicks = prev_user_clicks_ref.current;

  return (
    <>
      <TopUser>
        {place}{')'} {user_name}
        <br />
        <UserClicks>clicks: {formatNumbers(user_clicks_state)}</UserClicks>
      </TopUser>
      <hr />
    </>
  )
}

export default EachTopUser;