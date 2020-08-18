import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Button } from "@material-ui/core";

const textColor = '#0e007a';

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
    background-color: rgb(217, 228, 245);
    font-family: Courier;
    color: ${textColor};
  }
`;

export const All = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const Main = styled.div`
  width: 50vw;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  margin: auto;
  min-width: 80%;
  min-height: 80%;
  display: grid;
  grid-template-columns: 1fr;
`;

export const GreetingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 3em;
`;

export const Greeting = styled.h2`
  font-size: 3.5em;
  text-align: center;
  /* color: #5f7bc9; */
  font-weight: bold;
  font-family: Helvetica, sans-serif;
  padding-right: 10px;
`;

export const UserNameFormMessage = styled.h4`
  padding-top: 10px;
  color: ${(props) => props['data-valid'] === 'true' ? 'green' : 'red'};
  font-weight: bold;
  text-align: center;
`;

export const UserClicksSubheading = styled.h3`
  font-weight: bold;
  text-align: center;
  font-size: 2em;
  margin-bottom: 2em;
  color: black
`;

export const BigButtonContainer = styled.div`

`;

export const BigButton = styled(Button)`
  && {
    color: white;
    font-size: 1.7em;
    border: 3px solid ${textColor};
    display: block;
    margin: 0 auto;
    height: 5em;
    width: 12em;
    position: relative;
    animation-duration: 1s;
      animation-name: BigButtonAnimation;
      animation-iteration-count: 1;
      background-color: ${textColor};
    &:focus {
      outline:0;
    }
    &:hover {
      background-color: ${textColor};
    }
    &:active {
      border-style: outset;
      letter-spacing: 1;
      -webkit-transition: transform 0.1s ease-in-out;
      transform: scale(1.1);
    }
  }
`;


export const BigButtonAnimation = keyframes`
  0%: { width: 14em };
  50% { width: 17em };
  100% { width: 14em };
`;
