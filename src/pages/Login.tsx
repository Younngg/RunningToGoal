import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../App';
import Button from '../components/Button/Button';

const Login = () => {
  const navigate = useNavigate();

  const goToHome = (userId: string) => {
    navigate('/', { state: { id: userId } });
  };

  const onLogin = async () => {
    try {
      const data = await authService.login('Google');
      goToHome(data.user.uid);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    authService.onAuthChange((user: { id: string }) => {
      user && goToHome(user.id);
    });
  });

  return (
    <div>
      <Button text='로그인' onClick={onLogin} />
    </div>
  );
};

export default Login;
