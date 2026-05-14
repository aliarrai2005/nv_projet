import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Admin/Admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Vérifier si déjà connecté
  const isAuthenticated = localStorage.getItem('adminToken') === 'true';
  if (isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulation d'un appel API (à remplacer par votre endpoint réel)

    // Version temporaire avec identifiants fixes (à supprimer en production)
    // admin@example.com / admin123
    if (email === 'admin@example.com' && password === 'admin123') {
      localStorage.setItem('adminToken', 'true');
      navigate('/admin');
    } else {
      setError('Email ou mot de passe incorrect');
    }
    setLoading(false);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-logo">⚽ Admin</div>
          <h2>Connexion espace administration</h2>
          <p>Accès réservé aux gestionnaires</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="admin-login-footer">
          <small>Démo : admin@example.com / admin123</small>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;