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

export const UserDeityContainer = styled.div <{ red: number; green: number; blue: number; }>`
  height: 25rem;
  width: 25rem;
  margin: 7rem 0 0 0;
  grid-row-start: 1;
  grid-row-end: 3;
  justify-self: bottom;
  border-radius: 50%;
  border: 0.07rem solid ${({ red, green, blue }) => `rgb(${red}, ${green}, ${blue})`};
  background-color: ${({ red, green, blue }) => `rgba(${red}, ${green}, ${blue}, 0.1)`};
  padding: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: all 1s ease-in-out;
  position: relative;
  z-index: 1000;
`;

export const UserDeityDiv = styled.div<{ red: number; green: number; blue: number; }>`
  border-radius: 50%;
  background-color: ${({ red, green, blue }) => `rgb(${red}, ${green}, ${blue})`};
  height: 5rem;
  width: 5rem;
  /* border: 0.3rem solid ${({ red, green, blue }) => `rgb(${red - 20}, ${green - 20}, ${blue - 20})`}; */
  margin: 4rem auto 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  transition: all 1s ease-in-out;
  animation: ${pulse} 2s ease-in-out;
`;


const animateUp = (translateDistance: number, size: number) => keyframes`
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(calc(${translateDistance}px - ${size}rem));
    }
`;

export const UserDeityEnergyBallDiv = styled.div<{ translateDistance: number; red: number; green: number; blue: number; size: number; top: number; left: number;}>`
  background-color: ${({ red, green, blue }) => `rgba(${red}, ${green}, ${blue}, 1)`};
  height: ${({ size }) => size + 'rem'};
  width: ${({ size }) => size + 'rem'};
  border-radius: 50%;
  position: absolute;
  top: ${({ top, size }) => `calc(${top}px - ${size * 6}rem)`};
  left: ${({ left, size }) => `calc(${left}px - ${size / 2}rem)`};
  margin: 0 auto;
  transform: translateZ(-100px);
  opacity: 0.9;
  /* top: ${({ size }) => (-7.5 - size) + 'rem'}; */
  z-index: -1;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: 0.0625rem solid white;
  font-size: ${({ size }) => (size * 8) + 'px'};
  animation: ${({ translateDistance, size }) => animateUp(translateDistance, size)} ${({ translateDistance }) => Math.floor(Math.abs(translateDistance) / 100)}s linear;
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
    border: none;
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

