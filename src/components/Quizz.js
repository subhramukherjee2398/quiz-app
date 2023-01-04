import React, { useEffect, useState } from "react";
import "./quizz.css";
import axios from "axios";
const Quizz = () => {
  const [allQuestions, setallQuestions] = useState([]);
  const [allAnswers, setAllanswers] = useState([]);
  const [allOptions, setAlloptions] = useState([]);
  const [currentQuestion, setCureentQuestion] = useState(0);
  const [skip, setSkip] = useState(0);
  const [result, setResult] = useState(0);
  const [Wrong, setWrong] = useState(0);

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=5`)
      .then((res) => {
        setallQuestions(res.data.results);
        res.data.results[currentQuestion]?.incorrect_answers.push(
          res.data.results[currentQuestion]?.correct_answer
        );
        setAlloptions(res.data.results[currentQuestion]?.incorrect_answers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.warn("calling", currentQuestion);
    if (
      !allQuestions[currentQuestion]?.incorrect_answers.includes(
        allQuestions[currentQuestion]?.correct_answer
      )
    ) {
      allQuestions[currentQuestion]?.incorrect_answers.push(
        allQuestions[currentQuestion]?.correct_answer
      );
    }
    setAlloptions(allQuestions[currentQuestion]?.incorrect_answers);
    if (currentQuestion === 5) {
      //write logic
      alert("finish");
    }
  }, [currentQuestion]);

  const handleClick = (type) => {
    if (type === "next") {
      setCureentQuestion(currentQuestion + 1);
      setSkip(skip + 1);
    } else {
      console.log(allAnswers, "allAnswers");
      setCureentQuestion(currentQuestion - 1);
    }
  };

  const submitAnswer = (answer, i) => {
    if (answer === allQuestions[i].correct_answer) {
      setResult(result + 1);
    } else {
      setWrong(Wrong + 1);
    }
    setCureentQuestion(currentQuestion + 1);
    setAllanswers([...allAnswers, { id: i, answer }]);
  };

  return (
    <div className="quiz-container">
      <div>
        Questions your score:{result} skip:{skip} wrong:{Wrong}
      </div>
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
      {console.log(allOptions, "allOptions")}
      <div className="option_container">
        {allOptions &&
          allOptions.map((ans, i) => (
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
        <button onClick={() => window.location.reload()}>Quit</button>
        <button onClick={() => handleClick("next")}>Next</button>
      </div>
    </div>
  );
};

export default Quizz;
