"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, User, Key, Database, LogOut, LogIn } from 'lucide-react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState('');

  const login = () => {
    setIsLoggedIn(true);
    setConsoleOutput('Logged in Successfully!');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setConsoleOutput('Logged out Successfully!');
  };

  const handleAction = (action: string) => {
    setConsoleOutput(`${action} action triggered`);
  };

  const loggedInView = (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Get User Info', icon: User, action: 'getUserInfo' },
          { label: 'Get Private Key', icon: Key, action: 'getPrivateKey' },
          { label: 'Check Supabase Connection', icon: Database, action: 'checkSupabaseConnection' },
        ].map((item, index) => (
          <Card key={index} className="p-4 hover:shadow-lg transition-shadow bg-white">
            <Button
              onClick={() => handleAction(item.action)}
              className="w-full h-full flex flex-col items-center justify-center space-y-2"
              variant="ghost"
            >
              <item.icon className="h-6 w-6" />
              <span className="text-sm">{item.label}</span>
            </Button>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Button onClick={logout} variant="destructive" className="w-full md:w-auto">
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </div>
    </div>
  );

  const unloggedInView = (
    <div className="flex justify-center">
      <Button onClick={login} className="w-full md:w-auto">
        <LogIn className="mr-2 h-4 w-4" /> Login
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Blockchain Dashboard</h1>
      {isLoggedIn ? loggedInView : unloggedInView}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Console Output</h2>
        <pre className="whitespace-pre-wrap bg-gray-100 p-3 rounded text-gray-600">{consoleOutput}</pre>
      </div>
    </div>
  );
}
