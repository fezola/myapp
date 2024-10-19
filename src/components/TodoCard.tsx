import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Todo {
  id: number;
  title: string;
  tasks: string[];
  progress: number;
  creator: {
    name: string;
    avatar: string;
  };
}

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <img src={todo.creator.avatar} alt={todo.creator.name} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h3 className="font-semibold">{todo.creator.name}</h3>
          <button className="text-sm text-blue-600 hover:underline">Follow</button>
        </div>
      </div>
      <Link to={`/todo/${todo.id}`} className="block mb-3">
        <h2 className="text-xl font-bold mb-2">{todo.title}</h2>
        <ul className="list-disc list-inside mb-2">
          {todo.tasks.slice(0, 3).map((task, index) => (
            <li key={index} className="text-sm text-gray-600">{task}</li>
          ))}
        </ul>
      </Link>
      <div className="mb-3 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${todo.progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center text-gray-600">
        <button className="flex items-center">
          <Heart size={18} className="mr-1" />
          <span>Like</span>
        </button>
        <button className="flex items-center">
          <MessageCircle size={18} className="mr-1" />
          <span>Comment</span>
        </button>
        <button className="flex items-center">
          <Share2 size={18} className="mr-1" />
          <span>Repost</span>
        </button>
      </div>
    </div>
  );
};

export default TodoCard;