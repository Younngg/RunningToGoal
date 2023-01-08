import React, { FC } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  content: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ content, onClick }) => {
  return (
    <ButtonStyle onClick={onClick}>
      <img src={content} alt='' />
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: white;
  border: 2px solid #cecece;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
