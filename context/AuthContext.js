// context/AuthContext.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token');
    
    const checkUserLoggedIn = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '', // Send token in the header
          },
          credentials: 'include', // Still include cookies as backup
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
          localStorage.removeItem('auth_token'); // Remove token if user is not valid
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
        setUser(null);
        localStorage.removeItem('auth_token'); // Remove token if there's an error
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      checkUserLoggedIn();
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies for session management
      });

      const data = await res.json();

      if (res.ok) {
        // Store token in localStorage
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
        }

        setUser(data.user);

        // Redirect based on role
        if (data.user.role === 'admin') {
          router.push('/dashboard');
        } else {
          router.push('/account');
        }

        return { success: true };
      } else {
        return { 
          success: false, 
          message: data.message || 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Login error', error);
      return { 
        success: false, 
        message: 'An unexpected error occurred' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // Always clear localStorage
      localStorage.removeItem('auth_token');
      setUser(null);

      if (res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Clear user data and token on error as well
      localStorage.removeItem('auth_token');
      setUser(null);
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
