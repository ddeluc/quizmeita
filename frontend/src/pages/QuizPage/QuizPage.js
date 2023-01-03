import React, { useEffect, useState } from 'react';
import style from './style.css';
import { useParams } from 'react-router-dom';
import PrepositionsQuiz from '../../components/Quiz/PrepositionsQuiz/PrepositionsQuiz';
import { useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";

function QuizPage() {
    const { id } = useParams()
    const [module, setModule] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        getModule();
    }, [])

    const getModule = async () => {
        try {
            const { data } = await api.getModule(id);

            setModule(data);
        } catch (error) {
            console.log(error);
        }
    }

    const showState = async () => {
        console.log(module);
    }

    // Temporary text
    const text = "Poi all'improvviso mi e scattato qualcosa nella testa e ho pensato. "

    return (
        <div>            
            <div>{ module ?                
                <div>
                    <h1>Quiz Page {module.title}</h1>
                    <PrepositionsQuiz text={module.text}></PrepositionsQuiz>
                    <button onClick={() => {navigate('/')}}>Home</button>
                    <button onClick={showState}>Show State</button> 
                </div>                
            : 
                null 
            }
            </div>            
        </div>
    )
}

export default QuizPage
