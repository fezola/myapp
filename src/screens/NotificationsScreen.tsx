import React, { useState } from 'react';
import { Bell, Heart, MessageCircle, UserPlus, CheckCircle } from 'lucide-react';

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow' | 'invite' | 'completed';
  content: string;
  timestamp: string;
  read: boolean;
}

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'like', content: 'John Doe liked your todo list', timestamp: '2023-04-10T10:00:00Z', read: false },
    { id: 2, type: 'comment', content: 'Jane Smith commented on your todo list', timestamp: '2023-04-10T09:30:00Z', read: false },
    { id: 3, type: 'follow', content: 'Bob Johnson started following you', timestamp: '2023-04-09T14:00:00Z', read: true },
    { id: 4, type: 'invite', content: 'Alice Cooper invited you to collaborate on a todo list', timestamp: '2023-04-09T11:00:00Z', read: true },
    { id: 5, type: 'completed', content: 'You completed the "Project Proposal" todo list', timestamp: '2023-04-08T16:00:00Z', read: true },
  ]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart size={20} className="text-red-500" />;
      case 'comment':
        return <MessageCircle size={20} className="text-blue-500" />;
      case 'follow':
        return <UserPlus size={20} className="text-green-500" />;
      case 'invite':
        return <Bell size={20} className="text-yellow-500" />;
      case 'completed':
        return <CheckCircle size={20} className="text-purple-500" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <button
          onClick={markAllAsRead}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Mark all as read
        </button>
      </div>
      
      <div className="space-y-4">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`flex items-start p-4 rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
          >
            <div className="mr-4">
              {getIcon(notification.type)}
            </div>
            <div className="flex-grow">
              <p className={`${notification.read ? 'text-gray-700' : 'font-semibold'}`}>
                {notification.content}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(notification.timestamp).toLocaleString()}
              </p>
            </div>
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Mark as read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsScreen;