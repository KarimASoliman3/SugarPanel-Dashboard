import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getUserById(id).then(u => {
      setUser(u);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="sp-page-loading"><div className="sp-spinner"></div></div>;
  if (!user) return <div className="sp-page"><div className="sp-card">User not found. <Link to="/users">← Back</Link></div></div>;

  return (
    <div className="sp-page">
      <div className="sp-breadcrumb mb-3">
        <Link to="/users" className="sp-bc-link">Users</Link>
        <span className="sp-bc-sep"> › </span>
        <span className="sp-bc-current">{user.name}</span>
      </div>

      <div className="row g-3">
        <div className="col-lg-4">
          <div className="sp-card text-center">
            <img src={user.avatar} alt={user.name} className="sp-detail-user-img mb-3" />
            <h2 className="sp-detail-name">{user.name}</h2>
            <p className="sp-email mb-2">{user.email}</p>
            <span className={`sp-status ${user.status === 'Active' ? 'active' : 'inactive'} mb-2 d-inline-block`}>{user.status}</span>
            <div className="sp-user-info mt-3">
              <div className="sp-info-row">
                <span className="sp-info-label">Role</span>
                <span className="sp-info-val">{user.role}</span>
              </div>
              <div className="sp-info-row">
                <span className="sp-info-label">Store</span>
                <span className="sp-info-val">{user.store} Store</span>
              </div>
              <div className="sp-info-row">
                <span className="sp-info-label">Joined</span>
                <span className="sp-info-val">{user.joined}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="sp-card mb-3">
            <h3 className="sp-section-title mb-3">Performance Metrics</h3>
            <div className="row g-3">
              {[
                { label: 'Total Sales', value: '$12,840', change: '+12%' },
                { label: 'Orders Handled', value: '248', change: '+5%' },
                { label: 'Customer Rating', value: '4.8 / 5', change: '+0.2' },
                { label: 'Response Rate', value: '98%', change: '+1%' },
              ].map((m, i) => (
                <div key={i} className="col-6">
                  <div className="sp-metric-card">
                    <div className="sp-metric-val">{m.value}</div>
                    <div className="sp-metric-label">{m.label}</div>
                    <div className="positive small">{m.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sp-card">
            <h3 className="sp-section-title mb-3">Recent Activity</h3>
            <div className="sp-activity-list">
              {[
                { text: 'Processed order #2041', time: '2 hours ago' },
                { text: 'Updated product listing for "Anderson Red"', time: '5 hours ago' },
                { text: 'Responded to customer review', time: 'Yesterday' },
                { text: 'Joined Q1 team meeting', time: '2 days ago' },
                { text: 'Exported monthly sales report', time: '3 days ago' },
              ].map((a, i) => (
                <div key={i} className="sp-activity-item">
                  <div className="sp-activity-dot"></div>
                  <div>
                    <div className="sp-activity-text">{a.text}</div>
                    <div className="sp-activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
