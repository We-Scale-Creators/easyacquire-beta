'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function Analysis() {
  const { pipelineDeals } = useApp();
  const [selectedDeal, setSelectedDeal] = useState(null);

  // Get all deals from pipeline
  const allDeals = [
    ...pipelineDeals.saved,
    ...pipelineDeals.analyzing,
    ...pipelineDeals.readyForOffer,
    ...pipelineDeals.loiCreated
  ];

  // Mock analysis data (in production, this would come from AI/backend)
  const getAnalysis = (deal) => {
    const multiple = deal.askingPrice && deal.ebitda ? (deal.askingPrice / deal.ebitda).toFixed(2) : 'N/A';
    const fitScore = Math.random() * 3 + 7; // Random score between 7-10 for demo

    return {
      fitScore: fitScore.toFixed(1),
      multiple,
      swot: {
        strengths: [
          'Strong cash flow relative to asking price',
          'Established customer base',
          'Experienced management team in place',
          'Solid market position'
        ],
        weaknesses: [
          'Customer concentration risk',
          'Aging equipment may need replacement',
          'Limited online presence',
          'Key person dependency'
        ],
        opportunities: [
          'Expand into adjacent markets',
          'Implement technology improvements',
          'Add complementary services',
          'Geographic expansion potential'
        ],
        threats: [
          'Increasing competition',
          'Economic downturn risk',
          'Regulatory changes',
          'Supply chain disruptions'
        ]
      },
      risks: [
        { name: 'Customer Concentration', level: 'Medium', description: 'Top 3 customers represent 40% of revenue' },
        { name: 'Key Person Risk', level: 'High', description: 'Owner handles most key relationships' },
        { name: 'Market Risk', level: 'Low', description: 'Industry is stable with consistent demand' },
        { name: 'Operational Risk', level: 'Medium', description: 'Some processes not documented' }
      ],
      questions: [
        'What is the customer retention rate over the past 3 years?',
        'Are there any pending legal issues or disputes?',
        'What percentage of revenue is recurring vs. one-time?',
        'What are the terms of the current lease?',
        'How long has each key employee been with the company?',
        'What systems and processes are documented?',
        'Are there any environmental concerns?',
        'What is the status of all licenses and permits?'
      ]
    };
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return '#2ECC71';
      case 'Medium': return '#F39C12';
      case 'High': return '#E74C3C';
      default: return '#64748B';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Deal Selector */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            <label className="form-label" style={{ marginBottom: '12px' }}>Select a Deal to Analyze</label>
            <select
              className="form-select"
              value={selectedDeal?.id || ''}
              onChange={(e) => {
                const deal = allDeals.find(d => d.id === parseInt(e.target.value));
                setSelectedDeal(deal);
              }}
            >
              <option value="">Choose a deal from your pipeline...</option>
              {allDeals.map(deal => (
                <option key={deal.id} value={deal.id}>
                  {deal.businessName} - ${deal.askingPrice?.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!selectedDeal ? (
        /* Empty State */
        <div className="card" style={{ textAlign: 'center', padding: '64px 24px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 24px',
            borderRadius: '20px',
            background: 'rgba(79, 121, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4F79FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.997.398-.997.95v8a1 1 0 0 0 1 1h8z" />
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
            </svg>
          </div>
          <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '600', marginBottom: '12px' }}>
            Select a Deal to Analyze
          </h3>
          <p style={{ color: '#64748B', maxWidth: '450px', margin: '0 auto', lineHeight: '1.7' }}>
            Choose a deal from your pipeline to get a comprehensive SWOT analysis, fit score, risk assessment, and suggested due diligence questions.
          </p>
        </div>
      ) : (
        /* Analysis Content */
        (() => {
          const analysis = getAnalysis(selectedDeal);
          return (
            <>
              {/* Score Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>Fit Score</div>
                  <div style={{ fontSize: '48px', fontWeight: '800', color: '#2ECC71' }}>{analysis.fitScore}</div>
                  <div style={{ fontSize: '14px', color: '#64748B' }}>out of 10</div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>Asking Multiple</div>
                  <div style={{ fontSize: '48px', fontWeight: '800', color: '#4F79FF' }}>{analysis.multiple}x</div>
                  <div style={{ fontSize: '14px', color: '#64748B' }}>EBITDA</div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>Asking Price</div>
                  <div style={{ fontSize: '48px', fontWeight: '800', color: 'white' }}>${(selectedDeal.askingPrice / 1000).toFixed(0)}K</div>
                  <div style={{ fontSize: '14px', color: '#64748B' }}>USD</div>
                </div>
              </div>

              {/* SWOT Analysis */}
              <div className="card" style={{ marginBottom: '32px' }}>
                <h3 className="section-title" style={{ marginBottom: '24px' }}>SWOT Analysis</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                  {/* Strengths */}
                  <div style={{ background: 'rgba(46, 204, 113, 0.1)', borderRadius: '12px', padding: '20px' }}>
                    <h4 style={{ color: '#2ECC71', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>💪</span> Strengths
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {analysis.swot.strengths.map((item, i) => (
                        <li key={i} style={{ color: '#CBD5E1', padding: '8px 0', borderBottom: i < analysis.swot.strengths.length - 1 ? '1px solid rgba(46, 204, 113, 0.2)' : 'none' }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div style={{ background: 'rgba(231, 76, 60, 0.1)', borderRadius: '12px', padding: '20px' }}>
                    <h4 style={{ color: '#E74C3C', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>⚠️</span> Weaknesses
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {analysis.swot.weaknesses.map((item, i) => (
                        <li key={i} style={{ color: '#CBD5E1', padding: '8px 0', borderBottom: i < analysis.swot.weaknesses.length - 1 ? '1px solid rgba(231, 76, 60, 0.2)' : 'none' }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div style={{ background: 'rgba(79, 121, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
                    <h4 style={{ color: '#4F79FF', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>🚀</span> Opportunities
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {analysis.swot.opportunities.map((item, i) => (
                        <li key={i} style={{ color: '#CBD5E1', padding: '8px 0', borderBottom: i < analysis.swot.opportunities.length - 1 ? '1px solid rgba(79, 121, 255, 0.2)' : 'none' }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Threats */}
                  <div style={{ background: 'rgba(243, 156, 18, 0.1)', borderRadius: '12px', padding: '20px' }}>
                    <h4 style={{ color: '#F39C12', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>⚡</span> Threats
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {analysis.swot.threats.map((item, i) => (
                        <li key={i} style={{ color: '#CBD5E1', padding: '8px 0', borderBottom: i < analysis.swot.threats.length - 1 ? '1px solid rgba(243, 156, 18, 0.2)' : 'none' }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="card" style={{ marginBottom: '32px' }}>
                <h3 className="section-title" style={{ marginBottom: '24px' }}>Risk Assessment</h3>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {analysis.risks.map((risk, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px', background: 'rgba(11, 26, 51, 0.5)', borderRadius: '12px' }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: getRiskColor(risk.level),
                        flexShrink: 0
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: '600', color: 'white' }}>{risk.name}</span>
                          <span className="badge" style={{ background: `${getRiskColor(risk.level)}20`, color: getRiskColor(risk.level) }}>
                            {risk.level}
                          </span>
                        </div>
                        <div style={{ color: '#94A3B8', fontSize: '14px' }}>{risk.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Questions */}
              <div className="card">
                <h3 className="section-title" style={{ marginBottom: '24px' }}>Suggested Due Diligence Questions</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {analysis.questions.map((question, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      padding: '16px',
                      background: 'rgba(11, 26, 51, 0.5)',
                      borderRadius: '12px'
                    }}>
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        background: 'rgba(79, 121, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#4F79FF',
                        fontWeight: '600',
                        fontSize: '14px',
                        flexShrink: 0
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ color: '#CBD5E1', lineHeight: '1.6' }}>{question}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        })()
      )}
    </div>
  );
}
