import React from 'react';
import { NoteBook } from './NoteBook';
import { SidePanel } from './SidePanel';
import { useParams } from "react-router-dom";
import { useState } from 'react';

export const MainPage = () => {
    const [darkMode, setDarkMode] = useState(true);
    const params = useParams();
    const userName = params.user;

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const darkModeStyles = 'bg-zinc-900 text-white';

  return (
    <div className={`${darkMode?darkModeStyles : 'bg-lightGrey'} h-screen flex transition-all duration-300`}>
        <div className='w-1/5'>
          <SidePanel userName={userName.split('-')} toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
        </div>
        <NoteBook darkMode={darkMode} />
    </div>
  )
}
