// app/account/page.tsx
'use client';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState<Message>({ type: '', text: '' });
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    // Add debugging info
    const checkCookie = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include'
        });
        const data = await res.json();
        setDebugInfo(JSON.stringify(data, null, 2));
      } catch (error) {
        setDebugInfo('Error checking auth: ' + (error instanceof Error ? error.message : 'Unknown error'));

      }
    };
    
    checkCookie();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div>Loading...</div>
        <div className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto max-w-md">
          <pre>Auth state: loading</pre>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div>Please log in to view this page.</div>
        <div className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto max-w-md">
          <pre>{debugInfo}</pre>
        </div>
      </div>
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
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Password updated successfully' });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
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
<div className="min-h-screen bg-[#8d8d8d] pt-24 pb-12">
  <div className="max-w-4xl mx-auto px-6 py-8">
    <h1 className="text-3xl font-bold text-edge-green-dark mb-6">Your Account</h1>
    
    {message.text && (
      <div className={`p-4 mb-6 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
        {message.text}
      </div>
    )}
    
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold text-edge-green-dark mb-4">Profile Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Name</p>
          <p className="font-medium">{user.name}</p>
        </div>
        <div>
          <p className="text-gray-600">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        {user.phoneNumber && (
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-medium">{user.phoneNumber}</p>
          </div>
        )}
        {user.address && (
          <div>
            <p className="text-gray-600">Address</p>
            <p className="font-medium">{user.address}</p>
          </div>
        )}
      </div>
    </div>
    
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold text-edge-green-dark mb-4">Security</h2>
      
      {isChangingPassword ? (
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-gray-600 mb-1">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-600 mb-1">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-edge-green-dark text-white rounded-md hover:bg-opacity-90"
            >
              Update Password
            </button>
            <button
              type="button"
              onClick={() => setIsChangingPassword(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsChangingPassword(true)}
          className="px-4 py-2 bg-edge-green-dark text-white rounded-md hover:bg-opacity-90"
        >
          Change Password
        </button>
      )}
    </div>
    
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <Link 
        href="/memberhub" 
        className="px-6 py-3 bg-edge-green-primary text-white rounded-md hover:bg-opacity-90 text-center"
      >
        Go to Member Hub
      </Link>
      
      <button
        onClick={logout}
        className="px-6 py-3 border border-white-500 text-white-500 rounded-md hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  </div>
</div>
  );
}
