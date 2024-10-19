import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface Invite {
  id: number;
  from: {
    name: string;
    avatar: string;
  };
  todoTitle: string;
}

const CollaborationScreen: React.FC = () => {
  const [invites, setInvites] = useState<Invite[]>([
    { id: 1, from: { name: 'Alice Cooper', avatar: 'https://i.pravatar.cc/150?img=5' }, todoTitle: 'Plan team outing' },
    { id: 2, from: { name: 'Bob Marley', avatar: 'https://i.pravatar.cc/150?img=6' }, todoTitle: 'Quarterly report' },
  ]);
  const [newInvite, setNewInvite] = useState('');

  const handleAcceptInvite = (id: number) => {
    // In a real app, you would send an API request to accept the invite
    setInvites(invites.filter(invite => invite.id !== id));
  };

  const handleDeclineInvite = (id: number) => {
    // In a real app, you would send an API request to decline the invite
    setInvites(invites.filter(invite => invite.id !== id));
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send an API request to send the invite
    console.log('Sending invite to:', newInvite);
    setNewInvite('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Collaboration</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pending Invites</h2>
        {invites.length === 0 ? (
          <p>No pending invites</p>
        ) : (
          <ul className="space-y-4">
            {invites.map(invite => (
              <li key={invite.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div className="flex items-center">
                  <img src={invite.from.avatar} alt={invite.from.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold">{invite.from.name}</p>
                    <p className="text-sm text-gray-600">Invited you to: {invite.todoTitle}</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleAcceptInvite(invite.id)}
                    className="mr-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => handleDeclineInvite(invite.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Send Invite</h2>
        <form onSubmit={handleSendInvite} className="flex items-center">
          <input
            type="text"
            value={newInvite}
            onChange={(e) => setNewInvite(e.target.value)}
            placeholder="Enter wallet address"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
          >
            Send Invite
          </button>
        </form>
      </div>
    </div>
  );
};

export default CollaborationScreen;