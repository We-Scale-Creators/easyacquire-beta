'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pageTitles = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Your acquisition command center' },
  '/dashboard/finder': { title: 'Deal Finder', subtitle: 'Add and track potential acquisitions' },
  '/dashboard/pipeline': { title: 'Deal Pipeline', subtitle: 'Manage your acquisition workflow' },
  '/dashboard/analysis': { title: 'Deal Analysis', subtitle: 'Deep dive into deal metrics' },
  '/dashboard/offer': { title: 'Offer Creator', subtitle: 'Build and manage your offers' },
  '/dashboard/resources': { title: 'Resource Hub', subtitle: 'Trusted partners and contacts' },
  '/dashboard/settings': { title: 'Account Settings', subtitle: 'Manage your profile and preferences' }
};

export default function Header() {
  const pathname = usePathname();
  const pageInfo = pageTitles[pathname] || { title: 'Dashboard', subtitle: '' };

  return (
    <header className="header">
      {/* Page Title */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'white', marginBottom: '2px' }}>
          {pageInfo.title}
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          {pageInfo.subtitle}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Search */}
        <button style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'rgba(79, 121, 255, 0.1)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#94A3B8'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>

        {/* Notifications */}
        <button style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'rgba(79, 121, 255, 0.1)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#94A3B8',
          position: 'relative'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#E74C3C'
          }} />
        </button>

        {/* Add Deal Button */}
        <Link href="/dashboard/finder" style={{ textDecoration: 'none' }}>
          <button className="btn btn-primary" style={{ padding: '10px 20px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            <span>Add Deal</span>
          </button>
        </Link>

        {/* Settings Link */}
        <Link href="/dashboard/settings" style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #4F79FF, #3C53E4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '700',
          fontSize: '16px',
          textDecoration: 'none'
        }}>
          U
        </Link>
      </div>
    </header>
  );
}
