import React from 'react';
import { useState } from 'react';
import './App.css';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';

export const Entries = props => {
    const { darkMode } = props;
    const [ listData, setListData ] = useState(
            [
                {
                    "id": 1,
                    "content": "has7a bokra el sa3a 8:00",
                    "checked": false
                }
            ]
    );
    const params = useParams();
    const userId = params.user;
    const url = `http://localhost:3001/users/${userId}`;

    useEffect(() => {
        fetch(url)
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

        console.log(newData, index);
        
        await fetch(url, {
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

        await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'data': newData })
        })
    }

  return (
    <div>
        {listData.map(({ id, content, checked }) => (
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
