import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const UserPlanetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  height: 20rem;
  width: 30rem;
  margin-top: 1rem;
`;

export const UserPlanetDivContainer = styled.div<{ planetSize: number }>`
  height: ${({ planetSize }) => planetSize + 'rem'};
  width: ${({ planetSize }) => planetSize + 'rem'};
  background-color: black;
  border-radius: 50%;
  opacity: 1;
  position: relative;
`;


export const UserPlanetDiv = styled.div<{ planetSize: number; red: number; green: number; blue: number; }>`
  border-radius: 50%;
  background: ${({ red, green, blue }) => `linear-gradient(to right, rgba(${red}, ${green}, ${blue}, 1), rgba(${red}, ${green}, ${blue}, 0.05))`};
  height: ${({ planetSize }) => planetSize + 'rem'};
  width: ${({ planetSize }) => planetSize + 'rem'};
  animation: ${rotate} 8s linear infinite;
  position: relative;
  z-index: 10;
  box-shadow: ${({ planetSize }) => (planetSize * 2) + 'px'} ${({ red, green, blue }) => `rgba(${red}, ${green}, ${blue}, 1)`};
`;

export const UniverseName = styled.h1`
  font-size: 1.5rem;
`;

export const Counter = styled.h1`
  margin-bottom: 1.3rem;
  font-size: 1rem;
  text-align: center;
  color: #f0f0f0;
`;

