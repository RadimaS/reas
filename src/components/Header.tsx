import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="REAS Logo" 
                className="w-6 h-6 sm:w-10 sm:h-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white">REAS</h1>
              <p className="text-xs sm:text-sm text-gray-300">Противопожарная защита</p>
            </div>
          </div>

          {/* Desktop Navigation - скрыто на маленьких экранах */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm lg:text-base"
            >
              О компании
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm lg:text-base"
            >
              Услуги
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm lg:text-base"
            >
              Портфолио
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-orange-500 hover:bg-orange-600 px-4 lg:px-6 py-2 rounded-lg transition-colors duration-300 text-sm lg:text-base"
            >
              Контакты
            </button>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 px-2 lg:px-3 py-2 rounded-lg text-xs lg:text-sm border border-white/20 text-white hover:bg-slate-700 transition-colors duration-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 lg:w-5 lg:h-5" /> : <Moon className="w-4 h-4 lg:w-5 lg:h-5" />}
              <span className="hidden lg:inline">{theme === 'dark' ? 'Светлая' : 'Тёмная'}</span>
            </button>
          </nav>

          {/* Mobile Theme Toggle - только кнопка переключения темы */}
          <div className="flex md:hidden">
            <button
              onClick={toggleTheme}
              className="text-white hover:text-orange-500 transition-colors duration-300 p-2"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;