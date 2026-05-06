import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProductById(id).then(p => {
      setProduct(p);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="sp-page-loading"><div className="sp-spinner"></div></div>;
  if (!product) return <div className="sp-page"><div className="sp-card">Product not found. <Link to="/products">← Back</Link></div></div>;

  const chartData = [
    { name: 'Revenue', value: parseFloat(product.revenue.replace('$', '').replace(',', '')) },
    { name: 'Sales', value: product.sales },
    { name: 'Reviews', value: product.reviews },
    { name: 'Views', value: product.views },
  ];

  return (
    <div className="sp-page">
      <div className="sp-breadcrumb mb-3">
        <Link to="/products" className="sp-bc-link">Products</Link>
        <span className="sp-bc-sep"> › </span>
        <span className="sp-bc-current">{product.name}</span>
      </div>

      <div className="row g-3">
        <div className="col-lg-4">
          <div className="sp-card text-center">
            <img src={`https://picsum.photos/seed/prod${id}/200/200`} alt={product.name} className="sp-detail-img mb-3" />
            <h2 className="sp-detail-name">{product.name}</h2>
            <div className={`sp-status-badge ${product.status === 'In Stock' ? 'in-stock' : 'out'}`}>{product.status}</div>
            <div className="sp-toggle-row mt-3">
              <span>Active listing</span>
              <div className={`sp-toggle ${product.active ? 'on' : ''}`}><div className="sp-toggle-dot"></div></div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="sp-card mb-3">
            <h3 className="sp-section-title mb-3">Performance Overview</h3>
            <div className="row g-3">
              {[
                { label: 'Revenue', value: product.revenue, icon: '💰' },
                { label: 'Sales', value: product.sales.toLocaleString(), icon: '🛒' },
                { label: 'Reviews', value: product.reviews.toLocaleString(), icon: '⭐' },
                { label: 'Views', value: product.views.toLocaleString(), icon: '👁' },
              ].map((m, i) => (
                <div key={i} className="col-6">
                  <div className="sp-metric-card">
                    <span className="sp-metric-icon">{m.icon}</span>
                    <div className="sp-metric-val">{m.value}</div>
                    <div className="sp-metric-label">{m.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sp-card">
            <h3 className="sp-section-title mb-3">Analytics</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" fill="#4285F4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
