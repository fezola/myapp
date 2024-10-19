import React, { useState, useEffect } from 'react';
import { CheckCircle, BarChart2 } from 'lucide-react';

interface CompletedTodo {
  id: number;
  title: string;
  completionDate: string;
  tasksCompleted: number;
  totalTasks: number;
}

const CompletedTodosScreen: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState<CompletedTodo[]>([]);

  useEffect(() => {
    // Fetch completed todos from API
    // For now, we'll use dummy data
    const dummyCompletedTodos: CompletedTodo[] = [
      { id: 1, title: 'Project Proposal', completionDate: '2023-04-08', tasksCompleted: 5, totalTasks: 5 },
      { id: 2, title: 'Team Building Event', completionDate: '2023-04-05', tasksCompleted: 4, totalTasks: 4 },
      { id: 3, title: 'Quarterly Report', completionDate: '2023-03-31', tasksCompleted: 8, totalTasks: 8 },
    ];
    setCompletedTodos(dummyCompletedTodos);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Completed To-Do Lists</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Completions</h2>
        <div className="space-y-4">
          {completedTodos.map(todo => (
            <div key={todo.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle size={24} className="text-green-500 mr-3" />
                <div>
                  <h3 className="font-semibold">{todo.title}</h3>
                  <p className="text-sm text-gray-500">Completed on {new Date(todo.completionDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{todo.tasksCompleted}/{todo.totalTasks} tasks</p>
                <p className="text-sm text-gray-500">100% complete</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Completion Trends</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold">Task Completion Rate</span>
            <BarChart2 size={24} className="text-blue-500" />
          </div>
          <div className="h-64 bg-gray-100 rounded flex items-end justify-between p-4">
            {/* This is a placeholder for the chart. In a real app, you would use a charting library. */}
            <div className="w-8 bg-blue-500 rounded-t" style={{ height: '70%' }}></div>
            <div className="w-8 bg-blue-500 rounded-t" style={{ height: '85%' }}></div>
            <div className="w-8 bg-blue-500 rounded-t" style={{ height: '60%' }}></div>
            <div className="w-8 bg-blue-500 rounded-t" style={{ height: '90%' }}></div>
            <div className="w-8 bg-blue-500 rounded-t" style={{ height: '75%' }}></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedTodosScreen;