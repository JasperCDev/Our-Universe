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
const pulse = keyframes`
	0% {
		transform: scale(1);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
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

export const MainDeityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20rem;
  width: 20rem;
`;

export const MainDeityDiv = styled.div`
  border-radius: 50%;
  background-color: yellow;
  height: 3vh;
  width: 3vh;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: ${pulse} 2s infinite;
`;

export const UniverseName = styled.h1`
  margin-bottom: 2rem;
  font-size: 3rem;
`;

export const Counter = styled.h1`
  margin-top: 2rem;
  font-size: 2rem;
  text-align: center;
  color: #f0f0f0;
`;

