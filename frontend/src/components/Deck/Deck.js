import React, { useEffect, useState } from "react";
import Flashcard from "../Flashcard/Flashcard";
import * as api from "../../api/index.js";
import { 
    Modal,
    Fade, 
    Typography, 
    Button, 
    Grid,
    Paper, 
    Box,
    FormControl, 
    CssBaseline,
    TextField,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({

});


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
        // <div>
        //     <div>
        //         Deck
        //     </div>
        //     { flashcards ?
        //         <div>
        //             <ul className="Flashcard-list">
        //                 {flashcards.map(flashcard => (
        //                     <li key={flashcard._id}>
        //                         <Flashcard front={flashcard.front} back={flashcard.back}></Flashcard>
        //                     </li>                        
        //                 ))}
        //             </ul>
        //         </div> 
        //     :
        //         null
        //     }                      
        // </div>
        <ThemeProvider theme={theme}>
            <Box sx={{  
                padding: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
            }}>
                <Typography variant="h4" sx={{ paddingBottom: 5 }}>Deck</Typography>
                { flashcards ?
                    <Grid container justifyContent="center" spacing={10}>
                        {flashcards.map((flashcard) => (
                            <Grid item key={flashcard._id}>
                                <Flashcard front={flashcard.front} back={flashcard.back}></Flashcard>
                            </Grid>
                        ))}
                    </Grid>
                :   
                    <Typography>No Flashcards</Typography>
                }
            </Box>
        </ThemeProvider>
    )
}

export default Deck;