import './App.css';
import { Container } from './styles/page';
import PostRepository from './services/postRepository';
import AuthService from './services/authService';
import Router from './routes/Router';

export const postRepository = new PostRepository();
export const authService = new AuthService();

function App() {
  return (
    <div className='App'>
      <Container>
        <Router />
      </Container>
    </div>
  );
}

export default App;
