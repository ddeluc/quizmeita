import { joinPaths } from "@remix-run/router";
import React, { useEffect, useState, useRef } from "react";
import prepositions from "./grammar";
import * as grammar from "./grammar";
import { 
    Modal,
    Fade, 
    Typography,
    Container, 
    Input,
    Button, 
    Grid,
    Paper, 
    Box,
    FormControl, 
    CssBaseline,
    TextField,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { blue } from "@mui/material/colors";

const theme = createTheme({

});

function Quiz({ text }) {
    const [quiz, setQuiz] = useState();
    const [showAnswers, setShowAnswers] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState();

    // Temporary state solution
    const [quiztexts, setQuiztexts] = useState();

    useEffect(() => {
        console.log(text);
        generateQuiz(text, 1)
    }, []);

    function recordAnswer(e, id) {
        console.log(id + " " + e.target.value);
        setAnswers({ ...answers, [id]: e.target.value })            
    }

    function handleSubmit() {
        
        console.log(quiz.answers)
        let score = {scoreArray: [], total: 0}
        for (let i = 0; i < quiz.answers.length; i++) {
            if (answers[i]) {
                if (quiz.answers[i].ans.toLowerCase() == answers[i].toLowerCase()) {
                    score.scoreArray.push(1);
                    score.total = score.total + 1;
                } else
                    score.scoreArray.push(0);
            } else
                score.scoreArray.push(0);
        }   
        
        setScore(score);
        setShowAnswers(true);
        console.log(score);
        console.log(score.total + " / " + score.scoreArray.length)
    }

    function generateQuiz(text, quiztype) {

        // Two values to be returned
        let quiztext = "";
        let answers = [];
        let reference = [];
        let quizTitle = "";

        // Assign appropriate quiz
        switch(quiztype) {
            case 1:
                reference = grammar.prepositions;
                quizTitle = "Prepositions"
                break;
            case 2: 
                reference = grammar.articles;
                quizTitle = "Articles"
                break;
            default:
        }


        // Handle apostrophies
        let preWordList = text.split("'");
        for (let i = 0; i < preWordList.length-1; i++) {
            preWordList[i] = preWordList[i].concat("'");
        } 

        // Create the list of words
        let wordList = [];
        for (let i = 0; i < preWordList.length; i++) {
            wordList = wordList.concat(preWordList[i].split(" "))
        }
        
        console.log(wordList);
        
        // Prepare the quiz text
        // FIX: The quotation solution in this function only applies to prepositions!
        let userAnswers = {};
        let quizTexts = [];
        let sentence = "";
        for (let i = 0; i < wordList.length; i++) {
            if (reference.includes(wordList[i].replace(`"`, '').toLowerCase())) {

                answers.push({index: i, ans: wordList[i].replace(`"`, '')});
                userAnswers[answers.length] = "";
                
                wordList[i] = "*preposition*";
                let quotation = wordList[i].includes(`"`) ? `"` : '';
                if (wordList[i-1])
                    wordList[i-1].concat(quotation);

                

                // ---- CURRENT CODE ----
                // let quotation = wordList[i].includes(`"`) ? `"` : '';
                // sentence = sentence.concat(`${quotation}`);
                // quizTexts.push([" " + sentence, 0]);
                // sentence = "";

                // quizTexts.push(["*preposition*", answers.length]);

                // answers.push({index: i, ans: wordList[i].replace(`"`, '')});
                
                // userAnswers[answers.length] = "";
            }
            // } else {
            //     if (wordList[wordList.length-1] == "'") {
            //         sentence = sentence.concat(wordList[i])
            //     } else {
            //         sentence = sentence.concat(wordList[i] + " ")
            //     }               
            // }  
        }

        quizTexts.push([" " + sentence, 0]);

        setAnswers(userAnswers);
        setQuiztexts(quizTexts);
        setQuiz({quiztext: wordList, answers: answers, type: quizTitle})
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container display="flex" justifyContent="center">
                <Grid item display="flex" justifyContent="center" xs={2}>
                    <Box justifyContent="center" sx={{ alignItems: 'center', flexDirection: 'column', display: 'flex'}}>
                        <Button variant="outlined" onClick={() => generateQuiz(text, 1)}>Previous</Button>
                    </Box>
                </Grid>
                <Grid item display="flex" justifyContent="center" xs={8}>                    
                    { quiz ?
                        <Box sx={{  
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center', 
                            }}>                                                 
                            <Typography variant="h4" sx={{ paddingBottom: 3 }}>
                                {quiz.type} Quiz 
                            </Typography>
                            <Paper elevation={10} sx={{ padding: 5, borderRadius: 10 }}>
                                <Grid container>  
                                    {quiz.quiztext.map((word) => (
                                        word === "*preposition*" ?
                                            <>
                                                <Typography sx={{ paddingBottom: 1 }} whiteSpace="pre"> </Typography>
                                                <Input maxLength={5} type="text" sx={{ height: 27, width: 60 }}
                                                    onChange={(e) => recordAnswer(e, text[1])}/>  
                                                <Typography sx={{ paddingBottom: 1 }} whiteSpace="pre">  </Typography>
                                            </>                     
                                        :
                                            
                                            <Typography whiteSpace="pre" sx={{ paddingBottom: 1 }}>{word} </Typography>
                                            
                                            
                                    ))}
                                </Grid>
                            </Paper>
                            <Box sx={{ padding: 4 }}>
                                <Button size="large" variant="contained" onClick={handleSubmit}>Submit</Button>
                            </Box>                            
                        </Box>   
                    :
                        null
                    } 
                </Grid>
                <Grid item display="flex" justifyContent="center" xs={2}>
                    <Box justifyContent="center" sx={{ alignItems: 'center', flexDirection: 'column', display: 'flex'}}>
                        <Button variant="outlined" onClick={() => generateQuiz(text, 2)}>Next</Button> 
                    </Box>                                         
                </Grid>
            </Grid>
        </ThemeProvider>        
    )
}

export default Quiz;