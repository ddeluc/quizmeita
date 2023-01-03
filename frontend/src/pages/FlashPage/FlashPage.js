// *** NOT IN USE ***
import React, { useState, useEffect } from 'react';
import style from './style.css';
import { useParams } from 'react-router-dom';
import Deck from '../../components/Deck/Deck';
import { useNavigate } from 'react-router-dom';
import * as api from "../../api/index.js";

function FlashPage() {
    const { id } = useParams();
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

    return (
        <div>
            <h1>Flash Page {id}</h1>
            <Deck text={module.text}></Deck>
            <button onClick={() => {navigate('/')}}>Home</button>
        </div>
    )
}

export default FlashPage
