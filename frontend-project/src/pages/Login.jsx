import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await loginUser({ username, password });
      if (response.success) {
        onLogin(response.user);
        navigate('/customers');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('Unable to login. Check credentials.');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-4 text-2xl font-semibold text-slate-800">SalesPro Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Username</label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-500 focus:ring-slate-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-slate-500 focus:ring-slate-300"
            required
          />
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button className="w-full rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-900">
          Login
        </button>
      </form>
      
    </div>
  );
}

export default Login;
