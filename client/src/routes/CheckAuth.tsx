import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../App';

const CheckAuth = ({ children }: { children: JSX.Element }) => {
  const pathname = window.location.pathname;
  const [user, setUser] = useState<{
    nickname: string;
    profileImg: string;
  } | null>(null);

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
  }, []);

  if (!token && pathname === '/') {
    return <Navigate to='/login' />;
  }

  if (pathname === '/login' && token) {
    return <Navigate to='/' />;
  }

  return children;
};

export default CheckAuth;
