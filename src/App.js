import './App.css';
import { NoteBook } from './NoteBook';
import { SidePanel } from './SidePanel';
import { Routes } from 'react-router-dom';

function App() {
  return (
    <>

      <Routes>
        
      </Routes>
      <div className="dark:bg-zinc-900 dark:text-white h-screen flex">
        <div className='w-1/3'>
          <SidePanel/>
        </div>
        <NoteBook />
      </div>
    </>
  );
}

export default App;
