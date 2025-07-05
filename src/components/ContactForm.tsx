import React, { useEffect, useRef, useState } from 'react';
import { Phone, Mail, Clock, MapPin, PhoneCall } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSiteData } from '../contexts/SiteDataContext';

const ContactForm = () => {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';
  const sectionBg = isDark ? 'bg-slate-800' : 'bg-white';
  const cardBg = isDark ? 'bg-gradient-to-br from-slate-900 to-slate-700' : 'bg-white shadow-lg';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const mutedText = isDark ? 'text-gray-300' : 'text-gray-600';
  const borderColor = isDark ? 'border-slate-600' : 'border-gray-200';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`min-h-screen flex items-center ${sectionBg} transition-colors duration-300 py-12 sm:py-16 lg:py-20`}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div
          className={`text-center mb-8 sm:mb-10 lg:mb-12 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${textColor}`}>
            {siteData.contact.title.split('нами')[0]}
            <span className="text-orange-500">нами</span>
            {siteData.contact.title.split('нами')[1]}
          </h2>
          <p className={`text-sm sm:text-base lg:text-lg ${mutedText} max-w-3xl mx-auto`}>
            {siteData.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Блок звонка */}
          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div
              className={`${cardBg} p-4 sm:p-6 rounded-2xl border ${borderColor} transition-colors duration-300 h-full flex flex-col`}
            >
              <div className="text-center flex-1">
                <div className="bg-orange-500/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <PhoneCall className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                </div>
                <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 ${textColor}`}>
                  {siteData.contact.callSection.title}
                </h3>
                <p className={`${mutedText} mb-4 sm:mb-6 text-sm sm:text-base`}>
                  {siteData.contact.callSection.description}
                </p>

                <div
                  className={`${
                    isDark ? 'bg-slate-800/50' : 'bg-gray-50'
                  } p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 transition-colors duration-300`}
                >
                  <h4 className="font-semibold text-orange-400 mb-2 sm:mb-3 text-center text-sm sm:text-base">Что вы получите:</h4>
                  <ul className={`${mutedText} space-y-1 text-xs sm:text-sm`}>
                    {siteData.contact.callSection.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href="tel:+79389085906"
                className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-orange-500/25 flex items-center justify-center space-x-2 sm:space-x-3 mt-auto text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
                <span>Позвонить</span>
              </a>
            </div>
          </div>

          {/* Контактная информация */}
          <div
            className={`transition-all duration-1000 delay-500 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div
              className={`${cardBg} p-4 sm:p-6 rounded-2xl border ${borderColor} transition-colors duration-300 h-full flex flex-col justify-center`}
            >
              <div className="flex flex-col items-center space-y-4 sm:space-y-6 w-full max-w-md mx-auto">
                <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold ${textColor} text-center`}>Контактная информация</h3>

                <div className="flex flex-col space-y-3 sm:space-y-4 w-full">
                  {/* Email */}
                  <div
                    className={`${
                      isDark ? 'bg-slate-800/50' : 'bg-gray-50'
                    } p-3 sm:p-4 rounded-xl transition-colors duration-300`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-500/20 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${textColor} text-xs sm:text-sm`}>Email</h4>
                        <a
                          href={`mailto:${siteData.contact.contactInfo.email}`}
                          className="text-orange-500 hover:text-orange-600 transition-colors duration-300 text-xs sm:text-sm"
                        >
                          {siteData.contact.contactInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Режим работы */}
                  <div
                    className={`${
                      isDark ? 'bg-slate-800/50' : 'bg-gray-50'
                    } p-3 sm:p-4 rounded-xl transition-colors duration-300`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-500/20 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${textColor} text-xs sm:text-sm`}>Режим работы</h4>
                        {siteData.contact.contactInfo.workHours.map((hours, index) => (
                          <p key={index} className={`${mutedText} text-xs sm:text-sm`}>{hours}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Адрес */}
                  <div
                    className={`${
                      isDark ? 'bg-slate-800/50' : 'bg-gray-50'
                    } p-3 sm:p-4 rounded-xl transition-colors duration-300`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-500/20 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${textColor} text-xs sm:text-sm`}>Адрес</h4>
                        {siteData.contact.contactInfo.address.map((addr, index) => (
                          <p key={index} className={`${mutedText} text-xs sm:text-sm`}>{addr}</p>
                        ))}
                      </div>
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

export default ContactForm;