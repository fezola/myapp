import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Paperclip } from 'lucide-react';

interface Message {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

const PrivateTalkScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Fetch messages from API
    // For now, we'll use dummy data
    const dummyMessages: Message[] = [
      {
        id: 1,
        user: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
        content: 'Hey team, how's the progress on the project proposal?',
        timestamp: '2023-04-10T10:00:00Z',
      },
      {
        id: 2,
        user: { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
        content: 'I've finished the research part. Working on the outline now.',
        timestamp: '2023-04-10T10:05:00Z',
      },
      {
        id: 3,
        user: { name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
        content: 'Great! I'll start on the budget section once you're done with the outline.',
        timestamp: '2023-04-10T10:10:00Z',
      },
    ];
    setMessages(dummyMessages);
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMessageObj: Message = {
        id: messages.length + 1,
        user: { name: 'Current User', avatar: 'https://i.pravatar.cc/150?img=4' },
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Private Talk Space</h1>
      <div className="flex-grow overflow-y-auto mb-4 bg-gray-100 rounded-lg p-4">
        {messages.map(message => (
          <div key={message.id} className="mb-4 flex">
            <img src={message.user.avatar} alt={message.user.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <div className="flex items-baseline">
                <span className="font-semibold mr-2">{message.user.name}</span>
                <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
              </div>
              <p className="mt-1 bg-white p-2 rounded-lg shadow">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center">
        <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default PrivateTalkScreen;