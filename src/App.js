import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './MainPage';
import { NotFound } from './NotFound';
import { Signup } from './Signup';
import { Login } from './Login';
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  const sessionId = cookies.get('id');

  return (
    <>
      <Routes>
        <Route path="/" element={sessionId ? <Navigate to={`/user/${sessionId}`} /> : <Navigate to='/login' />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user/:user" element={<MainPage />}/>
      </Routes>
    </>
  );
}

export default App;