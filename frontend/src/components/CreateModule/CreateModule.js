import React from 'react';
import { useState } from 'react';
import style from './style.css';
import * as api from '../../api/index.js';

function CreateModule ({ addModule }) {
    const { text, setText } = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.createModule({title: e.target.title.value, text: e.target.text.value});
            addModule(data);

            console.log(data);
        } catch (error) {
            console.log(error);
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
        </div>        
    )
}

export default CreateModule
