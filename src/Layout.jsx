import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="logo">
          <h1>VisitorFlow</h1>
        </div>
        <nav className="app-nav">
          <ul>
            <li>
              <NavLink to="/">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/check-in">Visitor Check-In</NavLink>
            </li>
            <li>
              <NavLink to="/check-out">Visitor Check-Out</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-content">
        {/* The Outlet is where the content of your pages will be rendered */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;