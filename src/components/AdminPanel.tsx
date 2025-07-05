import React, { useState } from 'react';
import { Save, LogOut, Edit3, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';
import { SiteData } from '../data/siteData';

const AdminPanel: React.FC = () => {
  const { siteData, updateSiteData, setIsAdmin } = useSiteData();
  const [editData, setEditData] = useState<SiteData>(siteData);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hasChanges, setHasChanges] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsAdmin(false);
    window.location.href = '/';
  };

  const handleSave = () => {
    updateSiteData(editData);
    setHasChanges(false);
    alert('Изменения сохранены!');
  };

  const handleChange = (path: string, value: any) => {
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

  const addArrayItem = (path: string, defaultValue: string = '') => {
    const keys = path.split('.');
    const newData = { ...editData };
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]].push(defaultValue);
    
    setEditData(newData);
    setHasChanges(true);
  };

  const removeArrayItem = (path: string, index: number) => {
    const keys = path.split('.');
    const newData = { ...editData };
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]].splice(index, 1);
    
    setEditData(newData);
    setHasChanges(true);
  };

  const sections = [
    { id: 'hero', name: 'Главный экран' },
    { id: 'about', name: 'О компании' },
    { id: 'services', name: 'Услуги' },
    { id: 'portfolio', name: 'Портфолио' },
    { id: 'contact', name: 'Контакты' },
    { id: 'modal', name: 'Модальное окно' }
  ];

  const renderInput = (label: string, path: string, type: string = 'text') => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={editData[path.split('.')[0] as keyof SiteData][path.split('.')[1] as any] || ''}
          onChange={(e) => handleChange(path, e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-vertical"
          rows={3}
        />
      ) : (
        <input
          type={type}
          value={editData[path.split('.')[0] as keyof SiteData][path.split('.')[1] as any] || ''}
          onChange={(e) => handleChange(path, e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      )}
    </div>
  );

  const renderArrayInput = (label: string, path: string, items: string[]) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(path, index, e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={() => removeArrayItem(path, index)}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        onClick={() => addArrayItem(path, '')}
        className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Добавить</span>
      </button>
    </div>
  );

  const renderHeroSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Главный экран</h3>
      {renderArrayInput('Заголовок (по строкам)', 'hero.title', editData.hero.title)}
      {renderInput('Цена', 'hero.priceText')}
      {renderInput('Текст кнопки', 'hero.ctaButton')}
      {renderArrayInput('Преимущества', 'hero.benefits', editData.hero.benefits)}
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">О компании</h3>
      {renderInput('Заголовок', 'about.title')}
      {renderInput('Подзаголовок', 'about.subtitle', 'textarea')}
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Статистика</label>
        {editData.about.stats.map((stat, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Число"
              value={stat.number}
              onChange={(e) => {
                const newStats = [...editData.about.stats];
                newStats[index] = { ...stat, number: e.target.value };
                handleChange('about.stats', newStats);
              }}
              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Описание"
              value={stat.label}
              onChange={(e) => {
                const newStats = [...editData.about.stats];
                newStats[index] = { ...stat, label: e.target.value };
                handleChange('about.stats', newStats);
              }}
              className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        ))}
      </div>

      {renderInput('Основной заголовок', 'about.mainTitle')}
      {renderArrayInput('Особенности', 'about.features', editData.about.features)}
      {renderInput('Основные регионы', 'about.regions.main', 'textarea')}
      {renderInput('Охват', 'about.regions.coverage', 'textarea')}
    </div>
  );

  const renderServicesSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Услуги</h3>
      {renderInput('Заголовок', 'services.title')}
      {renderInput('Подзаголовок', 'services.subtitle', 'textarea')}
      
      <div className="border border-slate-600 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4">Основная услуга</h4>
        {renderInput('Название', 'services.mainService.title')}
        {renderInput('Описание', 'services.mainService.description', 'textarea')}
        {renderInput('Цена', 'services.mainService.price')}
        {renderArrayInput('Что входит', 'services.mainService.included', editData.services.mainService.included)}
        {renderArrayInput('Гарантии', 'services.mainService.guarantees', editData.services.mainService.guarantees)}
      </div>

      <div className="border border-slate-600 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4">Дополнительные услуги</h4>
        {editData.services.features.map((feature, index) => (
          <div key={index} className="mb-4 p-3 bg-slate-700/50 rounded-lg">
            <input
              type="text"
              placeholder="Название услуги"
              value={feature.title}
              onChange={(e) => {
                const newFeatures = [...editData.services.features];
                newFeatures[index] = { ...feature, title: e.target.value };
                handleChange('services.features', newFeatures);
              }}
              className="w-full px-3 py-2 mb-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              placeholder="Описание услуги"
              value={feature.description}
              onChange={(e) => {
                const newFeatures = [...editData.services.features];
                newFeatures[index] = { ...feature, description: e.target.value };
                handleChange('services.features', newFeatures);
              }}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-vertical"
              rows={2}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderPortfolioSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Портфолио</h3>
      {renderInput('Заголовок', 'portfolio.title')}
      
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Проекты</h4>
        {editData.portfolio.projects.map((project, index) => (
          <div key={project.id} className="border border-slate-600 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Название проекта"
                value={project.title}
                onChange={(e) => {
                  const newProjects = [...editData.portfolio.projects];
                  newProjects[index] = { ...project, title: e.target.value };
                  handleChange('portfolio.projects', newProjects);
                }}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="Местоположение"
                value={project.location}
                onChange={(e) => {
                  const newProjects = [...editData.portfolio.projects];
                  newProjects[index] = { ...project, location: e.target.value };
                  handleChange('portfolio.projects', newProjects);
                }}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="Год"
                value={project.date}
                onChange={(e) => {
                  const newProjects = [...editData.portfolio.projects];
                  newProjects[index] = { ...project, date: e.target.value };
                  handleChange('portfolio.projects', newProjects);
                }}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="Площадь"
                value={project.area}
                onChange={(e) => {
                  const newProjects = [...editData.portfolio.projects];
                  newProjects[index] = { ...project, area: e.target.value };
                  handleChange('portfolio.projects', newProjects);
                }}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <textarea
              placeholder="Описание проекта"
              value={project.description}
              onChange={(e) => {
                const newProjects = [...editData.portfolio.projects];
                newProjects[index] = { ...project, description: e.target.value };
                handleChange('portfolio.projects', newProjects);
              }}
              className="w-full mt-2 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-vertical"
              rows={2}
            />
            <input
              type="text"
              placeholder="URL изображения"
              value={project.image}
              onChange={(e) => {
                const newProjects = [...editData.portfolio.projects];
                newProjects[index] = { ...project, image: e.target.value };
                handleChange('portfolio.projects', newProjects);
              }}
              className="w-full mt-2 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Контакты</h3>
      {renderInput('Заголовок', 'contact.title')}
      {renderInput('Подзаголовок', 'contact.subtitle', 'textarea')}
      
      <div className="border border-slate-600 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4">Секция звонка</h4>
        {renderInput('Заголовок', 'contact.callSection.title')}
        {renderInput('Описание', 'contact.callSection.description', 'textarea')}
        {renderArrayInput('Преимущества', 'contact.callSection.benefits', editData.contact.callSection.benefits)}
      </div>

      <div className="border border-slate-600 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4">Контактная информация</h4>
        {renderInput('Email', 'contact.contactInfo.email')}
        {renderArrayInput('Режим работы', 'contact.contactInfo.workHours', editData.contact.contactInfo.workHours)}
        {renderArrayInput('Адрес', 'contact.contactInfo.address', editData.contact.contactInfo.address)}
      </div>
    </div>
  );

  const renderModalSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Модальное окно</h3>
      {renderInput('Заголовок', 'modal.title')}
      {renderInput('Подзаголовок', 'modal.subtitle', 'textarea')}
      {renderArrayInput('Преимущества', 'modal.benefits', editData.modal.benefits)}
      {renderInput('Подпись', 'modal.footer')}
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'hero': return renderHeroSection();
      case 'about': return renderAboutSection();
      case 'services': return renderServicesSection();
      case 'portfolio': return renderPortfolioSection();
      case 'contact': return renderContactSection();
      case 'modal': return renderModalSection();
      default: return renderHeroSection();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>На сайт</span>
            </button>
            <h1 className="text-xl font-bold text-white">Админ-панель</h1>
          </div>
          <div className="flex items-center space-x-4">
            {hasChanges && (
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
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

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 min-h-screen p-4">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                  activeSection === section.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>{section.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;