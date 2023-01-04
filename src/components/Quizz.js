import React, { useEffect, useState } from "react";
import "./quizz.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Quizz = () => {
  const [allQuestions, setallQuestions] = useState([]);
  const [allAnswers, setAllanswers] = useState([]);
  const [allOptions, setAlloptions] = useState([]);
  const [currentQuestion, setCureentQuestion] = useState(0);
  const [skip, setSkip] = useState(0);
  const [result, setResult] = useState(0);
  const [Wrong, setWrong] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=20`)
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
    if (currentQuestion === 20) {
      let resultData = {
        "total numbers of questions": allQuestions.length,
        "number of attempt questions": allQuestions.length - skip,
        "number of correct questions": result,
        "number of wrong questions": Wrong,
      };
      localStorage.setItem("finalScore", JSON.stringify(resultData));
      navigate("/finalPage");
    }
  }, [currentQuestion]);

  const handleClick = (type) => {
    if (type === "next") {
      setCureentQuestion(currentQuestion + 1);
      setSkip(skip + 1);
    } else {
      console.log(allAnswers, "allAnswers");
      setCureentQuestion(currentQuestion - 1);
      console.log(allAnswers, "allAnswers");
      console.log(allQuestions[currentQuestion]?.question);
    }
  };

  const submitAnswer = (answer, i, currentQuestion) => {
    if (answer === allQuestions[currentQuestion].correct_answer) {
      setResult(result + 1);
    } else {
      setWrong(Wrong + 1);
    }
    setCureentQuestion(currentQuestion + 1);
    setAllanswers([...allAnswers, { id: i, answer, currentQuestion }]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="quiz-container">
        <div style={{ fontSize: "36px", fontWeight: "500" }}>Question</div>
        <div className="questions_numbers">
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
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
                className={
                  currentQuestion ===
                    allAnswers[currentQuestion]?.currentQuestion &&
                  i === allAnswers[currentQuestion]?.id
                    ? "selected-item"
                    : "q-item"
                }
                key={i}
                onClick={() => submitAnswer(ans, i, currentQuestion)}
              >
                {ans}
              </div>
            ))}
        </div>
        <div className="button-container">
          {currentQuestion > 0 && (
            <button onClick={() => handleClick("prev")} className="prev">
              {" "}
              Prev
            </button>
          )}
          <button onClick={() => navigate("/")} className="quit">
            Quit
          </button>
          <button onClick={() => handleClick("next")} className="next">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quizz;
