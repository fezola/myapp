import React, { useState } from 'react';
import { Moon, Sun, Bell, Lock, Wallet } from 'lucide-react';

const SettingsScreen: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privateByDefault, setPrivateByDefault] = useState(false);
  const [walletAddress, setWalletAddress] = useState('0x1234...5678');

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // In a real app, you would apply the dark mode to the entire app here
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    // In a real app, you would update the user's notification preferences here
  };

  const handlePrivacyToggle = () => {
    setPrivateByDefault(!privateByDefault);
    // In a real app, you would update the user's privacy settings here
  };

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
    // In a real app, you would validate and update the wallet address here
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {darkMode ? <Moon size={24} className="mr-2" /> : <Sun size={24} className="mr-2" />}
            <span className="text-lg">Dark Mode</span>
          </div>
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell size={24} className="mr-2" />
            <span className="text-lg">Notifications</span>
          </div>
          <label className="switch">
            <input type="checkbox" checked={notifications} onChange={handleNotificationsToggle} />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lock size={24} className="mr-2" />
            <span className="text-lg">Private Lists by Default</span>
          </div>
          <label className="switch">
            <input type="checkbox" checked={privateByDefault} onChange={handlePrivacyToggle} />
            <span className="slider round"></span>
          </label>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <Wallet size={24} className="mr-2" />
            <span className="text-lg">Wallet Address</span>
          </div>
          <input
            type="text"
            value={walletAddress}
            onChange={handleWalletChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;