import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import InlineAdminPanel from './InlineAdminPanel';

const AdminRoute: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    );
  }

  return isLoggedIn ? <InlineAdminPanel /> : <AdminLogin onLogin={handleLogin} />;
};

export default AdminRoute;