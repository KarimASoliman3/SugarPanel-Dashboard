import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import Shoes from "../assets/fashion-shoes-sneakers.png";
import { RiskReturnScatterChart } from "../components/charts/RiskReturnScatterChart";
import { CustomAreaChart } from "../components/charts/CustomAreaChart";

function StatCard({ label, value, change, positive }) {
  const [intPart, decimalPart] = value.toString().split(".");
  return (
    <div className="sp-stat-card d-flex flex-column justify-content-between">
      <div className="sp-stat-label">{label}</div>

      <div className="d-flex justify-content-between ">
        <div className="sp-stat-value">
          {intPart}
          {decimalPart && (
            <span className="sp-stat-decimal">.{decimalPart}</span>
          )}
        </div>
        <div className={`sp-stat-change ${positive ? "positive" : "negative"}`}>
          {positive ? "▲" : "▼"} {change}
        </div>
      </div>

      <div className="sp-stat-period">From Jan 01, 2025 - March 30, 2024</div>
    </div>
  );
}

function StoreCard({ store }) {
  return (
    <div className="sp-store-card">
      <div className="sp-store-header">
        <span className="sp-store-name">{store.name}</span>
        <Link to="/users" className="sp-store-link">
          See More ›
        </Link>
      </div>
      <div className="sp-store-perf">
        Performance Seller - {store.performance}%
      </div>
      <div className="sp-store-footer">
        <span className="sp-store-members">{store.members} Active Members</span>
        <div className="sp-store-avatars">
          {[1, 2, 3].map((i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/24?img=${store.id * 3 + i}`}
              alt=""
            />
          ))}
          <span className="sp-store-more">+{store.members - 3}</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [salePerf, setSalePerf] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getDashboardStats(),
      api.getTransactions(),
      api.getSalePerformance(),
      api.getSchedule(),
      api.getStores(),
      api.getProducts(1, 5),
    ]).then(([s, t, sp, sc, st, p]) => {
      setStats(s);
      setTransactions(t);
      setSalePerf(sp);
      setSchedule(sc);
      setStores(st);
      setProducts(p.data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="sp-page-loading">
        <div className="sp-spinner"></div>
      </div>
    );

  return (
    <div className="sp-dashboard">
      {/* Header */}
      <div className="sp-dash-header d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="sp-dash-title">Welcome Back {user?.name}</h1>
          <p className="sp-dash-sub">
            You have <span className="sp-notif-badge">2 unread</span>{" "}
            notifications
          </p>
        </div>
        <div className="sp-dash-actions d-flex align-items-center gap-2 d-none d-md-flex">
          <div className="sp-search-box">
            <span className="sp-search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-search-icon lucide-search"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </span>
            <input type="text" placeholder="Search..." />
          </div>
          <button className="sp-btn-outline">Date</button>
          <button className="sp-btn-primary-sm">Export Document ↓</button>
          <button className="sp-icon-btn">☰</button>
        </div>
      </div>

      {/* Top Row: Promo + Stats */}
      <div className="row g-3 mb-3">
        <div className="col-lg-3 col-md-6">
          <div className="sp-promo-card">
            <div className="sp-promo-content">
              <p className="sp-promo-text ">
                Sharpen your Skill with <strong>Professional Online</strong>
              </p>
              <button className="sp-promo-btn">Upgrade Now</button>
            </div>
            <div className="sp-promo-img">
              <img
                src={Shoes}
                alt="Shoes"
                className="object-fit-cover shadow shadow-img"
              />
            </div>
          </div>
        </div>
        {stats && (
          <>
            <div className="col-lg-3 col-md-6">
              <StatCard label="Gross Revenues" {...stats.grossRevenue} />
            </div>
            <div className="col-lg-3 col-md-6">
              <StatCard label="Avg. Order Value" {...stats.avgOrderValue} />
            </div>
            <div className="col-lg-3 col-md-6">
              <StatCard label="Total Orders" {...stats.totalOrders} />
            </div>
          </>
        )}
      </div>

      {/* Charts Row */}

      <div className="row  mb-3">
        <div className="col-12 col-lg-9">
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <div className="sp-chart-card">
                <div className="sp-chart-header">
                  <span className="sp-chart-title">Transaction Activity</span>
                  <span className="sp-chart-period">Last Year ⓘ</span>
                </div>
                <ResponsiveContainer width="100%" height={210}>
                  <LineChart data={transactions.slice(0, 11)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 10 }}
                      padding={{ left: 0, right: 0 }}
                    />
                    <YAxis tick={{ fontSize: 8 }} />
                    <Tooltip />
                    <Line
                      name="Total Transaction"
                      type="monotone"
                      dataKey="total"
                      stroke="#4285F4"
                      strokeWidth={1}
                      dot={false}
                    />
                    <Line
                      name="Success Transaction"
                      type="monotone"
                      dataKey="success"
                      stroke="#1a1a2e"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="sp-chart-card">
                <div className="sp-chart-header">
                  <span className="sp-chart-title">Sale Performance</span>
                  <span className="sp-sale-perc">
                    91.72%{" "}
                    <span className="positive small bg-success-subtle rounded-2 p-1">
                      ▲+18.00%
                    </span>
                  </span>
                  <span className="sp-chart-period">Last Year ⓘ</span>
                </div>
                <CustomAreaChart />
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <div className="sp-chart-card">
                <div className="sp-chart-header">
                  <span className="sp-chart-title">Orders By Time</span>
                  <span className="sp-chart-period d-flex align-items-center">
                    <span className="pe-2 d-flex justify-content-between align-items-center">
                      <span className="dot-blue-40 me-1"></span>
                      <span className="dot-blue-70 me-1"></span>
                      <span className="dot-blue me-2"></span>
                      <span className=" ">2500</span>
                    </span>
                  </span>
                  <span className="sp-chart-period d-flex align-items-center">
                    <span className="pe-2">January 2025</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-calendar-icon lucide-calendar"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                  </span>
                  <span className="sp-chart-period">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-search-icon lucide-search"
                    >
                      <path d="m21 21-4.34-4.34" />
                      <circle cx="11" cy="11" r="8" />
                    </svg>
                  </span>
                </div>
                <RiskReturnScatterChart />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="sp-chart-card">
                <div className="sp-chart-header">
                  <span className="sp-chart-title">Product Statics</span>
                  <span className="sp-chart-period">Last Year ⓘ</span>
                </div>
                <ResponsiveContainer width="100%" height={210}>
                  <BarChart data={salePerf}>
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4285F4" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-3 mt-3 mt-lg-0">
          <div className="sp-schedule-card">
            <div className="sp-chart-header">
              <span className="sp-chart-title">Schedule</span>
              <a href="#all" className="sp-store-link">
                See All
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-search-icon lucide-search"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                title="Jan 2025"
                min="2024-01-01"
                max="2026-12-31"
              />
            </div>
            <div className="sp-schedule-tabs">
              <button className="sp-tab active">Meetings</button>
              <button className="sp-tab">Events</button>
              <button className="sp-tab">Holidays</button>
            </div>
            <div className="sp-schedule-list ">
              {schedule.map((item) => (
                <div key={item.id} className="sp-schedule-item">
                  <span
                    className="sp-schedule-tag"
                    style={{ background: item.color, color: item.tagColor }}
                  >
                    {item.tag}
                  </span>
                  <div className="sp-schedule-title">{item.title}</div>
                  <div className="sp-schedule-time">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stores Row */}
      <div className="row g-3 mb-3">
        {stores.map((store) => (
          <div key={store.id} className="col-lg-3 col-md-6">
            <StoreCard store={store} />
          </div>
        ))}
      </div>

      {/* Product List */}
      <div className="row g-3 ">
        <div className="col-lg-9">
          <div className="sp-card sp-card-bg">
            <h3 className="sp-section-title">Product List</h3>
            <div className="sp-card-header p-3 rounded-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <h2 className="sp-count">
                    <span className="fw-medium fs-6">3280</span>
                    <span className="sp-count-txt">{" items "}</span>
                    <span className="ms-3 positive p-1 bg-success-subtle rounded-2">
                      ▲+14.55%
                    </span>
                  </h2>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <Link to="/products" className="sp-store-link">
                    See More
                  </Link>
                  <button className="sp-icon-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-search-icon lucide-search"
                    >
                      <path d="m21 21-4.34-4.34" />
                      <circle cx="11" cy="11" r="8" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="sp-table-responsive">
                <table className="sp-table sp-card-header">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product Name</th>
                      <th>Revenue</th>
                      <th>Sales</th>
                      <th>Reviews</th>
                      <th>Views</th>
                      <th>Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={p.image}
                              alt=""
                              className="sp-product-img"
                            />
                            <div>
                              <div className="sp-product-name">{p.name}</div>
                              <div className="sp-product-status">
                                {p.status}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{p.revenue}</td>
                        <td>{p.sales.toLocaleString()}</td>
                        <td>{p.reviews.toLocaleString()}</td>
                        <td>{p.views.toLocaleString()}</td>
                        <td>
                          <div className={`sp-toggle ${p.active ? "on" : ""}`}>
                            <div className="sp-toggle-dot"></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
        <div className="col-lg-3 ">
            <div className="sp-card sp-card-header h-100">
              <div className="sp-chart-header mb-3">
                <span className="sp-chart-title">Conversion Rate</span>
                <span className="sp-chart-period">Last Year ⓘ</span>
              </div>
              {[
                { label: "Product Views", val: 6575, pct: "25%" },
                { label: "Add to Cart", val: 6575, pct: "25%" },
                { label: "Checkout Initiated", val: 6575, pct: "25%" },
                { label: "Completed Purchases", val: 6575, pct: "25%" },
                { label: "Completed Purchases", val: 6575, pct: "25%" },
                { label: "Completed Purchases", val: 6575, pct: "25%" },
                { label: "Completed Purchases", val: 6575, pct: "25%" },
                { label: "Completed Purchases", val: 6575, pct: "25%" },
              ].map((item, i) => (
                <div key={i} className="sp-conversion-row">
                  <div className="d-flex justify-content-between">
                    <span className="sp-conv-label">{item.label}</span>
                    <span className="sp-conv-val">
                      {item.val.toLocaleString()}
                    </span>
                  </div>
                  <div className="sp-conv-pct">{item.pct}</div>
                </div>
              ))}
              <a
                href="#more"
                className="sp-store-link d-block text-center mt-2"
              >
                Learn More →
              </a>
            </div>
          </div>
      </div>
    </div>
  );
}
