import React from 'react';
import { useState } from 'react';
import './App.css';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import ClipLoader from "react-spinners/ClimbingBoxLoader";
import { v4 as uuidv4 } from 'uuid';
import { FiPlus } from 'react-icons/fi';

export const Entries = props => {
    const { darkMode } = props;
    const [ listData, setListData ] = useState(null);
    const [ addDisabled, setAddDisabled ] = useState(false);
    const [ addState, setAddState ] = useState(false);
    const [ editState, setEditState ] = useState(false);
    const [ editDisabled, setEditDisabled ] = useState(false);
    const [ typedData, setTypedData ] = useState({ content: '' });
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
    }, [url])

    const editChecked = async (e) => {
        const targetId = e.target.dataset.id;
        let newData = [...listData];
        const index = newData.findIndex(item => item.id === targetId);
        newData[index].checked = !newData[index].checked;
        
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

    const changeInput = e => {
        setTypedData(prev => ({
            ...prev,
            content: e.target.value
        }))
    }

    const changeEditInput = e => {
        const targetId = e.target.dataset.id;
        let newData = [...listData];
        const index = newData.findIndex(item => item.id === targetId);

        newData[index].content = e.target.value;
        newData[index].checked = false;
        setListData(newData);
    }

    const handleAddButton = () => {
        if (addDisabled) {
            setAddDisabled(false)
            setTypedData({ content: '' });
            setAddState(false);
        } else {
            setAddDisabled(true)
            setAddState(true);
        }
    }

    const handleEditButton = () => {
        if (editDisabled) {
            setEditState(false);
            setEditDisabled(false)
        } else {
            setEditDisabled(true);
            setEditState(true);
        }
    }

    const addData = () => {
        const newData = [...listData];
        const newItem = {
            "id": uuidv4(),
            "content": typedData.content,
            "checked": false
        }
        setListData(prev => [...prev, newItem]);
        newData.push(newItem);

        fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "data": newData })
        })

        setTypedData({ content: '' });
        setAddDisabled(false);
        setAddState(false);
    }

    const editData = () => {
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'data': listData })
        })

        setEditDisabled(false);
        setEditState(false);
    }

    const cancelAdd = () => {
        setAddDisabled(false);
        setTypedData({ content: '' });
        setAddState(false);
    }

    const cancelEdit = () => {
        setEditDisabled(false);
        setEditState(false);
    }

  return (
    <div>
        {
            listData ?

            <div>
                <div className='w-[94%] flex justify-end text-2xl text-zinc-500'>
                    <button onClick={handleEditButton}>
                        {editDisabled ? 'cancel' : 'Edit'}
                    </button>
                </div>

                {listData && listData.map(({ id, content, checked }) => (
                    <label id="content" key={id}>
                        {!editState ? 
                            <>
                                <input type="checkbox" data-id={id} defaultChecked={checked} onClick={editChecked}/>
                                <div id='entry__container' className='w-11/12 inline-flex justify-between'>
                                    <div className={`text ${!darkMode && 'textLight'}`}>
                                        {content}
                                    </div>
                                </div>
                                
                                <div className='inline-block'>
                                    <button className='text-red-700 hover:text-red-600' data-id={id} onClick={handleDelete}>X</button>
                                </div>
                            </>

                            :

                            <div className={`text ${!darkMode} && 'textLight w-11/12`}>
                                <input
                                    type="text"
                                    data-id={id}
                                    className='w-11/12 bg-transparent outline-none px-2'
                                    value={content}
                                    onChange={changeEditInput}
                                    onKeyPress={(e) => e.key === 'Enter' && editData()}
                                    onKeyDown={(e) => e.keyCode === 27 && cancelEdit()}
                                    autoFocus
                                />
                            </div>
                        }
                    </label>
                ))}

                {addState && <div id='content' className={`text ${!darkMode} && 'textLight`}>
                    <input
                        type="text"
                        className='w-11/12 bg-transparent outline-none px-2'
                        value={typedData.content}
                        onChange={changeInput}
                        onKeyPress={(e) => e.key === 'Enter' && addData()}
                        onKeyDown={(e) => e.keyCode === 27 && cancelAdd()}
                        autoFocus
                    />
                </div>}

                <div className={`w-[93%] flex justify-end ${darkMode ? 'text-white' : 'text-zinc-500'}`}>
                    {!editState && 
                        <button onClick={handleAddButton}>
                            {addDisabled ? 'cancel' :  <FiPlus />}
                        </button>
                    }
                </div>
            </div>
            
            :

            <div className='h-[65vh] w-full flex justify-center items-center'>
                <ClipLoader color={`${darkMode ? "#F5F5F5" : "#201F1E"}`} loading={!listData} size={20} />
            </div>
        }
    </div>
  )
}
