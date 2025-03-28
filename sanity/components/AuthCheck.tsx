// sanity/components/AuthCheck.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          
          // Check if user is admin
          if (data.user && data.user.role === 'admin') {
            setIsAuthenticated(true);
          } else {
            // Not an admin, redirect to account or home
            window.location.href = data.user ? '/account' : '/';
          }
        } else {
          // Not authenticated, redirect to home
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        window.location.href = '/';
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '16px'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}