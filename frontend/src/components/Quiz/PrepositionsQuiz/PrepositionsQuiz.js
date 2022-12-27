import { joinPaths } from "@remix-run/router";
import React, { useEffect, useState } from "react";
import prepositions from "../grammar";

function PrepositionsQuiz(text) {
    const [quiz, setQuiz] = useState();
    const [answers, setAnswers] = useState();
    const [score, setScore] = useState();

    useEffect(() => {
        generateQuiz(text)
    }, []);

    function recordAnswer(e, id) {
        setAnswers({ ...answers, [id+1]: e.target.value })            
    }

    function handleSubmit() {
        let score = {scoreArray: [], total: 0}
        for (let i = 0; i < quiz.answers.length; i++) {
            if (quiz.answers[i].preposition.toLowerCase() == answers[i+1].toLowerCase()) {
                score.scoreArray.push(1);
                score.total = score.total + 1;
            } else
                score.scoreArray.push(0);
        }
        
        setScore(score);
        console.log(score.total + " / " + score.scoreArray.length )
    }

    function testAnswers() {
        console.log(answers);
    }

    function generateQuiz(t) {
        // Temporary text
        const text = "Poi all'improvviso mi e scattato qualcosa nella testa e ho pensato."   
        console.log("here")

        // Two values to be returned
        let quiztext = "";
        let answers = [];

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
        
        // Prepare the quiz text
        let userAnswers = {}
        for (let i = 0; i < wordList.length; i++) {
            if (prepositions.includes(wordList[i])) {
                answers.push({index: i, preposition: wordList[i]});
                userAnswers[answers.length] = "";
                quiztext = quiztext.concat(`(${answers.length})____` + " ");
            } else {
                if (wordList[wordList.length-1] == "'") {
                    quiztext = quiztext.concat(wordList[i])
                } else {
                    quiztext = quiztext.concat(wordList[i] + " ")
                }                
            }            
        }

        setAnswers(userAnswers);
        setQuiz({quiztext: quiztext, answers: answers})
    }

    return (
        <>
            <div>
                Prepositions Quiz
                { quiz ?
                    <div>
                        <div>
                            <p>{quiz.quiztext}</p>
                        </div>
                        {/* <form onSubmit={handleSubmit}>
                            {quiz.answers.map((answer, i) => (
                                <input type="text"></input>
                            ))}
                            <input type="submit" value="Submit" />
                        </form> */}
                        <ul className="Answer-list">
                            {quiz.answers.map((answer, i) => (
                                <li key={i}>
                                    <label> {`(${i+1})    `}
                                        <input
                                            type="text"
                                            onChange={(e) => recordAnswer(e, i)}
                                            />
                                    </label>                                    
                                </li>                        
                            ))}
                        </ul>
                    </div>   
                :
                    null
                } 
            </div>
            <button onClick={handleSubmit}>Test Answers</button>
        </>        
    )
}

export default PrepositionsQuiz;