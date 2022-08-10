import React from 'react';
import './App.css';
import { Entries } from './Entries';

export const NoteBook = props => {
  const { darkMode } = props;

  return (
    <div className='w-[65%] flex justify-center items-center'>
        <div className={`paper border border-zinc-600 ${!darkMode && 'paperLight bg-paperGrey'} drop-shadow-2xl`}>
          <div className={`p-5 px-16 text-4xl ${!darkMode && 'bg-paperGrey'}`}>#TO DO</div>
            <div className={`pattern ${!darkMode && 'patternLight'}`}>
                <Entries darkMode={darkMode} />
            </div>
        </div>
    </div>
  )
}
