import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Button } from "@material-ui/core";

const textColor = 'black';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    touch-action: manipulation;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background-color: black;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: Courier;
    color: white;
    display: grid;
    grid-template-columns: 4fr 1fr;
  }
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const GreetingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 3em;
  padding-top: 2rem;
`;

export const Greeting = styled.div`
  font-size: 3.5em;
  text-align: center;
  font-weight: bold;
  font-family: Helvetica, sans-serif;
  padding-right: 10px;
  height: 5rem;
  display:flex;
  margin: auto;
  width: 40rem;
  justify-content: center;
`;


