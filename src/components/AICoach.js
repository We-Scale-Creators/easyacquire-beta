'use client';

import { useState } from 'react';

export default function AICoach() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI acquisition coach. Ask me anything about finding, analyzing, or acquiring businesses. I'm here to help you succeed!"
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }]);

    // Simulate AI response (ready for Claude API integration)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Thanks for your question! I'm currently in demo mode, but once connected to the Claude API, I'll be able to provide detailed guidance on acquisition strategy, due diligence, negotiation tactics, and more."
      }]);
    }, 1000);

    setMessage('');
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="ai-coach-panel animate-slide-up">
          {/* Header */}
          <div className="ai-coach-header">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4F79FF, #3C53E4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 2a10 10 0 0 1 10 10" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', color: 'white', fontSize: '15px' }}>AI Coach</div>
              <div style={{ fontSize: '12px', color: '#2ECC71' }}>● Online</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="ai-coach-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '16px',
                  display: 'flex',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  gap: '10px'
                }}
              >
                {msg.role === 'assistant' && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #4F79FF, #3C53E4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                )}
                <div style={{
                  maxWidth: '80%',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #4F79FF, #3C53E4)' : 'rgba(79, 121, 255, 0.1)',
                  color: 'white',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="ai-coach-input-area">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: '12px 16px',
                background: 'rgba(11, 26, 51, 0.8)',
                border: '1px solid rgba(79, 121, 255, 0.2)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSend}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4F79FF, #3C53E4)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <div className="ai-coach-trigger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
            <circle cx="12" cy="10" r="2" />
          </svg>
        )}
      </div>
    </>
  );
}
