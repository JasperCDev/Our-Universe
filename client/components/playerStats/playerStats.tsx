import React from 'react';
import styled from 'styled-components';
import { idToStringWithZeroes, numberToCommaSeperatedString } from '../helpers';

export const PlayerStatsDiv = styled.div`
  padding-top: 1em;
  /* border: 3px solid black;
  border-top: 0;
  border-bottom: 0; */
  width: 25vw;
  height: 88vh;
  font-weight: bold;
  font-size: 1.5em;
  top: 0;
  color: black;
  border-top: 0;
  display: flex;

  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;

`;

export const Heading = styled.h2`
  text-align: center;
`;

export const Stat = styled.p`
  font-weight: bold;
  font-size: 1em;
  display: inline-block;
  padding: 20px 10px;
`;



interface Props {
  user_clicks: number;
  global_clicks: number;
  user_name: string;
  user_id: number;
}

const PlayerStats: React.FC<Props> = ({ user_name, user_clicks, user_id, global_clicks }) => {
  const globalContribution = (user_clicks / global_clicks * 100).toFixed(5);
  return (
    <PlayerStatsDiv>
      <Heading>Your Stats</Heading>
      <hr />
      <Stat>username: {user_name}</Stat>
      {/* <hr /> */}
      <Stat>user id: <p style={{display: 'inline-block'}}>#{idToStringWithZeroes(user_id)}</p></Stat>
      {/* <hr /> */}
      <Stat>clicks: {numberToCommaSeperatedString(user_clicks)}</Stat>
      {/* <hr /> */}
      <Stat>Level: 0</Stat>
      {/* <hr /> */}
      <Stat>global contribution: {globalContribution}%</Stat>
      {/* <hr /> */}
    </PlayerStatsDiv>
  );
}

export default PlayerStats;
