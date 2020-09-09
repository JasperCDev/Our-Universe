import styled, { keyframes } from 'styled-components';
import { Button } from '@material-ui/core';


const pulse = keyframes`
	0% {
		transform: scale(1);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 2);
	}

	60% {
		transform: scale(1.2);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(1);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
`;

export const UserDeityContainer = styled.div`
  height: 20rem;
  width: 25rem;
  flex-direction: column;
  margin: 3rem 0 0 0;
  border: 1px solid lightblue;
`;

export const UserDeityDiv = styled.div`
  border-radius: 50%;
  background-color: lightblue;
  height: 5vh;
  width: 5vh;
  margin: 2rem auto;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: ${pulse} 2s infinite;
`;

export const UserClicksSubheading = styled.h3`
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
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
    background-color: lightblue;
    transition: all .2s ease-in-out;
    &:hover {
      background-color: aqua;
    }
    &:active {
      transform: scale(1.2);
    }
  }
`;


