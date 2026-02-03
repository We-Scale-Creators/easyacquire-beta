'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [deals, setDeals] = useState([]);
  const [pipelineDeals, setPipelineDeals] = useState({
    saved: [],
    analyzing: [],
    readyForOffer: [],
    loiCreated: []
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem('ea_auth');
    const storedOnboarded = localStorage.getItem('ea_onboarded');
    const storedProfile = localStorage.getItem('ea_profile');
    const storedDeals = localStorage.getItem('ea_deals');
    const storedPipeline = localStorage.getItem('ea_pipeline');

    if (storedAuth === 'true') setIsAuthenticated(true);
    if (storedOnboarded === 'true') setOnboardingComplete(true);
    if (storedProfile) setProfile(JSON.parse(storedProfile));
    if (storedDeals) setDeals(JSON.parse(storedDeals));
    if (storedPipeline) setPipelineDeals(JSON.parse(storedPipeline));

    setIsLoading(false);
  }, []);

  // Save auth state
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('ea_auth', isAuthenticated ? 'true' : 'false');
    }
  }, [isAuthenticated, isLoading]);

  // Save onboarding state
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('ea_onboarded', onboardingComplete ? 'true' : 'false');
    }
  }, [onboardingComplete, isLoading]);

  // Save profile
  useEffect(() => {
    if (!isLoading && profile) {
      localStorage.setItem('ea_profile', JSON.stringify(profile));
    }
  }, [profile, isLoading]);

  const login = (email, password) => {
    setIsAuthenticated(true);
    const newProfile = { email, name: email.split('@')[0] };
    setProfile(newProfile);
    return true;
  };

  const signup = (email, password, name) => {
    setIsAuthenticated(true);
    const newProfile = { email, name: name || email.split('@')[0] };
    setProfile(newProfile);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setOnboardingComplete(false);
    setProfile(null);
    localStorage.removeItem('ea_auth');
    localStorage.removeItem('ea_onboarded');
    localStorage.removeItem('ea_profile');
  };

  const addDeal = (deal) => {
    const newDeal = { ...deal, id: Date.now(), createdAt: new Date().toISOString() };
    const updated = [...deals, newDeal];
    setDeals(updated);
    localStorage.setItem('ea_deals', JSON.stringify(updated));

    // Also add to pipeline (Saved stage)
    const updatedPipeline = {
      ...pipelineDeals,
      saved: [...pipelineDeals.saved, newDeal]
    };
    setPipelineDeals(updatedPipeline);
    localStorage.setItem('ea_pipeline', JSON.stringify(updatedPipeline));

    return newDeal;
  };

  const moveDeal = (dealId, fromStage, toStage) => {
    const deal = pipelineDeals[fromStage].find(d => d.id === dealId);
    if (!deal) return;

    const updatedPipeline = {
      ...pipelineDeals,
      [fromStage]: pipelineDeals[fromStage].filter(d => d.id !== dealId),
      [toStage]: [...pipelineDeals[toStage], deal]
    };
    setPipelineDeals(updatedPipeline);
    localStorage.setItem('ea_pipeline', JSON.stringify(updatedPipeline));
  };

  const value = {
    // State
    isAuthenticated,
    onboardingComplete,
    isLoading,
    profile,
    deals,
    pipelineDeals,
    // Setters (for direct use in components)
    setIsAuthenticated,
    setOnboardingComplete,
    setProfile,
    // Actions
    login,
    signup,
    logout,
    addDeal,
    moveDeal
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

export default AppContext;
