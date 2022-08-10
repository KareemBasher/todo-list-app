import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import joi from 'joi';
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        repeatPassword: "",
        errors: {}
    });

    const schema = joi.object({
        firstName: joi.string()
            .alphanum()
            .min(5)
            .required()
            .label('1'),

        lastName: joi.string()
            .alphanum()
            .min(5)
            .required()
            .label('2'),

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
        }
        
        setFormData(prev => ({ ...prev, errors }));
    }

  return (
    <div className={`bg-zinc-900 text-white h-screen flex justify-center items-center`}>
        <div className='p-16 border border-zinc-600'>
            <div className='px-2 pb-8 text-3xl text-center after:bg-zinc-600 after:h-px after:block'>
                Sign Up
            </div>

            <div>
                <form onSubmit={handleOnSubmit} className=''>
                    <div className='p-2'>
                        <label
                            htmlFor="firstName"
                            className='block text-center font-thin text-lg'
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            name='firstName'
                            value={formData.firstName}
                            onChange={changeInput}
                            className={`rounded-lg bg-lightGrey text-black px-2 outline-none shadow-md ${formData.errors.firstName && 'shadow-red-700'} focus:shadow-slate-400`}
                        />
                    </div>

                    <div className='p-2'>
                        <label
                            htmlFor="lastName"
                            className='block text-center font-thin text-lg'
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            name='lastName'
                            value={formData.lastName}
                            onChange={changeInput}
                            className={`rounded-lg bg-lightGrey text-black px-2 outline-none shadow-md ${formData.errors.lastName && 'shadow-red-700'} focus:shadow-slate-400`}
                        />
                    </div>

                    <div className='p-2'>
                        <label
                            htmlFor="password"
                            className='block text-center font-thin text-lg'
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={changeInput}
                            className={`rounded-lg bg-lightGrey text-black px-2 outline-none shadow-md ${formData.errors.password && 'shadow-red-700'} focus:shadow-slate-400`}
                        />
                    </div>

                    <div className='p-2'>
                        <label
                            htmlFor="repeatPassword"
                            className='block text-center font-thin text-lg'
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name='repeatPassword'
                            value={formData.repeatPassword}
                            onChange={changeInput}
                            className={`rounded-lg bg-lightGrey text-black px-2 outline-none shadow-md ${formData.errors.password && 'shadow-red-700'} focus:shadow-slate-400`}
                        />
                    </div>

                    <div className='flex justify-center m-8'>
                        <button
                            type='submit'
                            className='px-8 py-3 hover:text-black hover:bg-zinc-300 transition-all duration-300 border border-zinc-600 rounded-xl'
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
