'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function DealFinder() {
  const router = useRouter();
  const { addDeal } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    askingPrice: '',
    ebitda: '',
    location: '',
    employees: '',
    industry: '',
    additionalInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add the deal
    const deal = {
      ...formData,
      askingPrice: parseInt(formData.askingPrice) || 0,
      ebitda: parseInt(formData.ebitda) || 0,
      employees: parseInt(formData.employees) || 0
    };

    addDeal(deal);

    // Redirect to pipeline
    setTimeout(() => {
      router.push('/dashboard/pipeline');
    }, 500);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
      {/* Info Card */}
      <div className="card" style={{ marginBottom: '32px', background: 'linear-gradient(135deg, rgba(79, 121, 255, 0.1), rgba(60, 83, 228, 0.05))' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(79, 121, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F79FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <div>
            <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Add a Potential Acquisition
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.6' }}>
              Enter the details of a business you're interested in acquiring. This information will be used to analyze the deal and track it through your pipeline.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Business Name */}
          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter the business name"
              className="form-input"
              required
            />
          </div>

          {/* Two Column Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Asking Price */}
            <div className="form-group">
              <label className="form-label">Asking Price ($)</label>
              <input
                type="number"
                name="askingPrice"
                value={formData.askingPrice}
                onChange={handleChange}
                placeholder="e.g., 500000"
                className="form-input"
                required
              />
            </div>

            {/* EBITDA */}
            <div className="form-group">
              <label className="form-label">EBITDA ($)</label>
              <input
                type="number"
                name="ebitda"
                value={formData.ebitda}
                onChange={handleChange}
                placeholder="e.g., 150000"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Two Column Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Location */}
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
                className="form-input"
                required
              />
            </div>

            {/* Employees */}
            <div className="form-group">
              <label className="form-label">Number of Employees</label>
              <input
                type="number"
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                placeholder="e.g., 15"
                className="form-input"
              />
            </div>
          </div>

          {/* Industry */}
          <div className="form-group">
            <label className="form-label">Industry</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select an industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail</option>
              <option value="food-beverage">Food & Beverage</option>
              <option value="professional-services">Professional Services</option>
              <option value="construction">Construction</option>
              <option value="transportation">Transportation</option>
              <option value="real-estate">Real Estate</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Additional Info */}
          <div className="form-group">
            <label className="form-label">Additional Information</label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Any other relevant details about this opportunity..."
              className="form-textarea"
              rows={5}
            />
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
            <button
              type="submit"
              className="btn btn-success btn-lg"
              disabled={isSubmitting}
              style={{ flex: 1 }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Saving Deal...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Save to Pipeline
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Tips Section */}
      <div className="card" style={{ marginTop: '32px' }}>
        <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          💡 Tips for Evaluating Deals
        </h4>
        <ul style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '2', paddingLeft: '20px' }}>
          <li>A healthy business typically sells for 2-4x EBITDA</li>
          <li>Always verify financials with tax returns and bank statements</li>
          <li>Consider the seller's motivation - why are they selling?</li>
          <li>Factor in working capital requirements when calculating total investment</li>
          <li>Location matters - consider customer concentration and lease terms</li>
        </ul>
      </div>
    </div>
  );
}
