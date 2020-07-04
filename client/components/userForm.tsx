import React, { FormEvent, FC } from 'react';
import { FormDiv, ScrollUpForm } from './styles';


interface Props {
  submitHandler: (e: FormEvent) => void;
  toggleLogin: (e: FormEvent) => void;
  login: boolean;
}

const UserForm: FC<Props> = ({ submitHandler, toggleLogin, login }) => (
  <>
    {
    login ?
    <FormDiv>
      <h2>Log in!</h2>
      <form onSubmit={submitHandler}>
        <label>
          Username:
          <br />
          <input type="text" placeholder="username" required={true}/>
        </label>
        <br />
        <button type="submit" >Submit</button>
      </form>
      <p>Don't have an account?</p>
      <a onClick={toggleLogin} >Click here</a>
    </FormDiv>
    :
    <FormDiv>
      <h2>Sign Up!</h2>
      <form onSubmit={submitHandler}>
        <label>
          Username:
          <br />
          <input type="text" placeholder="ex: BeastSlayer64..." />
        </label>
        <br />
        <button type="submit" >Submit</button>
      </form>
      <p onClick={toggleLogin} >Already have an account?</p>
      <a onClick={toggleLogin} >Click here</a>
    </FormDiv>
    }
  </>
);

export default UserForm;