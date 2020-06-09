import styled, { createGlobalStyle, keyframes } from 'styled-components';

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
    overflow: hidden;
  }
`;

export const Div = styled.div`
  display: flex;
  width: 500px;
  height: 400px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

export const Counter = styled.h1`
  font-size: 6em;
  color: green;
  margin: 0;
`;

export const Greeting = styled.h2`
  font-size: 2.5em;
  color: teal;
  font-family: helvetica;
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
    background-color: lightblue;
  }
`;


export const FormDiv = styled.div`
  border: 2px solid darkgrey;
  height: 150%;
  width: 150%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: lightgrey;
  border-radius: 1%;
  animation-name: ${ScrollUpForm};
  animation-duration: 10s;
`;

export const ScrollUpForm = keyframes`
  0% { background-color: lightgrey; }
  100% { background-color: black; }
`;

export const TopTenUsersDiv = styled.div`
  border: 1px solid black;
  border-radius: 3%;
  width: 15em;
`;

export const TopUser = styled.p`
  padding-left: 1em;
  font-size: 1.2em;
`;
