import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export default function UnloggedInView() {
  return (
    <div className="flex justify-center">
      <Link href="/api/auth/login">
        <Button className="w-full md:w-auto">
          <LogIn className="mr-2 h-4 w-4" /> Login
        </Button>
      </Link>
    </div>
  );
}
