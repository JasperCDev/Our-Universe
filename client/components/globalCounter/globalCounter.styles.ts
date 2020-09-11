import styled, { keyframes } from 'styled-components';

// export const Header = styled.div`
//   height: 12vh;
//   width: 100vw;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #e0e0e0;
//   /* border-bottom: 3px solid black; */
// `;
const pulseAndSpin = keyframes`
  0% {
    transform-origin: center center;
    transform: rotate(-360deg) scale(1);
  }
  50% {
    transform-origin: center center;
    transform: rotate(-180deg) scale(1.2);
  }
  100% {
    transform-origin: center center;
    transform: rotate(0) scale(1);
  }
`;

export const MainDeityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20rem;
  width: 30rem;
`;

export const MainDeityDiv = styled.div`
  border-radius: 50%;
  background: rgb(255,0,0);
  background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,111,111,1) 25%, rgba(255,189,189,1) 54%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%);
  height: 3vh;
  width: 3vh;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: ${pulseAndSpin} 5s infinite;
  transition: transform 1s ease-in-out;
  &:active {
    transform: scale(1.5);
  }
`;

export const UniverseName = styled.h1`
  /* margin-bottom: 2rem; */
  font-size: 2rem;
`;

export const Counter = styled.h1`
  margin-bottom: 1rem;
  font-size: 1rem;
  text-align: center;
  color: #f0f0f0;
`;

