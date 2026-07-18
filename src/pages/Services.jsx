import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getServices } from '../services/api';
import '../styles/Services.css';

function Services() {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [groupedServices, setGroupedServices] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All Services',
    'Creative Services',
    'Engineering',
    'Software Development',
    'BPO',
    'Digital Marketing'
  ];

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
    fetchServices();
  }, []);

  useEffect(() => {
    groupServicesByCategory();
  }, [selectedCategory, services]);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      if (response.data.success) {
        setServices(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMainCategory = (category) => {
    if (category.startsWith('Creative Services')) return 'Creative Services';
    if (category.startsWith('Engineering')) return 'Engineering';
    if (category.startsWith('Software')) return 'Software Development';
    if (category.startsWith('BPO')) return 'BPO';
    return category; // Digital Marketing
  };

  const getSubCategory = (category) => {
    const parts = category.split(' - ');
    return parts.length > 1 ? parts[1] : null;
  };

  const groupServicesByCategory = () => {
    let filtered = services;

    if (selectedCategory && selectedCategory !== 'All Services') {
      filtered = services.filter(s => getMainCategory(s.category) === selectedCategory);
    }

    const grouped = filtered.reduce((acc, service) => {
      const mainCat = getMainCategory(service.category);
      const subCat = getSubCategory(service.category) || 'General';

      if (!acc[mainCat]) acc[mainCat] = {};
      if (!acc[mainCat][subCat]) acc[mainCat][subCat] = [];

      acc[mainCat][subCat].push(service);
      return acc;
    }, {});

    setGroupedServices(grouped);
  };

  return (
    <div className="services-page">
      <section className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Choose from our comprehensive range of professional services</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Category Filter */}
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  (category === 'All Services' && !selectedCategory) ||
                  category === selectedCategory
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setSelectedCategory(category === 'All Services' ? '' : category)
                }
              >
                {category}
              </button>
            ))}
          </div>

          {/* Services List */}
          {loading ? (
            <div className="loading">Loading services...</div>
          ) : Object.keys(groupedServices).length === 0 ? (
            <div className="no-services">
              <p>No services found in this category.</p>
            </div>
          ) : (
            <div className="services-grouped">
              {Object.entries(groupedServices).map(([mainCategory, subCategories]) => (
                <div key={mainCategory} className="category-section">
                  <h2 className="main-category-title">{mainCategory}</h2>

                  {Object.entries(subCategories).map(([subCategory, serviceList]) => (
                    <div key={subCategory} className="subcategory-section">
                      {subCategory !== 'General' && (
                        <h3 className="subcategory-title">{subCategory}</h3>
                      )}

                      <ul className="services-list-compact">
                        {serviceList.map((service) => (
                          <li key={service.id} className="service-list-item">
                            <Link to={`/services/${service.id}`} className="service-link">
                              <span className="service-name-compact">{service.name}</span>
                              <span className="service-arrow">→</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Services;
