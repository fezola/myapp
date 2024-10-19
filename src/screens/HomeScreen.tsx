import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import TodoCard from '../components/TodoCard';

const HomeScreen: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Fetch todos from API
    // For now, we'll use dummy data
    const dummyTodos = [
      { id: 1, title: 'Complete project proposal', tasks: ['Research', 'Draft outline', 'Write proposal'], progress: 66, creator: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' } },
      { id: 2, title: 'Plan team building event', tasks: ['Choose date', 'Select venue', 'Plan activities'], progress: 33, creator: { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' } },
    ];
    setTodos(dummyTodos);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search todos or users..."
            className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <div className="mb-6 flex items-center">
        <Filter className="mr-2 text-gray-600" size={20} />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border-none bg-transparent focus:outline-none"
        >
          <option value="all">All</option>
          <option value="popular">Popular</option>
          <option value="recent">Recent</option>
          <option value="friends">Friends</option>
          <option value="collaborative">Collaborative</option>
        </select>
      </div>
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;