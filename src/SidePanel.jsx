import React from 'react';
import { FiSun } from 'react-icons/fi';
import { FaMoon } from 'react-icons/fa';
import { Link } from "react-router-dom";

export const SidePanel = props => {
    const { userName, toggleDarkMode, darkMode } = props;

  return (
    <div className='p-12'>
        <div>
            <div className='flex justify-between items-center'>
                <div className={`h-28 w-28 border border-zinc-600 rounded-full flex justify-center items-center text-4xl ${darkMode? 'bg-zinc-800' : 'bg-zinc-300'} m-4`}>
                    {`${userName[0][0]}${userName[1][0]}`}
                </div>

                <div>
                    <button
                        className={`p-2 border border-zinc-600 rounded-full text-zinc-400 text-3xl ${darkMode? 'hover:text-zinc-200 hover:border-zinc-200' : 'hover:text-zinc-500 hover:border-zinc-500'} transition-all duration-300  hover:rotate-180`}
                        onClick={() => toggleDarkMode()}
                    >
                        {darkMode? <FaMoon /> : <FiSun />}
                    </button>
                </div>
            </div>
            
            <div className='text-3xl'>{userName.join(' ')}</div>
        </div>

        <Link className='text-zinc-600 hover:text-zinc-400 transition-all duration-300' to={`/login`}>Sign out</Link>
    </div>
  )
}
