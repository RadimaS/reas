import React, { useState, useEffect } from 'react';
import { Save, LogOut, Edit3, Eye, EyeOff } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';
import { SiteData } from '../data/siteData';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Portfolio from './Portfolio';
import ContactForm from './ContactForm';
import Footer from './Footer';

const InlineAdminPanel: React.FC = () => {
  const { siteData, updateSiteData, setIsAdmin } = useSiteData();
  const [editData, setEditData] = useState<SiteData>(siteData);
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [editingElement, setEditingElement] = useState<string | null>(null);

  // Синхронизируем editData с siteData при изменении siteData
  useEffect(() => {
    setEditData(siteData);
  }, [siteData]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsAdmin(false);
    window.location.href = '/';
  };

  const handleSave = () => {
    updateSiteData(editData);
    setHasChanges(false);
    alert('Изменения сохранены и применены к сайту!');
  };

  const handleTextChange = (path: string, value: string) => {
    const keys = path.split('.');
    const newData = { ...editData };
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setEditData(newData);
    setHasChanges(true);
  };

  const handleArrayChange = (path: string, index: number, value: string) => {
    const keys = path.split('.');
    const newData = { ...editData };
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]][index] = value;
    
    setEditData(newData);
    setHasChanges(true);
  };

  // Создаем контекст для передачи функций редактирования
  const adminContext = {
    isEditMode,
    editingElement,
    setEditingElement,
    handleTextChange,
    handleArrayChange,
    editData
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white">
      {/* Admin Toolbar - фиксированная панель сверху */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Edit3 className="w-5 h-5 text-orange-500" />
              <h1 className="text-lg font-bold text-white">Режим редактирования</h1>
            </div>
            {/* <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isEditMode 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {isEditMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{isEditMode ? 'Редактирование' : 'Просмотр'}</span>
            </button> */}
            {hasChanges && (
              <div className="bg-yellow-500/20 text-yellow-400 px-3 py-2 rounded-lg text-sm">
                Есть несохраненные изменения
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {hasChanges && (
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
              >
                <Save className="w-4 h-4" />
                <span>Сохранить</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </div>

      {/* Site Content with Admin Context - отступ сверху для панели инструментов */}
      <div className="pt-20">
        <AdminContextProvider value={adminContext}>
          <AdminHeader />
          <AdminHero />
          <AdminAbout />
          <AdminServices />
          <AdminPortfolio />
          <AdminContactForm />
          <Footer />
        </AdminContextProvider>
      </div>
    </div>
  );
};

// Контекст для передачи админ-функций
const AdminContext = React.createContext<any>(null);

const AdminContextProvider: React.FC<{ children: React.ReactNode; value: any }> = ({ children, value }) => (
  <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
);

const useAdminContext = () => React.useContext(AdminContext);

// Компонент для редактируемого текста
const EditableText: React.FC<{
  path: string;
  value: string;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}> = ({ path, value, className = '', multiline = false, placeholder = '' }) => {
  const { isEditMode, editingElement, setEditingElement, handleTextChange } = useAdminContext();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleClick = () => {
    if (!isEditMode) return;
    setIsEditing(true);
    setEditingElement(path);
    setTempValue(value);
  };

  const handleSave = () => {
    handleTextChange(path, tempValue);
    setIsEditing(false);
    setEditingElement(null);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
    setEditingElement(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return multiline ? (
      <textarea
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`${className} bg-slate-700 border-2 border-orange-500 rounded px-2 py-1 resize-none min-h-[60px]`}
        placeholder={placeholder}
        autoFocus
        rows={3}
      />
    ) : (
      <input
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`${className} bg-slate-700 border-2 border-orange-500 rounded px-2 py-1 min-w-[200px]`}
        placeholder={placeholder}
        autoFocus
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      className={`${className} ${
        isEditMode 
          ? 'cursor-pointer hover:bg-orange-500/20 hover:outline hover:outline-2 hover:outline-orange-500/50 rounded transition-all duration-200 relative' 
          : ''
      }`}
      title={isEditMode ? 'Нажмите для редактирования' : ''}
    >
      {value || placeholder}
      {isEditMode && (
        <Edit3 className="inline-block w-3 h-3 ml-1 opacity-50" />
      )}
    </span>
  );
};

// Компонент для редактируемого массива
const EditableArray: React.FC<{
  path: string;
  items: string[];
  className?: string;
  renderItem: (item: string, index: number) => React.ReactNode;
}> = ({ path, items, className = '', renderItem }) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <EditableArrayItem
          key={index}
          path={path}
          index={index}
          value={item}
          renderItem={renderItem}
        />
      ))}
    </div>
  );
};

const EditableArrayItem: React.FC<{
  path: string;
  index: number;
  value: string;
  renderItem: (item: string, index: number) => React.ReactNode;
}> = ({ path, index, value, renderItem }) => {
  const { isEditMode, handleArrayChange } = useAdminContext();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleClick = () => {
    if (!isEditMode) return;
    setIsEditing(true);
    setTempValue(value);
  };

  const handleSave = () => {
    handleArrayChange(path, index, tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="mb-2">
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="bg-slate-700 border-2 border-orange-500 rounded px-2 py-1 w-full"
          autoFocus
        />
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`${
        isEditMode 
          ? 'cursor-pointer hover:bg-orange-500/20 hover:outline hover:outline-2 hover:outline-orange-500/50 rounded transition-all duration-200 relative' 
          : ''
      }`}
      title={isEditMode ? 'Нажмите для редактирования' : ''}
    >
      {renderItem(value, index)}
      {isEditMode && (
        <Edit3 className="inline-block w-3 h-3 ml-1 opacity-50" />
      )}
    </div>
  );
};

// Админ-версия Header
const AdminHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <header className={`fixed top-20 w-full z-40 transition-all duration-500 ${
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

          {/* Desktop Navigation */}
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
          </nav>
        </div>
      </div>
    </header>
  );
};

// Админ-версии компонентов
const AdminHero: React.FC = () => {
  const { editData } = useAdminContext();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/backgr.jpeg)' }}
      >
        <div className="absolute inset-0 bg-stone-900/80"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-16 sm:py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white drop-shadow-2xl">
            <EditableText 
              path="hero.title.0" 
              value={editData.hero.title[0]} 
              className="block"
            />
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              <EditableText 
                path="hero.title.1" 
                value={editData.hero.title[1]}
              />
            </span>
            <span className="block">
              <EditableText 
                path="hero.title.2" 
                value={editData.hero.title[2]}
              />
            </span>
          </h1>

          <div className="inline-flex items-center bg-orange-500/90 backdrop-blur-sm border border-orange-400/50 rounded-full px-4 sm:px-8 py-2 sm:py-4 mb-6 sm:mb-8 shadow-2xl">
            <span className="text-lg sm:text-2xl md:text-3xl font-bold text-white">
              <EditableText 
                path="hero.priceText" 
                value={editData.hero.priceText}
              />
            </span>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-10">
            <EditableArray
              path="hero.benefits"
              items={editData.hero.benefits}
              renderItem={(benefit, index) => (
                <div className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 shadow-lg">
                  <span className="text-gray-200 text-sm sm:text-base">{benefit}</span>
                </div>
              )}
            />
          </div>

          <button className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-orange-500/25 inline-flex items-center space-x-2">
            <span>
              <EditableText 
                path="hero.ctaButton" 
                value={editData.hero.ctaButton}
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const AdminAbout: React.FC = () => {
  const { editData } = useAdminContext();
  
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-slate-900">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <EditableText 
              path="about.title" 
              value={editData.about.title}
            />
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            <EditableText 
              path="about.subtitle" 
              value={editData.about.subtitle}
              multiline
            />
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 lg:mb-16">
          {editData.about.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-slate-800 p-3 sm:p-4 lg:p-6 rounded-xl hover:bg-slate-700 transition-colors duration-300 group">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                  <EditableText 
                    path={`about.stats.${index}.number`} 
                    value={stat.number}
                  />
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm lg:text-base">
                  <EditableText 
                    path={`about.stats.${index}.label`} 
                    value={stat.label}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
              <EditableText 
                path="about.mainTitle" 
                value={editData.about.mainTitle}
              />
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <EditableArray
                path="about.features"
                items={editData.about.features}
                renderItem={(feature, index) => (
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-500 rounded-full p-1 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base">{feature}</p>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 sm:p-8 rounded-2xl">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6">География работ</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-slate-600/50 p-3 sm:p-4 rounded-lg">
                <h5 className="font-semibold text-orange-400 mb-2 text-sm sm:text-base">Основные регионы:</h5>
                <p className="text-gray-300 text-xs sm:text-sm lg:text-base">
                  <EditableText 
                    path="about.regions.main" 
                    value={editData.about.regions.main}
                    multiline
                  />
                </p>
              </div>
              <div className="bg-slate-600/50 p-3 sm:p-4 rounded-lg">
                <h5 className="font-semibold text-orange-400 mb-2 text-sm sm:text-base">Охват:</h5>
                <p className="text-gray-300 text-xs sm:text-sm lg:text-base">
                  <EditableText 
                    path="about.regions.coverage" 
                    value={editData.about.regions.coverage}
                    multiline
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AdminServices: React.FC = () => {
  const { editData } = useAdminContext();
  
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-slate-800">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
            <EditableText 
              path="services.title" 
              value={editData.services.title}
            />
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            <EditableText 
              path="services.subtitle" 
              value={editData.services.subtitle}
              multiline
            />
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-8 sm:mb-10 lg:mb-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">
                  <EditableText 
                    path="services.mainService.title" 
                    value={editData.services.mainService.title}
                  />
                </h3>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                  <EditableText 
                    path="services.mainService.description" 
                    value={editData.services.mainService.description}
                    multiline
                  />
                </p>
                <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm sm:text-base">Стоимость обработки:</span>
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-400">
                      <EditableText 
                        path="services.mainService.price" 
                        value={editData.services.mainService.price}
                      />
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-400 mb-2 text-sm sm:text-base">Что входит в услугу:</h4>
                  <ul className="text-gray-300 space-y-1 text-xs sm:text-sm lg:text-base">
                    <EditableArray
                      path="services.mainService.included"
                      items={editData.services.mainService.included}
                      renderItem={(item, index) => <li>• {item}</li>}
                    />
                  </ul>
                </div>
                <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-400 mb-2 text-sm sm:text-base">Гарантии:</h4>
                  <ul className="text-gray-300 space-y-1 text-xs sm:text-sm lg:text-base">
                    <EditableArray
                      path="services.mainService.guarantees"
                      items={editData.services.mainService.guarantees}
                      renderItem={(item, index) => <li>• {item}</li>}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {editData.services.features.map((feature, index) => (
            <div key={index} className="bg-slate-700 hover:bg-slate-600 p-4 sm:p-6 rounded-xl transition-all duration-300 group cursor-pointer h-full">
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-orange-400 transition-colors duration-300 text-white">
                <EditableText 
                  path={`services.features.${index}.title`} 
                  value={feature.title}
                />
              </h4>
              <p className="group-hover:text-orange-300 transition-colors duration-300 text-gray-300 text-xs sm:text-sm lg:text-base">
                <EditableText 
                  path={`services.features.${index}.description`} 
                  value={feature.description}
                  multiline
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AdminPortfolio: React.FC = () => {
  const { editData } = useAdminContext();
  
  return (
    <section id="portfolio" className="py-12 sm:py-16 lg:py-20 bg-slate-900">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <EditableText 
              path="portfolio.title" 
              value={editData.portfolio.title}
            />
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editData.portfolio.projects.map((project, index) => (
            <div key={project.id} className="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors duration-300">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">
                  <EditableText 
                    path={`portfolio.projects.${index}.title`} 
                    value={project.title}
                  />
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  <EditableText 
                    path={`portfolio.projects.${index}.description`} 
                    value={project.description}
                    multiline
                  />
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                    <EditableText 
                      path={`portfolio.projects.${index}.location`} 
                      value={project.location}
                    />
                  </span>
                  <span className="bg-slate-700 text-gray-300 px-2 py-1 rounded">
                    <EditableText 
                      path={`portfolio.projects.${index}.date`} 
                      value={project.date}
                    />
                  </span>
                  <span className="bg-slate-700 text-gray-300 px-2 py-1 rounded">
                    <EditableText 
                      path={`portfolio.projects.${index}.area`} 
                      value={project.area}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AdminContactForm: React.FC = () => {
  const { editData } = useAdminContext();
  
  return (
    <section id="contact" className="min-h-screen flex items-center bg-slate-800 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white">
            <EditableText 
              path="contact.title" 
              value={editData.contact.title}
            />
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto">
            <EditableText 
              path="contact.subtitle" 
              value={editData.contact.subtitle}
              multiline
            />
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-700 p-4 sm:p-6 rounded-2xl border border-slate-600 h-full flex flex-col">
            <div className="text-center flex-1">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-white">
                <EditableText 
                  path="contact.callSection.title" 
                  value={editData.contact.callSection.title}
                />
              </h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                <EditableText 
                  path="contact.callSection.description" 
                  value={editData.contact.callSection.description}
                  multiline
                />
              </p>

              <div className="bg-slate-800/50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6">
                <h4 className="font-semibold text-orange-400 mb-2 sm:mb-3 text-center text-sm sm:text-base">Что вы получите:</h4>
                <ul className="text-gray-300 space-y-1 text-xs sm:text-sm">
                  <EditableArray
                    path="contact.callSection.benefits"
                    items={editData.contact.callSection.benefits}
                    renderItem={(benefit, index) => (
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        <span>{benefit}</span>
                      </li>
                    )}
                  />
                </ul>
              </div>
            </div>

            <a
              href="tel:+79389085906"
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-orange-500/25 flex items-center justify-center space-x-2 sm:space-x-3 mt-auto text-sm sm:text-base"
            >
              <span>Позвонить</span>
            </a>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-700 p-4 sm:p-6 rounded-2xl border border-slate-600 h-full flex flex-col justify-center">
            <div className="flex flex-col items-center space-y-4 sm:space-y-6 w-full max-w-md mx-auto">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white text-center">Контактная информация</h3>

              <div className="flex flex-col space-y-3 sm:space-y-4 w-full">
                <div className="bg-slate-800/50 p-3 sm:p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-500/20 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
                      <span className="text-orange-500">@</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-xs sm:text-sm">Email</h4>
                      <span className="text-orange-500 text-xs sm:text-sm">
                        <EditableText 
                          path="contact.contactInfo.email" 
                          value={editData.contact.contactInfo.email}
                        />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 p-3 sm:p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-500/20 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
                      <span className="text-orange-500">⏰</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-xs sm:text-sm">Режим работы</h4>
                      <EditableArray
                        path="contact.contactInfo.workHours"
                        items={editData.contact.contactInfo.workHours}
                        renderItem={(hours, index) => (
                          <p className="text-gray-300 text-xs sm:text-sm">{hours}</p>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 p-3 sm:p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-500/20 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
                      <span className="text-orange-500">📍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-xs sm:text-sm">Адрес</h4>
                      <EditableArray
                        path="contact.contactInfo.address"
                        items={editData.contact.contactInfo.address}
                        renderItem={(addr, index) => (
                          <p className="text-gray-300 text-xs sm:text-sm">{addr}</p>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InlineAdminPanel;