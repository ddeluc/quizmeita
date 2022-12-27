import React, { useEffect, useState } from "react";

function Flashcard({ name }) {
    const [front, setFront] = useState();
    const [back, setBack] = useState("*Translation*");
    const [face, setFace] = useState(true);

    useEffect(() => {
        setFront(name);
    }, [])

    function flip() {
        setFace(!face);
    }

    return (
        <div>
            <div>
                Flashcard {front}
            </div>            
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