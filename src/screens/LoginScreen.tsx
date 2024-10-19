import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LoginScreen: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useApp();

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockWalletAddress = '0x1234...5678';
      await login(mockWalletAddress);
      navigate('/home');
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to SocialTodo</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <button
          onClick={handleConnectWallet}
          disabled={isConnecting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
        >
          {isConnecting ? (
            'Connecting...'
          ) : (
            <>
              <Wallet className="mr-2" size={20} />
              Connect Wallet
            </>
          )}
        </button>
        <p className="mt-4 text-sm text-gray-600 text-center">
          New to SocialTodo? You'll be prompted to set up your profile after connecting.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;