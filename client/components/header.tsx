import React from 'react';
import styled from 'styled-components';

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
`;


const Header: React.FC = () => {
  return (
    <HeaderTag>
      Journey to Create the Universe
    </HeaderTag>
  );
}

export default Header;
