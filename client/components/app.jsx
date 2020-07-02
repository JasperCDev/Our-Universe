import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { GlobalStyle, Div, Counter, Greeting, Button } from './styles';

import UserForm from './userForm.jsx';
import TopTenUsers from './topTenUsers.jsx';


const App = () => {
  const [global_clicks, set_global_clicks] = useState(0);
  const [session_clicks, set_session_clicks] = useState(0);
  const [user_name, set_user_name] = useState('');
  const [user_clicks, set_user_clicks] = useState(0);
  const [user_session_clicks, set_user_session_clicks] = useState(0);
  const [form_submitted, set_form_submitted] = useState(false);
  const [login, set_login] = useState(true);
  const [top_ten_users, set_top_ten_users] = useState([]);

  useEffect(() => {
    getGlobalClicks();
    getTopTenUsers();
    setInterval(() => clicksLifeCycle(), 5000);
  });

  const clicksLifeCycle = () => {
    updateGlobalClicks()
    .then(getGlobalClicks)
    .then(updateUserClicks)
    .then(getTopTenUsers);
  }

  const getGlobalClicks = () => {
    return $.ajax('/global_clicks', {
      method: 'GET',
      success: (response) => {
        set_global_clicks(response.rows[0].click_count);
        set_session_clicks(0);
      },
      error: (err) => console.error(err)
    });
  }

  const updateGlobalClicks = () => {
    //if (!session_clicks) return new Promise(() => {});
    return $.ajax('/global_clicks', {
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({"clicks": session_clicks}),
      success: (response) => {},
      error: (err) => console.error(err)
    });
  }

  const registerUser = (user_name) => {
    return $.ajax('/user', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({"user_name": `${user_name}`}),
      success: (response) => {
        if (response === 'User already exists') {
          alert(response);
        } else {
          set_user_name(response.user_name);
          set_form_submitted(true);
        }
      },
      error: (err) => console.error(err),
    });
  }

  const logInUser = (user_name) => {
    return $.ajax(`/user?u=${user_name}`, {
      method: 'GET',
      success: (response) => {
        if (response === 'That user does not exist') {
            alert(response);
        } else {
          set_user_name(response.user_name);
          set_user_clicks(response.user_clicks)
          set_form_submitted(true);
        }
      },
      error: (err) => console.error(err),
    });
  }

  const updateUserClicks = ()  => {
    //if (!user_session_clicks) return new Promise(() => {});
    return $.ajax('/user', {
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ "user_name": user_name, "clicks": user_session_clicks, }),
      success: (response) => {
        set_user_session_clicks(0);
      },
      error: (err) => console.error(err),
    });
  }

  const getTopTenUsers = () => {
    return $.ajax('/users', {
      method: 'GET',
      success: (response) => {
        set_top_ten_users(response);
      }
    });
  }

  const userFormSubmitHandler = (e) => {
    e.preventDefault();
    if (login) {
      logInUser(e.target[0].value);
    } else {
      registerUser(e.target[0].value);
    }
  }

  const buttonClickHandler = () => {
    set_global_clicks(global_clicks + 1);
    set_session_clicks(session_clicks + 1);
    set_user_clicks(user_clicks + 1);
    set_user_session_clicks(user_session_clicks + 1);
  }

  const toggleLogin = (e) => set_login(!login);

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
