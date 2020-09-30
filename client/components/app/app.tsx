import React, { useState, useEffect, FC, useRef} from 'react';
import axios from 'axios';
import { GlobalStyle } from './app.styles';
import Main from './main/main';
import TopUsers from './topUsers/topUsers';
import { numberToCommaSeperatedString } from '../helpers';
import { EnergyColorContext, UserContext } from './contexts';
import Header from '../header';
import { useGlobalIntervalState } from './useGlobalIntervalState';
import { useAuth } from './useAuth';

let user_session_clicks = 0;
let global_session_clicks = 0;

const App: FC = () => {
  const [user_clicks, set_user_clicks] = useState<number>(0);
  const [user_star_rect, set_user_star_rect] = useState<DOMRect>();
  const [energy_color, set_energy_color] = useState<[number, number, number]>([64, 191, 255]);
  const [user_power, set_user_power] = useState<number>(1);
  const { global_clicks, previous_global_clicks, top_users } = useGlobalIntervalState();
  const { user_name, set_user_name, user_id } = useAuth(set_user_clicks);

   // -------REFS FOR CALLBACKS---------------\\
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
  //-------------------------------------------//

  useEffect(() => {
    const timer = setInterval(() => clicksLifeCycle(), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    document.title = numberToCommaSeperatedString(global_clicks);
  }, [ global_clicks ]);

  const clicksLifeCycle = async () => {
    await updateGlobalClicks();
    await updateUserClicks();
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

  const buttonClickHandler = (): void => {
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
