import './App.css';
import { Container } from './styles/page';
import AuthService from './services/authService';
import Router from './routes/Router';

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
