import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-start">
          <NavLink to="/" className="navbar-item navbar-brand">
            DMI Budget Tracker
          </NavLink>
          <NavLink
            to="/new-project"
            className="navbar-item"
            activeClassName="is-active"
          >
            New Project
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default Header;
