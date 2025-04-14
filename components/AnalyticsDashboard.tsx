// components/AnalyticsDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { FiBarChart2, FiUsers, FiClock, FiPercent } from 'react-icons/fi';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, ResponsiveContainer, 
         XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';

interface AnalyticsData {
  userMetrics: {
    totalUsers: number;
    newUsers: number;
    activeUsers: number;
  };
  pageViewMetrics: {
    screenPageViews: number;
    engagementRate: number;
    averageSessionDuration: number;
  };
}

const COLORS = ['#123800', '#a8d080', '#5c9732', '#7fb33f'];

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/analytics');
        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data);
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  // Helper function to format seconds as MM:SS
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Prepare chart data
  const userChartData = analyticsData ? [
    { name: 'Total Users', value: analyticsData.userMetrics.totalUsers },
    { name: 'New Users', value: analyticsData.userMetrics.newUsers },
    { name: 'Active Users', value: analyticsData.userMetrics.activeUsers }
  ] : [];

  const pageViewsData = analyticsData ? [
    { name: 'Page Views', value: analyticsData.pageViewMetrics.screenPageViews }
  ] : [];

  const engagementData = analyticsData ? [
    { name: 'Engaged', value: analyticsData.pageViewMetrics.engagementRate * 100 },
    { name: 'Not Engaged', value: 100 - (analyticsData.pageViewMetrics.engagementRate * 100) }
  ] : [];

  // Demo data for time-series chart (normally this would come from GA4)
  const timeSeriesData = [
    { day: 'Mon', views: 120, users: 45 },
    { day: 'Tue', views: 180, users: 65 },
    { day: 'Wed', views: 250, users: 85 },
    { day: 'Thu', views: 210, users: 75 },
    { day: 'Fri', views: 290, users: 95 },
    { day: 'Sat', views: 190, users: 55 },
    { day: 'Sun', views: 140, users: 40 }
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-[#123800] mb-4">Website Analytics (Last 30 days)</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow p-6">
          <div className="w-12 h-12 border-4 border-[#a8d080] border-t-[#123800] rounded-full animate-spin"></div>
        </div>
      ) : analyticsData ? (
        <div>
          {/* User Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 bg-white rounded-lg shadow-md flex items-start">
              <FiUsers size={24} className="text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">Total Users</h3>
                <p className="text-3xl font-bold text-[#123800]">{analyticsData.userMetrics.totalUsers}</p>
                <p className="text-sm text-gray-500">Users who visited your site</p>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md flex items-start">
              <FiUsers size={24} className="text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">New Users</h3>
                <p className="text-3xl font-bold text-green-600">{analyticsData.userMetrics.newUsers}</p>
                <p className="text-sm text-gray-500">First time visitors</p>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md flex items-start">
              <FiUsers size={24} className="text-purple-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">Active Users</h3>
                <p className="text-3xl font-bold text-purple-600">{analyticsData.userMetrics.activeUsers}</p>
                <p className="text-sm text-gray-500">Users who interacted with your site</p>
              </div>
            </div>
          </div>
          
          {/* Page View Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-6 bg-white rounded-lg shadow-md flex items-start">
              <FiBarChart2 size={24} className="text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">Page Views</h3>
                <p className="text-3xl font-bold text-[#123800]">{analyticsData.pageViewMetrics.screenPageViews}</p>
                <p className="text-sm text-gray-500">Total pages viewed</p>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md flex items-start">
              <FiPercent size={24} className="text-orange-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">Engagement Rate</h3>
                <p className="text-3xl font-bold text-orange-600">
                  {(analyticsData.pageViewMetrics.engagementRate * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">Percentage of engaged sessions</p>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md flex items-start">
              <FiClock size={24} className="text-teal-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">Avg. Session</h3>
                <p className="text-3xl font-bold text-teal-600">
                  {formatDuration(analyticsData.pageViewMetrics.averageSessionDuration)}
                </p>
                <p className="text-sm text-gray-500">Average time on site</p>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* User Distribution Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-700 mb-4">User Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userChartData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#123800">
                      {userChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Engagement Rate Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Engagement Rate</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#123800' : '#d3e8c2'} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Weekly Trend Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Weekly Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#123800" strokeWidth={2} />
                  <Line type="monotone" dataKey="users" stroke="#a8d080" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-500 italic">Unable to load analytics data. Please check your configuration.</p>
        </div>
      )}
    </div>
  );
}