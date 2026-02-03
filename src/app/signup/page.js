'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function SignUpPage() {
  const router = useRouter();
  const { setIsAuthenticated, setOnboardingComplete } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    // Simulate registration
    setTimeout(() => {
      setIsAuthenticated(true);
      setOnboardingComplete(false);
      router.push('/onboarding');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B1A33] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F79FF] to-[#3C53E4] flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 2a10 10 0 0 1 10 10" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">EasyAcquire.ai</h1>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Create your account</h2>
            <p className="text-gray-400">Start your acquisition journey today</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-[rgba(231,76,60,0.15)] border border-[rgba(231,76,60,0.3)] text-[#E74C3C]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white placeholder-gray-500 focus:border-[#4F79FF] focus:outline-none focus:ring-2 focus:ring-[rgba(79,121,255,0.2)] transition-all"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white placeholder-gray-500 focus:border-[#4F79FF] focus:outline-none focus:ring-2 focus:ring-[rgba(79,121,255,0.2)] transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white placeholder-gray-500 focus:border-[#4F79FF] focus:outline-none focus:ring-2 focus:ring-[rgba(79,121,255,0.2)] transition-all"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white placeholder-gray-500 focus:border-[#4F79FF] focus:outline-none focus:ring-2 focus:ring-[rgba(79,121,255,0.2)] transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 rounded accent-[#4F79FF] mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-gray-400 leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" className="text-[#4F79FF] hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[#4F79FF] hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4F79FF] to-[#3C53E4] text-white font-semibold shadow-lg shadow-[rgba(79,121,255,0.25)] hover:shadow-[rgba(79,121,255,0.4)] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[rgba(79,121,255,0.2)]" />
            <span className="text-sm text-gray-500">or sign up with</span>
            <div className="flex-1 h-px bg-[rgba(79,121,255,0.2)]" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 rounded-xl border border-[rgba(79,121,255,0.2)] text-gray-400 hover:text-white hover:border-[rgba(79,121,255,0.4)] hover:bg-[rgba(79,121,255,0.05)] transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-3 rounded-xl border border-[rgba(79,121,255,0.2)] text-gray-400 hover:text-white hover:border-[rgba(79,121,255,0.4)] hover:bg-[rgba(79,121,255,0.05)] transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
              </svg>
              Apple
            </button>
          </div>

          <p className="text-center text-gray-400 mt-8">
            Already have an account?{' '}
            <Link href="/signin" className="text-[#4F79FF] font-semibold hover:text-[#3C53E4] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3C53E4] to-[#4F79FF]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        {/* Floating Elements */}
        <div className="absolute top-32 right-20 w-32 h-32 bg-white/10 rounded-3xl backdrop-blur-xl animate-float" />
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-white/10 rounded-2xl backdrop-blur-xl animate-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 rounded-xl backdrop-blur-xl animate-float" />

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 2a10 10 0 0 1 10 10" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Join EasyAcquire.ai</h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-md">
              Join thousands of entrepreneurs who have successfully acquired businesses using our platform.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mt-12">
            {[
              { value: '2,500+', label: 'Deals Analyzed' },
              { value: '$850M', label: 'In Acquisitions' },
              { value: '98%', label: 'Success Rate' },
              { value: '4.9★', label: 'User Rating' }
            ].map((stat, index) => (
              <div key={index} className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl">
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: -3s;
        }
      `}</style>
    </div>
  );
}
