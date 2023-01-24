import styled from 'styled-components';

export const BackGround = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
`;

export const Modal = styled.div`
  width: 40rem;
  height: 25rem;
  padding: 3rem;
  background-color: white;
  border-radius: 15px;
`;

export const Title = styled.h4`
  font-size: 1.6rem;
  margin-bottom: 5rem;
  span {
    display: inline-block;
    margin-right: 1rem;
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

export const Message = styled.p`
  display: inline-block;
  font-size: 1.6rem;
  margin-left: 0.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: 5rem;

  button {
    + button {
      margin-left: 1rem;
    }
  }
`;
