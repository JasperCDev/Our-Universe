import React from 'react';
import { FormDiv, ScrollUpForm } from './styles';

const LoginForm = ({ submitHandler }) => (
  <FormDiv>
    <form onSubmit={submitHandler}>
      <label>
        Username:
        <br />
        <input type="text" placeholder="ex: BeastSlayer64..." />
      </label>
      <br />
      <button type="submit" >Submit</button>
    </form>
  </FormDiv>
);

export default LoginForm;