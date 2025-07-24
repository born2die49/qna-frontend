import { getQuestionById, Question } from "@/app/lib/api"; // Make sure you have the 'Question' type imported

// The props definition is slightly different
interface PageProps {
  params: { id: string };
}

// The component signature is simpler
export default async function QuestionDetailPage({ params }: PageProps) {
  
  // You don't need to 'await' the params, you just use them directly.
  // The error message is a bit confusing. The key is that the old
  // destructuring in the function signature was the problem.
  // This code is correct.
  const question = await getQuestionById(params.id);

  return (
    <main className="container mx-auto p-4 pt-24">
      {/* Question Details */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">{question.title}</h1>
        <p className="text-gray-500 mb-4 text-sm">
          Asked by: {question.asked_by}
        </p>
        <div className="prose lg:prose-xl max-w-none">
          <p>{question.body}</p>
        </div>
      </div>
      
      <hr className="my-8" />
      
      {/* Answers Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
        </h2>
        <div className="space-y-6">
          {question.answers.length > 0 ? (
            question.answers.map((answer) => (
              <div key={answer.id} className="p-4 border-l-4 border-gray-200">
                <div className="prose max-w-none">
                    <p>{answer.body}</p>
                </div>
                <div className="text-right text-sm text-gray-500 mt-2">
                  <span>Answered by: {answer.answered_by}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No answers have been submitted yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}