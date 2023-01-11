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
    CardActions,
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
        <Card elevation={10} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', length: 100, width: 100, padding: 5, borderRadius: 5 }}>
            <Typography variant="h5">{face ? front : back}</Typography>
            <CardActions>
                <Button variant="contained" onClick={flip}>Flip</Button>
            </CardActions>            
        </Card>
    )
}

export default Flashcard;