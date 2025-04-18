// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiUsers, FiFileText, FiDatabase, FiExternalLink } from 'react-icons/fi';
import AdminPageLayout from '@/components/AdminPageLayout';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

interface Stats {
  totalUsers: number;
  activeMembers: number;
  adminUsers: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeMembers: 0,
    adminUsers: 0
  });
  const [bursaryStats, setBursaryStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
  });  
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/users', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          const users = data.users;
          
          setStats({
            totalUsers: users.length,
            activeMembers: users.filter((user: any) => 
              user.role === 'member' && user.isActive
            ).length,
            adminUsers: users.filter((user: any) => user.role === 'admin').length
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  
  useEffect(() => {
    const fetchBursaryStats = async () => {
      try {
        const res = await fetch('/api/bursary');
        if (res.ok) {
          const { applications } = await res.json();
  
          setBursaryStats({
            totalApplications: applications.length,
            pendingApplications: applications.filter(
              (app: any) => app.status === 'pending'
            ).length,
          });
        }
      } catch (error) {
        console.error('Error fetching bursary stats:', error);
      }
    };
  
    fetchBursaryStats();
  }, []);
  
  return (
    <AdminPageLayout>
      <h1 className="text-3xl font-bold text-[#123800] mb-8">Dashboard</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[#a8d080] border-t-[#123800] rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Quick Links */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#123800] mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link 
                href="/"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-edge-green-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiExternalLink size={24} className="text-[#123800] mr-3" />
                <div>
                  <h3 className="font-medium">Live Site</h3>
                  <p className="text-sm text-gray-500">View the public website</p>
                </div>
              </Link>
              
              <Link 
                href="/users"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-edge-green-dark"
              >
                <FiUsers size={24} className="text-[#123800] mr-3" />
                <div>
                  <h3 className="font-medium">Users</h3>
                  <p className="text-sm text-gray-500">Manage users & members</p>
                </div>
              </Link>
              
              <Link 
                href="/studio"
                target="_blank"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-edge-green-dark"
              >
                <FiDatabase size={24} className="text-[#123800] mr-3" />
                <div>
                  <h3 className="font-medium">Content Management</h3>
                  <p className="text-sm text-gray-500">Manage site content</p>
                </div>
              </Link>
              
              <Link 
                href="/documentation"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-edge-green-dark"
              >
                <FiFileText size={24} className="text-[#123800] mr-3" />
                <div>
                  <h3 className="font-medium">Documentation</h3>
                  <p className="text-sm text-gray-500">View admin documentation</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Stats Summary */}
          <div>
            {/* website user stats summary */}
            <h2 className="text-xl font-semibold text-[#123800] mb-4">Users Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Total Users</h3>
                <p className="text-4xl font-bold text-[#123800]">{stats.totalUsers}</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Active Members</h3>
                <p className="text-4xl font-bold text-green-600">{stats.activeMembers}</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Admin Users</h3>
                <p className="text-4xl font-bold text-purple-600">{stats.adminUsers}</p>
              </div>
            </div>
            {/* bursary application status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Bursary Applications</h3>
                <p className="text-4xl font-bold text-[#123800]">{bursaryStats.totalApplications}</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Pending Applications</h3>
                <p className="text-4xl font-bold text-orange-600">{bursaryStats.pendingApplications}</p>
              </div>
            </div>
          </div>
          
          {/* Analytics Dashboard Component */}
          <AnalyticsDashboard />
          
         
        </>
      )}
    </AdminPageLayout>
  );
}