'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      )
    },
    {
      name: 'Deal Finder',
      href: '/dashboard/finder',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M11 8v6" />
          <path d="M8 11h6" />
        </svg>
      )
    },
    {
      name: 'Pipeline',
      href: '/dashboard/pipeline',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="6" height="18" rx="1" />
          <rect x="9" y="8" width="6" height="13" rx="1" />
          <rect x="15" y="13" width="6" height="8" rx="1" />
        </svg>
      )
    },
    {
      name: 'Analysis',
      href: '/dashboard/analysis',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.997.398-.997.95v8a1 1 0 0 0 1 1h8z" />
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        </svg>
      )
    },
    {
      name: 'Offer Creator',
      href: '/dashboard/offer',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M12 18v-6" />
          <path d="m9 15 3 3 3-3" />
        </svg>
      )
    },
    {
      name: 'Resources',
      href: '/dashboard/resources',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="M12 6v7" />
          <path d="m15 9-3 3-3-3" />
        </svg>
      )
    }
  ];

  const isActive = (href) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(79, 121, 255, 0.15)' }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4F79FF, #3C53E4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(79, 121, 255, 0.3)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>EasyAcquire</div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Intelligence Platform</div>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav style={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}>
        <div style={{ padding: '0 20px', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Main Menu
          </span>
        </div>

        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}

        {/* Settings Section */}
        <div style={{ padding: '0 20px', marginTop: '32px', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Account
          </span>
        </div>

        <Link
          href="/dashboard/settings"
          className={`nav-item ${isActive('/dashboard/settings') ? 'active' : ''}`}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
          </svg>
          <span>Settings</span>
        </Link>
      </nav>

      {/* User Info */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(79, 121, 255, 0.15)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          background: 'rgba(79, 121, 255, 0.08)',
          borderRadius: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #4F79FF, #3C53E4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '700',
            fontSize: '16px'
          }}>
            U
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              User
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Acquisition Seeker
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
