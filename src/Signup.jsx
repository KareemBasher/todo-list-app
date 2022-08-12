import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import joi from 'joi';
import { useNavigate, Link } from "react-router-dom";
import './App.css';

export const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        repeatPassword: "",
        errors: {}
    });

    const schema = joi.object({
        firstName: joi.string()
            .alphanum()
            .min(3)
            .required()
            .label('1'),

        lastName: joi.string()
            .alphanum()
            .min(3)
            .required()
            .label('2'),

        userName: joi.string()
            .min(3)
            .required()
            .label('4'),

        password: joi.string()
            .alphanum()
            .min(8)
            .required()
            .label('3'),

        repeatPassword: joi.ref('password'),

        errors: joi.object()
    });

    const changeInput = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = e => {
        e.preventDefault();

        const { error } = schema.validate(formData);
        const errors = {};

        if (!error) {
            const user = {
                "id": uuidv4(),
                "firstName": formData.firstName,
                "lastName": formData.lastName,
                "password": formData.password,
                "userName": formData.userName.toLowerCase(),
                "darkMode": true,
                "data": []
            }

            fetch("http://localhost:3001/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            .then(() => {
                navigate(`/user/${user.id}`)
            })
        } else {
            const err = error.message[1];

            if (err === '1') errors.firstName = 'First name is required';
            else if (err === '2') errors.lastName = 'Last name is required';   
            else if (err === '3') errors.password = 'Password is required';
            else if (err === '4') errors.userName = 'User name is required';
        }
        
        setFormData(prev => ({ ...prev, errors }));
    }

  return (
    <div className={`bg-zinc-900 text-white h-screen flex justify-center items-center`}>
        <div className='w-1/4 px-20 pt-10 pb-3 border border-zinc-600'>
            <div className='px-2 pb-8 text-3xl text-center'>
                Sign Up
            </div>

            <div>
                <form onSubmit={handleOnSubmit} onKeyPress={e => e.key === 'Enter' && handleOnSubmit()} method='post'>
                    <div className={`p-2 mb-8 after:bg-zinc-600 after:h-px after:block ${formData.errors.firstName && 'after:bg-red-700'}`}>
                        <div className='text-xs'>
                            First Name
                        </div>
                        <input
                            type="text"
                            name='firstName'
                            value={formData.firstName}
                            onChange={changeInput}
                            className={`bg-transparent outline-none placeholder:text-center text-lg h-10 w-full focus:bg-zinc-800`}
                        />
                    </div>

                    <div className={`p-2 mb-8 after:bg-zinc-600 after:h-px after:block ${formData.errors.lastName && 'after:bg-red-700'}`}>
                        <div className='text-xs'>
                            Last Name
                        </div>
                        <input
                            type="text"
                            name='lastName'
                            value={formData.lastName}
                            onChange={changeInput}
                            className={`bg-transparent outline-none placeholder:text-center text-lg h-10 w-full focus:bg-zinc-800`}
                        />
                    </div>

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
                            autoComplete="new-password"
                            name='password'
                            value={formData.password}
                            onChange={changeInput}
                            className={`bg-transparent outline-none placeholder:text-center text-lg h-10 w-full focus:bg-zinc-800`}
                        />
                    </div>

                    <div className={`p-2 mb-8 after:bg-zinc-600 after:h-px after:block ${formData.errors.password && 'after:bg-red-700'}`}>
                        <div className='text-xs'>
                            Confirm Password
                        </div>
                        <input
                            type="password"
                            name='repeatPassword'
                            value={formData.repeatPassword}
                            onChange={changeInput}
                            className={`bg-transparent outline-none placeholder:text-center text-lg h-10 w-full focus:bg-zinc-800`}
                            
                        />
                    </div>

                    <div className='flex justify-center m-8'>
                        <button
                            type='submit'
                            className='w-full py-3 hover:text-black hover:bg-zinc-300 transition-all duration-300 border border-zinc-600 rounded-md'
                        >
                            Sign up
                        </button>
                    </div>

                    <div className='text-zinc-600'>
                        Already have an account?&nbsp;
                        <Link className='text-zinc-500 hover:text-zinc-400 transition-all duration-300' to={`/login`}>
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
