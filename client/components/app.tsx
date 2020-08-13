import React, { useState, useEffect, FC, useRef} from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { GlobalStyle, All, Main, Counter, Greeting, UserClicksSubheading, BigButton } from './app.styles';
import NavBar from './navBar';
import TopUsers from './topUsers';
import UsernameForm from './usernameForm';
import { animateCounter, numberToCommaSeperatedString } from './helpers';
import Faker from 'faker';


interface User {
  user_name: string;
  user_clicks: number;
  id: number;
}

let user_session_clicks: number = 0;
let global_session_clicks: number = 0;

const App: FC = () => {
  const [global_clicks, set_global_clicks] = useState<number>(0);
  const [user_name, set_user_name] = useState<string>('');
  const [user_clicks, set_user_clicks] = useState<number>(0);
  const [top_users, set_top_users] = useState<ReadonlyArray<User>>([]);
  const [user_id, set_user_id] = useState<number>(0);

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

  useEffect(() => {
    getGlobalClicks();
    getTopUsers();
    if (!localStorage.getItem('user_id')) {
      registerUser()
        .then(() => logInUser());
    } else {
      logInUser();
    }
    const timer = setInterval(() => clicksLifeCycle(), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = global_clicks.toString();

  }, [ global_clicks ]);

  const clicksLifeCycle = (): void => {
    updateGlobalClicks()
    .then(getGlobalClicks)
    .then(updateUserClicks)
    .then(getTopUsers);
  }

  const getGlobalClicks = () => {
    return axios.get('/global_clicks')
      .then((response: AxiosResponse) => {
        if (response.data.rows[0].click_count > global_clicks_ref.current) {
          animateCounter(global_clicks_ref.current, response.data.rows[0].click_count, 3000, set_global_clicks);
        }
      })
      .catch((err: AxiosError) => console.error(err));
  }

  const updateGlobalClicks = () => {
    const clicks_to_update_global = global_session_clicks_ref.current;
    return axios.put('/global_clicks', {
      clicks: clicks_to_update_global
    })
    .then(() => global_session_clicks = global_session_clicks_ref.current - clicks_to_update_global)
    .catch((err) => console.error(err));
  }

  const registerUser = () => {
    localStorage.clear();
    localStorage.setItem('user_name', Faker.name.firstName());
    return axios.post('/user', { user_name: localStorage.getItem('user_name') })
      .then((response: AxiosResponse) => localStorage.setItem('user_id', response.data.id))
      .catch((err) => console.error(err));
  }

  const logInUser = (): void => {
    axios.get(`/user?id=${localStorage.getItem('user_id')}`)
      .then((response: AxiosResponse) => {
        if (response.data === 'That user does not exist') {
          registerUser()
            .then(() => logInUser());
        } else {
          if (!localStorage.getItem('user_id')) localStorage.setItem('user_id', response.data.id);
          set_user_name(response.data.user_name);
          set_user_clicks(response.data.user_clicks);
          set_user_id(response.data.id);
        }
      })
      .catch((err: AxiosError) => console.error(err));
  }

  const updateUserClicks = () => {
    const clicks_to_update_user_total = user_session_clicks_ref.current;
    return axios.put('/user', {
      id: user_id_ref.current,
      clicks: clicks_to_update_user_total,
    })
      .then(() => {
        user_session_clicks = user_session_clicks_ref.current - clicks_to_update_user_total;
      })
      .catch((err: AxiosError) => console.error(err));
  }

  const getTopUsers = () => {
    return axios.get('/users')
      .then((response: AxiosResponse) => set_top_users(response.data))
      .catch((err: AxiosError) => console.error(err));
  }

  const buttonClickHandler = (): void => {
    set_global_clicks(global_clicks + 1);
    set_user_clicks(user_clicks + 1);
    user_session_clicks++;
    global_session_clicks++;
  }


  const usernameChangehandler = (e: any, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (validateNewUsername(e.target as HTMLElement, setter)) {

    } else {

    }
  }

  const validateNewUsername = (element: HTMLElement, setter: React.Dispatch<React.SetStateAction<boolean>>): boolean => {
    const new_user_name: string = element.innerHTML;
    let regex = /^[a-zA-Z]{2,9}$/;
    if (regex.test(new_user_name)) {
      setter(true);
      return true;
    } else {
      setter(false);
      return false;
    }
  }

  return (
    <>
      <GlobalStyle />
      <NavBar user_name={user_name} user_clicks={numberToCommaSeperatedString(user_clicks)} changeHandler={usernameChangehandler} user_id={user_id} />
      <All>
        <Main>
          <Greeting>Hello,
            <UsernameForm
              user_name={user_name}
              changeHandler={usernameChangehandler}
            />!
          </Greeting>
          <Counter>
            <span style={{fontSize: '48px'}}>Global:</span>
            <br />
            {numberToCommaSeperatedString(global_clicks)}
          </Counter>
          <UserClicksSubheading>
            your clicks: {numberToCommaSeperatedString(user_clicks)}
          </UserClicksSubheading>
            <BigButton variant="outlined" onClick={buttonClickHandler}>Click Me!</BigButton>
        </Main>
        <TopUsers users={top_users} />
      </All>
    </>
  );
}


export default App;
