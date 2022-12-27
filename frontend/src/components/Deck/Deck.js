import React, { useEffect, useState } from "react";
import Flashcard from "../Flashcard/Flashcard";

function Deck(t) {
    const [words, setWords] = useState([]);

    useEffect(() => {
        console.log("called");
        getWords();
    }, [])

    // TEMPORARY SOLUTION: Get nouns from the text
    function getWords() {
        // Temporary text
        const text = "Cane albero macchina cibo"    
        console.log(text.split(" "));
        setWords(text.split(" "));
    }

    return (
        <div>
            <div>
                Deck
            </div>            
            <div>
                <ul className="Flashcard-list">
                    {words.map(word => (
                        <li key={word}>
                            <Flashcard name={word}></Flashcard>
                        </li>                        
                    ))}
                </ul>
            </div>            
        </div>
    )
}

export default Deck;