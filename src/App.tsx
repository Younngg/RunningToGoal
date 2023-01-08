import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { Container } from './styles/page';
import PostRepository from './services/postRepository';
import AuthService from './services/authService';

const postRepository = new PostRepository();
const authService = new AuthService();

function App() {
  return (
    <div className='App'>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<Home postRepository={postRepository} />}
            />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
