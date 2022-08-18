import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'universal-cookie';

export const Login = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        userName: '',
        password: '',
        errors: {}
    });

    const changeInput = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = e => {
        e.preventDefault();

        fetch(`http://localhost:3001/users?userName=${formData.userName.toLowerCase()}`)
        .then(res => {
            return res.json()
        })

        .then(data => {
            if (data[0]) {
                if (data[0].userName === formData.userName.toLowerCase() && data[0].password === formData.password) {
                    cookies.set('id', data[0].id, {path: '/', expires: new Date(Date.now()+2592000)});
                    navigate(`/user/${data[0].id}`);
                } else {
                    setFormData(prev => ({
                        ...prev,
                        errors: {
                            userName: true,
                            password: true
                        }
                    }))
                }
            } else {
                setFormData(prev => ({
                        ...prev,
                        errors: {
                            userName: true,
                            password: true
                        }
                    }))
            }
        })
    }

  return (
    <div className={`bg-zinc-900 text-white h-screen flex justify-center items-center`}>
        <div className='w-1/4 px-20 pt-10 pb-3 border border-zinc-600'>
            <div className='px-2 pb-8 text-3xl text-center'>
                Log In
            </div>

            <div>
                <form onSubmit={handleOnSubmit} onKeyPress={e => e.key === 'Enter' && handleOnSubmit()} method='post'>
                    <div className={`p-2 mb-8 after:bg-zinc-600 after:h-px after:block ${formData.errors.userName && 'after:bg-red-700'}`}>
                        <div className='text-xs'>
                            User Name
                        </div>
                        <input
                            type="text"
                            name='userName'
                            value={formData.userName}
                            onChange={changeInput}
                            className={`bg-transparent outline-none placeholder:text-center text-lg h-10 w-full focus:bg-zinc-800`}
                        />
                    </div>

                    <div className={`p-2 mb-8 after:bg-zinc-600 after:h-px after:block ${formData.errors.password && 'after:bg-red-700'}`}>
                        <div className='text-xs'>
                            Password
                        </div>
                        <input
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={changeInput}
                            className={`bg-transparent outline-none placeholder:text-center text-lg h-10 w-full focus:bg-zinc-800`}
                        />
                    </div>

                    <div className='flex justify-center m-8'>
                        <button
                            type='submit'
                            className='w-full py-3 hover:text-black hover:bg-zinc-300 transition-all duration-300 border border-zinc-600 rounded-md'
                        >
                            Log in
                        </button>
                    </div>

                    <div className='text-zinc-600'>
                        Don't have an account?&nbsp;
                        <Link className='text-zinc-500 hover:text-zinc-400 transition-all duration-300' to={`/signup`}>
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
