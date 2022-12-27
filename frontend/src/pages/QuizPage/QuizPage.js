import React from 'react';
import style from './style.css';
import { useParams } from 'react-router-dom';
import PrepositionsQuiz from '../../components/Quiz/PrepositionsQuiz/PrepositionsQuiz';
import { useNavigate } from "react-router-dom";

function QuizPage() {
    const { id } = useParams()

    const navigate = useNavigate();

    // Temporary text
    const text = "Poi all'improvviso mi e scattato qualcosa nella testa e ho pensato. "

    return (
        <div>
            <h1>Quiz Page {id}</h1>
            <PrepositionsQuiz text={text}></PrepositionsQuiz>
            <button onClick={() => {navigate('/')}}>Home</button>
        </div>
    )
}

export default QuizPage
