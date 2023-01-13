import styled from 'styled-components';

export const Input = styled.input<{ long?: boolean }>`
  border: none;
  background-color: #ededed;
  width: ${({ long }) => (long ? 20 : 14)}rem;
  height: 3rem;
  border-radius: 5px;
  outline: none;
  text-indent: 1rem;
`;
