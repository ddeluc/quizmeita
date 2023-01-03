import React from 'react';
import { useState } from 'react';
import style from './style.css';
import * as api from '../../api/index.js';

function CreateModule ({ addModule }) {
    const { text, setText } = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.createModule({text: e.target.text.value});
            addModule(data);

            console.log(data);
        } catch (error) {
            console.log(error);
        }        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
