import styled from 'styled-components';


export const TopUsersDiv = styled.div`
  padding-top: 1em;
  border-left: 0.0625rem solid white;
  width: 25vw;
  height: 90vh;
  overflow: scroll;
  font-weight: bold;
  font-size: 1.5em;
  top: 0;
  color: white;
  overflow: hidden;
`;

export const TopUser = styled.p`
  font-size: 1em;
  padding: 10px;
  font-weight: bold;
  position: relative;
  display: block;
  &:hover {
    transform: scale(1.2);
    padding-left: 50px;
    transition: all .3s ease-in-out;
    background-color: lightgreen;
  }
`;

export const UserClicks = styled.p`
  font-family: monospace;
  font-weight: 300;
  font-size: 0.9em;
`;
