import { joinPaths } from "@remix-run/router";
import React, { useEffect, useState } from "react";
import prepositions from "./grammar";
import * as grammar from "./grammar";

function Quiz({ text }) {
    const [quiz, setQuiz] = useState();
    const [showAnswers, setShowAnswers] = useState(false);
    const [answers, setAnswers] = useState();
    const [score, setScore] = useState();

    useEffect(() => {
        console.log(text);
        generateQuiz(text, 1)
    }, []);

    function recordAnswer(e, id) {
        setAnswers({ ...answers, [id+1]: e.target.value })            
    }

    function handleSubmit() {
        let score = {scoreArray: [], total: 0}
        for (let i = 0; i < quiz.answers.length; i++) {
            if (quiz.answers[i].ans.toLowerCase() == answers[i+1].toLowerCase()) {
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
        let userAnswers = {}
        for (let i = 0; i < wordList.length; i++) {
            if (reference.includes(wordList[i].replace(`"`, '').toLowerCase())) {
                answers.push({index: i, ans: wordList[i].replace(`"`, '')});
                let quotation = wordList[i].includes(`"`) ? `"` : '';
                userAnswers[answers.length] = "";
                quiztext = quiztext.concat(`${quotation}(${answers.length})____` + " ");
            } else {
                if (wordList[wordList.length-1] == "'") {
                    quiztext = quiztext.concat(wordList[i])
                } else {
                    quiztext = quiztext.concat(wordList[i] + " ")
                }                
            }            
        }

        setAnswers(userAnswers);
        setQuiz({quiztext: quiztext, answers: answers, type: quizTitle})
    }

    return (
        <>
            <div>
                { quiz ?
                    <div>
                    {quiz.type} Quiz
                        <div>
                            <p>{quiz.quiztext}</p>
                        </div>
                        <ul className="Answer-list">
                            {quiz.answers.map((answer, i) => (
                                <li key={i}>
                                    <label> {`(${i+1})    `}
                                        <input
                                            type="text"
                                            onChange={(e) => recordAnswer(e, i)}
                                            />
                                        {`   ${score ? score.scoreArray[i] ? "correct" : "incorrect" : ""}`}
                                        {`${showAnswers && !score.scoreArray[i] ? ":   " + quiz.answers[i].ans : ""}`}
                                    </label>                                                                                                       
                                </li>                        
                            ))}
                        </ul>
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