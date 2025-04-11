'use client';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import Link from 'next/link';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import { useRouter } from 'next/navigation';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Message {
  type: 'success' | 'error' | '';
  text: string;
}

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState<Message>({ type: '', text: '' });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-edge-green-dark rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="bg-edge-green-dark h-32"></div>
        <div className="container mx-auto px-4 py-2">
          <NextBreadcrumb
            homeElement={<span>Home</span>}
            separator={<span className="mx-2">&gt;</span>}
            containerClasses="flex items-center text-[#123800]"
            listClasses="hover:underline"
            activeClasses="font-semibold no-underline"
            capitalizeLinks={true}
          />
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-edge-green-secondary rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-edge-green-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-edge-green-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4a3 3 0 100-6 3 3 0 000 6zm-2 6h4a4 4 0 014 4v1H6v-1a4 4 0 014-4z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-edge-green-dark mb-4">Login Required</h2>
              <p className="text-lg text-edge-green-dark mb-8">
                You need to be logged in to access your account settings. Please sign in with your member account to continue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => router.push('/')}
                  className="px-6 py-3 bg-white border border-edge-green-dark text-edge-green-dark rounded-md hover:bg-edge-green-secondary transition-all"
                >
                  Return to Home
                </button>
              </div>
            </div>
            <div className="bg-edge-green-primary h-2" />
          </div>
        </div>
      </>
    );
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    try {
      const res = await fetch('/api/users/update-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Password updated successfully' });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setIsChangingPassword(false);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update password' });
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    }
  };

  return (
    <>
      <div className="bg-edge-green-dark h-32"></div>
      <div className="container mx-auto px-4 py-2">
        <NextBreadcrumb
          homeElement={<span>Home</span>}
          separator={<span className="mx-2">&gt;</span>}
          containerClasses="flex items-center text-[#123800]"
          listClasses="hover:underline"
          activeClasses="font-semibold no-underline"
          capitalizeLinks={true}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        {message.text && (
          <div className={`p-4 mb-6 rounded ${
            message.type === 'error'
              ? 'bg-red-100 border border-red-400 text-red-700'
              : 'bg-green-100 border border-green-400 text-green-700'
          }`}>
            {message.text}
          </div>
        )}
        <div className="bg-edge-green-secondary rounded-lg shadow-lg overflow-hidden mb-8 p-6 flex flex-col gap-8 max-w-2xl mx-auto">
          {/* Welcome Message */}
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-edge-green-dark">Welcome, {user.name}!</h2>
          </div>
          
          {/* Profile Info */}
          <div>
            <h2 className="text-xl font-bold text-edge-green-dark mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-1">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div className="md:order-1">
                <p className="text-gray-600 mb-1">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              {user.phoneNumber && (
                <div>
                  <p className="text-gray-600 mb-1">Phone</p>
                  <p className="font-medium">{user.phoneNumber}</p>
                </div>
              )}
              {user.address && (
                <div>
                  <p className="text-gray-600 mb-1">Address</p>
                  <p className="font-medium">{user.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Security */}
          <div>
            <h2 className="text-xl font-bold text-edge-green-dark mb-4">Security</h2>
            <div className="flex justify-between items-center">
              {isChangingPassword ? (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-gray-600 mb-1">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-gray-600 mb-1">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-600 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-edge-green-dark text-white rounded hover:bg-opacity-90"
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsChangingPassword(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="px-4 py-2 bg-edge-green-dark text-white rounded hover:bg-opacity-90"
                >
                  Change Password
                </button>
              )}
              {user.role === 'admin' ? (
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 bg-edge-green-primary text-edge-green-dark rounded-md hover:bg-opacity-90"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link 
                  href="/memberhub" 
                  className="px-4 py-2 bg-edge-green-primary text-edge-green-dark rounded-md hover:bg-opacity-90"
                >
                  Go to Member Hub
                </Link>
              )}
            </div>
          </div>

          {/* Logout Button at Bottom Right */}
          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={logout}
              className="px-6 py-2 border border-red-500 text-red-500 font-medium rounded hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}