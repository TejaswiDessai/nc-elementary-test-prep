export default function GradeSelect({ onSelect }) {
  const grades = ["K", "1", "2", "3", "4", "5"];

  return (
    <div>
      <h1>📚 NC Elementary Test Prep</h1>
      <h2>Select Grade</h2>

      <div className="cardGrid">
        {grades.map((g) => (
          <div className="card" key={g} onClick={() => onSelect(g)}>
            Grade {g}
          </div>
        ))}
      </div>
    </div>
  );
}