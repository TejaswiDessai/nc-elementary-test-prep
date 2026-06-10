export async function loadQuestions(grade, subject, count = 10) {
  try {
    const res = await fetch(`/data/${grade}/${subject}_pool.json`);
    
    if (!res.ok) {
      // Fallback to set1.json if pool doesn't exist yet for that grade/subject
      const fallbackRes = await fetch(`/data/${grade}/${subject}/set1.json`);
      if (!fallbackRes.ok) throw new Error("No question data found");
      const fallbackData = await fallbackRes.json();
      
      // Shuffle and pick 'count' questions from fallback as well
      const shuffled = [...fallbackData].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    const pool = await res.json();
    
    // Shuffle and pick 'count' questions
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (err) {
    console.error("Question load failed:", err);
    throw err;
  }
}
