import { useEffect, useRef, useState } from 'react';
import axios from 'axios';



interface User {
  user_name: string;
  user_clicks: number;
  id: number;
  is_online: boolean;
}

interface ReturnState {
  global_clicks: number;
  top_users: Array<User>;
  previous_global_clicks: number
}

export const useGlobalIntervalState = (): ReturnState => {
  const [global_clicks, set_global_clicks] = useState<number>(0);
  const [top_users, set_top_users] = useState<Array<User>>([]);
  const [previous_global_clicks, set_previous_global_clicks] = useState<number>(0);

  const global_clicks_ref = useRef<number>(0);
  global_clicks_ref.current = global_clicks;

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
    const response = await axios.get('/global_clicks');
    const newClicks: number = response.data.rows[0].click_count;
    set_previous_global_clicks(global_clicks_ref.current);
    set_global_clicks(newClicks);
  }


  const getTopUsers = async () => {
    try {
      const response = await axios.get('/users');
      set_top_users(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  return {
    global_clicks,
    top_users,
    previous_global_clicks,
  }
}

