import React, { FC, useRef } from 'react';
import styled from 'styled-components';

const Username = styled.p`
  display: inline-block;
  background-color: ${(props) => props.valid && props.editing ? 'green' : 'red'};
`;

interface Props {
  user_id: number;
  user_name: string;
  changeHandler: (list: any) => void;
}

const UsernameForm: FC<Props> = ({ user_id, user_name, changeHandler }) => {
  // const config = { attributes: true, childList: true, subtree: true };
  // const observer = new MutationObserver(changeHandler);
  // const user_name_el = useRef(null);
  // // observer.observe(user_name_el.current! as Node, config);
  // console.log(user_name_el.current);
  return (
    <Username
      // ref={user_name_el}
      contentEditable={true}
      onInput={changeHandler}
      valid={true}
      editing={false}
      onFocus={(e) => e.target.editing = !e.target.editing}
    >
      {user_name}
    </Username>
  )
};

export default React.memo(UsernameForm);
