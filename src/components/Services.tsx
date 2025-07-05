import React, { useEffect, useRef, useState } from 'react';
import { Shield, FileCheck, Clock, Award } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSiteData } from '../contexts/SiteDataContext';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { siteData } = useSiteData();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const iconMap = [Shield, FileCheck, Clock, Award];

  // Динамические стили в зависимости от темы
  const sectionBg = theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100';
  const titleColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const cardBg = theme === 'dark' 
    ? 'bg-gradient-to-br from-slate-900 to-slate-700' 
    : 'bg-white shadow-lg';
  const featureCardBg = theme === 'dark' ? 'bg-slate-700' : 'bg-white shadow-md';
  const featureCardHover = theme === 'dark' ? 'hover:bg-slate-600' : 'hover:bg-gray-50';
  const featureTextColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const featureDescColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const borderColor = theme === 'dark' ? 'border-orange-500/30' : 'border-orange-400/50';

  return (
    <section id="services" ref={sectionRef} className={`py-12 sm:py-16 lg:py-20 ${sectionBg} transition-colors duration-300`}>
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${titleColor}`}>
              {siteData.services.title.split('услуги')[0]}
              <span className="text-orange-500">услуги</span>
              {siteData.services.title.split('услуги')[1]}
            </h2>
            <p className={`text-base sm:text-lg lg:text-xl ${textColor} max-w-3xl mx-auto`}>
              {siteData.services.subtitle}
            </p>
          </div>
        </div>

        {/* Main Service Card */}
        <div className={`transition-all duration-1000 delay-300 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className={`${cardBg} rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-8 sm:mb-10 lg:mb-12 relative overflow-hidden transition-colors duration-300`}>
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div>
                  <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 ${titleColor}`}>
                    {siteData.services.mainService.title}
                  </h3>
                  <p className={`${textColor} text-sm sm:text-base lg:text-lg mb-4 sm:mb-6`}>
                    {siteData.services.mainService.description}
                  </p>
                  <div className={`bg-orange-500/20 border ${borderColor} rounded-xl p-4 sm:p-6`}>
                    <div className="flex items-center justify-between">
                      <span className={`${textColor} text-sm sm:text-base`}>Стоимость обработки:</span>
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-400">{siteData.services.mainService.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className={`${theme === 'dark' ? 'bg-slate-800/50' : 'bg-gray-50'} p-3 sm:p-4 rounded-lg transition-colors duration-300`}>
                    <h4 className="font-semibold text-orange-400 mb-2 text-sm sm:text-base">Что входит в услугу:</h4>
                    <ul className={`${textColor} space-y-1 text-xs sm:text-sm lg:text-base`}>
                      {siteData.services.mainService.included.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-slate-800/50' : 'bg-gray-50'} p-3 sm:p-4 rounded-lg transition-colors duration-300`}>
                    <h4 className="font-semibold text-orange-400 mb-2 text-sm sm:text-base">Гарантии:</h4>
                    <ul className={`${textColor} space-y-1 text-xs sm:text-sm lg:text-base`}>
                      {siteData.services.mainService.guarantees.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {siteData.services.features.map((feature, index) => {
            const IconComponent = iconMap[index] || Shield;
            return (
              <div
                key={index}
                className={`transition-all duration-1000 delay-200 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className={`${featureCardBg} ${featureCardHover} p-4 sm:p-6 rounded-xl transition-all duration-300 group cursor-pointer h-full`}>
                  <div className="bg-orange-500/20 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-orange-500/30 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                  </div>
                  <h4 className={`text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-orange-400 transition-colors duration-300 ${featureTextColor}`}>
                    {feature.title}
                  </h4>
                  <p className={`group-hover:text-orange-300 transition-colors duration-300 ${featureDescColor} text-xs sm:text-sm lg:text-base`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;