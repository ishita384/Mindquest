import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastCompleted, setLastCompleted] = useState(null);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [mood, setMood] = useState("");

  useEffect(() => {
    const savedPoints = localStorage.getItem("points");
    const savedStreak = localStorage.getItem("streak");
    const savedDate = localStorage.getItem("lastCompleted");

    if (savedPoints) setPoints(Number(savedPoints));
    if (savedStreak) setStreak(Number(savedStreak));
    if (savedDate) setLastCompleted(savedDate);
  }, []);

  useEffect(() => {
    localStorage.setItem("points", points);
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCompleted", lastCompleted);
  }, [points, streak, lastCompleted]);

  const completeTask = () => {
    if (!taskCompleted) {
      const today = new Date().toDateString();

      if (lastCompleted === today) return;

      if (lastCompleted) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (
          new Date(lastCompleted).toDateString() ===
          yesterday.toDateString()
        ) {
          setStreak(streak + 1);
        } else {
          setStreak(1);
        }
      } else {
        setStreak(1);
      }

      setPoints(points + 10);
      setLastCompleted(today);
      setTaskCompleted(true);
    }
  };

  const moods = ["😄", "🙂", "😐", "😔", "😢"];

  return (
    <div className="container">
      <h1>🌱 MindQuest</h1>

      <div className="grid">
        {/* Task */}
        <div className="card">
          <h2>Daily Task</h2>
          <p>Take 5 minutes deep breathing 🧘</p>
          <button onClick={completeTask}>
            {taskCompleted ? "Completed ✅" : "Complete Task"}
          </button>
        </div>

        {/* Points */}
        <div className="card">
          <h2>Points</h2>
          <h1>{points}</h1>
        </div>

        {/* Streak */}
        <div className="card">
          <h2>🔥 Streak</h2>
          <h1>{streak} days</h1>
        </div>
      </div>

      {/* Mood Tracker */}
      <div className="card">
        <h2>How are you feeling today?</h2>
        <div className="moods">
          {moods.map((m, index) => (
            <span key={index} onClick={() => setMood(m)}>
              {m}
            </span>
          ))}
        </div>
        {mood && <p>Your mood: {mood}</p>}
      </div>

      {/* Achievements */}
      <div className="card">
        <h2>🏆 Achievements</h2>
        <ul>
          <li>Complete your first task</li>
          <li>Reach 50 points</li>
          <li>Maintain 7-day streak</li>
        </ul>
      </div>
    </div>
  );
}

export default App;