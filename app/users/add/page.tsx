// app/users/add/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminPageLayout from '@/components/AdminPageLayout';

export default function AddUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'member',
    phoneNumber: '',
    address: '',
    membershipExpires: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to generate a random password
  const generateRandomPassword = () => {
    // Generate a random string with letters, numbers, and special characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    
    // Generate a password 10-12 characters long
    const length = Math.floor(Math.random() * 3) + 10; // 10-12 characters
    
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Update both password and confirm password fields
    setFormData(prev => ({
      ...prev,
      password,
      confirmPassword: password
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          phoneNumber: formData.phoneNumber || undefined,
          address: formData.address || undefined,
          membershipExpires: formData.membershipExpires || undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("User created successfully!");
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'member',
          phoneNumber: '',
          address: '',
          membershipExpires: ''
        });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/users');
        }, 2000);
      } else {
        setError(data.message || 'Failed to create user');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Calculate default expiration date (1 year from today)
  const getDefaultExpirationDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  return (
    <AdminPageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#123800]">Add New User</h1>
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

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
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
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password *
                <button
                  type="button"
                  onClick={generateRandomPassword}
                  className="ml-2 text-sm bg-[#a8d080] text-[#123800] px-2 py-1 rounded hover:bg-opacity-80"
                >
                  Auto-Generate
                </button>
              </label>
              <input
                type="text" // Changed to text so admin can see the generated password
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#123800]"
                required
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">Min. 6 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirm Password *</label>
              <input
                type="text" // Changed to text to match the password field
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#123800]"
                required
                minLength={6}
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
                value={formData.membershipExpires || getDefaultExpirationDate()}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#123800]"
              />
              <p className="text-xs text-gray-500 mt-1">Default is one year from today</p>
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
              disabled={loading}
              className="bg-[#123800] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-70"
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </AdminPageLayout>
  );
}