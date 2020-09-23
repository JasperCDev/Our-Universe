import styled from 'styled-components';


export const TopUsersDiv = styled.div`
  padding-top: 1em;
  border-left: 0.0625rem solid white;
  width: 25vw;
  height: 90vh;
  overflow: scroll;
  font-weight: bold;
  font-size: 1rem;
  top: 0;
  color: white;
  overflow: hidden;
`;

export const TopUser = styled.p`
  font-size: 1.5rem;
  padding: 10px;
  font-weight: bold;
  position: relative;
  display: block;
  &:hover {
    transform: scale(1.1);
    padding-left: 50px;
    transition: all .3s ease-in-out;
    background-color: lightblue;
    color: black;
  }
`;

export const UsernameContainer = styled.div<{ online: boolean }>`
  color: ${({ online }) => online ? 'green': 'inherit'};
`;

export const UserId = styled.span`
  color: inherit;
  font-weight: normal;
  font-size: 1rem;
  padding-left: 0.2rem;
`;

export const UserClicks = styled.p`
  font-family: monospace;
  font-weight: 300;
  font-size: 0.9em;
`;
