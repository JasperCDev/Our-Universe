import styled from 'styled-components';


export const TopUsersDiv = styled.div`
  /* border-left: 0.0625rem solid white; */
  width: 25vw;
  height: 90vh;
  overflow: scroll;
  font-weight: bold;
  font-size: 1rem;
  top: 0;
  color: white;
  overflow: visible;
  margin-right: 4rem;

`;

export const TopUsersTitle = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
`;


export const TopUserContainer = styled.div<{ active: boolean; }>`
  font-size: 1rem;
  padding: 10px;
  font-weight: bold;
  position: relative;
  display: flex;
  margin: 1rem 0;
  background-color: ${({ active }) => active ? 'rgba(0, 255, 175, 0.1)' : 'rgba(0,0,0,0)'};
  align-items: center;
  flex-direction: row;
  transition: all .3s ease-in-out;
  cursor: pointer;
  border: 0.07rem solid white;
  width: 100%;
  &:hover {
    transform: scale(1.05) translateX(5%);
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
  font-size: 1.2rem;
  color: ${({ hovered }) => !hovered ? 'lightblue' : 'navy'};
  transition: all .3s ease-in-out;
`;

export const UserOnlineTag = styled.span<{ online: boolean }>`
  font-size: 0.9rem;
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
  font-size: 0.9rem;
  color: ${({ active }) => active ? 'red' : 'grey'};
  @media (max-width: 1500px) {
    display: block;
    text-align: center;
  }

`;

export const UserClicks = styled.p`
  font-family: monospace;
  font-weight: 300;
  font-size: 1rem;
`;
