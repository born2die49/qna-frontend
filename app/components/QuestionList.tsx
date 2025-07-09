import { getQuestions, Question } from "@/app/lib/api";
import Link from "next/link";

export default async function QuestionList() {
  const questions = await getQuestions();

  if (questions.length === 0) {
    return <p>No questions have been asked yet. Be the first!</p>;
  }

  return (
    <div className="space-y-4">
      {questions.map((question: Question) => (
        <div key={question.id} className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow">
          <Link href={`/questions/${question.id}`} className="block">
            <h2 className="text-xl font-semibold text-blue-600 hover:underline">{question.title}</h2>
            <p className="text-gray-700 mt-2 truncate">{question.body}</p>
            <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
              <span>Asked by: {question.asked_by}</span>
              <span>{question.answers.length} Answers</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}