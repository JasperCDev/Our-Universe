import React, { useContext, useState } from 'react';
import { numberToCommaSeperatedString, removeTagFromString, validateNewUsername, removeSpecialCharactersFromString } from '../helpers';
import { UserDeityContainer, UserClicksSubheading, UserDeityButton, UserDeityDiv } from './userDeityCarousel.styles';
import { UserContext } from '../app/userContext';
import UsernameForm from '../usernameForm/usernameForm';
import axios, { AxiosError } from 'axios';
import { UserNameFormMessage } from './userDeityCarousel.styles';

interface Props {
  buttonClickHandler: () => void;
  user_clicks: number;
  user_name: string;
  user_id: number;
  set_user_name: React.Dispatch<React.SetStateAction<string>>;
}

const UserDeity: React.FC<Props> = ({
  buttonClickHandler,
  user_clicks,
  user_name,
  user_id,
  set_user_name
}) => {
  const [user_name_form_message, set_user_name_form_message] = useState<string>('click username to change');
  const [user_name_form_valid, set_user_name_form_valid] = useState<'true' | 'false'>('true');
  const [user_name_form_color, set_user_name_form_color] = useState<'grey' | 'green' | 'red'>('grey');

  const usernameChangehandler = (e: any, setter: React.Dispatch<React.SetStateAction<'true' | 'false'>>) => {
    const userInput = removeTagFromString((e.target as HTMLElement).innerHTML);
    if (validateNewUsername(userInput, setter)) {
      set_user_name_form_valid('true');
      set_user_name_form_message('that username is valid');
      set_user_name_form_color('green');
    } else {
      set_user_name_form_valid('false');
      set_user_name_form_color('red');
      if (userInput.includes(' ') || userInput.includes('&nbsp;')) {
        set_user_name_form_message('Username must not include spaces');
      } else if (userInput.length > 9) {
        set_user_name_form_message('Username must be under 11 characters');
      }else if (userInput.length < 2) {
        set_user_name_form_message('Username must be at least 2 characters');
      } else {
        set_user_name_form_message('Username cannot include special characters');
      }
    }
  }

  const usernameSubmitHandler = (e: any, setter: React.Dispatch<React.SetStateAction<'true' | 'false'>>) => {
    const element = e.target as HTMLElement;
    let userInput = removeTagFromString(element.innerHTML);
    console.log(userInput, user_name);
    if (userInput === user_name) {
      set_user_name_form_message('click username to change');
      set_user_name_form_color('grey');
      return;
    };
    userInput = removeSpecialCharactersFromString(userInput);
    if (element.getAttribute('data-valid') === 'true') {
      set_user_name_form_message('saving...');
      axios.put('/username', { user_id, new_user_name: userInput })
        .then(() => {
          set_user_name_form_message('Username updated');
          set_user_name(userInput);
          setTimeout(() => {
            set_user_name_form_message('Click username to change');
            set_user_name_form_color('grey');
          }, 1500);
        })
        .catch((err: AxiosError) => {
          set_user_name_form_valid('false');
          set_user_name_form_color('red');
          set_user_name_form_message('There has been an error');
          setTimeout(() => set_user_name_form_message(''), 1500);
        });
    } else {
      set_user_name_form_message('That userName is not valid');
      setTimeout(() => {
        element.innerHTML = user_name;
        setter('true');
      }, 1000);
      setTimeout(() => set_user_name_form_message(''), 1500);
    }
  }

  const handleUsernameFormFocus = () => {
    console.log('here');
    set_user_name_form_color('green');
    set_user_name_form_message('That username is valid');
  }

  return (
    <UserDeityContainer>
      <UserDeityDiv></UserDeityDiv>
      <UserClicksSubheading>
        <UsernameForm handleUsernameFormFocus={handleUsernameFormFocus} submitHandler={usernameSubmitHandler} user_name={user_name} changeHandler={usernameChangehandler} />
        <UserNameFormMessage data-color={user_name_form_color} data-valid={user_name_form_valid}>
                {user_name_form_message}
        </UserNameFormMessage>
        <h1>{numberToCommaSeperatedString(user_clicks)}</h1>
      </UserClicksSubheading>
      <UserDeityButton onClick={buttonClickHandler}>Click Me!</UserDeityButton>
    </UserDeityContainer>
  );
}


export default React.memo(UserDeity);