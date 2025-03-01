const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";
export const fetchQuestion = async () => {
  const response = await fetch(`${API_BASE_URL}/get-question`);
  return response.json();
};

export const submitAnswer = async (questionId, answer, userName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/submit-answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: questionId,
          answer: answer,
          user_name: userName,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error submitting answer:", error);
      return { error: "Failed to submit answer" };
    }
  };

export const isUnique = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/is-unique`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_name: userId }),
    });

    const data = await response.json();
    return data; // Should return true/false
  } catch (error) {
    console.error("Error checking uniqueness:", error);
    return false; // Assume not unique if an error occurs
  }
};

export const createProfile = async (userId) => {
  try {
    await fetch(`${API_BASE_URL}/create-profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_name: userId }),
    });
  } catch (error) {
    console.error("Error creating profile:", error);
  }
};

export const getUserScore = async (userName) => {
    const response = await fetch(`${API_BASE_URL}/user-score?userName=${userName}`);
    return response.json();
  };
  