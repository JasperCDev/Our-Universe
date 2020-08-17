import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { removeSpecialCharactersFromString } from '../helpers';

const Username = styled.p.attrs((props) => ({
  'data-valid': true,
}))`
  display: inline-block;
  padding-left: 8px;
  cursor: pointer;
  &:focus {
    border: 3px solid ${(props) => props['data-valid'] ? '#00c750' : '#ff1500'};
    background-color: ${(props) => props['data-valid'] ? '#3afca8' : '#fc4a3a'};
    letter-spacing: 4;
  }
`;

interface Props {
  user_name: string;
  changeHandler: (e: any, setter: React.Dispatch<React.SetStateAction<boolean>>) => void;
  submitHandler: (e: any, setter: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

const UsernameForm: FC<Props> = ({ user_name, changeHandler, submitHandler }) => {
  const [valid, set_valid] = useState(true);

  return (
    <Username
      contentEditable={true}
      data-valid={valid}
      max={30}
      onInput={(e) => changeHandler(e, set_valid)}
      onKeyDown={(e: KeyboardEvent) => {
        let text = removeSpecialCharactersFromString((e.target! as HTMLParagraphElement).innerHTML);
        console.log(text, text.length);
        if (e.keyCode === 13) {
          e.preventDefault();
        }
        if (text.length >= 20) {
          console.log('text.length >= 20')
          if (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 37 && e.keyCode !== 39) {
            e.preventDefault();
          }
        }
      }}
      onBlur={(e: any) => submitHandler(e, set_valid)}
      spellCheck='false'
    >
      {user_name}
    </Username>
  )
};


export default UsernameForm;
