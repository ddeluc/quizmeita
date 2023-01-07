import React from 'react';
import { useState } from 'react';
import style from './style.css';
import * as api from '../../api/index.js';

function CreateModule ({ addModule, user }) {
    const { text, setText } = useState();
    const [ error, setError ] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.createModule({title: e.target.title.value, text: e.target.text.value, author: user.username});
            addModule(data, false);

            console.log(data);
        } catch (error) {
            console.log(error.response.data.message);
            setError(error.response.data.message)
        }        
    }

    // FIX: Set the flashcards here
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" />
            </label>
            <label>
                Text:
                <input type="text" name="text" />
            </label>
            <input type="submit" value="Submit" />
            </form>
            <div>{error}</div>
        </div>        
    )
}

export default CreateModule
