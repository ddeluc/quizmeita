// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

import React, { useState } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as api from "../../api/index.js";
// import "./style.css";



function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Created by '}
        <Link color="inherit" href='https://github.com/ddeluc'>
          Dante Deluca
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const theme = createTheme({
    
});

function Auth({ setUserData, setToken }) {
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        if(isSignup) {
            // handle signup
            try { 
                const { data } = await api.signUp(formData);
                const token = data.token;

                // Setup user data and token
                setUserData(data.result);
                setToken(token);
                localStorage.setItem('token', JSON.stringify(token));

                console.log("Signed Up!")
            } catch (error) {
                console.log(error);
                setError(error.response.data.message);
            }           

        } else {
            // handle signin
            try {    
                const { data } = await api.signIn(formData);
                console.log(data);
                const token = data.token

                // Setup user data and token
                setUserData(data.result);
                setToken(token);
                localStorage.setItem('token', JSON.stringify(token));

                console.log("Signed In!")
            } catch (error) {
                console.log(error);
                setError(error.response.data.message);
            }           
        }
    };
    
    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper rounded={10} elevation={10} sx={{ padding: 4, mt: 8, borderRadius: 10 }}>
                <Box sx={{  
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', 
                    }}>
                    
                    <Typography fontFamily={"Helvetica"} variant="h2">Quizshare</Typography>
                    <Typography variant="h4">Italian</Typography>
                        
                    <Box component="form" className="form">
                        <Typography sx={{ marginTop: 2 }} variant="h5">
                            {isSignup ? "Sign up" : "Log In"}
                        </Typography>
            
                        <TextField
                            margin='normal'
                            error={error ? true : false}
                            fullWidth
                            helperText={error}
                            onChange={handleChange}
                            label="Username" 
                            variant='standard' 
                            type="text" 
                            name="username" 
                            minLength={5} 
                            maxLength={12}
                        />                   
                        <TextField
                            margin='normal'
                            fullWidth
                            error={error ? true : false}
                            helperText={error}
                            onChange={handleChange} 
                            label="Password" 
                            type="text" 
                            name="password" 
                            variant='standard' 
                            minLength={8}
                        />                    
                        { isSignup && <TextField
                            margin='normal'
                            fullWidth
                            error={error ? true : false}
                            helperText={error}
                            onChange={handleChange} 
                            label="Confirm Password" 
                            type="text" 
                            name="confirmPassword" 
                            variant='standard' 
                            minLength={8}
                        /> 
                        }               
                        <Button
                            sx={{ mt: 3, mb: 2 }}
                            fullWidth
                            variant='contained' 
                            className="form__custom-button" 
                            onClick={handleSubmit} 
                            type="submit"
                        >
                            Log In
                        </Button>
                    </Box>
                </Box>
            
                
            <Button type="button" onClick={() => {setIsSignup(!isSignup); setError(null)}}>
                { isSignup ? "Log In" : "Sign Up" }
            </Button>
            </Paper>            
            </Container>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </ThemeProvider>
        
      )
}

export default Auth;