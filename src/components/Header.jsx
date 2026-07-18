import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const categories = [
    'Creative Services',
    'Engineering',
    'Software Development',
    'BPO',
    'Digital Marketing'
  ];

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="CosmoLine Solutions" className="logo-image" />
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>

          <li
            className="nav-item dropdown"
            onMouseEnter={() => setIsServicesDropdownOpen(true)}
            onMouseLeave={() => setIsServicesDropdownOpen(false)}
          >
            <Link to="/services" className="nav-link">
              Services
              <span className="dropdown-icon">▼</span>
            </Link>
            {isServicesDropdownOpen && (
              <ul className="dropdown-menu">
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      to={`/services?category=${encodeURIComponent(category)}`}
                      className="dropdown-link"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="nav-item">
            <Link to="/about" className="nav-link">About Us</Link>
          </li>

          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>

          <li className="nav-item">
            <Link to="/services" className="btn btn-primary nav-cta">
              Book a Service
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
