import { joinPaths } from "@remix-run/router";
import React, { useEffect, useState } from "react";
import prepositions from "./grammar";
import * as grammar from "./grammar";

function Quiz({ text }) {
    const [quiz, setQuiz] = useState();
    const [showAnswers, setShowAnswers] = useState(false);
    const [answers, setAnswers] = useState();
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
        let score = {scoreArray: [], total: 0}
        for (let i = 0; i < quiz.answers.length; i++) {
            if (quiz.answers[i].ans.toLowerCase() == answers[i].toLowerCase()) {
                score.scoreArray.push(1);
                score.total = score.total + 1;
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
                
                let quotation = wordList[i].includes(`"`) ? `"` : '';
                sentence = sentence.concat(`${quotation}`);
                quizTexts.push([" " + sentence, 0]);
                sentence = "";

                quizTexts.push(["*preposition*", answers.length]);

                answers.push({index: i, ans: wordList[i].replace(`"`, '')});
                
                userAnswers[answers.length] = "";

            } else {
                if (wordList[wordList.length-1] == "'") {
                    sentence = sentence.concat(wordList[i])
                } else {
                    sentence = sentence.concat(wordList[i] + " ")
                }               
            }  
        }

        quizTexts.push([" " + sentence, 0]);

        setAnswers(userAnswers);
        setQuiztexts(quizTexts);
        setQuiz({quiztext: quiztext, answers: answers, type: quizTitle})
    }

    return (
        <>
            <div>
                { quiz ?
                    <div>
                    {quiz.type} Quiz
                        {quiztexts.map((text, i) => (
                            text[0] === "*preposition*" ?
                                <label>
                                    <input
                                        type="text"
                                        onChange={(e) => recordAnswer(e, text[1])}
                                        />
                                    {/* {`   ${score ? score.scoreArray[i] ? "correct!" : "incorrect" : ""}`}
                                    {`${showAnswers && !score.scoreArray[i] ? ":   " + quiz.answers[i].ans : ""}`} */}
                                </label> 
                            :
                                <>{text[0]}</>
                        ))}
                        {/* <div>
                            <p>{quiz.quiztext}</p>
                        </div> */}
                        {/* <ul className="Answer-list">
                            {quiz.answers.map((answer, i) => (
                                <li key={i}>
                                    <label> {`(${i+1})    `}
                                        <input
                                            type="text"
                                            onChange={(e) => recordAnswer(e, i)}
                                            />
                                        {`   ${score ? score.scoreArray[i] ? "correct!" : "incorrect" : ""}`}
                                        {`${showAnswers && !score.scoreArray[i] ? ":   " + quiz.answers[i].ans : ""}`}
                                    </label>                                                                                                       
                                </li>                        
                            ))}
                        </ul> */}
                    </div>   
                :
                    null
                } 
            </div>
            <button onClick={() => generateQuiz(text, 2)}>Next Quiz</button>
            <button onClick={handleSubmit}>Submit</button>
        </>        
    )
}

export default Quiz;