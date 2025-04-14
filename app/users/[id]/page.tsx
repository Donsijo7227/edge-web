// app/users/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminPageLayout from '@/components/AdminPageLayout';


interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
  address?: string;
  membershipExpires: string;
  isActive: boolean;
}

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const userId = params.id;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'member',
    phoneNumber: '',
    address: '',
    membershipExpires: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await response.json();
        setUser(data.user);
        
        // Format date for input field (YYYY-MM-DD)
        const formattedDate = data.user.membershipExpires 
          ? new Date(data.user.membershipExpires).toISOString().split('T')[0]
          : '';

        setFormData({
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          phoneNumber: data.user.phoneNumber || '',
          address: data.user.address || '',
          membershipExpires: formattedDate
        });
        
        setLoading(false);
      } catch (err) {
        setError('Error loading user');
        setLoading(false);
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          phoneNumber: formData.phoneNumber || undefined,
          address: formData.address || undefined,
          membershipExpires: formData.membershipExpires || undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('User updated successfully!');
        // Update user data
        setUser(data.user);
      } else {
        setError(data.message || 'Failed to update user');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setError('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-[#a8d080] border-t-[#123800] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (

      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <AdminPageLayout>
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#123800]">Edit User</h1>
        <Link 
          href="/users" 
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Back to Users
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6">
          {success}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-[#123800] rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex items-center mt-1">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
              } mr-2`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#123800]"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#123800]"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">Role *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#123800]"
                required
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#123800]"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#123800]"
              ></textarea>
            </div>

            <div>
              <label htmlFor="membershipExpires" className="block text-gray-700 font-semibold mb-2">Membership Expiration Date</label>
              <input
                type="date"
                id="membershipExpires"
                name="membershipExpires"
                value={formData.membershipExpires}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#123800]"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current status: <span className={user.isActive ? 'text-green-600' : 'text-red-600'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              href="/users"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md mr-4 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#123800] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-70"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
        <p className="text-gray-600 mb-4">Deleting this user will permanently remove their account and all associated data.</p>
        
        <button
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
              try {
                const response = await fetch(`/api/users/${userId}`, {
                  method: 'DELETE',
                  credentials: 'include',
                });
                
                if (response.ok) {
                  router.push('/admin/users');
                } else {
                  const data = await response.json();
                  setError(data.message || 'Failed to delete user');
                }
              } catch (err) {
                console.error('Error deleting user:', err);
                setError('An unexpected error occurred');
              }
            }
          }}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Delete User
        </button>
      </div>
    </div>
    </AdminPageLayout>
  );
}