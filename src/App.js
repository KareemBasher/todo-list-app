import './App.css';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './MainPage';
import { NotFound } from './NotFound';
import { Signup } from './Signup';

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user/:user" element={<MainPage />}/>
      </Routes>
    </>
  );
}

export default App;