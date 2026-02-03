'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function Dashboard() {
  const { user, deals, pipelineDeals } = useApp();

  // Calculate stats
  const dealsSaved = pipelineDeals.saved.length + pipelineDeals.analyzing.length + pipelineDeals.readyForOffer.length + pipelineDeals.loiCreated.length;
  const dealsAnalyzed = pipelineDeals.analyzing.length + pipelineDeals.readyForOffer.length + pipelineDeals.loiCreated.length;
  const loisCreated = pipelineDeals.loiCreated.length;

  const stats = [
    {
      label: 'Deals Saved',
      value: dealsSaved,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
      ),
      color: '#4F79FF',
      bgColor: 'rgba(79, 121, 255, 0.15)'
    },
    {
      label: 'Deals Analyzed',
      value: dealsAnalyzed,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.997.398-.997.95v8a1 1 0 0 0 1 1h8z" />
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        </svg>
      ),
      color: '#F39C12',
      bgColor: 'rgba(243, 156, 18, 0.15)'
    },
    {
      label: 'LOIs Created',
      value: loisCreated,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      ),
      color: '#2ECC71',
      bgColor: 'rgba(46, 204, 113, 0.15)'
    }
  ];

  const quickActions = [
    {
      title: 'Find a Deal',
      description: 'Add a new potential acquisition',
      href: '/dashboard/finder',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M11 8v6" />
          <path d="M8 11h6" />
        </svg>
      )
    },
    {
      title: 'View Pipeline',
      description: 'Track your deal progress',
      href: '/dashboard/pipeline',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="6" height="18" rx="1" />
          <rect x="9" y="8" width="6" height="13" rx="1" />
          <rect x="15" y="13" width="6" height="8" rx="1" />
        </svg>
      )
    },
    {
      title: 'Analyze Deal',
      description: 'Get SWOT and fit score',
      href: '/dashboard/analysis',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.997.398-.997.95v8a1 1 0 0 0 1 1h8z" />
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        </svg>
      )
    },
    {
      title: 'Create Offer',
      description: 'Build your LOI',
      href: '/dashboard/offer',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M12 18v-6" />
          <path d="m9 15 3 3 3-3" />
        </svg>
      )
    },
    {
      title: 'Resources',
      description: 'Access trusted contacts',
      href: '/dashboard/resources',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="M12 6v7" />
          <path d="m15 9-3 3-3-3" />
        </svg>
      )
    },
    {
      title: 'Settings',
      description: 'Manage your account',
      href: '/dashboard/settings',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      )
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Welcome Section */}
      <div className="card" style={{ marginBottom: '32px', background: 'linear-gradient(135deg, rgba(79, 121, 255, 0.1), rgba(60, 83, 228, 0.05))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '32px' }}>👋</span>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '16px' }}>
              Here's your acquisition overview. Let's find your next business.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ background: stat.bgColor, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '32px' }}>
        <h3 className="section-title">Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href} style={{ textDecoration: 'none' }}>
              <div className="card card-hover" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'rgba(79, 121, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4F79FF',
                  flexShrink: 0
                }}>
                  {action.icon}
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: 'white', fontSize: '16px', marginBottom: '4px' }}>
                    {action.title}
                  </div>
                  <div style={{ color: '#64748B', fontSize: '14px' }}>
                    {action.description}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="section-title">Recent Activity</h3>
        <div className="card">
          {deals.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 16px',
                borderRadius: '16px',
                background: 'rgba(79, 121, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4F79FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <h4 style={{ color: 'white', fontSize: '18px', marginBottom: '8px' }}>No deals yet</h4>
              <p style={{ color: '#64748B', marginBottom: '20px' }}>Start by adding your first potential acquisition</p>
              <Link href="/dashboard/finder">
                <button className="btn btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                  Add Your First Deal
                </button>
              </Link>
            </div>
          ) : (
            <div>
              {deals.slice(0, 5).map((deal, index) => (
                <div key={deal.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 0',
                  borderBottom: index < deals.length - 1 ? '1px solid rgba(79, 121, 255, 0.1)' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(79, 121, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4F79FF',
                      fontWeight: '600'
                    }}>
                      {deal.businessName?.charAt(0) || 'D'}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: 'white' }}>{deal.businessName || 'Unnamed Deal'}</div>
                      <div style={{ fontSize: '13px', color: '#64748B' }}>{deal.location || 'No location'}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', color: '#2ECC71' }}>${deal.askingPrice?.toLocaleString() || '0'}</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>Asking Price</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
