import React, { useState, useEffect, FC, FormEvent, useRef} from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { GlobalStyle, All, Main, Counter, Greeting, Button, UserClicksSubheading } from './styles';
import NavBar from './navBar';
import LoginForm from './loginForm';
import SignUpForm from './signUpForm'
import TopUsers from './topUsers';
import { Switch, Route, useHistory } from 'react-router-dom';


interface User {
  readonly user_name: string;
  readonly user_clicks: number;
}

let session_clicks: number = 0;

const App: FC = () => {
  const [global_clicks, set_global_clicks] = useState<number>(0);
  const [user_name, set_user_name] = useState<string>('anonymous');
  const [user_clicks, set_user_clicks] = useState<number>(0);
  const [top_users, set_top_users] = useState<ReadonlyArray<User>>([]);


  const user_name_ref = useRef<string>('');
  user_name_ref.current = user_name;

  const session_clicks_ref = useRef<number>(0);
  session_clicks_ref.current = session_clicks;

  let history = useHistory();

  useEffect(() => {
    getGlobalClicks();
    getTopUsers();
    const timer = setInterval(() => clicksLifeCycle(), 5000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    document.title = global_clicks.toString();
  }, [ global_clicks ]);

  const clicksLifeCycle = (): void => {
    console.log(user_name_ref.current);
    updateGlobalClicks()
    .then(getGlobalClicks)
    .then(updateUserClicks)
    .then(getTopUsers);
  }

  const getGlobalClicks = (): Promise<void | AxiosResponse<any>> => {
    return axios.get('/global_clicks')
    .then((response: AxiosResponse) => {
      set_global_clicks(response.data.rows[0].click_count);
    })
    .catch((err: AxiosError) => console.error(err));
  }

  const updateGlobalClicks = (): Promise<void | AxiosResponse<any>> => {
    //if (!session_clicks) return new Promise(() => {});
    return axios.put('/global_clicks', {
      clicks: session_clicks_ref.current
    })
    .catch((err) => console.error(err));
  }

  const registerUser = (user_name: string): void => {
    axios.post('/user', { user_name })
      .then((response: AxiosResponse) => {
      if (response.data === 'User already exists') {
        alert(response.data);
      } else {
        set_user_name(response.data.user_name);
        session_clicks = 0;
        getTopUsers();
        history.push('/');
      }
    })
    .catch((err) => console.error(err));
  }

  const logInUser = (user_name: string): void => {
    axios.get(`/user?u=${user_name}`)
    .then((response: AxiosResponse) => {
      if (response.data === 'That user does not exist') {
        alert(response.data);
      } else {
        set_user_name(response.data.user_name);
        set_user_clicks(response.data.user_clicks);
        history.push('/');
      }
    })
    .catch((err: AxiosError) => console.error(err));
  }

  const updateUserClicks = (): Promise<number | void> => {
    //if (!session_clicks) return new Promise(() => {});
    return axios.put('/user', {
      user_name: user_name_ref.current,
      clicks: session_clicks_ref.current,
    })
    .then(() => session_clicks = 0)
    .catch((err: AxiosError) => console.error(err));
  }

  const getTopUsers = (): Promise<void> => {
    return axios.get('/users')
    .then((response: AxiosResponse) => set_top_users(response.data))
    .catch((err: AxiosError) => console.error(err));
  }

  const loginSubmitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    logInUser(user_name);
  }

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    set_user_name(e.target.value);
  }

  const signUpSubmitHandler = (e: FormEvent): void => {
    e.preventDefault();
    registerUser(user_name);
  }

  const buttonClickHandler = (): void => {
    set_global_clicks(global_clicks + 1);
    set_user_clicks(user_clicks + 1);
    session_clicks++;
  }

  return (
    <>
      <GlobalStyle />

      {/* Routes */}
      <Switch>
          <Route path="/" exact/>
          <Route path="/login" exact>
            <LoginForm submitHandler={loginSubmitHandler} handleChange={handleUserNameChange}/>
          </Route>
          <Route path="/signup" exact>
              <SignUpForm submitHandler={signUpSubmitHandler} handleChange={handleUserNameChange}/>
          </Route>
      </Switch>
      {/* Routes */}


      <NavBar user_name={user_name} user_clicks={user_clicks} />
      <All>
        <Main>
          <Greeting>{`Hello, ${user_name}`}</Greeting>
          <Counter>{global_clicks}</Counter>
          <UserClicksSubheading>
            {user_name}: {user_clicks}
          </UserClicksSubheading>
          <Button onClick={buttonClickHandler}>Click Me!</Button>
        </Main>
        <TopUsers users={top_users} />
      </All>
    </>
  );
}


export default App;
