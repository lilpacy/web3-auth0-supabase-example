"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, Key, Database, LogOut, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import LoggedInView from '@/components/logged-in-view';
import UnloggedInView from '@/components/unlogged-in-view';
import { redirect } from 'next/navigation';

export default function Home() {
  const { user, isLoading } = useUser()
  const [consoleOutput, setConsoleOutput] = useState('');

  const handleAction = (action: string) => {
    switch (action) {
      case 'getUserInfo':
        setConsoleOutput(JSON.stringify(user, null, 2));
        break;
      case 'getPrivateKey':
        setConsoleOutput(`${action} action triggered`);
        break;
      case 'checkSupabaseConnection':
        setConsoleOutput(`${action} action triggered`);
        break;
      case 'logout':
        setConsoleOutput(`${action} action triggered`);
        window.location.href = '/api/auth/logout';
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Blockchain Dashboard</h1>
      {user ? (
        <LoggedInView handleAction={handleAction} />
      ) : (
        <UnloggedInView />
      )}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Console Output</h2>
        <pre className="whitespace-pre-wrap bg-gray-100 p-3 rounded text-gray-600">{consoleOutput}</pre>
      </div>
    </div>
  );
}
