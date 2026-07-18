import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById, createBooking, createCheckoutSession } from '../services/api';
import '../styles/Booking.css';

function Booking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    company: '',
    preferredDate: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchService();
  }, [serviceId]);

  const fetchService = async () => {
    try {
      const response = await getServiceById(serviceId);
      if (response.data.success) {
        setService(response.data.data);
      } else {
        setError('Service not found');
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      setError('Failed to load service details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.clientName.trim()) {
      errors.clientName = 'Name is required';
    }
    if (!formData.clientEmail.trim()) {
      errors.clientEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      errors.clientEmail = 'Invalid email format';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // Create the booking
      const bookingData = {
        serviceId: parseInt(serviceId),
        ...formData
      };

      const bookingResponse = await createBooking(bookingData);

      if (bookingResponse.data.success) {
        const booking = bookingResponse.data.data;

        // Create Stripe checkout session
        const checkoutResponse = await createCheckoutSession(booking.id);

        if (checkoutResponse.data.success) {
          // Redirect to Stripe Checkout
          window.location.href = checkoutResponse.data.data.sessionUrl;
        } else {
          setError('Failed to initialize payment. Please try again.');
        }
      } else {
        setError(bookingResponse.data.message || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setError(error.response?.data?.message || 'An error occurred while processing your booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error && !service) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>{error}</h2>
          <button onClick={() => navigate('/services')} className="btn btn-primary">
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <section className="page-header">
        <div className="container">
          <h1>Book Service</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="booking-content">
            <div className="booking-form-section">
              <h2>Your Information</h2>
              {error && <div className="alert alert-error">{error}</div>}

              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                  <label htmlFor="clientName" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className={`form-input ${formErrors.clientName ? 'error' : ''}`}
                    required
                  />
                  {formErrors.clientName && (
                    <span className="error-message">{formErrors.clientName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="clientEmail" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    className={`form-input ${formErrors.clientEmail ? 'error' : ''}`}
                    required
                  />
                  {formErrors.clientEmail && (
                    <span className="error-message">{formErrors.clientEmail}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="clientPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="clientPhone"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company" className="form-label">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preferredDate" className="form-label">
                    Preferred Start Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="notes" className="form-label">
                    Project Details / Special Requirements
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="5"
                    placeholder="Please provide any relevant details about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  disabled={submitting}
                >
                  {submitting ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </form>
            </div>

            <div className="booking-summary">
              <div className="summary-card">
                <h3>Booking Summary</h3>

                <div className="summary-item">
                  <div className="summary-label">Service</div>
                  <div className="summary-value">{service.name}</div>
                </div>

                <div className="summary-item">
                  <div className="summary-label">Category</div>
                  <div className="summary-value">{service.category}</div>
                </div>

                <div className="summary-item">
                  <div className="summary-label">Duration</div>
                  <div className="summary-value">{service.duration}</div>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-item summary-total">
                  <div className="summary-label">Total Price</div>
                  <div className="summary-value">
                    {service.price === 0 || service.price === '0.00'
                      ? 'TBD'
                      : `$${parseFloat(service.price).toFixed(2)}`}
                  </div>
                </div>

                {(service.price === 0 || service.price === '0.00') && (
                  <div className="summary-note">
                    Final pricing will be determined after consultation with our team
                  </div>
                )}
              </div>

              <div className="info-box">
                <h4>What Happens Next?</h4>
                <ol className="next-steps">
                  <li>Complete the booking form</li>
                  <li>Proceed to secure payment</li>
                  <li>Receive confirmation email</li>
                  <li>Our team will contact you within 24 hours</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Booking;
