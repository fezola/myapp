import React, { useState } from 'react';
import { Plus, X, Users } from 'lucide-react';

const CreateTodoScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState(['']);
  const [isPublic, setIsPublic] = useState(false);
  const [collaborators, setCollaborators] = useState('');
  const [allowComments, setAllowComments] = useState(true);

  const handleAddTask = () => {
    setTasks([...tasks, '']);
  };

  const handleRemoveTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ title, tasks, isPublic, collaborators, allowComments });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-semibold">
            List Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Tasks</label>
          {tasks.map((task, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={task}
                onChange={(e) => handleTaskChange(index, e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md mr-2"
                placeholder={`Task ${index + 1}`}
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveTask(index)}
                className="p-2 bg-red-500 text-white rounded-md"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTask}
            className="mt-2 p-2 bg-green-500 text-white rounded-md flex items-center"
          >
            <Plus size={20} className="mr-1" /> Add Task
          </button>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mr-2"
            />
            Make list public
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="collaborators" className="block mb-2 font-semibold">
            Invite Collaborators (Wallet Addresses)
          </label>
          <div className="flex items-center">
            <Users size={20} className="mr-2 text-gray-600" />
            <input
              type="text"
              id="collaborators"
              value={collaborators}
              onChange={(e) => setCollaborators(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md"
              placeholder="Enter wallet addresses, separated by commas"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={allowComments}
              onChange={(e) => setAllowComments(e.target.checked)}
              className="mr-2"
            />
            Allow comments on this list
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create To-Do List
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodoScreen;