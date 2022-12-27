import React from 'react';
import { useState } from 'react';
import style from './style.css';

function CreateModule({ addModule }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        addModule(e.target.text.value)
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
