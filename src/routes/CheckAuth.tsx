import { Navigate } from 'react-router-dom';

const CheckAuth = ({ children }: { children: JSX.Element }) => {
  const pathname = window.location.pathname;

  const token = localStorage.getItem('token');

  if (!token && pathname === '/') {
    return <Navigate to='/login' />;
  }

  if (pathname === '/login' && token) {
    return <Navigate to='/' />;
  }

  return children;
};

export default CheckAuth;
