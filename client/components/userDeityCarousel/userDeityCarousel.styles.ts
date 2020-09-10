import styled, { keyframes } from 'styled-components';
import { Button } from '@material-ui/core';


// const pulse = keyframes`
// 	0% {
// 		transform: scale(1);
// 	}

// 	60% {
// 		transform: scale(1.2);
// 	}

// 	100% {
// 		transform: scale(1);
// 	}
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

export const UserDeityContainer = styled.div`
  height: 20rem;
  width: 25rem;
  flex-direction: column;
  margin: 3rem 0 0 0;
  grid-row-start: 1;
  grid-row-end: 3;
  /* border: 1px solid lightblue; */
`;

export const UserDeityDiv = styled.div`
  border-radius: 50%;
  background: rgb(0,61,255);
  background: linear-gradient(90deg, rgba(0,61,255,1) 0%, rgba(81,0,255,1) 0%, rgba(65,76,168,1) 0%, rgba(135,247,251,1) 69%, rgba(0,212,255,1) 100%);
  height: 5vh;
  width: 5vh;
  margin: 2rem auto;
  animation: ${pulseAndSpin} 5s linear infinite;
`;

export const UserNameFormMessage = styled.p`
  color: ${(props) => props['data-color']};
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
    transition: all .2s ease-in-out;
    &:hover {
      background-color: darkred;
      color: white;
    }
    &:active {
      transform: scale(1.2);

    }

    &:active ${UserDeityDiv} {
      transform: scale(1.5);
      transition: transform 0.3s ease-in-out;
    }
  }
`;


