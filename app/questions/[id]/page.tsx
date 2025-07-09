import { getAnswersById, getQuestionById } from "@/app/lib/api";

export default async function QuestionDetailPage({ params }: { params: { id: string}}) {
  const question = await getQuestionById(params.id);

  return (
    <div className="container mx-auto p-4">
      {/* 2. Display the question's title and body */}
      <h1 className="text-3xl font-bold mb-2">{question.title}</h1>
      <p className="text-gray-500 mb-4">Asked by: {question.asked_by}</p>
      <div className="prose lg:prose-xl">
        {/* You might need a library like 'markdown-to-jsx' if you want to render markdown safely */}
        <p>{question.body}</p>
      </div>
      
      <hr className="my-8" />
      
      {/* 3. Display the answers */}
      <h2 className="text-2xl font-bold mb-4">
        {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
      </h2>
      <div className="space-y-6">
        {question.answers.length > 0 ? (
          question.answers.map((answer) => (
          // The `key` prop is crucial for React! Use the unique answer ID.
          <div key={answer.id} className="p-4 border-l-4 border-gray-200">
            <p className="text-gray-800">{answer.body}</p>
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
  )
  
}