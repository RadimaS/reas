import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { SiteDataProvider } from './contexts/SiteDataContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';

function App() {
  // Проверяем, находимся ли мы на странице админки
  const isAdminRoute = window.location.pathname === '/admin';

  if (isAdminRoute) {
    return (
      <ThemeProvider>
        <SiteDataProvider>
          <AdminRoute />
        </SiteDataProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <SiteDataProvider>
        <div className="min-h-screen bg-slate-800 text-white overflow-x-hidden">
          <Header />
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <ContactForm />
          <Footer />
        </div>
      </SiteDataProvider>
    </ThemeProvider>
  );
}

export default App;