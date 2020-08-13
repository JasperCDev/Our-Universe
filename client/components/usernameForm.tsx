import React, { FC, useState } from 'react';
import styled from 'styled-components';

const Username = styled.p`
  display: inline-block;
  background-color: ${(props) => props['data-valid'] ? 'green' : 'red'};
  &:focus {
    border: 1px solid black;
  }
`;

interface Props {
  user_name: string;
  changeHandler: (e: any, setter: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

const UsernameForm: FC<Props> = ({ user_name, changeHandler }) => {
  const [valid, set_valid] = useState(true);
  const [editing, set_editing] = useState(false);

  return (
    <Username
      contentEditable={true}
      data-valid={valid}
      data-editing={false}
      onInput={(e) => changeHandler(e, set_valid)}
      onFocus={(e) => set_editing(!editing)}
    >
      {user_name}
    </Username>
  )
};

export default UsernameForm;
