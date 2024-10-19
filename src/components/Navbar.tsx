import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, PlusCircle, Bell, User, Settings, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex-shrink-0">
              <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
            </Link>
          </div>
          <div className="flex">
            <Link to="/home" className="nav-link">
              <Home size={20} />
            </Link>
            <Link to="/create" className="nav-link">
              <PlusCircle size={20} />
            </Link>
            <Link to="/notifications" className="nav-link">
              <Bell size={20} />
            </Link>
            <Link to="/profile/me" className="nav-link">
              <User size={20} />
            </Link>
            <Link to="/settings" className="nav-link">
              <Settings size={20} />
            </Link>
            <button onClick={handleLogout} className="nav-link">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;