import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Faker from 'faker';

export const useAuth = (setUserClicks: React.Dispatch<React.SetStateAction<number>>) => {
  const [username, setUsername] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);

  const userIdRef = useRef(0);
  userIdRef.current = userId;

  useEffect(() => {
    const beforeunload = (e: BeforeUnloadEvent) => {
      axios.put('/online', { userId: userIdRef.current, isOnline: false });
      return null;
    }

    window.onbeforeunload = beforeunload;
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const id = localStorage.getItem('userId');
    if (!id) {
      console.log('falsey id: ', id?.toString());
      await createUser();
    }
    logInUser();
  }

  const createUser = async () => {
    const username = Faker.name.firstName();
    localStorage.clear();
    try {
      const response = await axios.post('/user', { username, isOnline: true, planetColor: '[64, 191, 255]' });
      console.log('response: ', response);
      localStorage.setItem('userId', response.data.id);
    } catch (err) {
      console.log('ERR: ');
      console.error(err);
    }
  }

  const logInUser = async () => {
    try {
      const response = await axios.get(`/user?id=${localStorage.getItem('userId')}`);
      if (response.data === 'That user does not exist') {
        await createUser();
        await logInUser();
      } else {
        setUsername(response.data.user_name);
        setUserClicks(response.data.user_clicks);
        setUserId(response.data.id);
        await axios.put('/online', { userId: userIdRef.current, isOnline: true });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return {
    username,
    setUsername,
    userId
  }
}