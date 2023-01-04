import React, { useEffect, useState } from "react";
import "./quizz.css";

const FinalPage = () => {
  const [result, setResult] = useState();

  useEffect(() => {
    let newObject = localStorage.getItem("finalScore");
    console.log(JSON.parse(newObject));
    setResult(JSON.parse(newObject));
  }, []);

  const percentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  };

  return (
    <div>
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/5526/5526457.png"
          className="logoImg"
          alt="logo"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <div className="result-container">
          <div>
            <center>
              <h1
                style={{
                  fontSize: "4rem",
                  color: "#187498",
                  fontWeight: "400",
                }}
              >
                Your Score :{" "}
                {result &&
                  percentage(
                    result["number of correct questions"],
                    result["total numbers of questions"]
                  )}
                %
              </h1>
            </center>
          </div>
          {result &&
            Object.keys(result).map((ele) => (
              <div className="score-board">
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "1rem",
                    color: "#757575",
                  }}
                >
                  {ele.toUpperCase()}
                </div>
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "1.2rem",
                    color: "#757575",
                  }}
                >
                  {result[ele]}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FinalPage;
