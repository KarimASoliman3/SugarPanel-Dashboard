import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const limit = 8;

  useEffect(() => {
    setLoading(true);
    api.getUsers(page, limit, search).then(({ data, total }) => {
      setUsers(data);
      setTotal(total);
      setLoading(false);
    });
  }, [page, search]);

  const totalPages = Math.ceil(total / limit);

  const roleBadgeClass = (role) =>
    ({
      Admin: "badge-admin",
      Manager: "badge-manager",
      Seller: "badge-seller",
      Analyst: "badge-analyst",
    })[role] || "badge-seller";

  return (
    <div className="sp-page">
      <div className="sp-page-header mb-4">
        <h1 className="sp-page-title">Users</h1>
        <p className="sp-page-sub">Manage your team members</p>
      </div>

      <div className="sp-card">
        <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <span className="sp-count">{total} members</span>
          <div className="sp-search-box">
            <span className="sp-search-icon">
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
            </span>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {loading ? (
          <div className="sp-page-loading">
            <div className="sp-spinner"></div>
          </div>
        ) : (
          <>
            <div className="sp-table-responsive">
              <table className="sp-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Store</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={u.avatar}
                            alt=""
                            className="sp-user-avatar"
                          />
                          <span className="sp-product-name">{u.name}</span>
                        </div>
                      </td>
                      <td className="sp-email">{u.email}</td>
                      <td>
                        <span
                          className={`sp-role-badge ${roleBadgeClass(u.role)}`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td>{u.store} Store</td>
                      <td>{u.joined}</td>
                      <td>
                        <span
                          className={`sp-status ${u.status === "Active" ? "active" : "inactive"}`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/users/${u.id}`} className="sp-view-btn">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sp-pagination d-flex align-items-center justify-content-between mt-3">
              <span className="sp-page-info">
                Page {page} of {totalPages}
              </span>
              <div className="sp-page-btns d-flex gap-1">
                <button
                  className="sp-page-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ‹
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                  return (
                    <button
                      key={p}
                      className={`sp-page-btn ${p === page ? "active" : ""}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  className="sp-page-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  ›
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
