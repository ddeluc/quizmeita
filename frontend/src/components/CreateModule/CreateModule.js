import React from 'react';
import { useState } from 'react';
import style from './style.css';
import * as api from '../../api/index.js';
import { 
    Container,
    Link,
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

function CreateModule ({ addModule, user }) {
    const { text, setText } = useState();
    const [ error, setError ] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.createModule({title: e.target.title.value, text: e.target.text.value, author: user.username});
            addModule(data, false);

            console.log(data);
        } catch (error) {
            console.log(error);
            // setError(error.response.data.message)
        }        
    }
    
    return (
        <Paper sx={{ padding: 5, borderRadius: 10 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h5">Create Module</Typography>
                <TextField marign="normal" label="title" type="text" name="title" sx={{ mt: 3, mb: 2 }}></TextField>
                <TextField marign="normal" label="text" type="text" name="text" sx={{ mt: 2, mb: 2 }}></TextField>
                <Button type="Submit">Create</Button>
            </Box>
            <Box>
                {error}
            </Box>
        </Paper>

    )
}

export default CreateModule
