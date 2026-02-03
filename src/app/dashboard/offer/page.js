'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

const financingOptions = [
  {
    id: 'sba',
    name: 'SBA 7(a) Loan',
    description: 'Government-backed loan with favorable terms',
    downPayment: '10-20%',
    interestRate: '11-13%',
    term: 'Up to 10 years',
    pros: ['Lower down payment', 'Longer terms', 'Lower rates'],
    cons: ['Longer approval process', 'More documentation required']
  },
  {
    id: 'sba-seller',
    name: 'SBA + Seller Financing',
    description: 'Combination of SBA loan and seller note',
    downPayment: '10-15%',
    interestRate: 'Mixed',
    term: '10 years + seller terms',
    pros: ['Lower cash needed', 'Seller has skin in the game', 'Flexible terms'],
    cons: ['More complex structure', 'Requires seller agreement']
  },
  {
    id: 'conventional',
    name: 'Conventional Loan',
    description: 'Traditional bank financing',
    downPayment: '20-30%',
    interestRate: '8-12%',
    term: '5-7 years',
    pros: ['Faster closing', 'Less paperwork', 'More flexibility'],
    cons: ['Higher down payment', 'Shorter terms']
  }
];

export default function OfferCreator() {
  const { pipelineDeals } = useApp();
  const [step, setStep] = useState(1);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedFinancing, setSelectedFinancing] = useState(null);
  const [offerData, setOfferData] = useState({
    offerPrice: '',
    downPayment: '',
    closingDate: '',
    contingencies: [],
    additionalTerms: ''
  });

  const allDeals = [
    ...pipelineDeals.saved,
    ...pipelineDeals.analyzing,
    ...pipelineDeals.readyForOffer,
    ...pipelineDeals.loiCreated
  ];

  const handleOfferChange = (field, value) => {
    setOfferData(prev => ({ ...prev, [field]: value }));
  };

  const contingencyOptions = [
    'Financing contingency',
    'Due diligence contingency',
    'Lease assignment approval',
    'Key employee retention',
    'Inventory verification',
    'Equipment inspection'
  ];

  const toggleContingency = (contingency) => {
    setOfferData(prev => ({
      ...prev,
      contingencies: prev.contingencies.includes(contingency)
        ? prev.contingencies.filter(c => c !== contingency)
        : [...prev.contingencies, contingency]
    }));
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px' }}>
      {/* Progress Steps */}
      <div className="card" style={{ marginBottom: '32px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: s < 4 ? 1 : 'none' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: step >= s ? 'linear-gradient(135deg, #4F79FF, #3C53E4)' : 'rgba(79, 121, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: step >= s ? 'white' : '#64748B',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                {step > s ? '✓' : s}
              </div>
              {s < 4 && (
                <div style={{
                  flex: 1,
                  height: '4px',
                  background: step > s ? '#4F79FF' : 'rgba(79, 121, 255, 0.2)',
                  margin: '0 12px'
                }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
          <span style={{ fontSize: '13px', color: step >= 1 ? 'white' : '#64748B' }}>Select Deal</span>
          <span style={{ fontSize: '13px', color: step >= 2 ? 'white' : '#64748B' }}>Financing</span>
          <span style={{ fontSize: '13px', color: step >= 3 ? 'white' : '#64748B' }}>Offer Terms</span>
          <span style={{ fontSize: '13px', color: step >= 4 ? 'white' : '#64748B' }}>Review LOI</span>
        </div>
      </div>

      {/* Step 1: Select Deal */}
      {step === 1 && (
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: '24px' }}>Step 1: Select a Deal</h3>
          <div className="form-group">
            <label className="form-label">Choose a deal from your pipeline</label>
            <select
              className="form-select"
              value={selectedDeal?.id || ''}
              onChange={(e) => {
                const deal = allDeals.find(d => d.id === parseInt(e.target.value));
                setSelectedDeal(deal);
                if (deal) {
                  setOfferData(prev => ({ ...prev, offerPrice: deal.askingPrice?.toString() || '' }));
                }
              }}
            >
              <option value="">Select a deal...</option>
              {allDeals.map(deal => (
                <option key={deal.id} value={deal.id}>
                  {deal.businessName} - ${deal.askingPrice?.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {selectedDeal && (
            <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(79, 121, 255, 0.1)', borderRadius: '12px' }}>
              <h4 style={{ color: 'white', marginBottom: '16px' }}>{selectedDeal.businessName}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div>
                  <span style={{ color: '#64748B', fontSize: '14px' }}>Asking Price</span>
                  <div style={{ color: '#2ECC71', fontWeight: '700', fontSize: '20px' }}>${selectedDeal.askingPrice?.toLocaleString()}</div>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '14px' }}>EBITDA</span>
                  <div style={{ color: 'white', fontWeight: '700', fontSize: '20px' }}>${selectedDeal.ebitda?.toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-primary"
              onClick={() => setStep(2)}
              disabled={!selectedDeal}
            >
              Continue to Financing
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Financing Strategy */}
      {step === 2 && (
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: '24px' }}>Step 2: Choose Financing Strategy</h3>

          <div style={{ display: 'grid', gap: '16px' }}>
            {financingOptions.map(option => (
              <div
                key={option.id}
                onClick={() => setSelectedFinancing(option)}
                style={{
                  padding: '24px',
                  background: selectedFinancing?.id === option.id ? 'rgba(79, 121, 255, 0.15)' : 'rgba(11, 26, 51, 0.5)',
                  border: `2px solid ${selectedFinancing?.id === option.id ? '#4F79FF' : 'rgba(79, 121, 255, 0.2)'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h4 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>{option.name}</h4>
                    <p style={{ color: '#94A3B8', fontSize: '14px' }}>{option.description}</p>
                  </div>
                  {selectedFinancing?.id === option.id && (
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#4F79FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>Down Payment</div>
                    <div style={{ color: 'white', fontWeight: '600' }}>{option.downPayment}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>Interest Rate</div>
                    <div style={{ color: 'white', fontWeight: '600' }}>{option.interestRate}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>Term</div>
                    <div style={{ color: 'white', fontWeight: '600' }}>{option.term}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={() => setStep(1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setStep(3)}
              disabled={!selectedFinancing}
            >
              Continue to Terms
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Offer Terms */}
      {step === 3 && (
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: '24px' }}>Step 3: Define Offer Terms</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <div className="form-group">
              <label className="form-label">Offer Price ($)</label>
              <input
                type="number"
                className="form-input"
                value={offerData.offerPrice}
                onChange={(e) => handleOfferChange('offerPrice', e.target.value)}
                placeholder="Enter your offer price"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Down Payment ($)</label>
              <input
                type="number"
                className="form-input"
                value={offerData.downPayment}
                onChange={(e) => handleOfferChange('downPayment', e.target.value)}
                placeholder="Enter down payment amount"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Target Closing Date</label>
            <input
              type="date"
              className="form-input"
              value={offerData.closingDate}
              onChange={(e) => handleOfferChange('closingDate', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contingencies</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {contingencyOptions.map(contingency => (
                <div
                  key={contingency}
                  onClick={() => toggleContingency(contingency)}
                  style={{
                    padding: '12px 16px',
                    background: offerData.contingencies.includes(contingency) ? 'rgba(79, 121, 255, 0.2)' : 'rgba(11, 26, 51, 0.5)',
                    border: `1px solid ${offerData.contingencies.includes(contingency) ? '#4F79FF' : 'rgba(79, 121, 255, 0.2)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: `2px solid ${offerData.contingencies.includes(contingency) ? '#4F79FF' : 'rgba(79, 121, 255, 0.3)'}`,
                    background: offerData.contingencies.includes(contingency) ? '#4F79FF' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {offerData.contingencies.includes(contingency) && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span style={{ color: 'white', fontSize: '14px' }}>{contingency}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Additional Terms</label>
            <textarea
              className="form-textarea"
              value={offerData.additionalTerms}
              onChange={(e) => handleOfferChange('additionalTerms', e.target.value)}
              placeholder="Any additional terms or conditions..."
              rows={4}
            />
          </div>

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={() => setStep(2)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </button>
            <button className="btn btn-primary" onClick={() => setStep(4)}>
              Preview LOI
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: LOI Preview */}
      {step === 4 && (
        <div className="card">
          <h3 className="section-title" style={{ marginBottom: '24px' }}>Step 4: Letter of Intent Preview</h3>

          <div style={{ background: 'white', color: '#1a1a1a', borderRadius: '12px', padding: '40px', fontFamily: 'Georgia, serif' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>LETTER OF INTENT</h2>
              <p style={{ color: '#666' }}>Non-Binding Expression of Interest</p>
            </div>

            <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
              This Letter of Intent ("LOI") is submitted by <strong>[Buyer Name]</strong> ("Buyer")
              to the owners of <strong>{selectedDeal?.businessName}</strong> ("Seller") for the
              proposed acquisition of substantially all assets of the business.
            </p>

            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>1. Purchase Price</h4>
            <p style={{ lineHeight: '1.8' }}>
              The Buyer proposes to acquire the Business for a total purchase price of
              <strong> ${parseInt(offerData.offerPrice || 0).toLocaleString()}</strong>.
            </p>

            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>2. Financing Structure</h4>
            <p style={{ lineHeight: '1.8' }}>
              The transaction will be financed through <strong>{selectedFinancing?.name}</strong> with
              a down payment of <strong>${parseInt(offerData.downPayment || 0).toLocaleString()}</strong>.
            </p>

            <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>3. Closing Date</h4>
            <p style={{ lineHeight: '1.8' }}>
              Target closing date: <strong>{offerData.closingDate || '[To be determined]'}</strong>
            </p>

            {offerData.contingencies.length > 0 && (
              <>
                <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>4. Contingencies</h4>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                  {offerData.contingencies.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </>
            )}

            {offerData.additionalTerms && (
              <>
                <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>5. Additional Terms</h4>
                <p style={{ lineHeight: '1.8' }}>{offerData.additionalTerms}</p>
              </>
            )}

            <div style={{ marginTop: '40px', borderTop: '1px solid #ddd', paddingTop: '24px' }}>
              <p style={{ color: '#666', fontSize: '14px', fontStyle: 'italic' }}>
                This Letter of Intent is non-binding and subject to the execution of a definitive purchase agreement.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={() => setStep(3)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Edit
            </button>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </button>
              <button className="btn btn-success">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Save LOI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
