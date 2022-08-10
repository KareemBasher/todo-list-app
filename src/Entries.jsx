import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

export const Entries = props => {
    const { darkMode } = props;
    const [ listData, setListData ] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/users/3")
        .then(result => {
            return result.json();
        })

        .then(data => {
            setListData(data.data);
        })
    }, [])
    
    const editChecked = async (e) => {
        const targetId = +e.target.dataset.id;
        let newData = [...listData];
        const index = newData.findIndex(item => item.id === targetId);
        newData[index].checked = !newData[index].checked;
        
        await fetch("http://localhost:3001/users/3", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'data': newData })
        })
    }

    const handleDelete = async (e) => {
        const targetId = +e.target.dataset.id;
        let newData = [...listData];
        const index = newData.findIndex(item => item.id === targetId);
        newData.splice(index, 1);

        setListData(newData)

        await fetch("http://localhost:3001/users/3", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'data': newData })
        })
    }

  return (
    <div>
        {listData && listData.map(({ id, content, checked }) => (
            <label id="content" key={id}>
                <input type="checkbox" data-id={id} defaultChecked={checked} onClick={editChecked}/>
                <div id='entry__container' className='w-11/12 inline-flex justify-between'>
                    <div className={`text ${!darkMode && 'textLight'}`}>
                        {content}
                    </div>
                </div>
                
                <div className='inline-block w-'>
                    <button className='text-zinc-500'>Edit</button>
                    <button className='text-red-700' data-id={id} onClick={handleDelete}>X</button>
                </div>
            </label>
        ))}
    </div>
  )
}
