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
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <Container>
      <LoginButton text='로그인' onClick={onLogin} />
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

const LoginButton = styled(Button)`
  width: 100rem;
`;
