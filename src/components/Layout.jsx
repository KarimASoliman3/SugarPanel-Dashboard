import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="sp-layout">
      <Topbar />
      <div className="sp-main">
        <Sidebar />
        <div className="sp-content">{children}</div>
      </div>
    </div>
  );
}
