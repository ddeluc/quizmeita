import React, { useEffect, useState } from "react";
import Flashcard from "../Flashcard/Flashcard";
import * as api from "../../api/index.js";

function Deck({ module }) {
    const [flashcards, setFlashcards] = useState();

    useEffect(() => {
        addFlashcards();
    }, [])

    function getWords() {
        // Temporary text
        const text = "testa istante libertà"    
        console.log(text.split(" "));
        return(text.split(" "));
    }

    const addFlashcards = async () => {
        // FIX: Why is this function firing twice?
        console.log("I fire once.")

        let fc = []
        const words = getWords();

        words.forEach(word => {
            let flashcard = {front: word, back: "*translation*"}
            fc.push(flashcard);
        })

        try {
            console.log(module)
            const { data } = await api.addFlashcards(module._id, {flashcards: fc});

            setFlashcards(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div>
                Deck
            </div>
            { flashcards ?
                <div>
                    <ul className="Flashcard-list">
                        {flashcards.map(flashcard => (
                            <li key={flashcard._id}>
                                <Flashcard front={flashcard.front} back={flashcard.back}></Flashcard>
                            </li>                        
                        ))}
                    </ul>
                </div> 
            :
                null
            }            
                       
        </div>
    )
}

export default Deck;