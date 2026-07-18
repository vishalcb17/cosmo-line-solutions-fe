import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api';
import '../styles/Home.css';

function Home() {
  const [servicesByCategory, setServicesByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: 'Creative Services', icon: '🎨', color: '#f59e0b' },
    { name: 'Engineering', icon: '⚙️', color: '#3b82f6' },
    { name: 'Software Development', icon: '💻', color: '#10b981' },
    { name: 'BPO', icon: '📞', color: '#8b5cf6' },
    { name: 'Digital Marketing', icon: '📱', color: '#ec4899' }
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      if (response.data.success) {
        const grouped = response.data.data.reduce((acc, service) => {
          if (!acc[service.category]) {
            acc[service.category] = [];
          }
          acc[service.category].push(service);
          return acc;
        }, {});
        setServicesByCategory(grouped);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMinPrice = (category) => {
    // Find all services that start with this category name
    const categoryServices = Object.entries(servicesByCategory)
      .filter(([cat]) => cat.startsWith(category) || cat === category)
      .flatMap(([, services]) => services);

    if (categoryServices.length === 0) return 'TBD';
    const minPrice = Math.min(...categoryServices.map(s => parseFloat(s.price)));
    return minPrice === 0 ? 'TBD' : `$${minPrice}`;
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <h1 className="hero-title">
            Professional Services, Delivered with Excellence
          </h1>
          <p className="hero-subtitle">
            Transform your business with our comprehensive suite of creative, engineering,
            software development, and BPO services.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn btn-primary btn-lg">
              Book a Service
            </Link>
            <Link to="/about" className="btn btn-outline btn-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p className="section-subtitle">
              Choose from our wide range of professional services
            </p>
          </div>

          {loading ? (
            <div className="loading">Loading services...</div>
          ) : (
            <div className="services-grid">
              {categories.map((category) => (
                <div key={category.name} className="service-card">
                  <div className="service-icon" style={{ color: category.color }}>
                    {category.icon}
                  </div>
                  <h3 className="service-title">{category.name}</h3>
                  <p className="service-description">
                    {getServiceDescription(category.name)}
                  </p>
                  <div className="service-price">
                    Starting from {getMinPrice(category.name)}
                  </div>
                  <Link
                    to={`/services?category=${encodeURIComponent(category.name)}`}
                    className="btn btn-primary"
                  >
                    Book Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose CosmoLine?</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>10+ Years Experience</h3>
              <p>
                Over a decade of delivering exceptional results across multiple industries
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Turnaround</h3>
              <p>
                Quick delivery without compromising on quality or attention to detail
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Premium Quality</h3>
              <p>
                Top-tier professionals ensuring the highest standards of excellence
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Competitive Pricing</h3>
              <p>
                Flexible pricing models tailored to fit your budget and requirements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Years in Business</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>What Our Clients Say</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "CosmoLine delivered exceptional results for our web development project.
                Their team was professional, responsive, and delivered on time."
              </p>
              <div className="testimonial-author">
                <strong>John Smith</strong>
                <span>CEO, Tech Startup Inc.</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Outstanding creative services! The branding package they created perfectly
                captured our vision and exceeded our expectations."
              </p>
              <div className="testimonial-author">
                <strong>Sarah Johnson</strong>
                <span>Marketing Director, Fashion Brand</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Their BPO services have been a game-changer for our business. Reliable,
                efficient, and cost-effective."
              </p>
              <div className="testimonial-author">
                <strong>Michael Chen</strong>
                <span>Operations Manager, E-commerce Co.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Book a service today and experience the CosmoLine difference</p>
          <Link to="/services" className="btn btn-secondary btn-lg">
            Browse Services
          </Link>
        </div>
      </section>
    </div>
  );
}

function getServiceDescription(category) {
  const descriptions = {
    'Creative Services': 'Professional design, video editing, animation, and creative solutions',
    'Engineering': 'Expert civil, mechanical, electrical, and architectural engineering services',
    'Software Development': 'Custom web, mobile, cloud, and AI-powered software solutions',
    'BPO': 'Comprehensive business process outsourcing to streamline your operations',
    'Digital Marketing': 'SEO, PPC, social media, and performance marketing services'
  };
  return descriptions[category] || '';
}

export default Home;
