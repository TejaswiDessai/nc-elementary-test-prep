export default function Result({ score, onRestart }) {
  return (
    <div>
      <h1>🎉 Test Complete</h1>
      <h2>Score: {score}</h2>

      <button onClick={onRestart}>
        Back to Start
      </button>
    </div>
  );
}