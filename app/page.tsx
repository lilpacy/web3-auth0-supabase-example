"use client";

import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoggedInView from '@/components/logged-in-view';
import UnloggedInView from '@/components/unlogged-in-view';

export default function Home() {
  const { user, isLoading } = useUser()
  const [consoleOutput, setConsoleOutput] = useState('');


  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Blockchain Dashboard</h1>
      {user ? (
        <LoggedInView setConsoleOutput={setConsoleOutput} user={user} />
      ) : (
        <UnloggedInView />
      )}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Console Output</h2>
        <pre className="whitespace-pre-wrap break-words bg-gray-100 p-3 rounded text-gray-600">{consoleOutput}</pre>
      </div>
    </div>
  );
}
