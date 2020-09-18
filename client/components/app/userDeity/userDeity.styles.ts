import styled, { keyframes } from 'styled-components';
import { Button } from '@material-ui/core';

const generateRandomColor = () => {
  const randomHex = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + randomHex;
}


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
  background-color: lightblue;
  height: 5rem;
  width: 5rem;
  margin: 2rem auto;
  position: relative;
  /* animation: ${pulse} 5s linear infinite; */
  border: 0.07rem solid lightblue;
  display: flex;
  justify-content: center;
  z-index: 1000;
  /* align-items: center; */
`;


const animateUp = (translateDistance: number) => keyframes`
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(${translateDistance}px);
    }
`;

export const UserDeityEnergyBallDiv = styled.div<{ translateDistance: number, color: string }>`
  background-color: ${({ color }) => '#' + color};
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  margin: 0 auto;
  position: absolute;
  border: 1px solid white;
  top: -1rem;
  /* top: 0; */
  animation: ${({ translateDistance }) => animateUp(translateDistance)} 2s linear;
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


