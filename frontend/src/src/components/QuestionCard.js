import React from "react";

const QuestionCard = ({ clues, options, onSelect }) => {
  return (
    <div className="question-card">
      <h2>Guess the Destination! 🌍</h2>
      <p>{clues[0]}</p>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => onSelect(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
