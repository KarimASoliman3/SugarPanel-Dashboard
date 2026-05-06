import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@sugarpanel.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, user } = await api.login(email, password);
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sp-login-page">
      <div className="sp-login-left">
        <div className="sp-login-brand">
          <span className="sp-login-logo">✕</span>
          <span><strong>Sugar</strong>panel</span>
        </div>
        <div className="sp-login-hero">
          <div className="sp-login-illustration">
            <div className="ill-card ill-card-1">
              <div className="ill-dot blue"></div>
              <div className="ill-lines">
                <div className="ill-line long"></div>
                <div className="ill-line short"></div>
              </div>
            </div>
            <div className="ill-card ill-card-2">
              <div className="ill-chart">
                {[40, 60, 45, 80, 55, 70, 90, 65].map((h, i) => (
                  <div key={i} className="ill-bar" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
            <div className="ill-card ill-card-3">
              <span className="ill-stat">$2,480.32</span>
              <span className="ill-badge up">+8.32%</span>
            </div>
          </div>
          <h2 className="sp-login-tagline">Your business <br /><em>intelligence hub</em></h2>
          <p className="sp-login-sub">Real-time analytics, performance tracking, and team management — all in one place.</p>
        </div>
      </div>

      <div className="sp-login-right">
        <div className="sp-login-form-container">
          <h1 className="sp-login-title">Welcome back</h1>
          <p className="sp-login-desc">Sign in to your Sugarpanel account</p>

          <form onSubmit={handleSubmit} className="sp-login-form">
            {error && (
              <div className="sp-alert-error">{error}</div>
            )}

            <div className="sp-form-group">
              <label className="sp-label">Email address</label>
              <input
                type="email"
                className="sp-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@sugarpanel.com"
                required
              />
            </div>

            <div className="sp-form-group">
              <label className="sp-label">Password</label>
              <input
                type="password"
                className="sp-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <div className="sp-forgot-link">
                <a href="#forgot">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="sp-btn-primary w-100" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="sp-login-hint">
              <span className="hint-label">Demo credentials:</span>
              <code>admin@sugarpanel.com / password</code>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
