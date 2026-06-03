export default function SubjectSelect({ onSelect }) {
  return (
    <div>
      <h2>Select Subject</h2>

      <div className="cardGrid">
        <div className="card" onClick={() => onSelect("math")}>
          Math
        </div>

        <div className="card" onClick={() => onSelect("ela")}>
          ELA
        </div>
      </div>
    </div>
  );
}