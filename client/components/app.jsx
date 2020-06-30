import React from 'react';
import $ from 'jquery';
import { GlobalStyle, Div, Counter, Greeting, Button } from './styles';

import UserForm from './userForm.jsx';
import TopTenUsers from './topTenUsers.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      global_clicks: 0,
      session_clicks: 0,
      user_name: '',
      user_clicks: 0,
      user_session_clicks: 0,
      form_submitted: false,
      login: true,
      top_ten_users: [],
    };
  }

  componentDidMount() {
    this.getGlobalClicks();
    this.getTopTenUsers();
    setInterval(() => this.clicksLifeCycle(), 5000);
  }

  clicksLifeCycle = () => {
    this.updateGlobalClicks()
    .then(this.getGlobalClicks)
    .then(this.updateUserClicks)
    .then(this.getTopTenUsers);
  }

  getGlobalClicks = () => {
    return $.ajax('/global_clicks', {
      method: 'GET',
      success: (response) => {
        this.setState({
          global_clicks: response.rows[0].click_count,
          session_clicks: 0
        });
      },
      error: (err) => console.error(err)
    });
  }

  updateGlobalClicks = () => {
    //if (!this.state.session_clicks) return new Promise(() => {});
    console.log(this.state.session_clicks);
    return $.ajax('/global_clicks', {
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({"clicks": this.state.session_clicks}),
      success: (response) => {
        console.log('hererererererererererere')
      },
      error: (err) => console.error('errrrrrrrrrrrrr', err)
    });
  }

  registerUser = (user_name) => {
    return $.ajax('/user', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({"user_name": `${user_name}`}),
      success: (response) => {
        console.log(response);
        if (response === `User already exists`) {
          alert(response);
        } else {
          console.log(response);
          this.setState({
            user_name: response.user_name,
            form_submitted: true,
          });
        }
      },
      error: (err) => console.error(err),
    });
  }

  logInUser = (user_name) => {
    return $.ajax(`/user?u=${user_name}`, {
      method: 'GET',
      success: (response) => {
        if (response === 'That user does not exist') {
            alert(response);
        } else {
          this.setState({
            user_name: response.user_name,
            user_clicks: response.user_clicks,
            form_submitted: true,
          });
        }
      },
      error: (err) => console.error(err),
    });
  }

  updateUserClicks = ()  => {
    //if (!this.state.user_session_clicks) return new Promise(() => {});
    return $.ajax('/user', {
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ "user_name": this.state.user_name, "clicks": this.state.user_session_clicks, }),
      success: (response) => {
        console.log('here');
        this.setState({
          user_session_clicks: 0,
        });
      },
      error: (err) => console.error(err),
    });
  }

  getTopTenUsers = () => {
    return $.ajax('/users', {
      method: 'GET',
      success: (response) => {
        console.log('topTenUsers', response);
        this.setState({
          top_ten_users: response,
        });
      }
    });
  }

  userFormSubmitHandler = (e) => {
    e.preventDefault();
    if (this.state.login) {
      this.logInUser(e.target[0].value);
    } else {
      this.registerUser(e.target[0].value);
    }
  }

  buttonClickHandler = () => {
    this.setState((prevState) => ({
      global_clicks: prevState.global_clicks + 1,
      session_clicks: prevState.session_clicks + 1,
      user_clicks: prevState.user_clicks + 1,
      user_session_clicks: prevState.user_session_clicks + 1,
    }));
  }

  toggleLogin = (e) => {
    this.setState((prevState) => ({
      login: !prevState.login,
    }));
  }

  render() {
    const { global_clicks, user_name, user_clicks, session_clicks, form_submitted, login, top_ten_users } = this.state;
    if (!form_submitted) {
      return (
        <>
          <Div>
          <GlobalStyle />
          <UserForm submitHandler={this.userFormSubmitHandler} toggleLogin={this.toggleLogin} login={login} />
          </Div>
        </>
      )
    } else {
      return (
        <>
          <Div>
            <GlobalStyle />
            <Greeting>{`Hello, ${user_name}`}</Greeting>
            <Counter>{global_clicks}</Counter>
            <h3><b>{`${user_name}: ${user_clicks}`}</b></h3>
            <Button onClick={this.buttonClickHandler}>Click Me!</Button>
          </Div>
          <TopTenUsers users={top_ten_users} />
        </>
      );
    }
  }
}


export default App;
