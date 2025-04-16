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
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        placeholder="********" 
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full px-3 py-2 border rounded pr-10"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
                            <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-gray-600 mb-1">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        placeholder="********" 
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full px-3 py-2 border rounded pr-10"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
                            <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-600 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="********" 
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full px-3 py-2 border rounded pr-10"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
                            <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
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