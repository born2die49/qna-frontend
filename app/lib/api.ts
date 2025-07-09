export type Question = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  asked_by: string;
  answers: any[]; // We can improve this type later
};

export type Answer = {
  id: number;
  question: string;
  body: string;
  created_at: string;
  answered_by: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getQuestions(): Promise<Question[]> {
  const res = await fetch(`${API_URL}/api/questions/`);

  if (!res.ok) {
    // This will be caught by the Error Boundary
    throw new Error('Failed to fetch questions');
  }

  return res.json();
}

export async function getQuestionById(id: string): Promise<Question> {
  const res = await fetch(`${API_URL}/api/questions/${id}`);

  if (!res.ok) {
    // This will be caught by the Error Boundary
    throw new Error('Failed to fetch questions');
  }

  return res.json();
}

export async function getAnswersById(id: string): Promise<Answer[]> {
  const res = await fetch(`${API_URL}/api/answers/${id}`);

  if (!res.ok) {
    // This will be caught by the Error Boundary
    throw new Error('Failed to fetch questions');
  }

  return res.json();
}