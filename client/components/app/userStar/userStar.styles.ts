import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const MainDeityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  height: 20rem;
  width: 30rem;
  margin-top: 10vh;
`;

export const MainDeityDiv = styled.div<{ starSize: number }>`
  border-radius: 50%;
  background: linear-gradient(to right, red, blue);
  height: ${({ starSize }) => starSize + 'rem'};
  width: ${({ starSize }) => starSize + 'rem'};
  animation: ${rotate} 5s linear infinite;
  z-index: 100;
`;

export const UniverseName = styled.h1`
  font-size: 2rem;
`;

export const Counter = styled.h1`
  margin-bottom: 1rem;
  font-size: 1rem;
  text-align: center;
  color: #f0f0f0;
`;

