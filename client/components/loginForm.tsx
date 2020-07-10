import React, { FormEvent, FC } from 'react';
import { FormDiv } from './styles';


interface Props {
  submitHandler: (e: FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const loginForm: FC<Props> = ({ submitHandler, handleChange }) => (
  <FormDiv>
    <h2>Log in!</h2>
    <form onSubmit={submitHandler}>
      <label>
        Username:
        <br />
        <input type="text" placeholder="username" required={true} onChange={handleChange}/>
      </label>
      <br />
      <button type="submit" >Submit</button>
    </form>
    {/* <p>Don't have an account?</p>
    <a onClick={toggleLogin} >Click here</a> */}
  </FormDiv>
);

export default loginForm;