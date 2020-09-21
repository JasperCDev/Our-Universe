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

export const UserDeityContainer = styled.div <{ hue: number; saturation: number; lightness: number; }>`
  height: 20rem;
  width: 25rem;
  margin: 7rem 0 0 0;
  grid-row-start: 1;
  grid-row-end: 3;
  justify-self: bottom;
  border: 0.07rem solid ${({ hue, saturation, lightness }) => `hsl(${hue}, ${saturation}%, ${lightness}%)`};
  padding: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const UserDeityDiv = styled.div<{ hue: number; saturation: number; lightness: number; }>`
  border-radius: 50%;
  background-color: ${({ hue, saturation, lightness }) => `hsl(${hue}, ${saturation}%, ${lightness}%)`};
  height: 5rem;
  width: 5rem;
  margin: 0 auto 2rem auto;
  position: relative;
  display: flex;
  justify-content: center;
  transition: border 1s ease-in-out;
`;


const animateUp = (translateDistance: number) => keyframes`
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(${translateDistance}px);
    }
`;

export const UserDeityEnergyBallDiv = styled.div<{ translateDistance: number; hue: number; saturation: number; lightness: number; }>`
  background-color: ${({ hue, saturation, lightness }) => `hsl(${hue}, ${saturation}%, ${lightness}%)`};
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  position: absolute;
  top: -4rem;
  border: 0.07rem solid white;
  animation: ${({ translateDistance }) => animateUp(translateDistance)} ${({ translateDistance }) => Math.floor(Math.abs(translateDistance) / 100).toString()}s linear;
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
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: darkred;
      color: white;
    }
    &:active {
      transform: scale(1.2);
    }
  }
`;

