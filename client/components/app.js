import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import { GlobalStyle, Div, Counter, Button } from './styles'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      sessionTotal: 0,
    };
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.putTotal = this.putTotal.bind(this);
  }

  componentDidMount() {
    this.getTotal();
    setInterval(() => this.putTotal(), 5000);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
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
      dataType: "json",
      success: (result) => {
        console.log(`Saved ${this.state.sessionTotal}`)
        this.getTotal();
      },
      error: (err) => console.error(err)
    });
  }

  buttonClickHandler() {
    this.setState((prevState) => ({
      total: prevState.total + 1,
      sessionTotal: prevState.sessionTotal + 1,
    }));
  }

  render() {
    const { total, sessionTotal } = this.state;
    return (
        <Div>
          <GlobalStyle />
          <Counter>{total}</Counter>
          <Button onClick={this.buttonClickHandler}>Click Me!</Button>
        </Div>
    )
  }
}

export default App;