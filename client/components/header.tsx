import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { numberToCommaSeperatedString } from './helpers';
import { useCountUp } from 'use-count-up';

const HeaderTag = styled.header`
  height: 10vh;
  background-color: #1d2636;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  grid-column-start: 1;
  grid-column-end: 3;
  flex-direction: column;
`;

interface Props {
  global_clicks: number;
  previous_global_clicks: number;
}

const Header: React.FC<Props> = ({ global_clicks, previous_global_clicks }) => {
  const { value } = useCountUp({
    start: previous_global_clicks,
    end: global_clicks,
    duration: 3,
    isCounting: true,
    autoResetKey: previous_global_clicks,
    thousandsSeparator: ',',
    easing: 'linear'
  });

  return (
    <HeaderTag>
      <h4>Journey to Create the Universe</h4>
      <h6>{value}</h6>
    </HeaderTag>
  );
}

export default Header;
