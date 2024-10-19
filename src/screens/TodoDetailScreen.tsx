import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, MessageCircle, Heart, Share2, UserPlus } from 'lucide-react';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface TodoDetail {
  id: number;
  title: string;
  tasks: Task[];
  progress: number;
  creator: {
    name: string;
    avatar: string;
  };
  collaborators: {
    name: string;
    avatar: string;
  }[];
  comments: Comment[];
}

const TodoDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<TodoDetail | null>(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch todo details from API
    // For now, we'll use dummy data
    const dummyTodo: TodoDetail = {
      id: 1,
      title: 'Complete project proposal',
      tasks: [
        { id: 1, description: 'Research', completed: true },
        { id: 2, description: 'Draft outline', completed: true },
        { id: 3, description: 'Write proposal', completed: false },
      ],
      progress: 66,
      creator: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      collaborators: [
        { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
        { name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
      ],
      comments: [
        {
          id: 1,
          user: { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
          content: 'Great progress so far!',
          timestamp: '2023-04-10T14:30:00Z',
        },
      ],
    };
    setTodo(dummyTodo);
  }, [id]);

  const handleTaskToggle = (taskId: number) => {
    if (todo) {
      const updatedTasks = todo.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      const progress = Math.round((updatedTasks.filter(t => t.completed).length / updatedTasks.length) * 100);
      setTodo({ ...todo, tasks: updatedTasks, progress });
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo && newComment.trim()) {
      const newCommentObj: Comment = {
        id: todo.comments.length + 1,
        user: { name: 'Current User', avatar: 'https://i.pravatar.cc/150?img=4' },
        content: newComment.trim(),
        timestamp: new Date().toISOString(),
      };
      setTodo({ ...todo, comments: [...todo.comments, newCommentObj] });
      setNewComment('');
    }
  };

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{todo.title}</h1>
      <div className="flex items-center mb-4">
        <img src={todo.creator.avatar} alt={todo.creator.name} className="w-10 h-10 rounded-full mr-2" />
        <span>{todo.creator.name}</span>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tasks</h2>
        <ul className="space-y-2">
          {todo.tasks.map(task => (
            <li key={task.id} className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskToggle(task.id)}
                className="mr-2"
              />
              <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.description}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${todo.progress}%` }}></div>
        </div>
        <span className="text-sm text-gray-600">{todo.progress}% completed</span>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Collaborators</h3>
        <div className="flex items-center">
          {todo.collaborators.map((collaborator, index) => (
            <img key={index} src={collaborator.avatar} alt={collaborator.name} className="w-8 h-8 rounded-full -ml-2 first:ml-0 border-2 border-white" />
          ))}
          <button className="ml-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
            <UserPlus size={16} />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center text-gray-600 hover:text-gray-900">
          <Heart size={20} className="mr-1" />
          <span>Like</span>
        </button>
        <button className="flex items-center text-gray-600 hover:text-gray-900">
          <MessageCircle size={20} className="mr-1" />
          <span>Comment</span>
        </button>
        <button className="flex items-center text-gray-600 hover:text-gray-900">
          <Share2 size={20} className="mr-1" />
          <span>Share</span>
        </button>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Comments</h3>
        <ul className="space-y-4">
          {todo.comments.map(comment => (
            <li key={comment.id} className="bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <img src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 rounded-full mr-2" />
                <span className="font-semibold">{comment.user.name}</span>
                <span className="text-sm text-gray-500 ml-2">{new Date(comment.timestamp).toLocaleString()}</span>
              </div>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddComment} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
          ></textarea>
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoDetailScreen;