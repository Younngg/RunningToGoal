import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authService } from '../App';
import Button from '../components/Button/Button';

const Login = () => {
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const data = await authService.login('Google');
      localStorage.setItem('token', data.user.uid);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    authService.onAuthChange((user: { id: string }) => {
      localStorage.setItem('token', user.id);
      user && navigate('id');
    });
  });

  return (
    <Container>
      <Button text='로그인' onClick={onLogin} />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
