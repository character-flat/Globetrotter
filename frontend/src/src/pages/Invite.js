// Example: src/pages/Invite.js
import React, { useState, useEffect } from "react";
import { getUserScore } from "../api/connection"; // hypothetical API call

const Invite = () => {
  const [score, setScore] = useState({ correct_answers: 0, incorrect_answers: 0 });
  const [loading, setLoading] = useState(true);
  const handleClick = () =>{
    window.location.href = "/";
  }
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invitedUser = params.get("inviter");
    if (!invitedUser) return;

    getUserScore(invitedUser).then((res) => {
      setScore(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading score...</p>;

  return (
    <div>
      <h1>{`Score for your friend: ✅ ${score.correct_answers} | ❌ ${score.incorrect_answers}`}</h1>
      <button className="next-btn" onClick={handleClick}> Play Now</button>
    </div>
  );
};

export default Invite;
