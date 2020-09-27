import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { numberToCommaSeperatedString } from './helpers';
import { useCountUp } from 'use-count-up';

const HeaderTag = styled.header`
  height: 5rem;
  background-color: #1d2636;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
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
      <h5>Journey to Create the Universe</h5>

      <h6 style={{ color: 'lightBlue' }}>{value}<span style={{ paddingLeft: '1rem', fontSize: '1rem', color: 'white'}}>atoms in the Universe</span></h6>
    </HeaderTag>
  );

}

export default Header;
