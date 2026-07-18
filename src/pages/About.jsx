import { Link } from 'react-router-dom';
import '../styles/About.css';

function About() {
  const team = [
    {
      name: 'John Anderson',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years of experience in technology and business solutions.'
    },
    {
      name: 'Sarah Mitchell',
      role: 'Head of Creative Services',
      bio: 'Award-winning designer passionate about creating impactful brand experiences.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Technology innovator specializing in scalable software architecture and development.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Operations Director',
      bio: 'Expert in streamlining business processes and delivering exceptional client service.'
    }
  ];

  const timeline = [
    { year: '2014', event: 'Company founded with a vision to deliver excellence' },
    { year: '2016', event: 'Expanded to engineering and software development services' },
    { year: '2019', event: 'Reached 100+ satisfied clients across multiple industries' },
    { year: '2022', event: 'Launched comprehensive BPO solutions' },
    { year: '2024', event: 'Celebrating 10 years of innovation and growth' }
  ];

  return (
    <div className="about-page">
      <section className="page-header">
        <div className="container">
          <h1>About CosmoLine Solutions</h1>
          <p>Your trusted partner for professional services</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Who We Are</h2>
              <p>
                CosmoLine Solutions is a leading provider of comprehensive
                professional services, specializing in creative design, engineering
                solutions, software development, and business process outsourcing.
              </p>
              <p>
                Since our founding in 2014, we've been committed to delivering
                exceptional value to our clients through innovative solutions,
                expert execution, and unwavering dedication to quality.
              </p>
              <p>
                Our multidisciplinary team combines deep industry expertise with
                cutting-edge technology to help businesses of all sizes achieve
                their goals and stay ahead in an ever-evolving marketplace.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <p>🏢</p>
                <small>Company Image Placeholder</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Our Mission & Values</h2>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To empower businesses with innovative, reliable, and cost-effective
                solutions that drive growth and success.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h3>Excellence</h3>
              <p>
                We maintain the highest standards in everything we do, from initial
                consultation to final delivery.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Partnership</h3>
              <p>
                We build lasting relationships with our clients based on trust,
                transparency, and mutual success.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>
                We continuously explore new technologies and methodologies to
                deliver cutting-edge solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Meet Our Team</h2>
            <p className="section-subtitle">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">
                  <div className="avatar-placeholder">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h3 className="team-name">{member.name}</h3>
                <div className="team-role">{member.role}</div>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>Our Journey</h2>
          </div>

          <div className="timeline">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <p>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Work With Us?</h2>
            <p>
              Let's discuss how we can help your business succeed with our
              comprehensive suite of professional services.
            </p>
            <div className="cta-actions">
              <Link to="/services" className="btn btn-primary btn-lg">
                View Our Services
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
