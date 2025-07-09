import QuestionList from "./components/QuestionList";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Questions</h1>
        {/* We'll add a 'Ask Question' button here later */}
      </div>
      
      {/* This Server Component will fetch data and render before the page is sent to the client */}
      <QuestionList />
    </main>
  );
}