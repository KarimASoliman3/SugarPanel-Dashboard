import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    api.getProducts(page, limit, search).then(({ data, total }) => {
      setProducts(data);
      setTotal(total);
      setLoading(false);
    });
  }, [page, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="sp-page">
      <div className="sp-page-header mb-4">
        <h1 className="sp-page-title">Products</h1>
        <p className="sp-page-sub">Manage your product catalog</p>
      </div>

      <div className="sp-card">
        <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <div>
            <span className="sp-count">{total.toLocaleString()} items</span>
          </div>
          <div className="d-flex gap-2 align-items-center">
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
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <button className="sp-icon-btn">↻</button>
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
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>Product Name</th>
                    <th>Revenue</th>
                    <th>Sales</th>
                    <th>Reviews</th>
                    <th>Views</th>
                    <th>Active</th>
                    <th></th>
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
                            <div className="sp-product-status">{p.status}</div>
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
                      <td>
                        <Link to={`/products/${p.id}`} className="sp-view-btn">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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
