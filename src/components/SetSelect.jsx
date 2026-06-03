export default function SetSelect({ onSelect }) {
  const sets = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <h2>Select Test Set</h2>

      <div className="cardGrid">
        {sets.map((s) => (
          <div className="card" key={s} onClick={() => onSelect(s)}>
            Set {s}
          </div>
        ))}
      </div>
    </div>
  );
}