import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './MainPage';
import { NotFound } from './NotFound';
import { Signup } from './Signup';
import { Login } from './Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user/:user" element={<MainPage />}/>
      </Routes>
    </>
  );
}

export default App;