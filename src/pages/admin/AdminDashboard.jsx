import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  adminGetAllServices,
  adminCreateService,
  adminUpdateService,
  adminDeleteService,
  adminGetAllBookings,
  adminUpdateBookingStatus,
  adminGetContactMessages
} from '../../services/api';
import '../../styles/Admin.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);

  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    category: 'Creative Services',
    price: '0.00',
    isActive: true
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [servicesRes, bookingsRes, contactsRes] = await Promise.all([
        adminGetAllServices(),
        adminGetAllBookings(),
        adminGetContactMessages()
      ]);

      if (servicesRes.data.success) setServices(servicesRes.data.data);
      if (bookingsRes.data.success) setBookings(bookingsRes.data.data);
      if (contactsRes.data.success) setContacts(contactsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const handleServiceFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setServiceForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await adminUpdateService(editingService.id, serviceForm);
      } else {
        await adminCreateService(serviceForm);
      }
      await fetchData();
      resetServiceForm();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service');
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      description: service.description,
      category: service.category,
      price: service.price.toString(),
      isActive: service.isActive
    });
    setShowServiceForm(true);
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await adminDeleteService(id);
        await fetchData();
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service');
      }
    }
  };

  const resetServiceForm = () => {
    setServiceForm({
      name: '',
      description: '',
      category: 'Creative Services',
      price: '0.00',
      duration: '',
      isActive: true
    });
    setEditingService(null);
    setShowServiceForm(false);
  };

  const handleUpdateBookingStatus = async (id, newStatus) => {
    try {
      await adminUpdateBookingStatus(id, newStatus);
      await fetchData();
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status');
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <div className="admin-user">
            <span>Welcome, {localStorage.getItem('adminUsername')}</span>
            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="admin-content container">
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings ({bookings.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Services ({services.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            Messages ({contacts.length})
          </button>
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="admin-section">
            <h2>Bookings Management</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id}>
                      <td>#{booking.id}</td>
                      <td>{booking.clientName}</td>
                      <td>{booking.service.name}</td>
                      <td>{booking.clientEmail}</td>
                      <td>
                        <select
                          value={booking.status}
                          onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PAID">PAID</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-outline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Services Management</h2>
              <button
                onClick={() => setShowServiceForm(true)}
                className="btn btn-primary"
              >
                Add New Service
              </button>
            </div>

            {showServiceForm && (
              <div className="service-form-modal">
                <div className="modal-content">
                  <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                  <form onSubmit={handleServiceSubmit}>
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={serviceForm.name}
                        onChange={handleServiceFormChange}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        value={serviceForm.description}
                        onChange={handleServiceFormChange}
                        className="form-textarea"
                        rows="3"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <select
                          name="category"
                          value={serviceForm.category}
                          onChange={handleServiceFormChange}
                          className="form-select"
                        >
                          <option>Creative Services</option>
                          <option>Engineering Services</option>
                          <option>Software Development</option>
                          <option>BPO</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Hourly Rate ($/hour)</label>
                        <input
                          type="number"
                          name="price"
                          value={serviceForm.price}
                          onChange={handleServiceFormChange}
                          className="form-input"
                          step="0.01"
                          min="0"
                          placeholder="e.g., 25.00"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={serviceForm.isActive}
                          onChange={handleServiceFormChange}
                        />
                        Active
                      </label>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        {editingService ? 'Update' : 'Create'}
                      </button>
                      <button
                        type="button"
                        onClick={resetServiceForm}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Hourly Rate</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service.id}>
                      <td>#{service.id}</td>
                      <td>{service.name}</td>
                      <td>{service.category}</td>
                      <td>${parseFloat(service.price).toFixed(2)}/hr</td>
                      <td>
                        <span className={`badge ${service.isActive ? 'badge-success' : 'badge-inactive'}`}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleEditService(service)}
                            className="btn btn-sm btn-outline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="btn btn-sm btn-outline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contact Messages Tab */}
        {activeTab === 'contacts' && (
          <div className="admin-section">
            <h2>Contact Messages</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact.id}>
                      <td>#{contact.id}</td>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.subject || 'N/A'}</td>
                      <td className="message-cell">{contact.message}</td>
                      <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
