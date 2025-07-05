import React, { useEffect, useState } from 'react';
import { ArrowRight, MapPin, CheckCircle } from 'lucide-react';
import CallModal from './CallModal';
import { useSiteData } from '../contexts/SiteDataContext';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { siteData } = useSiteData();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/backgr.jpeg)',
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-stone-900/80"></div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 py-16 sm:py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <div className={`transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white drop-shadow-2xl">
                {siteData.hero.title[0]}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  {siteData.hero.title[1]}
                </span>
                <span className="block">{siteData.hero.title[2]}</span>
              </h1>
            </div>

            {/* Price Badge */}
            <div className={`transition-all duration-1000 delay-500 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="inline-flex items-center bg-orange-500/90 backdrop-blur-sm border border-orange-400/50 rounded-full px-4 sm:px-8 py-2 sm:py-4 mb-6 sm:mb-8 shadow-2xl">
                <span className="text-lg sm:text-2xl md:text-3xl font-bold text-white">
                  {siteData.hero.priceText}
                </span>
              </div>
            </div>

            {/* Benefits */}
            <div className={`transition-all duration-1000 delay-700 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-10">
                {siteData.hero.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 shadow-lg">
                    {index === 2 ? (
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    ) : (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    )}
                    <span className="text-gray-200 text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className={`transition-all duration-1000 delay-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <button
                onClick={openModal}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-orange-500/25 inline-flex items-center space-x-2"
              >
                <span>{siteData.hero.ctaButton}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call Modal */}
      <CallModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Hero;