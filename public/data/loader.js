export async function loadQuestions(grade, subject, set) {
  const res = await fetch(`/data/${grade}/${subject}/set${set}.json`);

  if (!res.ok) {
    throw new Error("Failed to load question file");
  }

  return await res.json();
}