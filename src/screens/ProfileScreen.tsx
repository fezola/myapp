import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Edit, FileText, Link } from 'lucide-react';
import TodoCard from '../components/TodoCard';

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  walletAddress: string;
  followers: number;
  following: number;
  todos: any[]; // Use the actual Todo type here
}

const ProfileScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'todos' | 'portfolio'>('todos');

  useEffect(() => {
    // Fetch user profile from API
    // For now, we'll use dummy data
    const dummyProfile: UserProfile = {
      id: '1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      bio: 'Passionate about productivity and collaboration',
      walletAddress: '0x1234...5678',
      followers: 1234,
      following: 567,
      todos: [
        { id: 1, title: 'Complete project proposal', tasks: ['Research', 'Draft outline', 'Write proposal'], progress: 66, creator: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' } },
        { id: 2, title: 'Plan team building event', tasks: ['Choose date', 'Select venue', 'Plan activities'], progress: 33, creator: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' } },
      ],
    };
    setProfile(dummyProfile);
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-full mr-4" />
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-gray-600">{profile.bio}</p>
            <p className="text-sm text-gray-500 mt-1">Wallet: {profile.walletAddress}</p>
          </div>
          {id === 'me' && (
            <button className="ml-auto p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
              <Edit size={20} />
            </button>
          )}
        </div>
        <div className="flex justify-around text-center">
          <div>
            <p className="font-semibold">{profile.followers}</p>
            <p className="text-gray-600">Followers</p>
          </div>
          <div>
            <p className="font-semibold">{profile.following}</p>
            <p className="text-gray-600">Following</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'todos' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('todos')}
          >
            To-Do Lists
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'portfolio' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
        </div>
      </div>

      {activeTab === 'todos' && (
        <div className="space-y-4">
          {profile.todos.map(todo => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <FileText size={24} className="mr-2 text-blue-500" />
            <div>
              <h3 className="font-semibold">Project Proposal.pdf</h3>
              <p className="text-sm text-gray-500">Added on April 1, 2023</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <Link size={24} className="mr-2 text-green-500" />
            <div>
              <h3 className="font-semibold">Personal Website</h3>
              <a href="#" className="text-sm text-blue-500 hover:underline">www.johndoe.com</a>
            </div>
          </div>
          {/* Add more portfolio items here */}
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;