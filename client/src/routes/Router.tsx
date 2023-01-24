import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import CheckAuth from './CheckAuth';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <CheckAuth>
              <Home />
            </CheckAuth>
          }
        />
        <Route
          path='/login'
          element={
            <CheckAuth>
              <Login />
            </CheckAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
