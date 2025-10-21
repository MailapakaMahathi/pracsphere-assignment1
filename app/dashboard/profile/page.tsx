'use client';

import { useSession, signOut } from 'next-auth/react';
import { Card, Button } from '@repo/ui';
import { User, Mail, Calendar, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">User Profile</h1>

      <Card>
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-6 pb-6 border-b">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            {session.user?.name
              ?.split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {session.user?.name}
            </h2>
            <p className="text-gray-600">PracSphere User</p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <User className="text-gray-400" size={20} />
            <div>
              <div className="text-sm text-gray-600">Name</div>
              <div className="font-medium text-gray-900">{session.user?.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-gray-400" size={20} />
            <div>
              <div className="text-sm text-gray-600">Email</div>
              <div className="font-medium text-gray-900">{session.user?.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-gray-400" size={20} />
            <div>
              <div className="text-sm text-gray-600">Member Since</div>
              <div className="font-medium text-gray-900">
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="pt-6 border-t">
          <Button
            onClick={handleLogout}
            variant="danger"
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
}