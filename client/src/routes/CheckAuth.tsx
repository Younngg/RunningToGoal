import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../App';
import { useSetRecoilState } from 'recoil';
import { userState } from '../states/userState';

const CheckAuth = ({ children }: { children: JSX.Element }) => {
  const pathname = window.location.pathname;
  const setUser = useSetRecoilState(userState);

  const token = localStorage.getItem('token');

  useEffect(() => {
    authService.onAuthChange(
      (user: { uid: string; displayName: string; photoURL: string }) => {
        if (user) {
          localStorage.setItem('token', user.uid);
          setUser({ nickname: user.displayName, profileImg: user.photoURL });
        }
      }
    );
  }, [setUser]);

  if (!token && pathname === '/') {
    return <Navigate to='/login' />;
  }

  if (pathname === '/login' && token) {
    return <Navigate to='/' />;
  }

  return children;
};

export default CheckAuth;
