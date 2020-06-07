import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    background-color: light grey;
  }

  #app {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Div = styled.div`
  display: flex;
  width: 500px;
  height: 400px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
`;

export const Counter = styled.h1`
  font-size: 6em;
  padding: 0 auto;
  color: green;
`;

export const Button = styled.button`
  font-size: 1.7em;
  height: 6em;
  width: 10em;
  border-radius: 60%;
  cursor: pointer;
  border: 2px solid black;
  :focus {
    outline:0;
  }
  :active {
    border-style: outset;
    background-color: #037a82
  }
`;
