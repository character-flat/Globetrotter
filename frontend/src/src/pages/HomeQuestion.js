import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import QuestionCard from "../components/QuestionCard";
import Scoreboard from "../components/Scoreboard";
import WhatsAppShareButton from "../components/WhatsAppShareButton";
import { fetchQuestion, submitAnswer } from "../api/connection";
import Confetti from "react-confetti";

const HomeQuestion = () => {
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [funFact, setFunFact] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [btnStyle, setBtnStyle] = useState({});
  const [score, setScore] = useState({
    correct_answers: 0,
    incorrect_answers: 0,
  });
  const [animation, setAnimation] = useState(""); // "confetti" or "sad"
  
  const userName = Cookies.get("user_name");

  useEffect(() => {
    fetchQuestion().then(setQuestion);
  }, []);

  const handleAnswer = async (selectedAnswer) => {
    if (!userName) {
      alert("Please log in first!");
      return;
    }
    const result = await submitAnswer(question.id, selectedAnswer, userName);

    // Update the local score state if the API returned it
    if (result.score) {
      setScore({
        correct_answers: result.score.correct_answers || 0,
        incorrect_answers: result.score.incorrect_answers || 0,
      });
    }

    setFeedback(result.feedback);
    setFunFact(result.fun_fact);
    setShowNext(true);

    // Set animation based on feedback: if it contains "🎉", it's correct; if "😢", it's wrong.
    if (result.feedback.includes("🎉")) {
      setAnimation("confetti");
    } else if (result.feedback.includes("😢")) {
      setAnimation("sad");
    } else {
      setAnimation("");
    }

    // Random position for "Next Question" button
    setBtnStyle({
      position: "absolute",
      top: `${Math.random() * 70 + 10}%`,
      left: `${Math.random() * 70 + 10}%`,
      transition: "all 0.3s ease-in-out",
    });
  };

  const handleNextQuestion = async () => {
    setFeedback("");
    setFunFact("");
    setShowNext(false);
    setAnimation(""); // Reset animation when moving to the next question
    const newQuestion = await fetchQuestion();
    setQuestion(newQuestion);
  };

  return (
    <div className="home1" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Scoreboard in top-right corner */}
      <Scoreboard score={score} />

      {/* Confetti Animation for correct answer */}
      {animation === "confetti" && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {/* Sad face animation for incorrect answer */}
      {animation === "sad" && (
        <div className="sad-face">😢</div>
      )}

      {/* Display question if available and no feedback/funFact is shown */}
      {question && !(feedback || funFact) && (
        <QuestionCard
          clues={question.clues}
          options={question.options}
          onSelect={handleAnswer}
        />
      )}

      {/* Show feedback and fun fact */}
      {feedback && funFact && (
        <div className="question-card">
          <p>{feedback}</p>
          <p>{funFact}</p>
        </div>
      )}

      {/* Next question button with random position */}
      {showNext && (
        <button className="next-btn" style={btnStyle} onClick={handleNextQuestion}>
          Next Question
        </button>
      )}

      {/* WhatsApp share button at bottom-center */}
      <WhatsAppShareButton userName={userName} score={score} />
    </div>
  );
};

export default HomeQuestion;
