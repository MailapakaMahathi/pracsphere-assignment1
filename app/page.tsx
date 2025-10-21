import Link from 'next/link';
import { Button } from '@repo/ui';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to PracSphere
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-Powered ERP Task Management System
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button variant="primary">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="secondary">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}