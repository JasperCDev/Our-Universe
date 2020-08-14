import React, { FC, useState } from 'react';
import styled from 'styled-components';

const Username = styled.p`
  display: inline-block;
  &:focus {
    border: 3px solid ${(props) => props['data-valid'] ? '#00c750' : '#ff1500'};
    background-color: ${(props) => props['data-valid'] ? '#3afca8' : '#fc4a3a'};
    letter-spacing: 4;
  }
`;

interface Props {
  user_name: string;
  changeHandler: (e: any, setter: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

const UsernameForm: FC<Props> = ({ user_name, changeHandler }) => {
  const [valid, set_valid] = useState(true);

  return (
    <Username
      contentEditable={true}
      data-valid={valid}
      max={30}
      onInput={(e) => changeHandler(e, set_valid)}
      onKeyDown={(e: KeyboardEvent) => {
        const text = (e!.target! as HTMLParagraphElement).innerHTML;
        console.log(text, text.length);
        if (e.keyCode === 13) {
          e.preventDefault();
        }
        if (text.length >= 20) {
          if (e.keyCode !== 8 && e.keyCode !== 46) {
            e.preventDefault();
          }
        }
      }}
      spellcheck={false}
    >
      {user_name}
    </Username>
  )
};

export default UsernameForm;
