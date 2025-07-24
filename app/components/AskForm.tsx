'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clientApi from '@/app/lib/clientApi';
import Button from './ui/Button';

export default function AskForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple validation
    if (!title || !body) {
      setError('Title and body cannot be empty.');
      setIsLoading(false);
      return;
    }

    try {
      // We will create this '/api/questions' proxy route next
      const response = await clientApi.post('/api/questions/', { title, body });
      
      // On success, redirect the user to their new question's page!
      router.push(`/questions/${response.id}`);

    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., How do I center a div?"
          required
        />
      </div>
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={10}
          placeholder="Include all the information someone would need to answer your question."
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Post Your Question'}
      </Button>
    </form>
  );
}