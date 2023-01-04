import React, { useEffect, useState } from "react";
import "./quizz.css";
import axios from "axios";
const Quizz = () => {
  const [allQuestions, setallQuestions] = useState([]);
  const [allAnswers, setAllanswers] = useState([]);
  const [currentQuestion, setCureentQuestion] = useState(0);
  const [skip, setSkip] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=20`)
      .then((res) => {
        console.table(res.data.results);
        setallQuestions(res.data.results);
        let allOptions = res.data.results[currentQuestion]?.incorrect_answers;
        allOptions.push(res.data.results[currentQuestion]?.correct_answer);
        setAllanswers(allOptions);
      });
  }, [currentQuestion]);

  const handleClick = () => {
    setCureentQuestion(currentQuestion + 1);
    setSkip(skip + 1);
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
          {currentQuestion + 1} of {allQuestions.length}
        </div>
        <div className="questions">
          {allQuestions[currentQuestion]
            ? allQuestions[currentQuestion]?.question
            : "loading"}
        </div>
      </div>
      <div className="option_container">
        {allQuestions[currentQuestion]?.incorrect_answers.map((ans, i) => (
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
        <button>Prev</button>
        <button>Prev</button>
        <button onClick={() => handleClick()}>Next</button>
      </div>
    </div>
  );
};

export default Quizz;
