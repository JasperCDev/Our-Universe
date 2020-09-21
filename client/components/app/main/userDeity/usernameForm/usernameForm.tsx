import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { removeSpecialCharactersFromString, removeTagFromString, validateNewUsername } from '../../../../helpers';
import axios from 'axios';
import { UserNameFormMessage } from '../userDeity.styles';

const Username = styled.h2.attrs((props) => {})`
  padding-left: 8px;
  cursor: pointer;
  width: 90%;
  margin: 0 auto;
  text-align: center;
  transition: all 1s ease-in-out;
  border: 0.2rem solid black;
  &:hover {
    letter-spacing: 4;
    background-color: white;
    color: black;
  }
  &:focus {
    border-color: ${({ valid }) => valid ? '#00c750' : '#ff1500'};
    background-color: ${({ valid }) => valid ? '#3afca8' : '#fc4a3a'};
    letter-spacing: 4;
    color: black;
  }
`;

interface Props {
  user_name: string;
  set_user_name: React.Dispatch<React.SetStateAction<string>>;
  user_id: number;
}

const UsernameForm: FC<Props> = ({ user_name, set_user_name, user_id }) => {
  const [message, set_message] = useState<string>('click username to change');
  const [valid, set_valid] = useState<boolean>(true);
  const [color, set_color] = useState<'grey' | 'green' | 'red'>('grey');

  const usernameChangehandler = (e: any) => {
    const userInput = removeTagFromString((e.target as HTMLElement).innerHTML);
    if (validateNewUsername(userInput, set_valid)) {
      set_valid(true);
      set_message('that username is valid');
      set_color('green');
    } else {
      set_valid(false);
      set_color('red');
      if (userInput.includes(' ') || userInput.includes('&nbsp;')) {
        set_message('Username must not include spaces');
      } else if (userInput.length > 9) {
        set_message('Username must be under 11 characters');
      }else if (userInput.length < 2) {
        set_message('Username must be at least 2 characters');
      } else {
        set_message('Username cannot include special characters');
      }
    }
  }

  const usernameSubmitHandler = (e: Event) => {
    const element = e.target as HTMLElement;
    let userInput = removeTagFromString(element.innerHTML);
    if (userInput === user_name) {
      set_message('click username to change');
      set_color('grey');
      return;
    };
    userInput = removeSpecialCharactersFromString(userInput);
    if (valid) {
      set_message('saving...');
      axios.put('/username', { user_id, new_user_name: userInput })
        .then(() => {
          set_message('Username updated');
          set_user_name(userInput);
          setTimeout(() => {
            set_message('Click username to change');
            set_color('grey');
          }, 1500);
        })
        .catch(() => {
          set_valid(false);
          set_color('red');
          set_message('There has been an error');
          setTimeout(() => set_message(''), 1500);
        });
    } else {
      set_message('That userName is not valid');
      setTimeout(() => {
        element.innerHTML = user_name;
        set_valid(true);
      }, 1000);
      setTimeout(() => set_message(''), 1500);
    }
  }

  const handleUsernameFormFocus = () => {
    set_color('green');
    set_message('That username is valid');
  }

  return (
    <>
      <Username
        contentEditable={true}
        valid={valid}
        onInput={(e: InputEvent) => usernameChangehandler(e)}
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
        onBlur={(e: Event) => usernameSubmitHandler(e)}
        spellCheck='false'
      >
        {user_name}
      </Username>
      <UserNameFormMessage color={color}>
        {message}
      </UserNameFormMessage>
    </>

  )
};


export default UsernameForm;
