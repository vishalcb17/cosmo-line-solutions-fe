import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getBooking } from '../services/api';
import '../styles/BookingConfirmation.css';

function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookingId = searchParams.get('booking_id');
    if (bookingId) {
      fetchBooking(bookingId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchBooking = async (bookingId) => {
    try {
      const response = await getBooking(bookingId);
      if (response.data.success) {
        setBooking(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching booking:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <section className="section">
        <div className="container">
          <div className="confirmation-content">
            <div className="success-icon">✓</div>
            <h1 className="confirmation-title">Booking Confirmed!</h1>
            <p className="confirmation-message">
              Thank you for your booking. We've received your payment and sent a
              confirmation email to {booking?.clientEmail || 'your email'}.
            </p>

            {booking && (
              <div className="booking-details-card">
                <h2>Booking Details</h2>

                <div className="detail-row">
                  <span className="detail-label">Booking ID:</span>
                  <span className="detail-value">#{booking.id}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Service:</span>
                  <span className="detail-value">{booking.service.name}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{booking.service.category}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value status-badge">{booking.status}</span>
                </div>

                {booking.preferredDate && (
                  <div className="detail-row">
                    <span className="detail-label">Preferred Start Date:</span>
                    <span className="detail-value">{booking.preferredDate}</span>
                  </div>
                )}
              </div>
            )}

            <div className="next-steps-card">
              <h3>What Happens Next?</h3>
              <ul className="steps-list">
                <li>You'll receive a confirmation email shortly</li>
                <li>Our team will review your requirements</li>
                <li>We'll contact you within 24 hours to discuss next steps</li>
                <li>Project work will begin according to the agreed timeline</li>
              </ul>
            </div>

            <div className="action-buttons">
              <Link to="/" className="btn btn-primary">
                Back to Home
              </Link>
              <Link to="/services" className="btn btn-outline">
                Browse More Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookingConfirmation;
