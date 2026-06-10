import { useState } from "react";
import GradeSelect from "./components/GradeSelect";
import SubjectSelect from "./components/SubjectSelect";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import History from "./components/History";

function App() {
  const [step, setStep] = useState("grade");
  const [grade, setGrade] = useState(null);
  const [subject, setSubject] = useState(null);
  const [score, setScore] = useState(null);
  const [quizData, setQuizData] = useState(null);

  const resetToHome = () => {
    setStep("grade");
    setGrade(null);
    setSubject(null);
    setScore(null);
    setQuizData(null);
  };

  const saveResult = (score, total) => {
    const history = JSON.parse(localStorage.getItem("quiz_history") || "[]");
    history.push({
      date: new Date().toLocaleDateString(),
      score: score,
      total: total,
    });
    localStorage.setItem("quiz_history", JSON.stringify(history));
  };

  return (
    <div className="container">

      {step === "grade" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <GradeSelect onSelect={(g) => {
            setGrade(g);
            setStep("subject");
          }} />
          <button 
            onClick={() => setStep("history")}
            style={{ 
              marginTop: "20px", 
              padding: "10px 20px", 
              backgroundColor: "#64748b", 
              color: "white", 
              border: "none", 
              borderRadius: "8px", 
              cursor: "pointer" 
            }}
          >
            View My Progress
          </button>
        </div>
      )}

      {step === "subject" && (
        <div style={{ position: "relative" }}>
          <button 
            onClick={resetToHome}
            style={{ 
              position: "absolute", 
              top: "0", 
              right: "0", 
              padding: "5px 10px", 
              fontSize: "0.8rem",
              cursor: "pointer" 
            }}
          >
            ← Exit
          </button>
          <SubjectSelect onSelect={(s) => {
            setSubject(s);
            setStep("quiz");
          }} />
        </div>
      )}

      {step === "quiz" && (
        <Quiz
          grade={grade}
          subject={subject}
          onExit={resetToHome}
          onFinish={(result) => {
            saveResult(result.score, result.quizData.questions.length);
            setScore(result.score);
            setQuizData(result.quizData);
            setStep("result");
          }}
        />
      )}

      {step === "result" && (
        <Result 
          score={score} 
          quizData={quizData} 
          onRestart={resetToHome} 
        />
      )}

      {step === "history" && (
        <History onBack={() => setStep("grade")} />
      )}

    </div>
  );
}

export default App;
