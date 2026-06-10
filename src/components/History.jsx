import { useState, useEffect } from "react";

export default function History({ onBack }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("quiz_history") || "[]");
    setHistory(data.reverse()); // Show most recent first
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Your Progress</h1>
      
      {history.length === 0 ? (
        <p>No tests completed yet. Start practicing!</p>
      ) : (
        <div style={{ maxWidth: "500px", margin: "20px auto", textAlign: "left" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ddd" }}>
                <th style={{ textAlign: "left", padding: "10px" }}>Date</th>
                <th style={{ textAlign: "center", padding: "10px" }}>Score</th>
                <th style={{ textAlign: "right", padding: "10px" }}>%</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>{entry.date}</td>
                  <td style={{ textAlign: "center", padding: "10px" }}>{entry.score} / {entry.total}</td>
                  <td style={{ textAlign: "right", padding: "10px" }}>
                    {Math.round((entry.score / entry.total) * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button onClick={onBack} style={{ marginTop: "30px", padding: "10px 20px" }}>
        Back to Home
      </button>
    </div>
  );
}
