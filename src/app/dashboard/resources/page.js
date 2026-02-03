'use client';

import { useState } from 'react';

const resourceCategories = [
  {
    id: 'legal',
    title: 'Legal Diligence',
    description: 'Legal documents, contracts, and compliance checklists for M&A transactions',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    color: '#4F79FF',
    resources: [
      { name: 'Asset Purchase Agreement Template', type: 'Document', premium: false },
      { name: 'Stock Purchase Agreement Template', type: 'Document', premium: false },
      { name: 'Letter of Intent (LOI) Template', type: 'Document', premium: false },
      { name: 'Non-Disclosure Agreement (NDA)', type: 'Document', premium: false },
      { name: 'Due Diligence Checklist - Legal', type: 'Checklist', premium: true },
      { name: 'Employment Agreement Templates', type: 'Document', premium: true },
      { name: 'IP Assignment Agreement', type: 'Document', premium: true },
      { name: 'Escrow Agreement Template', type: 'Document', premium: true },
    ]
  },
  {
    id: 'financial',
    title: 'Financial Diligence',
    description: 'Financial analysis tools, valuation models, and audit checklists',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    color: '#2ECC71',
    resources: [
      { name: 'Business Valuation Calculator', type: 'Tool', premium: false },
      { name: 'Financial Due Diligence Checklist', type: 'Checklist', premium: false },
      { name: 'Quality of Earnings Analysis Template', type: 'Spreadsheet', premium: true },
      { name: 'Working Capital Calculator', type: 'Tool', premium: false },
      { name: 'SDE Normalization Worksheet', type: 'Spreadsheet', premium: true },
      { name: 'Cash Flow Projection Model', type: 'Spreadsheet', premium: true },
      { name: 'Break-Even Analysis Calculator', type: 'Tool', premium: false },
      { name: 'Debt Service Coverage Calculator', type: 'Tool', premium: true },
    ]
  },
  {
    id: 'lenders',
    title: 'Verified Lenders',
    description: 'Pre-vetted SBA lenders and financing partners for acquisitions',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    color: '#9B59B6',
    resources: [
      { name: 'Live Oak Bank', type: 'SBA Preferred', premium: false, rating: 4.8 },
      { name: 'Celtic Bank', type: 'SBA Preferred', premium: false, rating: 4.6 },
      { name: 'SmartBiz Loans', type: 'SBA Express', premium: false, rating: 4.5 },
      { name: 'Pursuit Lending', type: 'SBA & Conventional', premium: false, rating: 4.7 },
      { name: 'Guidant Financial', type: 'ROBS & SBA', premium: true, rating: 4.4 },
      { name: 'Mainstreet Bank', type: 'SBA 7(a)', premium: true, rating: 4.6 },
    ]
  },
  {
    id: 'investors',
    title: 'Verified Investors',
    description: 'Connect with investors interested in funding your acquisition',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: '#E74C3C',
    resources: [
      { name: 'Searchfunder Community', type: 'Network', premium: false },
      { name: 'Independent Sponsor Network', type: 'Network', premium: true },
      { name: 'Angel Investment Groups', type: 'Directory', premium: true },
      { name: 'Family Office Connections', type: 'Network', premium: true },
      { name: 'PE Fund Introductions', type: 'Service', premium: true },
      { name: 'Seller Financing Strategies', type: 'Guide', premium: false },
    ]
  },
  {
    id: 'recruiting',
    title: 'Recruiting',
    description: 'Find key talent to help run your newly acquired business',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    color: '#F39C12',
    resources: [
      { name: 'CEO/GM Job Description Templates', type: 'Document', premium: false },
      { name: 'Operations Manager Templates', type: 'Document', premium: false },
      { name: 'CFO/Controller Templates', type: 'Document', premium: true },
      { name: 'Executive Recruiter Network', type: 'Service', premium: true },
      { name: 'Compensation Benchmarking Tool', type: 'Tool', premium: true },
      { name: 'Employee Retention Strategies', type: 'Guide', premium: false },
    ]
  },
  {
    id: 'llc',
    title: 'LLC Creation',
    description: 'Set up your acquisition holding company and legal structure',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
        <path d="M10 18h4" />
      </svg>
    ),
    color: '#1ABC9C',
    resources: [
      { name: 'LLC Formation Guide', type: 'Guide', premium: false },
      { name: 'Operating Agreement Template', type: 'Document', premium: false },
      { name: 'State Filing Requirements', type: 'Reference', premium: false },
      { name: 'EIN Application Guide', type: 'Guide', premium: false },
      { name: 'Holding Company Structure Guide', type: 'Guide', premium: true },
      { name: 'Tax Election Strategies (S-Corp)', type: 'Guide', premium: true },
      { name: 'Registered Agent Service', type: 'Service', premium: true },
      { name: 'Corporate Compliance Calendar', type: 'Tool', premium: true },
    ]
  }
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = resourceCategories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.resources.some(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Resource Hub</h1>
          <p className="text-gray-400 text-lg">
            Everything you need to successfully acquire and operate a business
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white placeholder-gray-500 focus:border-[#4F79FF] focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            className={`glass-card-static p-6 cursor-pointer transition-all hover:-translate-y-1 ${
              selectedCategory === category.id ? 'ring-2 ring-[#4F79FF]' : ''
            }`}
          >
            {/* Category Header */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${category.color}20, ${category.color}10)`,
                  color: category.color
                }}
              >
                {category.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-1">{category.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{category.description}</p>
              </div>
            </div>

            {/* Resource Count */}
            <div className="flex items-center justify-between pt-4 border-t border-[rgba(79,121,255,0.1)]">
              <span className="text-sm text-gray-500">
                {category.resources.length} resources
              </span>
              <span className="text-sm font-medium" style={{ color: category.color }}>
                {selectedCategory === category.id ? 'Hide' : 'View'} →
              </span>
            </div>

            {/* Expanded Resources */}
            {selectedCategory === category.id && (
              <div className="mt-6 pt-6 border-t border-[rgba(79,121,255,0.1)] space-y-3 animate-fade-in">
                {category.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-[rgba(11,26,51,0.6)] hover:bg-[rgba(11,26,51,0.8)] transition-all group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${category.color}20` }}
                      >
                        {resource.type === 'Document' && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={category.color} strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14,2 14,8 20,8" />
                          </svg>
                        )}
                        {resource.type === 'Checklist' && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={category.color} strokeWidth="2">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                          </svg>
                        )}
                        {resource.type === 'Tool' && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={category.color} strokeWidth="2">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                          </svg>
                        )}
                        {resource.type === 'Spreadsheet' && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={category.color} strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M3 9h18" />
                            <path d="M3 15h18" />
                            <path d="M9 3v18" />
                          </svg>
                        )}
                        {(resource.type === 'Guide' || resource.type === 'Reference') && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={category.color} strokeWidth="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          </svg>
                        )}
                        {(resource.type === 'Network' || resource.type === 'Directory' || resource.type === 'Service') && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={category.color} strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                        )}
                        {resource.type === 'SBA Preferred' || resource.type === 'SBA Express' || resource.type === 'SBA & Conventional' || resource.type === 'ROBS & SBA' || resource.type === 'SBA 7(a)' && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={category.color} strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M3 9h18" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{resource.name}</p>
                        <p className="text-xs text-gray-500">{resource.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {resource.rating && (
                        <span className="text-xs px-2 py-1 rounded-lg bg-[rgba(243,156,18,0.15)] text-[#F39C12]">
                          ★ {resource.rating}
                        </span>
                      )}
                      {resource.premium ? (
                        <span className="text-xs px-2 py-1 rounded-lg bg-[rgba(155,89,182,0.15)] text-[#9B59B6]">
                          PRO
                        </span>
                      ) : (
                        <button className="text-xs px-3 py-1.5 rounded-lg bg-[rgba(79,121,255,0.15)] text-[#4F79FF] hover:bg-[rgba(79,121,255,0.25)] transition-all">
                          Access
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pro Upgrade Banner */}
      <div className="glass-card-static p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(79,121,255,0.1)] to-[rgba(155,89,182,0.1)]" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Unlock All Premium Resources</h3>
            <p className="text-gray-400">
              Get access to advanced templates, exclusive lender connections, and investor introductions
            </p>
          </div>
          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#9B59B6] to-[#8E44AD] text-white font-semibold shadow-lg shadow-[rgba(155,89,182,0.25)] hover:shadow-[rgba(155,89,182,0.4)] transition-all hover:-translate-y-0.5 flex-shrink-0">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}
