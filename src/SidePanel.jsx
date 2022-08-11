import React from 'react';
import { FiSun } from 'react-icons/fi';
import { FaMoon } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/PuffLoader";

export const SidePanel = props => {
    const { toggleDarkMode, darkMode } = props;
    const [ userData, setUserData ] = useState(null);
    const params = useParams();
    const userId = params.user;
    const url = `http://localhost:3001/users/${userId}`;

    useEffect(() => {
        fetch(url)
        .then(result => {
            return result.json();
        })

        .then(data => {
            setUserData(data);
        })
    }, [url])

  return (
    <div className='p-12'>
        {
            userData ?
            <>
                <div>
                    <div className='flex justify-between items-center'>
                        <div className={`h-28 w-28 border border-zinc-600 rounded-full flex justify-center items-center text-4xl ${darkMode? 'bg-zinc-800' : 'bg-zinc-300'} m-4`}>
                            {`${userData.firstName[0]}${userData.lastName[0]}`}
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
                    
                    <div className='text-3xl'>{userData.firstName} {userData.lastName}</div>
                </div>

                <Link className='text-zinc-600 hover:text-zinc-400 transition-all duration-300' to={`/login`}>Sign out</Link>
            </>

            :

            <div className='py-10 flex justify-center items-center'>
                <ClipLoader color={`${darkMode ? "#F5F5F5" : "#201F1E"}`} loading={!userData} size={50} />
            </div>
        }
    </div>
  )
}
