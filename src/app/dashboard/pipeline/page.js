'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

const stages = [
  { id: 'saved', name: 'Saved', color: '#4F79FF' },
  { id: 'analyzing', name: 'Analyzing', color: '#F39C12' },
  { id: 'readyForOffer', name: 'Ready for Offer', color: '#9B59B6' },
  { id: 'loiCreated', name: 'LOI Created', color: '#2ECC71' }
];

export default function Pipeline() {
  const { pipelineDeals, moveDeal } = useApp();
  const [draggedDeal, setDraggedDeal] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);

  const handleDragStart = (deal, fromStage) => {
    setDraggedDeal(deal);
    setDraggedFrom(fromStage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (toStage) => {
    if (draggedDeal && draggedFrom && draggedFrom !== toStage) {
      moveDeal(draggedDeal.id, draggedFrom, toStage);
    }
    setDraggedDeal(null);
    setDraggedFrom(null);
  };

  const totalDeals = Object.values(pipelineDeals).flat().length;

  return (
    <div className="animate-fade-in">
      {/* Stats Bar */}
      <div className="card" style={{ marginBottom: '32px', padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div>
              <span style={{ color: '#64748B', fontSize: '14px' }}>Total Deals: </span>
              <span style={{ color: 'white', fontWeight: '700', fontSize: '18px' }}>{totalDeals}</span>
            </div>
            {stages.map(stage => (
              <div key={stage.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: stage.color }} />
                <span style={{ color: '#94A3B8', fontSize: '14px' }}>
                  {stage.name}: <span style={{ color: 'white', fontWeight: '600' }}>{pipelineDeals[stage.id].length}</span>
                </span>
              </div>
            ))}
          </div>
          <Link href="/dashboard/finder">
            <button className="btn btn-primary btn-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              Add Deal
            </button>
          </Link>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="kanban-container">
        {stages.map(stage => (
          <div
            key={stage.id}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(stage.id)}
          >
            {/* Column Header */}
            <div className="kanban-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: stage.color }} />
                <span className="kanban-title">{stage.name}</span>
              </div>
              <span className="kanban-count">{pipelineDeals[stage.id].length}</span>
            </div>

            {/* Cards */}
            <div className="kanban-cards">
              {pipelineDeals[stage.id].length === 0 ? (
                <div style={{
                  padding: '32px 16px',
                  textAlign: 'center',
                  border: '2px dashed rgba(79, 121, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#64748B',
                  fontSize: '14px'
                }}>
                  Drag deals here
                </div>
              ) : (
                pipelineDeals[stage.id].map(deal => (
                  <div
                    key={deal.id}
                    className="kanban-card"
                    draggable
                    onDragStart={() => handleDragStart(deal, stage.id)}
                    style={{ opacity: draggedDeal?.id === deal.id ? 0.5 : 1 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: `${stage.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: stage.color,
                        fontWeight: '700',
                        fontSize: '14px'
                      }}>
                        {deal.businessName?.charAt(0) || 'D'}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: '600', color: 'white', fontSize: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {deal.businessName || 'Unnamed Deal'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>
                          {deal.location || 'No location'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>Asking</div>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#2ECC71' }}>
                          ${deal.askingPrice?.toLocaleString() || '0'}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>EBITDA</div>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>
                          ${deal.ebitda?.toLocaleString() || '0'}
                        </div>
                      </div>
                    </div>

                    {deal.industry && (
                      <div style={{ marginTop: '12px' }}>
                        <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>
                          {deal.industry.replace('-', ' ')}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {totalDeals === 0 && (
        <div className="card" style={{ marginTop: '32px', textAlign: 'center', padding: '48px 24px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            margin: '0 auto 20px',
            borderRadius: '20px',
            background: 'rgba(79, 121, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4F79FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="6" height="18" rx="1" />
              <rect x="9" y="8" width="6" height="13" rx="1" />
              <rect x="15" y="13" width="6" height="8" rx="1" />
            </svg>
          </div>
          <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
            Your pipeline is empty
          </h3>
          <p style={{ color: '#64748B', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
            Start by adding deals to your pipeline. Drag and drop cards between stages to track your progress.
          </p>
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
      )}
    </div>
  );
}
