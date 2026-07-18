import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    'Creative Services',
    'Engineering Services',
    'Software Development',
    'BPO'
  ];

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <h3 className="footer-title">CosmoLine Solutions</h3>
          <p className="footer-text">
            Professional service booking platform offering creative, engineering,
            software development, and BPO solutions.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">FB</a>
            <a href="#" className="social-link" aria-label="Twitter">TW</a>
            <a href="#" className="social-link" aria-label="LinkedIn">LI</a>
            <a href="#" className="social-link" aria-label="Instagram">IG</a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Services</h4>
          <ul className="footer-links">
            {categories.map((category) => (
              <li key={category}>
                <Link to={`/services?category=${encodeURIComponent(category)}`}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Contact Info</h4>
          <ul className="footer-contact">
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:info@cosmoline.com">info@cosmoline.com</a>
            </li>
            <li>
              <strong>Phone:</strong>{' '}
              <a href="tel:+18001234567">+1-800-123-4567</a>
            </li>
            <li>
              <strong>Address:</strong><br />
              123 Business St<br />
              Tech City, CA 94000
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} CosmoLine Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
