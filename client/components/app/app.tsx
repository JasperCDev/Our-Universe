import React, { useState, useEffect, FC, useRef} from 'react';
import axios from 'axios';
import { GlobalStyle } from './app.styles';
import Main from './main/main';
import PlayerStats from './playerStats/playerStats';
import TopUsers from './topUsers/topUsers';
import { numberToCommaSeperatedString } from '../helpers';
import Faker from 'faker';
import { EnergyColorContext, UserContext } from './contexts';
import Header from '../header';


interface User {
  user_name: string;
  user_clicks: number;
  id: number;
  is_online: boolean;
}

let user_session_clicks: number = 0;
let global_session_clicks: number = 0;

const App: FC = () => {
  const [global_clicks, set_global_clicks] = useState<number>(0);
  const [user_name, set_user_name] = useState<string>('');
  const [user_clicks, set_user_clicks] = useState<number>(0);
  const [top_users, set_top_users] = useState<ReadonlyArray<User>>([]);
  const [user_id, set_user_id] = useState<number>(0);
  const [user_star_rect, set_user_star_rect] = useState<DOMRect>();
  const [energy_color, set_energy_color] = useState<[number, number, number]>([64, 191, 255]);
  const [user_power, set_user_power] = useState<number>(1);

  const user_name_ref = useRef<string>('');
  user_name_ref.current = user_name;

  const user_session_clicks_ref = useRef<number>(0);
  user_session_clicks_ref.current = user_session_clicks;

  const global_session_clicks_ref = useRef<number>(0);
  global_session_clicks_ref.current = global_session_clicks;

  const global_clicks_ref = useRef<number>(0);
  global_clicks_ref.current = global_clicks;

  const user_clicks_ref = useRef<number>(0);
  user_clicks_ref.current = user_clicks;

  const user_id_ref = useRef<number>(0);
  user_id_ref.current = user_id;

  const [previous_global_clicks, set_previous_global_clicks]= useState<number>(0);


  useEffect(() => {
    getGlobalClicks();
    getTopUsers();
    if (!localStorage.getItem('user_id')) {
      registerUser().then(() => logInUser());
    } else {
      logInUser();
    }
    const beforeunload = (e: BeforeUnloadEvent) => {
      axios.put('/online', { user_id: user_id_ref.current, is_online: false });
      e.preventDefault();
      e.returnValue = null;
      return null;
    }

    window.onbeforeunload = beforeunload;

    const timer = setInterval(() => clicksLifeCycle(), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = numberToCommaSeperatedString(global_clicks);
  }, [ global_clicks ]);

  const clicksLifeCycle = async () => {
    await updateGlobalClicks();
    await getGlobalClicks();
    await updateUserClicks();
    await getTopUsers();
  }

  const getGlobalClicks = async () => {
    const response = await axios.get('/global_clicks');
    const newClicks: number = response.data.rows[0].click_count;
    set_previous_global_clicks(global_clicks_ref.current);
    set_global_clicks(newClicks);
  }

  const updateGlobalClicks = async () => {
    const clicks_to_update_global = global_session_clicks_ref.current;
    try {
      const response = await axios.put('/global_clicks', {
        clicks: clicks_to_update_global
      });
      global_session_clicks = global_session_clicks_ref.current - clicks_to_update_global;
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  const registerUser = async () => {
    localStorage.clear();
    localStorage.setItem('user_name', Faker.name.firstName());
    try {
      const response = await axios.post('/user', { user_name: localStorage.getItem('user_name'), is_online: true });
      localStorage.setItem('user_id', response.data.id);
    } catch (err) {
      console.error(err);
    }
  }

  const logInUser = async () => {
    try {
      const response = await axios.get(`/user?id=${localStorage.getItem('user_id')}`);
      if (response.data === 'That user does not exist') {
        await registerUser()
        await logInUser();
      } else {
        set_user_name(response.data.user_name);
        set_user_clicks(response.data.user_clicks);
        set_user_id(response.data.id);
        if (!localStorage.getItem('user_id')) {
          localStorage.setItem('user_id', response.data.id);
        } else {
          axios.put('/online', { user_id: user_id_ref.current, is_online: true });
        }


      }
    } catch (err) {
      console.error(err);
    }
  }

  const updateUserClicks = async () => {
    const clicks_to_update_user_total = user_session_clicks_ref.current;
    try {
      await axios.put('/user', {
        id: user_id_ref.current,
        clicks: clicks_to_update_user_total,
      });
      user_session_clicks = user_session_clicks_ref.current - clicks_to_update_user_total;
    } catch (err) {
      console.error(err);
    }
  }

  const getTopUsers = async () => {
    try {
      const response = await axios.get('/users');
      set_top_users(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const buttonClickHandler = (): void => {
    set_global_clicks(global_clicks + user_power);
    set_user_clicks(user_clicks + user_power);
    user_session_clicks += user_power;
    global_session_clicks += user_power;
  }


  return (
    <>
      <GlobalStyle />
      <EnergyColorContext.Provider value={{ energy_color, set_energy_color }}>
      <UserContext.Provider value={{ user_clicks, user_name, user_id, set_user_name, user_lvl: 1, user_power, set_user_power }}>
          <Header previous_global_clicks={previous_global_clicks} global_clicks={global_clicks}/>
        <Main user_star_rect={user_star_rect} set_user_star_rect={set_user_star_rect} buttonClickHandler={buttonClickHandler} />
        <TopUsers users={top_users}/>
      </UserContext.Provider>
      </EnergyColorContext.Provider>
    </>
  );
}


export default App;
