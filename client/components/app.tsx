import React, { useState, useEffect, FC, FormEvent, useRef} from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { GlobalStyle, Div, Counter, Greeting, Button } from './styles';

import LoginForm from './loginForm';
import SignUpForm from './signUpForm'
import TopTenUsers from './topTenUsers';
import { HashRouter as Router, Switch, Route, useHistory, Link } from 'react-router-dom';


interface User {
  user_name: string;
  user_clicks: number;
}

let session_clicks: number = 0;

const App: FC = () => {
  const [global_clicks, set_global_clicks] = useState<number>(0);
  const [user_name, set_user_name] = useState<string>('anonymous');
  const [user_clicks, set_user_clicks] = useState<number>(0);
  const [top_ten_users, set_top_ten_users] = useState<User[]>([]);


  const user_name_ref = useRef<string>('');
  user_name_ref.current = user_name;

  const session_clicks_ref = useRef<number>(0);
  session_clicks_ref.current = session_clicks;

  let history = useHistory();

  useEffect(() => {
    getGlobalClicks();
    getTopTenUsers();
    const timer = setInterval(() => clicksLifeCycle(), 5000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    document.title = global_clicks.toString();
  }, [ global_clicks ]);

  const clicksLifeCycle = (): void => {
    updateGlobalClicks()
    .then(getGlobalClicks)
    .then(updateUserClicks)
    .then(getTopTenUsers);
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
        getTopTenUsers();
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

  const getTopTenUsers = (): Promise<void> => {
    return axios.get('/users')
    .then((response: AxiosResponse) => set_top_ten_users(response.data))
    .catch((err: AxiosError) => console.error(err));
  }

  const loginSubmitHandler = (e: FormEvent): void => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    console.log(target.children);
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
      <Div>
        <Router>
          <Switch>
          <Route path="/" exact/>
          <Route path="/signUp" component={SignUpForm} />
          <Route path="/login">
            <LoginForm submitHandler={loginSubmitHandler} handleChange={handleUserNameChange}/>
          </Route>
          <Route path="/signup">
              <SignUpForm submitHandler={signUpSubmitHandler} handleChange={handleUserNameChange}/>
          </Route>
          </Switch>
        </Router>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
        <GlobalStyle />
        <Greeting>{`Hello, ${user_name}`}</Greeting>
        <Counter>{global_clicks}</Counter>
        <h3><b>{`${user_name}: ${user_clicks}`}</b></h3>
        <Button onClick={buttonClickHandler}>Click Me!</Button>
      </Div>
      <TopTenUsers users={top_ten_users} />
    </>
  );
}


export default App;
