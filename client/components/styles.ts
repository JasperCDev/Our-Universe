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
    background-color: #d7ffd6;
    font-family: Courier;
  }
`;

export const All = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

export const Main = styled.div`
  width: 85vw;
  height: 100%;
  position: relative;
`;


export const Header = styled.div`
  background-color: #57d46a;
  height: 8vh;
  border-bottom: 1px solid black;
  display: flex;
  font-size: 1.5em;
  font-weight: bold;
`;

export const UserProfile = styled.div`
  border: 1px solid black;
  width: 20vw;
`;

export const Links = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

// export const NavLinks = styled.p`

// `;



export const Counter = styled.h1`
  font-size: 8em;
  margin: 0;
  text-align: center;
  margin-top: 0.5em;
  margin-bottom: 10vh;
`;

export const Greeting = styled.h2`
  font-size: 2.5em;
  text-align: center;
  margin-top: 1em;
`;

export const UserClicksSubheading = styled.h3`
  font-weight: bold;
  text-align: center;
  font-size: 2em;
`;

// export const ButtonDiv = styled.div`
//   border: 3px solid black;
  // height: 6em;
  // width: 14em;
//   cursor: pointer;
//   border-radius: 20%;
//   background: transparent;
//   margin: 0 auto;
//   margin-top: 2em;
// `;


// export const Button = styled.button`
//   font-size: 1.7em;
//   width: 100%;
//   height: 100%;
//   border: 10px solid royalblue;
//   border-radius: 20%;
//   display: block;
//   margin: 0 auto;
//   background-color: royalblue;
//   :focus {
//     outline:0;
//   }
//   :active {
//     border-style: outset;
//     background-color: #7100a6;
//     letter-spacing: 1;
//   }
// `;


export const BigButton = styled(Button)`
  && {
    font-size: 1.7em;
    border: 1px solid black;
    display: block;
    margin: 0 auto;
    top: 20vh;
    height: 6em;
    width: 14em;
    position: relative;
    background-color: #59e3ff;
    &:focus {
      outline:0;
    }
    &:hover {
      background-color: #59e3ff;
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
// export const ScrollUpForm = keyframes`
//   0% { background-color: lightgrey; }
//   100% { background-color: black; }
// `;

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
`;

export const TopUsersDiv = styled.div`
  padding-top: 1em;
  border: 1px solid black;
  width: 30vw;
  height: 100vh;
  overflow: scroll;
  font-weight: bold;
  font-size: 1.5em;
  top: 0;
`;

export const TopUser = styled.p`
  font-size: 1em;
  padding: 10px;
  font-weight: bold;
`;

export const UserClicks = styled.p`
  font-family: monospace;
  font-weight: 300;
  font-size: 0.9em;
`;
