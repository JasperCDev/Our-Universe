import React from 'react';
import { FormDiv, ScrollUpForm } from './styles';

const UserForm = ({ submitHandler, toggleLogin, login }) => (
  <>
    {
    login ?
    <FormDiv>
      <h2>Log in!</h2>
      <form onSubmit={submitHandler}>
        <label>
          Username:
          <br />
          <input type="text" placeholder="username" required/>
        </label>
        <br />
        <button type="submit" >Submit</button>
      </form>
      <p onClick={toggleLogin} >Don't have an account?</p>
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
    </FormDiv>
    }
  </>
);

export default UserForm;