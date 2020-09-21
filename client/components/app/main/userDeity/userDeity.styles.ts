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
  height: 25rem;
  width: 25rem;
  margin: 7rem 0 0 0;
  grid-row-start: 1;
  grid-row-end: 3;
  justify-self: bottom;
  border-radius: 50%;
  border: 0.07rem solid ${({ hue, saturation, lightness }) => `hsl(${hue}, ${saturation}%, ${lightness}%)`};
  padding: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: border 1s ease-in-out;
`;

export const UserDeityDiv = styled.div<{ hue: number; saturation: number; lightness: number; }>`
  border-radius: 50%;
  background-color: ${({ hue, saturation, lightness }) => `hsl(${hue}, ${saturation}%, ${lightness}%)`};
  height: 5rem;
  width: 5rem;
  margin: 4rem auto 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  transition: background-color 1s ease-in-out;
`;


const animateUp = (translateDistance: number, size: number) => keyframes`
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(calc(${translateDistance}px - ${size / 4}rem));
    }
`;

export const UserDeityEnergyBallDiv = styled.div<{ translateDistance: number; hue: number; saturation: number; lightness: number; size: number}>`
  background-color: ${({ hue, saturation, lightness }) => `hsl(${hue}, ${saturation}%, ${lightness}%)`};
  height: ${({ size }) => size + 'rem'};
  width: ${({ size }) => size + 'rem'};
  border-radius: 50%;
  position: absolute;
  top: ${({ size }) => (-8.5 - size) + 'rem'};
  border: 0.07rem solid white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: ${({ size }) => (size * 8) + 'px'};
  animation: ${({ translateDistance, size }) => animateUp(translateDistance, size)} ${({ translateDistance }) => 4 - Math.floor(Math.abs(translateDistance) / 100)}s linear;
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

