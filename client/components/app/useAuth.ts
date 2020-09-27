import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Faker from 'faker';
import regeneratorRuntime from "regenerator-runtime";

export const useAuth = (set_user_clicks: React.Dispatch<React.SetStateAction<number>>) => {
  const [user_name, set_user_name] = useState<string>('');
  const [user_id, set_user_id] = useState<number>(0);

  const user_id_ref = useRef(0);
  user_id_ref.current = user_id;

  useEffect(() => {
    const beforeunload = (e: BeforeUnloadEvent) => {
      axios.put('/online', { user_id: user_id_ref.current, is_online: false });
      return null;
    }

    window.onbeforeunload = beforeunload;
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const id = localStorage.getItem('user_id');
    if (!id) {
      await createUser();
    }
    logInUser();
  }

  const createUser = async () => {
    const username = Faker.name.firstName();
    localStorage.clear();
    try {
      const response = await axios.post('/user', { user_name: username, is_online: true });
      localStorage.setItem('user_id', response.data.id);
    } catch (err) {
      console.error(err);
    }
  }

  const logInUser = async () => {
    try {
      const response = await axios.get(`/user?id=${localStorage.getItem('user_id')}`);
      if (response.data === 'That user does not exist') {
        await createUser();
        await logInUser();
      } else {
        set_user_name(response.data.user_name);
        set_user_clicks(response.data.user_clicks);
        set_user_id(response.data.id);
        const result = await axios.put('/online', { user_id: user_id_ref.current, is_online: true });
        console.log(result);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return {
    user_name,
    set_user_name,
    user_id
  }
}