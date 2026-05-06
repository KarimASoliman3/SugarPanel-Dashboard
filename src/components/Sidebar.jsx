import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { icons } from "../assets/icons/icons";

const navItems = [
  { path: "/dashboard", icon: icons.dashboard, label: "Dashboard" },
  { path: "/products", icon: icons.products, label: "Products" },
  { path: "/users", icon: icons.users, label: "Users" },

  { path: "/chart", icon: icons.chart, label: "Chart", disabled: true },
  { path: "/bell", icon: icons.bell, label: "Bell", disabled: true },
  { path: "/inbox", icon: icons.inbox, label: "Inbox", disabled: true },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sp-sidebar d-flex flex-column align-items-center py-3 mobile-hidden">
      {/* Nav */}
      <nav className="flex-grow-1 w-90">
        {navItems.map((item) =>
          item.disabled ? (
            <div
              key={item.label}
              className="sp-nav-item sidebar-btn disabled"
              title="Coming soon"
            >
              <span className="sp-nav-icon">
                <img src={item.icon} alt={item.label} className="icon-svg1" />
              </span>
            </div>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sp-nav-item sidebar-btn ${isActive ? "active text-white" : ""}`
              }
              title={item.label}
            >
              <span className="sp-nav-icon">
                <img src={item.icon} alt={item.label} className="icon-svg1" />
              </span>
            </NavLink>
          ),
        )}
      </nav>

      {/* Bottom */}
      <div className="sp-sidebar-bottom">
        <div className="mb-2">
          <button className="sp-nav-item dark-btn " title="Dark">
            <span className="sp-nav-icon">
              <img src={icons.dark} alt="dark" />
            </span>
          </button>
          <button className="sp-nav-item dark-btn mode-active" title="light">
            <span className="sp-nav-icon">
              <img src={icons.light} alt="dark" />
            </span>
          </button>
        </div>

        <button
          className="sp-nav-item logout-btn"
          onClick={handleLogout}
          title="Logout"
        >
          <span className="sp-nav-icon">
            <img src={icons.logout} alt="logout" />
          </span>
        </button>
      </div>
    </div>
  );
}
