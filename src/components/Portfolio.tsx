import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimeout = useRef<NodeJS.Timeout | null>(null);
  const { siteData } = useSiteData();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => {
      clearInterval(timerRef.current as NodeJS.Timeout);
      clearTimeout(inactivityTimeout.current as NodeJS.Timeout);
    };
  }, [siteData.portfolio.projects.length]);

  const startAutoScroll = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % siteData.portfolio.projects.length);
    }, 5000);
  };

  const stopAutoScrollTemporarily = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    clearTimeout(inactivityTimeout.current as NodeJS.Timeout);
    inactivityTimeout.current = setTimeout(() => {
      startAutoScroll();
    }, 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % siteData.portfolio.projects.length);
    stopAutoScrollTemporarily();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + siteData.portfolio.projects.length) % siteData.portfolio.projects.length);
    stopAutoScrollTemporarily();
  };

  return (
    <section id="portfolio" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-slate-900">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {siteData.portfolio.title.split('проекты')[0]}
              <span className="text-orange-500">проекты</span>
              {siteData.portfolio.title.split('проекты')[1]}
            </h2>
          </div>
        </div>

        {/* Portfolio Slider */}
        <div className={`relative transition-all duration-1000 delay-300 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {siteData.portfolio.projects.map((project) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                      <div className="max-w-2xl">
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                          <div className="flex items-center space-x-2 bg-black/40 rounded-lg px-2 sm:px-3 py-1">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                            <span className="text-gray-300">{project.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-black/40 rounded-lg px-2 sm:px-3 py-1">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                            <span className="text-gray-300">{project.date}</span>
                          </div>
                          <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg px-2 sm:px-3 py-1">
                            <span className="text-orange-400 font-semibold">{project.area}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 group"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 group"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4 sm:mt-6">
            {siteData.portfolio.projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  stopAutoScrollTemporarily();
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-orange-500 w-6 sm:w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;