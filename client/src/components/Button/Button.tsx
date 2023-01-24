import React, { FC } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  content?: string;
  text?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: FC<ButtonProps> = ({
  content,
  text,
  onClick,
  type = 'button',
}) => {
  return (
    <ButtonStyle type={type} onClick={onClick} text={text ? true : false}>
      {content && <img src={content} alt='' />}
      {text && text}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button<{ text?: boolean }>`
  width: ${({ text }) => (text ? 'fit-content' : '3rem')};
  height: 3rem;
  background-color: white;
  border: 2px solid #cecece;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    transition: all 0.1s;
  }
`;
