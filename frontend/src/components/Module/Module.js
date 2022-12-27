import React from 'react';
import { useState } from 'react';
import style from './style.css';
import { useNavigate } from "react-router-dom";

function Module({ name, handleModuleClick, selected}) {
    const [text, setText] = useState();
    // const [selected, setSelected] = useState(false);

    const navigate = useNavigate();

    const handleQuiz = () => {
        console.log(name + " called")
        navigate(`/quiz/${name}`)

        // Pass the module text to the QuizPage

    }

    const handleFlash = () => {
        navigate(`/flash/${name}`)
    }

    return (
        <div onClick={() => {handleModuleClick(name)}}>
            <div>
                Module {name}
            </div>
            { selected ?
                <div>
                    <button onClick={handleQuiz}>Quiz</button>
                    <button onClick={handleFlash}>Flash</button>
                </div>
            :
                null
            }            
        </div>        
    )
}

export default Module
