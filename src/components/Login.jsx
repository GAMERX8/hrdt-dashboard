import React, { useState } from 'react';
import { loginUser } from '../data/mockData';
import { Stethoscope, User, Lock, AlertCircle, Loader } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(username, password);
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Ocurrió un error al intentar iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-indigo-950 to-emerald-950 p-4 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:border-white/20">
        
        {/* Header / Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 animate-pulse">
            <Stethoscope className="w-9 h-9" />
          </div>
          <h1 className="text-xl font-bold text-white text-center tracking-tight">
            Hospital Regional Docente de Trujillo
          </h1>
          <p className="text-sm text-slate-400 mt-1">Portal de Personal Médico</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-300 p-3 rounded-lg text-sm animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Usuario
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                disabled={loading}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors disabled:opacity-50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors disabled:opacity-50"
                required
              />
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 hover:text-slate-400 cursor-pointer transition-colors">
              ¿Olvidó sus credenciales?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Autenticando...</span>
              </>
            ) : (
              <span>Ingresar al Portal</span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>© 2026 HRDT - Unidad de Informática</p>
          <p className="mt-1 text-[10px] text-emerald-500/60">Prueba Demo (admin / admin)</p>
        </div>

      </div>
    </div>
  );
}
