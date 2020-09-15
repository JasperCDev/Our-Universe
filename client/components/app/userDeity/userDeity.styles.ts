import styled, { keyframes } from 'styled-components';
import { Button } from '@material-ui/core';


const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export const UserDeityContainer = styled.div`
  height: 20rem;
  width: 25rem;
  margin: 3rem 0 0 0;
  grid-row-start: 1;
  grid-row-end: 3;
  justify-self: bottom;
  border: 1px solid lightblue;
`;

export const UserDeityDiv = styled.div`
  border-radius: 50%;
  background: rgb(255,170,0);
  background: linear-gradient(90deg, rgba(255,170,0,1) 0%, rgba(241,255,0,1) 91%, rgba(254,255,189,1) 100%, rgba(252,252,252,1) 100%);
  height: 5vh;
  width: 5vh;
  margin: 2rem auto;
  animation: ${pulse} 5s linear infinite;
  border: 0.07rem solid lightblue;
`;

export const UserDeityEnergyBall = styled.div`
  background: rgb(255,170,0);
  background: linear-gradient(90deg, rgba(255,170,0,1) 0%, rgba(241,255,0,1) 91%, rgba(254,255,189,1) 100%, rgba(252,252,252,1) 100%);
  height: 1vh;
  width: 1vh;
  border-radius: 50%;
  margin: auto;
  display: none;
`;

export const UserNameFormMessage = styled.p<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: bold;
  text-align: center;
  font-size: 0.8rem;
  transition: all 0.2s ease-in-out;
  margin-bottom: 1rem;
`;

export const UserClicksSubheading = styled.h3`
  font-weight: bold;
  text-align: center;
  font-size: 0.8rem;
  margin-bottom: 2em;
  color: white;
`;

export const UserDeityButton = styled(Button)`
  && {
    color: black;
    font-size: 1rem;
    border: 0.3rem solid black;
    display: block;
    margin: 0 auto;
    height: 3rem;
    width: 10rem;
    position: relative;
    background-color: #ff6161;
    transition: all 1s ease-in-out;
    &:hover {
      background-color: darkred;
      color: white;
    }
    &:active {
      transform: scale(1.2);
    }
  }
`;


