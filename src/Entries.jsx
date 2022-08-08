import React from 'react';
import { useState } from 'react';
import './App.css';

export const Entries = () => {
    const [checked, setChecked] = useState(false);

  return (
    <div>
        <label id="content">
            <input type="checkbox"/>
                <span className='checkmark'></span>
            <div id='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, ab!</div>
        </label>

        <label id="content">
            <input type="checkbox"/>
                <span className='checkmark'></span>
            <div id='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, ab!</div>
        </label>

        <label id="content">
            <input type="checkbox"/>
                <span className='checkmark'></span>
            <div id='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, ab!</div>
        </label>

        <label id="content">
            <input type="checkbox"/>
                <span className='checkmark'></span>
            <div id='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, ab!</div>
        </label>
    </div>
  )
}
