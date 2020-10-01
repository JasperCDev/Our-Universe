import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { removeSpecialCharactersFromString, removeTagFromString, validateNewUsername } from '../../../../helpers';
import axios from 'axios';

const Username = styled.h2.attrs((props) => {})`
  padding-left: 8px;
  cursor: pointer;
  width: 90%;
  margin: 1rem auto 0 auto;
  text-align: center;
  transition: all 1s ease-in-out;
  border: 0.2rem solid transparent;
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
const UserNameFormMessage = styled.p<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: bold;
  text-align: center;
  font-size: 0.8rem;
  transition: all 0.2s ease-in-out;
  margin-bottom: 1rem;
`;

interface Props {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userId: number;
}

const UsernameForm: FC<Props> = ({ username, setUsername, userId }) => {
  const [message, setMessage] = useState<string>('click username to change');
  const [valid, setValid] = useState<boolean>(true);
  const [color, setColor] = useState<'grey' | 'green' | 'red'>('grey');

  const usernameChangehandler = (e: any) => {
    const userInput = removeTagFromString((e.target as HTMLElement).innerHTML);
    if (validateNewUsername(userInput, setValid)) {
      setValid(true);
      setMessage('that username is valid');
      setColor('green');
    } else {
      setValid(false);
      setColor('red');
      if (userInput.includes(' ') || userInput.includes('&nbsp;')) {
        setMessage('Username must not include spaces');
      } else if (userInput.length > 9) {
        setMessage('Username must be under 11 characters');
      }else if (userInput.length < 2) {
        setMessage('Username must be at least 2 characters');
      } else {
        setMessage('Username cannot include special characters');
      }
    }
  }

  const usernameSubmitHandler = (e: Event) => {
    const element = e.target as HTMLElement;
    let userInput = removeTagFromString(element.innerHTML);
    if (userInput === username) {
      setMessage('click username to change');
      setColor('grey');
      return;
    };
    userInput = removeSpecialCharactersFromString(userInput);
    if (valid) {
      setMessage('saving...');
      axios.put('/username', { userId, newUsername: userInput })
        .then(() => {
          setMessage('Username updated');
          setUsername(userInput);
          setTimeout(() => {
            setMessage('Click username to change');
            setColor('grey');
          }, 1500);
        })
        .catch(() => {
          setValid(false);
          setColor('red');
          setMessage('There has been an error');
          setTimeout(() => setMessage(''), 1500);
        });
    } else {
      setMessage('That userName is not valid');
      setTimeout(() => {
        element.innerHTML = username;
        setValid(true);
      }, 1000);
      setTimeout(() => setMessage(''), 1500);
    }
  }

  const handleUsernameFormFocus = () => {
    setColor('green');
    setMessage('That username is valid');
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
        suppressContentEditableWarning={true}
      >
        {username}
      </Username>
      <UserNameFormMessage color={color}>
        {message}
      </UserNameFormMessage>
    </>
  )
};


export default React.memo(UsernameForm);
