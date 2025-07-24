import Link from "next/link";
import QuestionList from "./components/QuestionList";
import Button from "./components/ui/Button";
import { getUserId } from "./lib/actions";

export default async function Home() {
  const userId = await getUserId();

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Questions</h1>
        {userId && (
          <Link href="/ask">
            <Button>Ask Question</Button>
          </Link>
        )}
        
      </div>
      
      {/* This Server Component will fetch data and render before the page is sent to the client */}
      <QuestionList />
    </main>
  );
}