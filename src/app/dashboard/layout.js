'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import AICoach from '@/components/AICoach';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, isOnboarded, isLoading } = useApp();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/signin');
      } else if (!isOnboarded) {
        router.push('/onboarding');
      }
    }
  }, [isAuthenticated, isOnboarded, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B1A33'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 20px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #4F79FF, #3C53E4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <p style={{ color: '#64748B' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isOnboarded) {
    return null;
  }

  return (
    <div>
      <Sidebar />
      <Header />
      <main className="main-content">
        {children}
      </main>
      <AICoach />
    </div>
  );
}
