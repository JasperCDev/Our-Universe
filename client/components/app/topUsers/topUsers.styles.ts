import styled from 'styled-components';


export const TopUsersDiv = styled.div`
  padding-top: 1em;
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
  padding-bottom: 1rem;
`;


export const TopUserContainer = styled.div`
  font-size: 1.5rem;
  padding: 10px;
  font-weight: bold;
  position: relative;
  display: flex;
  margin: 1rem 0;
  /* justify-content: center; */
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
`;

export const UserId = styled.span`
  color: inherit;
  font-weight: normal;
  font-size: 0.7rem;
  padding-left: 0.2rem;
  font-style: italic;
  color: white;
`;

export const UserClicks = styled.p`
  font-family: monospace;
  font-weight: 300;
  font-size: 0.9em;
`;
