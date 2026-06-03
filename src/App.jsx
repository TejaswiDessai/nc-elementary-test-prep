import { useState } from "react";
import GradeSelect from "./components/GradeSelect";
import SubjectSelect from "./components/SubjectSelect";
import SetSelect from "./components/SetSelect";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

function App() {
  const [step, setStep] = useState("grade");
  const [grade, setGrade] = useState(null);
  const [subject, setSubject] = useState(null);
  const [set, setSet] = useState(null);
  const [score, setScore] = useState(null);

  return (
    <div className="container">

      {step === "grade" && (
        <GradeSelect onSelect={(g) => {
          setGrade(g);
          setStep("subject");
        }} />
      )}

      {step === "subject" && (
        <SubjectSelect onSelect={(s) => {
          setSubject(s);
          setStep("set");
        }} />
      )}

      {step === "set" && (
        <SetSelect onSelect={(s) => {
          setSet(s);
          setStep("quiz");
        }} />
      )}

      {step === "quiz" && (
        <Quiz
          grade={grade}
          subject={subject}
          set={set}
          onFinish={(score) => {
            setScore(score);
            setStep("result");
          }}
        />
      )}

      {step === "result" && (
        <Result score={score} onRestart={() => setStep("grade")} />
      )}

    </div>
  );
}

export default App;