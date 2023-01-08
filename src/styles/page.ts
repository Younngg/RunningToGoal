import styled from 'styled-components';

export const Container = styled.div`
  width: 80rem;
  height: 100vh;
  margin: auto;
  background-color: ${({ theme }) => theme.color.skyblue};
`;

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 4rem 5rem;
`;
