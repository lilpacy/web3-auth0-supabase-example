import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, Key, Database, LogOut, Link } from 'lucide-react';

export default function LoggedInView({ handleAction }: { handleAction: (action: string) => void }) {
  return (
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
        <Button
          variant="destructive"
          className="w-full md:w-auto"
          onClick={() => handleAction('logout')}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
}
