import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Button } from "@material-ui/core";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f2f2f2;
    font-family: Courier;
    color: #5e5e5e;
  }
`;

export const All = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  border: 5px solid #5f7bc9;
`;

export const Main = styled.div`
  width: 75vw;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  margin: auto;
  /* background-color: #bbeafa; */
  min-width: 40em;
  min-height: 50em;
`;

export const Counter = styled.h1`
  font-size: 6.5em;
  margin: 0;
  text-align: center;
  margin-top: 0.5em;
  margin-bottom: 5vh;
  color: #001a69;
`;

export const Greeting = styled.h2`
  font-size: 2em;
  text-align: center;
  margin-top: 1em;
  color: #5f7bc9;
  font-weight: bold;
  font-family: Helvetica, sans-serif;
`;

export const UserNameFormMessage = styled.h4`
  padding-top: 10px;
  color: ${(props) => props['data-valid'] ? 'green' : 'red'};
  font-weight: bold;
  text-align: center;
`;

export const UserClicksSubheading = styled.h3`
  font-weight: bold;
  text-align: center;
  font-size: 2em;
`;

export const BigButton = styled(Button)`
  && {
    color: white;
    font-size: 1.7em;
    border: 1px solid black;
    display: block;
    margin: 0 auto;
    top: 5vh;
    height: 6em;
    width: 14em;
    position: relative;
    background-color: #cc5050;
    &:focus {
      outline:0;
    }
    &:hover {
      background-color: #cc5050;
    }
    &:active {
      border-style: outset;
      letter-spacing: 1;
      animation-duration: 1s;
      animation-name: BigButtonAnimation;
      animation-iteration-count: 1;
    }
  }
`;

export const BigButtonAnimation = keyframes`
  0% { width: width: 14em; height: 6em; }
  50% { width: width: 17em; height: 7em; }
  100% { width: width: 14em; height: 6em; }
`;