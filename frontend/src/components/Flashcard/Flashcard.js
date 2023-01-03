import React, { useEffect, useState } from "react";
import * as wr from "wordreference-api";

function Flashcard({ front, back }) {
    const [face, setFace] = useState(true);

    function flip() {
        setFace(!face);
    }

    const translate = () => {
        const def = wr(front, 'it', 'en');
        console.log(def);
    }

    return (
        <div>
            <div>
                Flashcard {front}
            </div>
            <button onClick={translate}>Translate</button>            
            <button onClick={flip}>Flip</button>
            { face ?
                <div>{front}</div>
            :
                <div>{back}</div>
            }
        </div>
    )
}

export default Flashcard;