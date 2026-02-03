'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, onboardingComplete, isLoading } = useApp();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push('/signin');
    } else if (!onboardingComplete) {
      router.push('/onboarding');
    } else {
      router.push('/dashboard');
    }
  }, [isAuthenticated, onboardingComplete, isLoading, router]);

  // Loading state
  return (
    <div className="min-h-screen bg-[#0B1A33] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F79FF] to-[#3C53E4] flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
            <path d="M12 2a10 10 0 0 1 10 10" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">EasyAcquire.ai</h1>
        <p className="text-gray-400">Loading your acquisition journey...</p>
      </div>
    </div>
  );
}
