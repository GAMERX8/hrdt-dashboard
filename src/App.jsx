import { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // Check for active session in localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('hrdt_user_session');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Error reading session from localStorage:", e);
    } finally {
      setCheckingSession(false);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('hrdt_user_session', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hrdt_user_session');
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
