import React, { useState, useEffect, FC, FormEvent, useRef } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { GlobalStyle, Div, Counter, Greeting, Button } from './styles';

import UserForm from './userForm';
import TopTenUsers from './topTenUsers';

interface User {
  user_name: string;
  user_clicks: number;
}

const App: FC = () => {
  const [global_clicks, set_global_clicks] = useState<number>(0);
  const [user_name, set_user_name] = useState<string>('');
  const [user_clicks, set_user_clicks] = useState<number>(0);
  const [form_submitted, set_form_submitted] = useState<boolean>(false);
  const [login, set_login] = useState<boolean>(true);
  const [top_ten_users, set_top_ten_users] = useState<User[]>([]);
  const [session_clicks, set_session_clicks] = useState<number>(0);

  const user_name_ref = useRef<string>('');
  user_name_ref.current = user_name;

  const session_clicks_ref = useRef<number>(0);
  session_clicks_ref.current = session_clicks;

  useEffect(() => {
    getGlobalClicks();
    getTopTenUsers();
    setInterval(() => clicksLifeCycle(), 5000);
  }, []);


  useEffect(() => {
    document.title = global_clicks.toString();
  }, [ global_clicks ])

  const clicksLifeCycle = (): void => {
    updateGlobalClicks()
    .then(getGlobalClicks)
    .then(updateUserClicks)
    .then(getTopTenUsers);
  }

  const getGlobalClicks = (): Promise<any> => {
    return axios.get('/global_clicks')
    .then((response: AxiosResponse) => {
      set_global_clicks(response.data.rows[0].click_count);
    })
    .catch((err: Error) => console.error(err));
  }

  const updateGlobalClicks = (): Promise<any> => {
    // if (!session_clicks) return new Promise(() => {});
    return axios.put('/global_clicks', {
      clicks: session_clicks_ref.current
    })
    .catch((err) => console.error(err));
  }

  const registerUser = (user_name: string): Promise<any> => {
    return axios.post('/user', { user_name })
      .then((response: AxiosResponse) => {
      if (response.data === 'User already exists') {
        alert(response.data);
      } else {
        set_user_name(response.data.user_name);
        set_form_submitted(true);
        getTopTenUsers();
      }
    })
    .catch((err) => console.error(err));
  }

  const logInUser = (user_name: string): Promise<any> => {
    return axios.get(`/user?u=${user_name}`)
      .then((response: AxiosResponse) => {
        if (response.data === 'That user does not exist') {
          alert(response.data);
        } else {
          set_user_name(response.data.user_name);
          set_user_clicks(response.data.user_clicks)
          set_form_submitted(true);
        }
      })
      .catch((err: AxiosError) => console.error(err));
  }

  const updateUserClicks = (): Promise<any> => {
    //if (!session_clicks) return new Promise(() => {});
    return axios.put('/user', {
      user_name: user_name_ref.current,
      clicks: session_clicks_ref.current,
    })
    .then((response: AxiosResponse) => set_session_clicks(0))
    .catch((err: AxiosError) => console.error(err));
  }

  const getTopTenUsers = (): Promise<any> => {
    return axios.get('/users')
    .then((response: AxiosResponse) => set_top_ten_users(response.data))
    .catch((err: AxiosError) => console.error(err));
  }

  const userFormSubmitHandler = (e: FormEvent): void => {
    e.preventDefault();
    if (login) {
      logInUser(e.target[0].value);
    } else {
      registerUser(e.target[0].value);
    }
  }

  const buttonClickHandler = (): void => {
    set_global_clicks(global_clicks + 1);
    set_session_clicks(session_clicks + 1);
    set_user_clicks(user_clicks + 1);
  }

  const toggleLogin = (): void => set_login(!login);

  if (!form_submitted) {
    return (
      <>
        <Div>
        <GlobalStyle />
        <UserForm submitHandler={userFormSubmitHandler} toggleLogin={toggleLogin} login={login} />
        </Div>
      </>
    )
  }
  return (
    <>
      <Div>
        <GlobalStyle />
        {/* <Greeting>{`Hello, ${user_name}`}</Greeting> */}
        <Counter>{global_clicks}</Counter>
        <h3><b>{`${user_name}: ${user_clicks}`}</b></h3>
        <Button onClick={buttonClickHandler}>Click Me!</Button>
      </Div>
      <TopTenUsers users={top_ten_users} />
    </>
  );
}


export default App;
