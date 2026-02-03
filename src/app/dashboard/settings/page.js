'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

const tabs = [
  { id: 'profile', label: 'Profile', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )},
  { id: 'financial', label: 'Financial Info', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )},
  { id: 'experience', label: 'Experience', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )},
  { id: 'preferences', label: 'Preferences', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )},
  { id: 'account', label: 'Account', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )}
];

export default function SettingsPage() {
  const { profile } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-gray-400 text-lg">Manage your profile and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabs Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="glass-card-static p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[rgba(79,121,255,0.2)] to-[rgba(79,121,255,0.1)] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[rgba(79,121,255,0.05)]'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-[#4F79FF]' : ''}>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="glass-card-static p-8 space-y-8 animate-fade-in">
              <div className="flex items-center gap-6 pb-8 border-b border-[rgba(79,121,255,0.1)]">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#4F79FF] to-[#3C53E4] flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-[rgba(79,121,255,0.3)]">
                  {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{profile?.name || 'User'}</h3>
                  <p className="text-gray-500 mb-3">{profile?.email || 'user@example.com'}</p>
                  <button className="text-sm px-4 py-2 rounded-lg bg-[rgba(79,121,255,0.15)] text-[#4F79FF] hover:bg-[rgba(79,121,255,0.25)] transition-all">
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue={profile?.name?.split(' ')[0] || ''}
                    className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white focus:border-[#4F79FF] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue={profile?.name?.split(' ')[1] || ''}
                    className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white focus:border-[#4F79FF] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue={profile?.email || ''}
                    className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white focus:border-[#4F79FF] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white placeholder-gray-600 focus:border-[#4F79FF] focus:outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                  <input
                    type="text"
                    defaultValue={profile?.location || ''}
                    placeholder="City, State"
                    className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white placeholder-gray-600 focus:border-[#4F79FF] focus:outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us a bit about yourself and your acquisition goals..."
                    className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white placeholder-gray-600 focus:border-[#4F79FF] focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Financial Info Tab */}
          {activeTab === 'financial' && (
            <div className="glass-card-static p-8 space-y-8 animate-fade-in">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Financial Information</h3>
                <p className="text-gray-400">This helps us match you with appropriate deal sizes and financing options</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Available Equity / Cash</label>
                  <select className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white focus:border-[#4F79FF] focus:outline-none transition-all">
                    <option>Under $50K</option>
                    <option>$50K - $100K</option>
                    <option>$100K - $250K</option>
                    <option>$250K - $500K</option>
                    <option>$500K - $1M</option>
                    <option>$1M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Target Deal Size</label>
                  <select className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white focus:border-[#4F79FF] focus:outline-none transition-all">
                    <option>$100K - $250K</option>
                    <option>$250K - $500K</option>
                    <option>$500K - $1M</option>
                    <option>$1M - $2.5M</option>
                    <option>$2.5M - $5M</option>
                    <option>$5M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Pre-Approved for SBA?</label>
                  <select className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white focus:border-[#4F79FF] focus:outline-none transition-all">
                    <option>Not yet</option>
                    <option>In progress</option>
                    <option>Yes - Pre-approved</option>
                    <option>Not interested in SBA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Financing Preference</label>
                  <select className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white focus:border-[#4F79FF] focus:outline-none transition-all">
                    <option>SBA 7(a) Loan</option>
                    <option>SBA + Seller Financing</option>
                    <option>Conventional Bank Loan</option>
                    <option>Investor/Partner Capital</option>
                    <option>All Cash</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Credit Score Range</label>
                  <select className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white focus:border-[#4F79FF] focus:outline-none transition-all">
                    <option>720+ (Excellent)</option>
                    <option>680-719 (Good)</option>
                    <option>640-679 (Fair)</option>
                    <option>Below 640</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="glass-card-static p-8 space-y-8 animate-fade-in">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Experience & Background</h3>
                <p className="text-gray-400">Help us understand your acquisition experience and professional background</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Acquisition Experience</label>
                  <select className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white focus:border-[#4F79FF] focus:outline-none transition-all">
                    <option>First-time buyer</option>
                    <option>1-2 acquisitions</option>
                    <option>3-5 acquisitions</option>
                    <option>Serial acquirer (6+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Acquisition Timeline</label>
                  <select className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white focus:border-[#4F79FF] focus:outline-none transition-all">
                    <option>Immediately</option>
                    <option>1-3 months</option>
                    <option>3-6 months</option>
                    <option>6-12 months</option>
                    <option>Just exploring</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Current Role</label>
                  <select className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white focus:border-[#4F79FF] focus:outline-none transition-all">
                    <option>Business Owner</option>
                    <option>Executive / C-Suite</option>
                    <option>Manager / Director</option>
                    <option>Professional / Employee</option>
                    <option>Entrepreneur / Founder</option>
                    <option>Investor</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Years in Industry</label>
                  <select className="w-full px-4 py-3 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-xl text-white focus:border-[#4F79FF] focus:outline-none transition-all">
                    <option>0-2 years</option>
                    <option>3-5 years</option>
                    <option>5-10 years</option>
                    <option>10-20 years</option>
                    <option>20+ years</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Industry Expertise (select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Technology', 'Healthcare', 'Manufacturing', 'Retail', 'Services', 'Construction', 'Transportation', 'Food & Beverage', 'Other'].map((industry) => (
                      <label key={industry} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(11,26,51,0.5)] cursor-pointer hover:bg-[rgba(11,26,51,0.8)] transition-all">
                        <input type="checkbox" className="w-4 h-4 rounded accent-[#4F79FF]" />
                        <span className="text-sm text-gray-300">{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="glass-card-static p-8 space-y-8 animate-fade-in">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Deal Preferences</h3>
                <p className="text-gray-400">Customize what types of deals you want to see</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Preferred Industries</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['SaaS / Software', 'E-commerce', 'Manufacturing', 'Services', 'Healthcare', 'Retail', 'Construction', 'Transportation', 'Food & Beverage'].map((industry) => (
                      <label key={industry} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(11,26,51,0.5)] cursor-pointer hover:bg-[rgba(11,26,51,0.8)] transition-all">
                        <input type="checkbox" className="w-4 h-4 rounded accent-[#4F79FF]" />
                        <span className="text-sm text-gray-300">{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Geographic Preferences</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Remote / Online Only', 'My Local Area', 'My State', 'Nationwide', 'Open to Relocation'].map((location) => (
                      <label key={location} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(11,26,51,0.5)] cursor-pointer hover:bg-[rgba(11,26,51,0.8)] transition-all">
                        <input type="checkbox" className="w-4 h-4 rounded accent-[#4F79FF]" />
                        <span className="text-sm text-gray-300">{location}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">Notifications</label>
                  <div className="space-y-3">
                    {[
                      { label: 'New deals matching my criteria', description: 'Get notified when new deals are posted' },
                      { label: 'Pipeline updates', description: 'Status changes for deals in your pipeline' },
                      { label: 'Weekly digest', description: 'Summary of market activity and opportunities' },
                      { label: 'AI Coach insights', description: 'Personalized tips and recommendations' },
                    ].map((pref, index) => (
                      <label key={index} className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[rgba(11,26,51,0.5)] cursor-pointer hover:bg-[rgba(11,26,51,0.8)] transition-all">
                        <div>
                          <p className="text-sm font-medium text-white">{pref.label}</p>
                          <p className="text-xs text-gray-500">{pref.description}</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-[#4F79FF] mt-0.5" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6 animate-fade-in">
              {/* Subscription */}
              <div className="glass-card-static p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Current Plan</h3>
                    <p className="text-gray-400">Manage your subscription</p>
                  </div>
                  <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-[rgba(155,89,182,0.2)] to-[rgba(155,89,182,0.1)] text-[#9B59B6] font-semibold">
                    Pro Member
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-[rgba(11,26,51,0.5)]">
                  <div className="flex-1">
                    <p className="text-white font-medium">Pro Monthly</p>
                    <p className="text-sm text-gray-500">$49/month • Renews Feb 15, 2026</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg border border-[rgba(79,121,255,0.3)] text-gray-400 hover:text-white hover:border-[rgba(79,121,255,0.5)] transition-all">
                      Change Plan
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-[rgba(231,76,60,0.3)] text-[#E74C3C] hover:bg-[rgba(231,76,60,0.1)] transition-all">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="glass-card-static p-8">
                <h3 className="text-lg font-semibold text-white mb-6">Security</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[rgba(11,26,51,0.5)]">
                    <div>
                      <p className="text-white font-medium">Password</p>
                      <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-[rgba(79,121,255,0.15)] text-[#4F79FF] hover:bg-[rgba(79,121,255,0.25)] transition-all">
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[rgba(11,26,51,0.5)]">
                    <div>
                      <p className="text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-[rgba(46,204,113,0.15)] text-[#2ECC71] hover:bg-[rgba(46,204,113,0.25)] transition-all">
                      Enable
                    </button>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="glass-card-static p-8 border border-[rgba(231,76,60,0.2)]">
                <h3 className="text-lg font-semibold text-[#E74C3C] mb-6">Danger Zone</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[rgba(231,76,60,0.05)]">
                    <div>
                      <p className="text-white font-medium">Export Data</p>
                      <p className="text-sm text-gray-500">Download all your data</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg border border-[rgba(79,121,255,0.3)] text-gray-400 hover:text-white transition-all">
                      Export
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[rgba(231,76,60,0.05)]">
                    <div>
                      <p className="text-white font-medium">Delete Account</p>
                      <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-[rgba(231,76,60,0.15)] text-[#E74C3C] hover:bg-[rgba(231,76,60,0.25)] transition-all">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="px-6 py-3 rounded-xl border border-[rgba(79,121,255,0.3)] text-gray-400 font-medium hover:text-white hover:border-[rgba(79,121,255,0.5)] transition-all">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white font-semibold shadow-lg shadow-[rgba(46,204,113,0.25)] hover:shadow-[rgba(46,204,113,0.4)] transition-all hover:-translate-y-0.5 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
