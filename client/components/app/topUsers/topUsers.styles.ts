import styled from 'styled-components';


export const TopUsersDiv = styled.div`
  width: 30vw;
  height: 90vh;
  font-weight: bold;
  font-size: 1rem;
  top: 0;
  color: white;
  overflow: visible;
  margin-right: 4rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

export const TopUsersTitle = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
`;

export const TopUserContainer = styled.div<{ active: boolean; }>`
  padding: 10px;
  font-weight: bold;
  position: relative;
  display: flex;
  margin: 10px auto;
  background-color: 'black';
  align-items: center;
  flex-direction: row;
  transition: all .3s ease-in-out;
  cursor: pointer;
  border: 0.07rem solid white;
  width: 85%;

  &:hover {
    transform: scale(1.05) translateX(-5%);
    background-color: rgba(64, 191, 255, 0.5);
    color: #dedede;
  }
`;

export const TopUser = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Place = styled.h4`
  font-size: 1.5rem;
  text-align: center;
`;

export const UsernameContainer = styled.div<{ hovered: boolean }>`
  font-size:  1.1rem;
  color: ${({ hovered }) => !hovered ? 'lightblue' : 'black'};
  transition: all .3s ease-in-out;
`;

export const UserOnlineTag = styled.span<{ online: boolean }>`
  font-size:  1.1rem;
  color: ${({ online }) => online ? 'lightgreen' : 'grey'};
  @media (max-width: 1200px) {
    display: block;
    text-align: center;
  }
`;

export const UserId = styled.span`
  color: inherit;
  font-weight: normal;
  font-size: 0.7rem;
  padding-left: 0.2rem;
  font-style: italic;
  color: white;
`;

export const UserActive = styled.span<{ active: boolean; }>`
  font-size: 1.1rem;
  color: ${({ active }) => active ? 'yellow' : 'grey'};
  @media (max-width: 1500px) {
    display: block;
    text-align: center;
  }
`;

export const UserClicks = styled.p`
  font-family: monospace;
  font-weight: 300;
  font-size: 1.1rem;
`;
