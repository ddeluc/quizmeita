import React from 'react';
import { useState } from 'react';
import style from './style.css';
import { useNavigate } from "react-router-dom";

function Module({ module, handleModuleClick, selected}) {
    const [text, setText] = useState();
    // const [selected, setSelected] = useState(false);

    const navigate = useNavigate();

    const handleQuiz = () => {
        console.log(module.title + " called")
        navigate(`/quiz/${module._id}`)

        // Pass the module text to the QuizPage

    }

    const handleFlash = () => {
        navigate(`/flash/${module._id}`)
    }

    return (
        <div onClick={() => {handleModuleClick(module.title)}}>
            <div>
                {module.title}
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
