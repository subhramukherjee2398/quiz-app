import React, { useEffect, useState } from "react";
import "./quizz.css";
import axios from "axios";
const Quizz = () => {
  const [allQuestions, setallQuestions] = useState([]);
  const [allAnswers, setAllanswers] = useState([]);
  const [allOptions, setAlloptions] = useState([]);
  const [currentQuestion, setCureentQuestion] = useState(-1);
  const [skip, setSkip] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=5`)
      .then((res) => {
        setallQuestions(res.data.results);
        setCureentQuestion(currentQuestion+1)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(
      allQuestions[currentQuestion]?.incorrect_answers,
      "no api call"
    );
    allQuestions[currentQuestion]?.incorrect_answers.push(
      allQuestions[currentQuestion]?.correct_answer
    );
    setAlloptions(allQuestions[currentQuestion]?.incorrect_answers);
  }, [currentQuestion]);

  const handleClick = (type) => {
    if (type == "next") {
      setCureentQuestion(currentQuestion + 1);
      setSkip(skip + 1);
    } else {
      setCureentQuestion(currentQuestion - 1);
    }
  };

  const submitAnswer = (answer, i) => {
    if (answer === allQuestions[i].correct_answer) {
      setResult(result + 1);
    }
    setCureentQuestion(currentQuestion + 1);
  };

  return (
    <div className="quiz-container">
      <div>Questions your score:{result} skip:</div>
      <div className="questions_numbers">
        <div>
          {currentQuestion+1} of {allQuestions.length}
        </div>
        <div className="questions">
          {allQuestions[currentQuestion]
            ? allQuestions[currentQuestion]?.question
            : "loading"}
        </div>
      </div>
      {console.log(allOptions, "allOptions")}
       <div className="option_container">
        {allOptions && allOptions.map((ans, i) => (
          <div
            className="q-item"
            key={i}
            onClick={() => submitAnswer(ans, currentQuestion)}
          >
            {ans}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={() => handleClick("prev")}>Prev</button>
        <button onClick={()=>window.location.reload()}>Quit</button>
        <button onClick={() => handleClick("next")}>Next</button>
      </div>
    </div>
  );
};

export default Quizz;
