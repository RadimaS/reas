import React, { useEffect, useRef, useState } from 'react';
import { Award, MapPin, Shield, Users } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { siteData } = useSiteData();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const iconMap = [Award, Users, MapPin, Shield];

  return (
    <section id="about" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-slate-900">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {siteData.about.title.split('REAS')[0]}
              <span className="text-orange-500">REAS</span>
              {siteData.about.title.split('REAS')[1]}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
              {siteData.about.subtitle}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 lg:mb-16">
          {siteData.about.stats.map((stat, index) => {
            const IconComponent = iconMap[index];
            return (
              <div
                key={index}
                className={`text-center transition-all duration-1000 delay-200 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="bg-slate-800 p-3 sm:p-4 lg:p-6 rounded-xl hover:bg-slate-700 transition-colors duration-300 group">
                  <div className="bg-orange-500/20 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 group-hover:bg-orange-500/30 transition-colors duration-300">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">{stat.number}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div className={`transition-all duration-1000 delay-600 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
              {siteData.about.mainTitle}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {siteData.about.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-orange-500 rounded-full p-1 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-600 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 sm:p-8 rounded-2xl">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6">География работ</h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-slate-600/50 p-3 sm:p-4 rounded-lg">
                  <h5 className="font-semibold text-orange-400 mb-2 text-sm sm:text-base">Основные регионы:</h5>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">
                    {siteData.about.regions.main}
                  </p>
                </div>
                <div className="bg-slate-600/50 p-3 sm:p-4 rounded-lg">
                  <h5 className="font-semibold text-orange-400 mb-2 text-sm sm:text-base">Охват:</h5>
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base">
                    {siteData.about.regions.coverage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;