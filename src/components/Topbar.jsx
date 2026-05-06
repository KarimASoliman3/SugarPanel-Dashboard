import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ title }) {
  const { user } = useAuth();

  const toggleSidebar = () => {
    document.body.classList.toggle("sidebar-open");
    const sidebar = document.querySelector(".sp-sidebar");
    if (document.body.classList.contains("sidebar-open")) {
      sidebar?.classList.add("mobile-open");
    } else {
      sidebar?.classList.remove("mobile-open");
    }
  };

  return (
    <div className="sp-topbar d-flex align-items-center justify-content-between px-4 py-2">
      <div className="sp-topbar-left d-flex  align-items-center  justify-content-between justify-content-md-start  gap-2 flex-grow-1">
        <button
          className="hamburger me-2"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <span className="sp-brand flex-grow-1">
          ✕ <strong>Sugar</strong>panel
        </span>
      </div>
      <div className="sp-topbar-right d-flex align-items-center gap-2">
        <div className="lang-dropdown">
          <button className="lang-btn sp-icon-btn d-none d-sm-block">
            EN ▼
          </button>
          <div className="lang-menu">
            <div className="lang-item">EN</div>
            <div className="lang-item">AR</div>
          </div>
        </div>
        <button className="sp-icon-btn d-none d-md-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
          </svg>
        </button>
        <button className="sp-icon-btn dots d-none d-md-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
          </svg>
        </button>
        <button className="sp-icon-btn dots d-none d-md-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
          </svg>
        </button>
        <div className="sp-icon-btn-img">
          <img
            src={user?.avatar || "https://i.pravatar.cc/32?img=1"}
            alt="avatar"
            className="sp-topbar-avatar"
          />
        </div>
      </div>
    </div>
  );
}
