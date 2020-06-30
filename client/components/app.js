import React from 'react';
import $ from 'jquery';
import { GlobalStyle, Div, Counter, Greeting, Button } from './styles';

import UserForm from './userForm';
import TopTenUsers from './topTenUsers';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      sessionTotal: 0,
      userName: '',
      userTotal: 0,
      userSessionTotal: 0,
      formSubmitted: false,
      login: true,
      topTenUsers: [],
    };
  }

  componentDidMount() {
    this.getGlobalTotal();
    this.getTopTenUsers();
    setInterval(() => this.counterLifeCycle(), 5000);
  }

  counterLifeCycle = () => {
    this.updateGlobalTotal()
    .then(this.getGlobalTotal)
    .then(this.updateUserTotal)
    .then(this.getTopTenUsers);
  }

  getGlobalTotal = () => {
    return $.ajax('/total', {
      method: 'GET',
      success: (response) => {
        this.setState({
          total: response.total,
          sessionTotal: 0,
        });
      },
      error: (err) => console.error(err)
    });
  }

  updateGlobalTotal = () => {
    //if (!this.state.sessionTotal) return new Promise(() => {});
    return $.ajax('/total', {
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({total: this.state.sessionTotal}),
      dataType: 'json',
      success: (response) => {},
      error: (err) => console.error(err)
    });
  }

  registerUser = (userName) => {
    return $.ajax('/user', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({"userName": `${userName}`}),
      dataType: 'json',
      success: (response) => {
        console.log(response);
        if (response.message === `user ${userName} already exists!`) {
          alert(response.message);
        } else {
          this.setState({
            userName: response.userName,
            formSubmitted: true,
          });
        }
      },
      error: (err) => console.error(err),
    });
  }

  logInUser = (userName) => {
    return $.ajax(`/user?u=${userName}`, {
      method: 'GET',
      success: (response) => {
        if (response.message) {
          alert(response.message);
        } else {
          this.setState({
            userName: response.username,
            userTotal: response.total,
            formSubmitted: true,
          });
        }
      },
      error: (err) => console.error(err),
    });
  }

  updateUserTotal = ()  => {
    //if (!this.state.userSessionTotal) return new Promise(() => {});
    return $.ajax('/user', {
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ userName: this.state.userName, userSessionTotal: this.state.userSessionTotal, }),
      dataType: 'json',
      success: () => {
        this.setState({
          userSessionTotal: 0,
        })
      },
      error: (err) => console.error(err),
    });
  }

  getTopTenUsers = () => {
    return $.ajax('/users?n=10', {
      method: 'GET',
      success: (response) => {
        this.setState({
          topTenUsers: response,
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
      total: prevState.total + 1,
      sessionTotal: prevState.sessionTotal + 1,
      userTotal: prevState.userTotal + 1,
      userSessionTotal: prevState.userSessionTotal + 1,
    }));
  }

  toggleLogin = (e) => {
    this.setState((prevState) => ({
      login: !prevState.login,
    }));
  }

  render() {
    const { total, userName, userTotal, sessionTotal, formSubmitted, login, topTenUsers } = this.state;
    if (!formSubmitted) {
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
            <Greeting>{`Hello, ${userName}`}</Greeting>
            <Counter>{total}</Counter>
            <h3><b>{`${userName}: ${userTotal}`}</b></h3>
            <Button onClick={this.buttonClickHandler}>Click Me!</Button>
          </Div>
          <TopTenUsers users={topTenUsers} />
        </>
      );
    }
  }
}


export default App;
