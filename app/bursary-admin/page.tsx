// app/bursary/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminPageLayout from '@/components/AdminPageLayout';
import { FiSearch, FiFilter, FiTrash2 } from 'react-icons/fi';

interface BursaryApplication {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  currentSchool: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function BursaryApplicationsAdmin() {
  const [applications, setApplications] = useState<BursaryApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/bursary', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        setApplications(data.applications);
        setLoading(false);
      } catch (err) {
        setError('Error loading applications');
        setLoading(false);
        console.error('Error fetching applications:', err);
      }
    };

    fetchApplications();
  }, []);

  // Filter and search applications
  const filteredApplications = applications.filter(app => {
    // Filter by status
    if (statusFilter !== 'all' && app.status !== statusFilter) {
      return false;
    }
    
    // Search by name, email, or school
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchLower) ||
        app.email.toLowerCase().includes(searchLower) ||
        app.currentSchool.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Handle bulk selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredApplications.map(app => app._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectApplication = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(appId => appId !== id) 
        : [...prev, id]
    );
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} application(s)?`)) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      // Delete each selected application
      await Promise.all(selectedIds.map(async (id) => {
        const response = await fetch(`/api/bursary/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error(`Failed to delete application ${id}`);
        }
      }));
      
      // Remove deleted applications from state
      setApplications(prev => prev.filter(app => !selectedIds.includes(app._id)));
      setSelectedIds([]);
      
    } catch (error) {
      console.error('Error deleting applications:', error);
      alert('Failed to delete some applications. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle bulk delete by status
  const handleBulkDeleteByStatus = async (status: string) => {
    const confirmMessage =
      status === 'all'
        ? 'Are you sure you want to delete ALL applications? This cannot be undone.'
        : `Are you sure you want to delete all ${status} applications?`;
  
    if (!window.confirm(confirmMessage)) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      const response = await fetch('/api/bursary/bulk-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete ${status} applications`);
      }
  
      // Update local state
      setApplications(prev =>
        status === 'all' ? [] : prev.filter(app => app.status !== status)
      );
      setSelectedIds([]);
      setStatusFilter('all');
    } catch (error) {
      console.error('Error bulk deleting applications:', error);
      alert('Failed to delete applications. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };
  

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminPageLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#123800]">Bursary Applications</h1>
          
          <div className="flex items-center space-x-2">
            {selectedIds.length > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={isDeleting}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center"
              >
                <FiTrash2 className="mr-2" />
                Delete Selected ({selectedIds.length})
              </button>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <FiFilter className="text-[#123800] mr-2" />
                <span className="text-gray-700 font-medium">Filter by Status:</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusFilter === 'all' 
                      ? 'bg-[#123800] text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusFilter === 'pending' 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setStatusFilter('approved')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusFilter === 'approved' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  Approved
                </button>
                <button
                  onClick={() => setStatusFilter('rejected')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusFilter === 'rejected' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#123800] w-64"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Bulk Actions */}
          <div className="border-t pt-4">
            <div className="flex items-center">
              <span className="text-gray-700 font-medium mr-4">Bulk Actions:</span>
              <button
                onClick={() => handleBulkDeleteByStatus('rejected')}
                className="bg-red-100 text-red-700 px-3 py-1 rounded mr-2 hover:bg-red-200 transition-colors"
                disabled={isDeleting || !applications.some(app => app.status === 'rejected')}
              >
                Delete All Rejected
              </button>
              <button
                onClick={() => handleBulkDeleteByStatus('pending')}
                className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded mr-2 hover:bg-yellow-200 transition-colors"
                disabled={isDeleting || !applications.some(app => app.status === 'pending')}
              >
                Delete All Pending
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete ALL applications? This cannot be undone.')) {
                    setStatusFilter('all');
                    handleBulkDeleteByStatus('all');
                  }
                }}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                disabled={isDeleting || applications.length === 0}
              >
                Delete All Applications
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#a8d080] border-t-[#123800] rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            <p>{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredApplications.length && filteredApplications.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-[#123800] focus:ring-[#123800]"
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Applied
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-4 text-center text-sm text-gray-500">
                      No applications found matching the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((application) => (
                    <tr key={application._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(application._id)}
                          onChange={() => handleSelectApplication(application._id)}
                          className="rounded border-gray-300 text-[#123800] focus:ring-[#123800]"
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-lg font-medium text-gray-900">
                          {application.firstName} {application.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{application.email}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-lg text-gray-900">{application.currentSchool}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500">
                        {formatDate(application.createdAt)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          application.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : application.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-lg font-medium">
                        <Link
                          href={`/bursary-admin/${application._id}`}
                          className="text-[#123800] hover:text-[#a8d080] mr-3"
                        >
                          View
                        </Link>
                        <button
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this application?')) {
                              try {
                                const response = await fetch(`/api/bursary/${application._id}`, {
                                  method: 'DELETE',
                                  credentials: 'include',
                                });
                                
                                if (response.ok) {
                                  setApplications(prev => prev.filter(app => app._id !== application._id));
                                } else {
                                  alert('Failed to delete application');
                                }
                              } catch (error) {
                                console.error('Error deleting application:', error);
                                alert('An error occurred');
                              }
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminPageLayout>
  );
}