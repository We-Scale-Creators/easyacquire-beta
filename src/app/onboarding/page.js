'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

const questions = [
  {
    id: 1,
    question: "What's your name?",
    description: "Let's start with a quick introduction",
    type: 'text',
    placeholder: 'Enter your full name',
    field: 'name'
  },
  {
    id: 2,
    question: "What's your email address?",
    description: "We'll use this to keep you updated on your acquisition journey",
    type: 'email',
    placeholder: 'you@example.com',
    field: 'email'
  },
  {
    id: 3,
    question: "Where are you located?",
    description: "This helps us find deals in your preferred area",
    type: 'text',
    placeholder: 'City, State',
    field: 'location'
  },
  {
    id: 4,
    question: "What's your acquisition experience?",
    description: "This helps us tailor the platform to your needs",
    type: 'select',
    field: 'experience',
    options: [
      { value: 'first-time', label: "First-time buyer - I'm new to this" },
      { value: '1-2', label: "Some experience - 1-2 acquisitions" },
      { value: '3-5', label: "Experienced - 3-5 acquisitions" },
      { value: '6+', label: "Serial acquirer - 6+ acquisitions" }
    ]
  },
  {
    id: 5,
    question: "What industries interest you most?",
    description: "Select all that apply - we'll prioritize deals in these areas",
    type: 'multi-select',
    field: 'industries',
    options: [
      { value: 'saas', label: 'SaaS / Software' },
      { value: 'ecommerce', label: 'E-commerce' },
      { value: 'services', label: 'Professional Services' },
      { value: 'manufacturing', label: 'Manufacturing' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'retail', label: 'Retail' },
      { value: 'construction', label: 'Construction' },
      { value: 'food', label: 'Food & Beverage' },
      { value: 'other', label: 'Other / Open to All' }
    ]
  },
  {
    id: 6,
    question: "What's your target deal size?",
    description: "The total acquisition price you're comfortable with",
    type: 'select',
    field: 'dealSize',
    options: [
      { value: '100k-250k', label: '$100K - $250K' },
      { value: '250k-500k', label: '$250K - $500K' },
      { value: '500k-1m', label: '$500K - $1M' },
      { value: '1m-2.5m', label: '$1M - $2.5M' },
      { value: '2.5m-5m', label: '$2.5M - $5M' },
      { value: '5m+', label: '$5M+' }
    ]
  },
  {
    id: 7,
    question: "How much equity/cash do you have available?",
    description: "This helps us recommend appropriate financing structures",
    type: 'select',
    field: 'equity',
    options: [
      { value: 'under-50k', label: 'Under $50K' },
      { value: '50k-100k', label: '$50K - $100K' },
      { value: '100k-250k', label: '$100K - $250K' },
      { value: '250k-500k', label: '$250K - $500K' },
      { value: '500k-1m', label: '$500K - $1M' },
      { value: '1m+', label: '$1M+' }
    ]
  },
  {
    id: 8,
    question: "What's your preferred financing approach?",
    description: "We'll tailor our recommendations accordingly",
    type: 'select',
    field: 'financing',
    options: [
      { value: 'sba', label: 'SBA 7(a) Loan' },
      { value: 'sba-seller', label: 'SBA + Seller Financing' },
      { value: 'conventional', label: 'Conventional Bank Loan' },
      { value: 'investor', label: 'Investor/Partner Capital' },
      { value: 'cash', label: 'All Cash' },
      { value: 'exploring', label: 'Still exploring options' }
    ]
  },
  {
    id: 9,
    question: "What's your acquisition timeline?",
    description: "When do you ideally want to close a deal?",
    type: 'select',
    field: 'timeline',
    options: [
      { value: 'immediately', label: 'Immediately - Ready to move fast' },
      { value: '1-3', label: '1-3 months' },
      { value: '3-6', label: '3-6 months' },
      { value: '6-12', label: '6-12 months' },
      { value: 'exploring', label: 'Just exploring - No rush' }
    ]
  },
  {
    id: 10,
    question: "What's your current professional situation?",
    description: "This helps us understand your availability and resources",
    type: 'select',
    field: 'situation',
    options: [
      { value: 'employed', label: 'Currently employed - Looking to transition' },
      { value: 'owner', label: 'Current business owner - Looking to expand' },
      { value: 'full-time', label: 'Full-time searcher - Dedicated to finding a deal' },
      { value: 'investor', label: 'Investor - Looking for opportunities' },
      { value: 'retired', label: 'Retired - Looking for a new venture' }
    ]
  },
  {
    id: 11,
    question: "What's most important to you in an acquisition?",
    description: "Select your top priorities",
    type: 'multi-select',
    field: 'priorities',
    options: [
      { value: 'cash-flow', label: 'Strong cash flow' },
      { value: 'growth', label: 'Growth potential' },
      { value: 'lifestyle', label: 'Lifestyle business' },
      { value: 'remote', label: 'Can be run remotely' },
      { value: 'team', label: 'Strong existing team' },
      { value: 'recession', label: 'Recession-resistant' },
      { value: 'seller', label: 'Seller willing to stay on' }
    ]
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setOnboardingComplete, setProfile } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestion.field]: value });
  };

  const handleMultiSelect = (value) => {
    const current = answers[currentQuestion.field] || [];
    if (current.includes(value)) {
      setAnswers({
        ...answers,
        [currentQuestion.field]: current.filter(v => v !== value)
      });
    } else {
      setAnswers({
        ...answers,
        [currentQuestion.field]: [...current, value]
      });
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setLoading(true);
    // Save profile data
    setProfile({
      name: answers.name,
      email: answers.email,
      location: answers.location,
      ...answers
    });
    setTimeout(() => {
      setOnboardingComplete(true);
      router.push('/dashboard');
    }, 1500);
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.field];
    if (currentQuestion.type === 'multi-select') {
      return answer && answer.length > 0;
    }
    return answer && answer.trim && answer.trim().length > 0 || answer;
  };

  return (
    <div className="min-h-screen bg-[#0B1A33] flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F79FF] to-[#3C53E4] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
              <path d="M12 2a10 10 0 0 1 10 10" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg">EasyAcquire.ai</span>
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          Skip for now
        </button>
      </header>

      {/* Progress Bar */}
      <div className="px-8 mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Question {currentStep + 1} of {questions.length}</span>
            <span className="text-sm text-[#4F79FF]">{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-[rgba(79,121,255,0.1)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#4F79FF] to-[#3C53E4] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <main className="flex-1 flex items-center justify-center px-8 pb-32">
        <div className="w-full max-w-2xl animate-fade-in">
          {/* Question */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {currentQuestion.question}
            </h1>
            <p className="text-lg text-gray-400">
              {currentQuestion.description}
            </p>
          </div>

          {/* Answer Input */}
          <div className="space-y-4">
            {currentQuestion.type === 'text' && (
              <input
                type="text"
                value={answers[currentQuestion.field] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={currentQuestion.placeholder}
                autoFocus
                className="w-full px-6 py-5 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-2xl text-white text-lg placeholder-gray-500 focus:border-[#4F79FF] focus:outline-none focus:ring-2 focus:ring-[rgba(79,121,255,0.2)] transition-all"
                onKeyPress={(e) => e.key === 'Enter' && canProceed() && handleNext()}
              />
            )}

            {currentQuestion.type === 'email' && (
              <input
                type="email"
                value={answers[currentQuestion.field] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={currentQuestion.placeholder}
                autoFocus
                className="w-full px-6 py-5 bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] rounded-2xl text-white text-lg placeholder-gray-500 focus:border-[#4F79FF] focus:outline-none focus:ring-2 focus:ring-[rgba(79,121,255,0.2)] transition-all"
                onKeyPress={(e) => e.key === 'Enter' && canProceed() && handleNext()}
              />
            )}

            {currentQuestion.type === 'select' && (
              <div className="grid gap-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full px-6 py-5 rounded-2xl text-left text-lg transition-all ${
                      answers[currentQuestion.field] === option.value
                        ? 'bg-gradient-to-r from-[rgba(79,121,255,0.2)] to-[rgba(79,121,255,0.1)] border-2 border-[#4F79FF] text-white'
                        : 'bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] text-gray-300 hover:border-[rgba(79,121,255,0.4)] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        answers[currentQuestion.field] === option.value
                          ? 'border-[#4F79FF] bg-[#4F79FF]'
                          : 'border-gray-500'
                      }`}>
                        {answers[currentQuestion.field] === option.value && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span>{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'multi-select' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQuestion.options.map((option) => {
                  const selected = (answers[currentQuestion.field] || []).includes(option.value);
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleMultiSelect(option.value)}
                      className={`w-full px-5 py-4 rounded-xl text-left transition-all ${
                        selected
                          ? 'bg-gradient-to-r from-[rgba(79,121,255,0.2)] to-[rgba(79,121,255,0.1)] border-2 border-[#4F79FF] text-white'
                          : 'bg-[rgba(11,26,51,0.8)] border border-[rgba(79,121,255,0.2)] text-gray-300 hover:border-[rgba(79,121,255,0.4)] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                          selected
                            ? 'border-[#4F79FF] bg-[#4F79FF]'
                            : 'border-gray-500'
                        }`}>
                          {selected && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm">{option.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 px-8 py-6 bg-gradient-to-t from-[#0B1A33] via-[#0B1A33] to-transparent">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl border transition-all ${
              currentStep === 0
                ? 'border-transparent text-gray-600 cursor-not-allowed'
                : 'border-[rgba(79,121,255,0.3)] text-gray-400 hover:text-white hover:border-[rgba(79,121,255,0.5)]'
            }`}
          >
            ← Back
          </button>

          <div className="flex items-center gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-[#4F79FF]'
                    : index < currentStep
                    ? 'bg-[#4F79FF]'
                    : 'bg-[rgba(79,121,255,0.2)]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed() || loading}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              canProceed() && !loading
                ? 'bg-gradient-to-r from-[#4F79FF] to-[#3C53E4] text-white shadow-lg shadow-[rgba(79,121,255,0.25)] hover:shadow-[rgba(79,121,255,0.4)] hover:-translate-y-0.5'
                : 'bg-[rgba(79,121,255,0.2)] text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Setting up...
              </span>
            ) : currentStep === questions.length - 1 ? (
              'Complete Setup →'
            ) : (
              'Continue →'
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
