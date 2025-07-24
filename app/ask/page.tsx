import { getUserId } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import AskForm from "../components/AskForm";

export default async function AskQuestionPage() {
  // 1. Get the user ID on the server
  const userId = await getUserId();

  // 2. If no user, redirect them away before rendering anything
  if (!userId) {
    redirect('/');
  }

  // 3. If they are logged in, render the page with the form component
  return (
    <main className="container mx-auto p-4 pt-24">
      <h1 className="text-3xl font-bold mb-6">Ask a Public Question</h1>
      <AskForm />
    </main>
  );
}