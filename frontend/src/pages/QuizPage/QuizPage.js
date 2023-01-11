import React, { useEffect, useState } from 'react';
import style from './style.css';
import { useParams } from 'react-router-dom';
import Quiz from '../../components/Quiz/Quiz';
import { useNavigate } from "react-router-dom";
import * as api from "../../api/index.js";
import Deck from '../../components/Deck/Deck';
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
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    
});

function QuizPage() {
    const { username, id } = useParams()
    const [module, setModule] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        getModule();
    }, [])

    const getModule = async () => {
        console.log(id);
        try {
            console.log(id);
            const { data } = await api.getModule(username, id);

            setModule(data);
        } catch (error) {
            console.log(error);
        }
    }

    const showState = async () => {
        console.log(module);
    }

    return (
        // <div>            
        //     <div>
        //     { module ?                
        //         <div>
        //             <h1>{module.title}</h1>
        //             <Quiz text={module.text}></Quiz>
        //             <button onClick={() => {navigate('/')}}>Home</button>
        //             <button onClick={showState}>Show State</button>
        //             {/* FIX: Find dictionary api before continuing with flashcards */}
        //             <Deck module={module}></Deck>
        //         </div>                
        //     : 
        //         null 
        //     }
        //     </div>           
        // </div>
        <ThemeProvider theme={theme}>
            { module ?
            <Grid container display="flex" justifyContent="center">
                <Grid item display="flex" justifyContent="center" xs={12}>
                    <Typography variant='h2' sx={{ paddingTop: 4, paddingBottom: 4}}>
                        {module.title}
                    </Typography>
                </Grid>
                <Grid item display="flex" justifyContent="center" xs={12}>
                    <Box>
                        <Quiz text={module.text}></Quiz>
                    </Box>
                </Grid>
                <Grid item display="flex" justifyContent="center" xs={12}>                    
                    <Deck module={module}></Deck>                                        
                </Grid>
            </Grid>
            :
                <Box>No Module</Box>
            }
        </ThemeProvider>
        
    )
}

export default QuizPage
