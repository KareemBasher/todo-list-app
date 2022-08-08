import React from 'react';
import './App.css';

export const NotFound = () => {
  return (
    <div className='h-screen bg-zinc-900 text-zinc-300 flex justify-center items-center'>
        <div>
            <div className='text-8xl flex justify-center'>
                404
            </div>
            <div id='emoticon'>
                <span className='text-5xl'>
                    The page you requested was not found. ¯\_(ツ)_/¯
                </span>
            </div>
        </div>
    </div>
  )
}
