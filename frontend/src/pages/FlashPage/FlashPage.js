import React from 'react';
import style from './style.css';
import { useParams } from 'react-router-dom';
import Deck from '../../components/Deck/Deck';
import { useNavigate } from 'react-router-dom';

function FlashPage() {
    const { id } = useParams();

    const navigate = useNavigate();

    return (
        <div>
            <h1>Flash Page {id}</h1>
            <Deck></Deck>
            <button onClick={() => {navigate('/')}}>Home</button>
        </div>
    )
}

export default FlashPage
