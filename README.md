
# Globetrotter Game

**Globetrotter** is an interactive quiz game where users can challenge their friends and track their scores. The game displays random questions with multiple-choice options and provides instant feedback. Players can share their scores via WhatsApp, inviting friends to compete.
---

***Note: While visiting the website, you might sometimes notice no response from the backend. This is because Render automatically shuts down your instance when it’s not in use on the free tier. As a result, you may have to wait about 30 seconds for it to restart.***

## Repository Structure (Monorepo)

This repository is organized as a monorepo to simplify development and deployment. It contains:

- **app/** – Contains the FastAPI backend.
- **frontend/** – Contains the React frontend.

This structure makes it easier to manage both codebases together and lays the groundwork for future consolidated deployment using Docker.

---

## Tech Stack

- **Frontend:**  
  - **React.js** – For building the user interface.  
  - **Vercel** – Deployment platform for the frontend (supports React applications).

- **Backend:**  
  - **FastAPI** – A modern, high-performance web framework for building APIs with Python 3.7+.  
  - **Render** – Cloud platform to deploy the FastAPI backend.

- **Database:**  
  - **MongoDB (Atlas)** – A NoSQL database for flexible, JSON-like data storage, used for storing user data and game questions.

- **State Management:**  
  - **React Hooks** – For managing application state and session data (user login, score, etc.).  
  - **Cookies** – To store the user’s session and username.

- **External Services:**  
  - **WhatsApp API** – For sharing game scores and inviting friends via WhatsApp.  
  - **Picsum** – For fetching random images ([https://picsum.photos/](https://picsum.photos/)).

---

## Features

- **User Authentication:**  
  - Login via a unique user ID (stored in a cookie for session persistence).  
  - Checks if the username is unique and allows users to create a profile.

- **Gameplay Mechanics:**  
  - Answer multiple-choice questions.  
  - Receive immediate feedback (correct/incorrect) along with a fun fact related to the question.

- **Scoring System:**  
  - Tracks correct and incorrect answers in real-time.  
  - Displays scores after each round and tracks progress over time.

- **Social Sharing:**  
  - Share scores with friends via WhatsApp.  
  - Generate a unique invite link to challenge friends that includes the inviter’s score.  
  - Invited users can view the inviter’s score before playing.

- **Animations:**  
  - Confetti animation for correct answers.  
  - Sad face animation for incorrect answers.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/character-flat/Globetrotter.git
cd Globetrotter
```

The repository is structured as a monorepo, with the backend and frontend located in root folder.

### 2. Frontend (React.js)

- Navigate to the frontend folder:

  ```bash
  cd frontend/
  npm install
  ```

- Run the development server:

  ```bash
  npm start
  ```

- The app will be available at [http://localhost:3000](http://localhost:3000).

### 3. Backend (FastAPI)

- Navigate to the backend folder:

  ```bash
  pip install -r requirements.txt
  ```

- Run the backend:

  ```bash
  uvicorn app.main:app --reload
  ```

- The API will be available at [http://localhost:8000](http://localhost:8000).

### 4. Database (MongoDB)

- Create a MongoDB cluster in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Update the connection URI in the backend’s `config.py` file.

---

## Environment Variables

Set the following environment variables in your backend environment:

- **`MONGO_URI`**: Your MongoDB connection string.
- **`API_BASE_URL`**: Base URL for API requests (e.g., `http://localhost:8000` for local development).

---

## Tech Decisions & Architecture

- **Why React.js?**  
  React.js was chosen for its component-based architecture, enabling a clean and maintainable UI that supports dynamic content updates based on user interaction.

- **Why FastAPI?**  
  FastAPI is lightweight, asynchronous, and extremely fast in handling web requests, making it ideal for this real-time quiz application. Additionally, it offers a modern approach as I continue to learn and apply Python's latest features.

- **Why MongoDB?**  
  MongoDB’s NoSQL structure is well-suited for handling dynamic and unstructured data like quiz questions and user progress. This flexibility allows for easy scaling as the dataset grows.

- **Why Vercel & Render?**  
  Vercel is optimized for deploying React apps with automatic deployment pipelines, while Render offers an easy-to-use, scalable platform for deploying FastAPI backends. I opted to deploy the frontend and backend separately since I couldn’t find a free service supporting both Python and Node environments in one.

- **Monorepo Advantage:**  
  Organizing the project as a monorepo allows for easier coordination between the frontend and backend codebases, consistent version control, and the potential to consolidate deployments in the future.

- **Future Docker Integration:**  
  Docker could be used in the future to containerize both the React frontend and FastAPI backend. This would consolidate deployment into a single service and simplify management across environments.

---

## Future Improvements

- **Leaderboard:**  
  Implement a global leaderboard to showcase top players.

- **More Question Types:**  
  Add additional interactive question types (e.g., true/false, fill-in-the-blanks).

- **User Profiles:**  
  Allow users to customize their profiles (avatar, display name, etc.).

- **Multiplayer Mode:**  
  Enable a real-time multiplayer mode where users can compete simultaneously.

- **AI Generated Questions:**  
  While the dataset has been extended using Gemini, future enhancements could involve dynamically fetching questions from an AI API and storing them in the database when the next question is triggered.

- **Enhanced Login Mechanism:**  
  Improve the login mechanism for a more secure and robust authentication system beyond the current cookie-based approach.

- **Docker Integration:**  
  Use Docker to containerize both the frontend and backend, allowing for a consolidated deployment using a single service.

---

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any improvements or bug fixes.
