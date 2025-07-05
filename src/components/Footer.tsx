import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
          <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            <p>ИНН: 1234567890 | ОГРН: 1234567890123</p>
            <p className="mt-1">© 2024 REAS. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;