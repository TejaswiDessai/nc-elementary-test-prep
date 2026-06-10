import { useEffect, useState } from "react";
import { loadQuestions } from "../data/loader";

export default function Quiz({ grade, subject, onExit, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadQuestions(grade, subject);
        setQuestions(data || []);
      } catch (err) {
        console.error("Question load failed:", err);
        setQuestions([]);
      }
    }

    fetchData();
  }, [grade, subject]);

  if (!questions || questions.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Loading questions...</h3>
        <button onClick={onExit} style={{ marginTop: "20px" }}>Exit to Home</button>
      </div>
    );
  }

  const q = questions[index];

  function handleAnswer(choiceIndex) {
    setSelectedAnswer(choiceIndex);
    setShowFeedback(true);

    if (choiceIndex === q.answer) {
      setScore((prev) => prev + 1);
    }
    
    setUserAnswers((prev) => [...prev, choiceIndex]);
  }

  function nextQuestion() {
    const next = index + 1;

    if (next >= questions.length) {
      onFinish({
        score: score,
        quizData: {
          questions,
          userAnswers: [...userAnswers, selectedAnswer]
        }
      });
      return;
    }

    setIndex(next);
    setSelectedAnswer(null);
    setShowFeedback(false);
  }

  const progress = Math.round(
    ((index + 1) / questions.length) * 100
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3>
          Question {index + 1} of {questions.length}
        </h3>
        <button 
          onClick={() => {
            if (window.confirm("Are you sure you want to quit the quiz? Your progress will be lost.")) {
              onExit();
            }
          }}
          style={{ 
            padding: "5px 15px", 
            backgroundColor: "#ef4444", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer" 
          }}
        >
          Exit Quiz
        </button>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          margin: "10px auto",
          background: "#ddd",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "12px",
            background: "#2563eb",
            borderRadius: "10px",
          }}
        />
      </div>

      <h1>{q.q}</h1>

      {!showFeedback && (
        <div>
          {q.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              style={{ margin: "5px" }}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {showFeedback && (
        <div style={{ marginTop: "20px" }}>
          {selectedAnswer === q.answer ? (
            <h2 style={{ color: "green" }}>✅ Correct!</h2>
          ) : (
            <>
              <h2 style={{ color: "red" }}>❌ Incorrect</h2>
              <p>
                Correct Answer: <strong>{q.options[q.answer]}</strong>
              </p>
            </>
          )}

          <p>
            <strong>Explanation:</strong> {q.explanation}
          </p>

          <button onClick={nextQuestion}>
            {index === questions.length - 1
              ? "Finish Test"
              : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}
