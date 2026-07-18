import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getServiceById } from '../services/api';
import '../styles/ServiceDetail.css';

function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await getServiceById(id);
      if (response.data.success) {
        setService(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      setError('Service not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading service details...</div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>Service not found</h2>
          <Link to="/services" className="btn btn-primary">
            Browse All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/services">Services</Link> /{' '}
            {service.name}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-detail-content">
            <div className="service-main">
              <div className="service-category-badge">{service.category}</div>
              <h1 className="service-title">{service.name}</h1>
              <p className="service-description">{service.description}</p>

              <div className="pricing-info">
                <div className="pricing-badge">
                  <span className="pricing-icon">💰</span>
                  <div>
                    <div className="pricing-title">Hourly Rate</div>
                    <div className="pricing-subtitle">Pricing based on your specific requirements</div>
                  </div>
                </div>
              </div>

              <div className="service-details-section">
                <h3>Sample Work</h3>
                <div className="sample-gallery">
                  <div className="sample-item">
                    <div className="sample-images">
                      <div className="sample-image-container">
                        <div className="sample-label">Before</div>
                        <div className="sample-image-placeholder">
                          <span className="placeholder-icon">🖼️</span>
                          <p>Sample image</p>
                        </div>
                      </div>
                      <div className="sample-arrow">→</div>
                      <div className="sample-image-container">
                        <div className="sample-label">After</div>
                        <div className="sample-image-placeholder">
                          <span className="placeholder-icon">✨</span>
                          <p>Enhanced result</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sample-item">
                    <div className="sample-images">
                      <div className="sample-image-container">
                        <div className="sample-label">Before</div>
                        <div className="sample-image-placeholder">
                          <span className="placeholder-icon">🖼️</span>
                          <p>Sample image</p>
                        </div>
                      </div>
                      <div className="sample-arrow">→</div>
                      <div className="sample-image-container">
                        <div className="sample-label">After</div>
                        <div className="sample-image-placeholder">
                          <span className="placeholder-icon">✨</span>
                          <p>Enhanced result</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="sample-note">
                  Note: Actual results may vary based on your specific requirements.
                  These are representative examples of our work quality.
                </p>
              </div>

              <div className="service-details-section">
                <h3>What's Included</h3>
                <ul className="included-list">
                  <li>Professional consultation and requirement analysis</li>
                  <li>Unlimited revisions until satisfied</li>
                  <li>Fast turnaround time</li>
                  <li>High-quality deliverables</li>
                  <li>Dedicated support throughout the project</li>
                </ul>
              </div>

              <div className="service-details-section">
                <h3>How It Works</h3>
                <ol className="process-list">
                  <li>
                    <strong>Submit Requirements</strong> - Share your project details
                    and specific needs
                  </li>
                  <li>
                    <strong>Get Quote</strong> - Receive a custom quote based on
                    project scope
                  </li>
                  <li>
                    <strong>Project Execution</strong> - Our experts work on your
                    project
                  </li>
                  <li>
                    <strong>Review & Revise</strong> - Review the work and request
                    any changes
                  </li>
                  <li>
                    <strong>Final Delivery</strong> - Receive your completed project
                    in the desired format
                  </li>
                </ol>
              </div>
            </div>

            <div className="service-sidebar">
              <div className="booking-card">
                <h3>Get a Custom Quote</h3>
                <div className="price-display">
                  <div className="price-amount">Hourly Rate</div>
                  <div className="price-note">
                    We'll provide a detailed quote based on your specific requirements
                    and project scope
                  </div>
                </div>
                <Link
                  to={`/booking/${service.id}`}
                  className="btn btn-primary btn-block"
                >
                  Request Quote & Book
                </Link>
                <div className="contact-note">
                  Have questions? <Link to="/contact">Contact us</Link>
                </div>
              </div>

              <div className="info-card">
                <h4>Why Choose Us?</h4>
                <ul className="benefits-list">
                  <li>✓ Experienced professionals</li>
                  <li>✓ Competitive hourly rates</li>
                  <li>✓ Flexible project scopes</li>
                  <li>✓ Quick turnaround</li>
                  <li>✓ 100% satisfaction guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServiceDetail;
