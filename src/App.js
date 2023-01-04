import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quizz from "./components/Quizz";
import FinalPage from "./components/FinalPage";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/finalPage" element={<FinalPage />} />
          <Route exact path="/quiz-board" element={<Quizz />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
