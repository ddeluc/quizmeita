import React from 'react';
import { useState } from 'react';
import style from './style.css';
import { useNavigate } from "react-router-dom";
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

function Module({ username, module, handleModuleClick, deleteModule, selected}) {
    const [text, setText] = useState();
    // const [selected, setSelected] = useState(false);

    const navigate = useNavigate();

    const handleQuiz = () => {
        console.log(module.title + " called")
        navigate(`/quiz/${username}/${module._id}`)

        // Pass the module text to the QuizPage

    }

    return (
        // <div onClick={() => {handleModuleClick(module._id)}}>
        //     <div>
        //         {module.title}
        //     </div>
        //     { selected ?
        //         <div>
        //             <button onClick={handleQuiz}>Quiz</button>
        //             <button onClick={() => {deleteModule(module._id)}}>Delete</button>
        //         </div>
        //     :
        //         null
        //     }            
        // </div>
        <Card onClick={() => {handleModuleClick(module._id)}}>
            <Typography variant='h5'>{module.title}</Typography>
            { selected ? 
                <Box>
                    <Button variant='contained' onClick={handleQuiz}>Quiz</Button>
                    <Button variant='contained' onClick={() => {deleteModule(module._id)}}>Delete</Button>
                </Box>
            :
                null
            }
        </Card>
    )
}

export default Module
