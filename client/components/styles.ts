import styled, { createGlobalStyle } from 'styled-components';

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
    background-color: light grey;
  }

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: lightcyan;
    font-family: Courier;
  }
`;

export const All = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
`;

export const Main = styled.div`
  width: 85vw;
  height: 100%;
`;


export const Header = styled.div`
  background-color: slateblue;
  height: 8vh;
  border-bottom: 3px solid darkblue;
  display: flex;
  font-size: 1.5em;
  font-weight: bold;
  color: black;
`;

export const UserProfile = styled.div`
  border: 1px solid black;
  width: 20vw;
`;

export const Links = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: black;
`;

export const NavLinks = styled.p`

`;



export const Counter = styled.h1`
  font-size: 7em;
  color: darkblue;
  margin: 0;
  text-align: center;
  margin-top: 0.5em;
`;

export const Greeting = styled.h2`
  font-size: 2.5em;
  color: teal;
  text-align: center;
  margin-top: 1em;
`;

export const UserClicksSubheading = styled.h3`
  font-weight: bold;
  text-align: center;
  font-size: 2em;
`;

export const Button = styled.button`
  font-size: 1.7em;
  height: 6em;
  width: 14em;
  cursor: pointer;
  border: 1px solid darkblue;
  border-radius: 5%;
  display: block;
  margin: 0 auto;
  margin-top: 2em;
  background-color: slateblue;
  :focus {
    outline:0;

  }
  :active {
    border-style: outset;
    background-color: royalblue;
    letter-spacing: 1;
  }
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
  border: 2px solid darkblue;
  width: 30vw;
  height: 100vh;
  overflow: scroll;
  font-weigth: bold;
  font-size: 1.5em;
  top: 0;
`;

export const TopUser = styled.p`
  font-size: 1em;
  padding: 10px;
  font-weight: bold;
`;
