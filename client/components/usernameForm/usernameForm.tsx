import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { removeSpecialCharactersFromString, removeTagFromString } from '../helpers';

const Username = styled.h2.attrs((props) => {})`
  padding-left: 8px;
  cursor: pointer;
  width: 90%;
  margin: 0 auto;
  /* transition: letter-spacing color 1s ease-in-out; */
  transition: all 1s ease-in-out;
  border: 0.2rem solid black;
  &:hover {
    letter-spacing: 4;
    background-color: white;
    color: black;
  }
  &:focus {
    border-color: ${(props) => props['data-valid'] === 'true' ? '#00c750' : '#ff1500'};
    background-color: ${(props) => props['data-valid'] === 'true' ? '#3afca8' : '#fc4a3a'};
    letter-spacing: 4;
    color: black;
  }
`;

interface Props {
  user_name: string;
  changeHandler: (e: any, setter: React.Dispatch<React.SetStateAction<'true' | 'false'>>) => void;
  submitHandler: (e: any, setter: React.Dispatch<React.SetStateAction<'true' | 'false'>>) => void;
  handleUsernameFormFocus: () => void;
}

const UsernameForm: FC<Props> = ({ user_name, changeHandler, submitHandler, handleUsernameFormFocus }) => {
  const [valid, set_valid] = useState<'true' | 'false'>('true');


  return (
    <Username
      contentEditable={true}
      data-valid={valid}
      onInput={(e: InputEvent) => changeHandler(e, set_valid)}
      onFocus={handleUsernameFormFocus}
      onKeyDown={(e: KeyboardEvent) => {
        let text = removeTagFromString(removeSpecialCharactersFromString((e.target! as HTMLParagraphElement).innerHTML));
        if (e.keyCode === 13) {
          e.preventDefault();
        }
        if (text.length >= 18) {
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
