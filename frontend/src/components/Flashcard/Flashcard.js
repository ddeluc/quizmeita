import React, { useEffect, useState } from "react";
import * as wr from "wordreference-api";
import { 
    Container,
    Link,
    Card,
    colors,
    Paper,
    TextField, 
    Typography, 
    Button, 
    Grid, 
    Box,
    FormControl, 
    CssBaseline,
} from '@mui/material';

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
        <Card>
            <Box>
                <Typography>Flashcard {front}</Typography>
            </Box>
            <Button onClick={translate}>Translate</Button>            
            <Button onClick={flip}>Flip</Button>
            { face ?
                <Typography>{front}</Typography>
            :
                <Typography>{back}</Typography>
            }
        </Card>
    )
}

export default Flashcard;