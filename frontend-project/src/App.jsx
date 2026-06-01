import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Reports from './pages/Reports';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {user && <NavBar onLogout={handleLogout} />}
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/customers" element={user ? <Customers /> : <Navigate to="/login" />} />
          <Route path="/products" element={user ? <Products /> : <Navigate to="/login" />} />
          <Route path="/sales" element={user ? <Sales /> : <Navigate to="/login" />} />
          <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={user ? '/customers' : '/login'} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
