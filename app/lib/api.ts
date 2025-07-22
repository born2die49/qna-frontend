import { serverApiFetch } from "./serverApi";

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

export async function getQuestions(): Promise<Question[]> {
  // Use the new server-side fetcher
  return serverApiFetch('/api/questions/');
}

export async function getQuestionById(id: string): Promise<Question> {
  return serverApiFetch(`/api/questions/${id}/`);
}

export async function getAnswersById(id: string): Promise<Answer[]> {
  return serverApiFetch(`/api/answers/${id}/`);
}