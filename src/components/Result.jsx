export default function Result({ score, quizData, onRestart }) {
  const percentage = quizData 
    ? Math.round((score / quizData.questions.length) * 100) 
    : 0;

  return (
    <div>
      <h1>🎉 Test Complete</h1>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <h2 style={{ fontSize: "2rem" }}>Score: {score} / {quizData?.questions.length || 0}</h2>
        <h3 style={{ color: "#666" }}>{percentage}% Correct</h3>
      </div>

      {quizData && (
        <div style={{ marginTop: "30px", textAlign: "left", maxWidth: "600px", margin: "30px auto" }}>
          <h3>Review Your Answers</h3>
          {quizData.questions.map((q, i) => (
            <div key={i} style={{ 
              borderBottom: "1px solid #eee", 
              padding: "15px 0", 
              marginBottom: "10px" 
            }}>
              <p><strong>Q{i + 1}: {q.q}</strong></p>
              <p style={{ color: quizData.userAnswers[i] === q.answer ? "green" : "red" }}>
                Your Answer: {q.options[quizData.userAnswers[i]]} 
                {quizData.userAnswers[i] === q.answer ? " ✅" : " ❌"}
              </p>
              {quizData.userAnswers[i] !== q.answer && (
                <p style={{ color: "green" }}>
                  Correct Answer: {q.options[q.answer]}
                </p>
              )}
              <p style={{ fontSize: "0.9rem", color: "#555", fontStyle: "italic" }}>
                <strong>Explanation:</strong> {q.explanation}
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button onClick={onRestart} style={{ padding: "10px 20px", fontSize: "1rem" }}>
          Back to Start
        </button>
      </div>
    </div>
  );
}
