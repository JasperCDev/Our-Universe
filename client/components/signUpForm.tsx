import React, { FormEvent, FC } from 'react';
import { FormDiv } from './styles';


interface Props {
  submitHandler: (e: FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const signUpForm: FC<Props> = ({ submitHandler, handleChange }) => (
  <FormDiv>
    <h2>Sign up!</h2>
    <form onSubmit={submitHandler}>
      <label>
        Username:
        <br />
        <input type="text" placeholder="ex: BeastSlayer64..." required={true} onChange={handleChange} />
      </label>
      <br />
      <button type="submit" >Submit</button>
    </form>
  </FormDiv>
);

export default signUpForm;

