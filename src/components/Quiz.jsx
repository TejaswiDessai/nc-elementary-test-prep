import { useEffect, useState } from "react";
import { loadQuestions } from "../data/loader";

export default function Quiz({ grade, subject, set, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

 useEffect(() => {
  loadQuestions(grade, subject, set)
    .then((data) => {
      console.log("QUESTIONS LOADED:", data);
      setQuestions(data);
    })
    .catch((err) => {
      console.error("LOAD ERROR:", err);
    });
}, []);

  if (!questions.length) return <h3>Loading...</h3>;

  const q = questions[index];

  function answer(i) {
    if (i === q.answer) setScore(score + 1);

    const next = index + 1;

    if (next >= questions.length) {
      onFinish(score + (i === q.answer ? 1 : 0));
    } else {
      setIndex(next);
    }
  }

  return (
    <div>
      <h3>Question {index + 1}</h3>
      <h2>{q.q}</h2>

      {q.options.map((o, i) => (
        <button key={i} onClick={() => answer(i)}>
          {o}
        </button>
      ))}
    </div>
  );


  if (!questions || questions.length === 0) {
  return <h3>⚠ No questions found. Check data files.</h3>;
}
}