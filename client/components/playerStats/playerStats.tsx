import React from 'react';
import styled from 'styled-components';

export const PlayerStatsDiv = styled.div`
  padding-top: 1em;
  border: 1px solid black;
  width: 25vw;
  height: 100vh;
  overflow: scroll;
  font-weight: bold;
  font-size: 1.5em;
  top: 0;
  color: black;
  border-top: 0;
`;

const PlayerStats: React.FC = () => {
  return (
    <PlayerStatsDiv>
      <p>test</p>
    </PlayerStatsDiv>
  );
}

export default PlayerStats;
