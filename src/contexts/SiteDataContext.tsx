import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteData, getSiteData, saveSiteData } from '../data/siteData';

interface SiteDataContextType {
  siteData: SiteData;
  updateSiteData: (data: SiteData) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};

interface SiteDataProviderProps {
  children: ReactNode;
}

export const SiteDataProvider: React.FC<SiteDataProviderProps> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(getSiteData());
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Проверяем, находимся ли мы в админ-панели
    const isAdminPath = window.location.pathname === '/admin';
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAdmin(isAdminPath && isLoggedIn);
  }, []);

  const updateSiteData = (data: SiteData) => {
    setSiteData(data);
    saveSiteData(data);
  };

  return (
    <SiteDataContext.Provider value={{ siteData, updateSiteData, isAdmin, setIsAdmin }}>
      {children}
    </SiteDataContext.Provider>
  );
};