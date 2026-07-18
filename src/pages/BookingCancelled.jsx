import { Link } from 'react-router-dom';
import '../styles/BookingConfirmation.css';

function BookingCancelled() {
  return (
    <div className="confirmation-page">
      <section className="section">
        <div className="container">
          <div className="confirmation-content">
            <div className="cancelled-icon">✕</div>
            <h1 className="confirmation-title">Booking Cancelled</h1>
            <p className="confirmation-message">
              Your booking was cancelled and no payment was processed.
              If this was a mistake, you can try booking again.
            </p>

            <div className="info-card">
              <h3>Need Help?</h3>
              <p>
                If you encountered any issues during the booking process, please
                don't hesitate to contact our support team.
              </p>
              <Link to="/contact" className="btn btn-outline">
                Contact Support
              </Link>
            </div>

            <div className="action-buttons">
              <Link to="/services" className="btn btn-primary">
                Try Again
              </Link>
              <Link to="/" className="btn btn-outline">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookingCancelled;
