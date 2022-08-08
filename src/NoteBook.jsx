import React from 'react';
import './App.css';
import { Entries } from './Entries';

export const NoteBook = () => {
  return (
    <div className='w-[65%] flex justify-center items-center'>
        <div id="paper">
          <div className='p-5 px-16 text-4xl'>#TO DO</div>
            <div id="pattern">
                <Entries />
            </div>
        </div>
    </div>
  )
}
