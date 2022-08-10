import React from 'react';
import { NoteBook } from './NoteBook';
import { SidePanel } from './SidePanel';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';

export const MainPage = () => {
    const [darkMode, setDarkMode] = useState(true);
    const params = useParams();
    const userId = params.user;
    const url = `http://localhost:3001/users/${userId}`;
    const darkModeStyles = 'bg-zinc-900 text-white';

    useEffect(() => {
      fetch(url)
      .then(result => {
        return result.json()
      })

      .then(data => {
        setDarkMode(data.darkMode)
      })
    }, [url])

    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
      fetch(url, {
        method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'darkMode': !darkMode })
      })
    }

  return (
    <div className={`${darkMode? darkModeStyles : 'bg-lightGrey'} h-screen flex transition-all duration-300`}>
        <div className='w-1/5'>
          <SidePanel
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
        </div>
        <NoteBook darkMode={darkMode} />
    </div>
  )
}
