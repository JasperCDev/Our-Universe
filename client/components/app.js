import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import { GlobalStyle, Div, Counter, Button } from './styles';

import UserForm from './userForm';
import TopTenUsers from './topTenUsers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      sessionTotal: 0,
      userName: 'anonymous',
      userTotal: 0,
      formSubmitted: false,
      login: true,
    };
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.putTotal = this.putTotal.bind(this);
    this.userFormSubmitHandler = this.userFormSubmitHandler.bind(this);
    this.postUser = this.postUser.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  componentDidMount() {
    this.getTotal();
    setInterval(() => this.putTotal(), 5000);
  }

  getTotal() {
    $.ajax('/total', {
      method: 'GET',
      success: (result) => {
        console.log(`new number: ${result.total}`);
        this.setState({
          total: result.total,
          sessionTotal: 0,
        });
      },
      error: (err) => console.error(err)
    });
  }

  putTotal() {
    if (!this.state.sessionTotal) {
      this.getTotal();
      return;
    }
    $.ajax('/total', {
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({total: this.state.sessionTotal}),
      dataType: 'json',
      success: (result) => {
        console.log(`Saved ${this.state.sessionTotal}`);
        this.getTotal();
      },
      error: (err) => console.error(err)
    });
  }

  postUser(userName) {
    $.ajax('/user', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({userName: userName}),
      dataType: 'json',
      success: (result) => {
        console.log(result);
        this.setState({
          userName: userName,
          formSubmitted: true,
        });
      },
      error: (err) => console.error(err),
    });
  }

  getUser(userName) {
    $.ajax('/user', {
      method: 'GET',
      contentType: 'application/json',
      data: JSON.stringify({userName: userName}),
      dataType: 'json',
      success: (result) => {
        this.setState({
          userName: userName,
          formSubmitted: true,
        });
      },
      error: (err) => console.error(err),
    });
  }

  userFormSubmitHandler(e) {
    e.preventDefault();
    if (this.state.login) {
      this.postUser(e.target.value);
    } else {
      this.postUser(e.target[0].value);
    }
  }

  buttonClickHandler() {
    this.setState((prevState) => ({
      total: prevState.total + 1,
      sessionTotal: prevState.sessionTotal + 1,
    }));
  }

  toggleLogin(e) {
    this.setState((prevState) => ({
      login: !prevState.login,
    }));
  }

  render() {
    const { total, sessionTotal, formSubmitted, login } = this.state;
    return (
      <Div>
        <GlobalStyle />
        {
          formSubmitted ?
          <></> :
          <UserForm submitHandler={this.userFormSubmitHandler} toggleLogin={this.toggleLogin} login={login} />
        }
        <Counter>{total}</Counter>
        <Button onClick={this.buttonClickHandler}>Click Me!</Button>
      </Div>
    )
  }
}

export default App;
