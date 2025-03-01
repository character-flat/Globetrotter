// src/components/Scoreboard.js
import React from "react";

const Scoreboard = ({ score }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "8px 12px",
        borderRadius: "6px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      <p style={{ margin: 0 }}>
        ✅ {score.correct_answers} &nbsp; ❌ {score.incorrect_answers}
      </p>
    </div>
  );
};

export default Scoreboard;
