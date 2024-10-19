import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateTodoScreen from './screens/CreateTodoScreen';
import TodoDetailScreen from './screens/TodoDetailScreen';
import CollaborationScreen from './screens/CollaborationScreen';
import PrivateTalkScreen from './screens/PrivateTalkScreen';
import ProfileScreen from './screens/ProfileScreen';
import FileShareScreen from './screens/FileShareScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SettingsScreen from './screens/SettingsScreen';
import CompletedTodosScreen from './screens/CompletedTodosScreen';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
              <Route path="/create" element={<ProtectedRoute><CreateTodoScreen /></ProtectedRoute>} />
              <Route path="/todo/:id" element={<ProtectedRoute><TodoDetailScreen /></ProtectedRoute>} />
              <Route path="/collaborate" element={<ProtectedRoute><CollaborationScreen /></ProtectedRoute>} />
              <Route path="/talk/:id" element={<ProtectedRoute><PrivateTalkScreen /></ProtectedRoute>} />
              <Route path="/profile/:id" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
              <Route path="/files" element={<ProtectedRoute><FileShareScreen /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsScreen /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />
              <Route path="/completed" element={<ProtectedRoute><CompletedTodosScreen /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </AppProvider>
  );
}

export default App;