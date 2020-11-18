import { useEffect, useRef, useState } from 'react';
import axios from 'axios';


interface User {
  user_name: string;
  user_clicks: number;
  id: number;
  is_online: boolean;
  planet_color: string;
}

interface ReturnState {
  globalClicks: number;
  topUsers: Array<User>;
  previousGlobalClicks: number;
}

export const useGlobalIntervalState = (): ReturnState => {
  const [globalClicks, setGlobalClicks] = useState<number>(0);
  const [topUsers, setTopUsers] = useState<Array<User>>([]);
  const [previousGlobalClicks, setPreviousGlobalClicks] = useState<number>(0);

  const globalClicksRef = useRef<number>(0);
  globalClicksRef.current = globalClicks;

  useEffect(() => {
    clicksLifeCycle();
    setInterval(() => {
      clicksLifeCycle();
    }, 3000);
  }, []);

  const clicksLifeCycle = async () => {
    await getGlobalClicks();
    await getTopUsers();
  }

  const getGlobalClicks = async () => {
    const response = await axios.get('/globalClicks');
    const newClicks: number = response.data.rows[0].click_count;
    setPreviousGlobalClicks(globalClicksRef.current);
    setGlobalClicks(newClicks);
  }

  const getTopUsers = async () => {
    try {
      const response = await axios.get('/users');
      setTopUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  return {
    globalClicks,
    topUsers,
    previousGlobalClicks,
  }
}

